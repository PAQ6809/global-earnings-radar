import { verifyCheckMacValue } from './_ecpay.js'

/**
 * POST /api/ecpay-period-return
 * Callback for recurring billing (хоЪц?хоЪщ?) payment notifications
 * ECPay calls this each time a recurring charge is processed
 *
 * NOTE: Production should:
 * - Verify CheckMacValue
 * - Log each charge in database
 * - Send notification email to user
 * - Handle failed charges
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
    const params = req.body || {}

    // Verify CheckMacValue
    const isValid = verifyCheckMacValue(params, ECPAY_HASH_KEY, ECPAY_HASH_IV)

    if (!isValid) {
      return res.status(400).end()
    }

    // TODO (Production): Record each recurring charge
    // const merchantTradeNo = params.MerchantTradeNo
    // const rtnCode = params.RtnCode
    // const periodType = params.PeriodType
    // const triggerTime = params.TriggerTime
    // RecordRecurringCharge(merchantTradeNo, params)

    // Return 1|OK as required by ECPay
    return res.setHeader('Content-Type', 'text/plain')
      .status(200)
      .send('1|OK')
  } catch (error) {
    return res.status(500).end()
  }
}
