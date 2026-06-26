import { verifyCheckMacValue } from './_ecpay.js'

/**
 * POST /api/ecpay-result
 * User redirected back from ECPay after payment
 * Shows result and redirects to success/cancel page
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.redirect(303, '/payment-cancel?provider=ecpay')
  }

  const { ECPAY_HASH_KEY, ECPAY_HASH_IV } = process.env

  if (!ECPAY_HASH_KEY || !ECPAY_HASH_IV) {
    return res.redirect(303, '/payment-cancel?provider=ecpay')
  }

  try {
    const params = req.body || {}

    // Verify CheckMacValue
    const isValid = verifyCheckMacValue(params, ECPAY_HASH_KEY, ECPAY_HASH_IV)

    if (isValid && params.RtnCode === '1') {
      // Payment successful
      return res.redirect(303, '/payment-success?provider=ecpay')
    } else {
      // Payment failed or cancelled
      return res.redirect(303, '/payment-cancel?provider=ecpay')
    }
  } catch (error) {
    return res.redirect(303, '/payment-cancel?provider=ecpay')
  }
}
