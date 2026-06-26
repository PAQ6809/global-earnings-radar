import { generateCheckMacValue } from './_ecpay.js'

/**
 * POST /api/create-ecpay-payment
 * Creates an ECPay hosted payment form
 *
 * Required environment variables:
 * - ECPAY_MERCHANT_ID: ECPay merchant ID
 * - ECPAY_HASH_KEY: ECPay HashKey
 * - ECPAY_HASH_IV: ECPay HashIV
 * - ECPAY_STAGE: "true" for test environment
 * - SITE_URL: Site URL (optional, defaults to production)
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const {
    ECPAY_MERCHANT_ID,
    ECPAY_HASH_KEY,
    ECPAY_HASH_IV,
    ECPAY_STAGE,
    SITE_URL
  } = process.env

  // Validate required environment variables
  if (!ECPAY_MERCHANT_ID || !ECPAY_HASH_KEY || !ECPAY_HASH_IV) {
    return res.status(500).json({ error: 'ECPay checkout is not configured.' })
  }

  try {
    const baseUrl = SITE_URL || 'https://global-earnings-radar.vercel.app'

    // Determine ECPay endpoint based on stage
    const isStage = ECPAY_STAGE === 'true' || ECPAY_STAGE === '1'
    const actionUrl = isStage
      ? 'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5'
      : 'https://payment.ecpay.com.tw/Cashier/AioCheckOut/V5'

    // Generate unique MerchantTradeNo
    // Format: GER + timestamp (10 digits) + random (4 digits) = 17 chars
    const timestamp = Date.now().toString().slice(-10)
    const random = Math.random().toString(36).substring(2, 6).toUpperCase()
    const merchantTradeNo = `GER${timestamp}${random}`.substring(0, 20)

    // Format: yyyy/MM/dd HH:mm:ss (UTC+8)
    const now = new Date()
    const year = now.getUTCFullYear() + 8
    const month = String(now.getUTCMonth() + 1).padStart(2, '0')
    const day = String(now.getUTCDate()).padStart(2, '0')
    const hours = String(now.getUTCHours() + 8).padStart(2, '0')
    const minutes = String(now.getUTCMinutes()).padStart(2, '0')
    const seconds = String(now.getUTCSeconds()).padStart(2, '0')
    // Adjust for UTC+8 overflow
    const adjustedHours = (parseInt(hours) % 24).toString().padStart(2, '0')
    const merchantTradeDate = `${year}/${month}/${day} ${adjustedHours}:${minutes}:${seconds}`

    // Build payment parameters (credit card recurring)
    const params = {
      MerchantID: ECPAY_MERCHANT_ID,
      MerchantTradeNo: merchantTradeNo,
      MerchantTradeDate: merchantTradeDate,
      PaymentType: 'aio',
      TotalAmount: 9, // Test amount in NTD
      TradeDesc: 'Global Earnings Radar Pro',
      ItemName: 'Global Earnings Radar Pro Monthly',
      ReturnURL: `${baseUrl}/api/ecpay-return`,
      ClientBackURL: `${baseUrl}/pricing`,
      OrderResultURL: `${baseUrl}/api/ecpay-result`,
      ChoosePayment: 'Credit',
      EncryptType: 1,
      // Recurring billing parameters
      PeriodAmount: 9,
      PeriodType: 'M',
      Frequency: 1,
      ExecTimes: 12,
      PeriodReturnURL: `${baseUrl}/api/ecpay-period-return`
    }

    // Generate CheckMacValue
    const checkMacValue = generateCheckMacValue(params, ECPAY_HASH_KEY, ECPAY_HASH_IV)
    params.CheckMacValue = checkMacValue

    return res.status(200).json({
      action: actionUrl,
      params: params
    })
  } catch (error) {
    return res.status(500).json({ error: 'ECPay checkout is unavailable. Please try again later.' })
  }
}
