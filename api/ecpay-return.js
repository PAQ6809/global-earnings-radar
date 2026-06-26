import { verifyCheckMacValue } from './_ecpay.js'

/**
 * POST /api/ecpay-return
 * Server-side callback from ECPay
 * Called by ECPay after payment processing
 *
 * NOTE: Production should:
 * - Verify CheckMacValue
 * - Update subscription status in database
 * - Send confirmation email
 * - Log transaction for audit
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { ECPAY_HASH_KEY, ECPAY_HASH_IV } = process.env

  if (!ECPAY_HASH_KEY || !ECPAY_HASH_IV) {
    return res.status(400).end()
  }

  try {
    // ECPay sends application/x-www-form-urlencoded
    // Vercel provides this as query object or we need to parse body
    const params = req.body || {}

    // Verify CheckMacValue
    const isValid = verifyCheckMacValue(params, ECPAY_HASH_KEY, ECPAY_HASH_IV)

    if (!isValid) {
      return res.status(400).end()
    }

    // TODO (Production): Update subscription status in database
    // const merchantTradeNo = params.MerchantTradeNo
    // const tradeAmt = params.TradeAmt
    // const rtnCode = params.RtnCode
    // UpdateUserSubscription(merchantTradeNo, rtnCode)

    // Return 1|OK as required by ECPay
    return res.setHeader('Content-Type', 'text/plain')
      .status(200)
      .send('1|OK')
  } catch (error) {
    return res.status(500).end()
  }
}
