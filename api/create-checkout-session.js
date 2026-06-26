import Stripe from 'stripe'

/**
 * POST /api/create-checkout-session
 * Creates a Stripe Checkout Session for Pro subscription
 *
 * Required environment variables:
 * - STRIPE_SECRET_KEY: Stripe secret key (sk_test_xxx)
 * - STRIPE_PRICE_PRO_MONTHLY: Stripe Price ID for Pro monthly plan (price_xxx)
 * - SITE_URL: Site URL (optional, defaults to production URL)
 */
export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { STRIPE_SECRET_KEY, STRIPE_PRICE_PRO_MONTHLY, SITE_URL } = process.env

  // Validate required environment variables
  if (!STRIPE_SECRET_KEY || !STRIPE_PRICE_PRO_MONTHLY) {
    return res.status(500).json({ error: 'Checkout is not configured.' })
  }

  try {
    const stripe = new Stripe(STRIPE_SECRET_KEY)
    const baseUrl = SITE_URL || 'https://global-earnings-radar.vercel.app'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: STRIPE_PRICE_PRO_MONTHLY,
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/payment-cancel`,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      subscription_data: {
        metadata: {
          plan: 'pro_monthly',
        },
      },
    })

    return res.status(200).json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error.message)
    return res.status(500).json({ error: 'Checkout is not available. Please try again later.' })
  }
}