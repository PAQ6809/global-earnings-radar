import crypto from 'crypto'

/**
 * ECPay CheckMacValue Generator/Verifier
 * Implements ECPay CheckMacValue SHA256 specification
 *
 * Rules:
 * 1. Exclude CheckMacValue field
 * 2. Sort parameters by key name (lexicographic)
 * 3. Construct string: HashKey=xxx&...&HashIV=yyy
 * 4. URL encode all values
 * 5. Convert entire string to lowercase
 * 6. SHA256 hash
 * 7. Convert to uppercase
 */

/**
 * Generate CheckMacValue for given parameters
 * @param {Object} params - All parameters except CheckMacValue
 * @param {string} hashKey - ECPay HashKey (from environment)
 * @param {string} hashIv - ECPay HashIV (from environment)
 * @returns {string} CheckMacValue (uppercase hex)
 */
export function generateCheckMacValue(params, hashKey, hashIv) {
  // Step 1: Create a copy without CheckMacValue
  const filteredParams = {}
  for (const [key, value] of Object.entries(params)) {
    if (key !== 'CheckMacValue' && key !== 'PaymentType') {
      filteredParams[key] = value
    }
  }

  // Step 2: Sort by key name
  const sortedKeys = Object.keys(filteredParams).sort()

  // Step 3: Build the raw string
  // Format: HashKey={key}&{key1}={value1}&{key2}={value2}&...&HashIV={value}
  const rawValues = sortedKeys.map(key => {
    const value = filteredParams[key] !== undefined && filteredParams[key] !== null
      ? String(filteredParams[key])
      : ''
    return `${key}=${value}`
  }).join('&')

  // Step 4: Prepend HashKey and append HashIV
  const rawString = `HashKey=${hashKey}&${rawValues}&HashIV=${hashIv}`

  // Step 5: URL encode the entire string
  const encodedString = encodeURIComponent(rawString)
    .toLowerCase()
    .replace(/%20/g, '+')
    .replace(/%2d/g, '-')
    .replace(/%5f/g, '_')
    .replace(/%2e/g, '.')
    .replace(/%2a/g, '*')
    .replace(/%28/g, '(')
    .replace(/%29/g, ')')
    .replace(/%2f/g, '/')

  // Step 6: SHA256 hash
  const hash = crypto.createHash('sha256')
  hash.update(encodedString, 'utf8')
  const hashHex = hash.digest('hex')

  // Step 7: Return uppercase
  return hashHex.toUpperCase()
}

/**
 * Verify CheckMacValue from ECPay response
 * @param {Object} params - Parameters including CheckMacValue
 * @param {string} hashKey - ECPay HashKey
 * @param {string} hashIv - ECPay HashIV
 * @returns {boolean} True if verified
 */
export function verifyCheckMacValue(params, hashKey, hashIv) {
  if (!params.CheckMacValue) {
    return false
  }

  const calculated = generateCheckMacValue(params, hashKey, hashIv)
  return calculated === params.CheckMacValue
}

/**
 * URL encode for ECPay (special handling)
 * ECPay expects specific encoding rules
 */
export function ecpayEncode(value) {
  if (value === undefined || value === null) {
    return ''
  }
  return encodeURIComponent(String(value))
    .replace(/%20/g, '+')
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/%3a/g, ':')
    .replace(/%23/g, '#')
    .replace(/%26/g, '&')
    .replace(/%3d/g, '=')
    .replace(/%2b/g, '+')
    .replace(/%2f/g, '/')
    .replace(/%3f/g, '?')
    .replace(/%5c/g, '\\')
    .replace(/%7e/g, '~')
    .replace(/%u/g, '%U')
}

/**
 * URL decode for ECPay responses
 */
export function ecpayDecode(value) {
  if (value === undefined || value === null) {
    return ''
  }
  return decodeURIComponent(String(value).replace(/\+/g, ' '))
}