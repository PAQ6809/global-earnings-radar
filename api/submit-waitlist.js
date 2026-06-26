/**
 * POST /api/submit-waitlist
 * Submits waitlist form data to an external webhook
 *
 * Required environment variable:
 * - WAITLIST_WEBHOOK_URL: Webhook URL for collecting submissions
 *   (Formspree, Make, Zapier, Tally, Airtable, Google Sheets, etc.)
 */

/**
 * Validate email format
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Sanitize string input
 * @param {string} str
 * @param {number} maxLength
 * @returns {string}
 */
function sanitizeString(str, maxLength) {
  if (typeof str !== 'string') return ''
  return str.trim().slice(0, maxLength)
}

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const body = req.body || {}

    // Extract and sanitize inputs
    const name = sanitizeString(body.name, 120)
    const email = sanitizeString(body.email, 254)
    const role = sanitizeString(body.role, 120)
    const message = sanitizeString(body.message, 1000)
    const source = sanitizeString(body.source || 'waitlist-page', 50)

    // Validate email (required)
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      })
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      })
    }

    // Sanitize interests array
    let interests = []
    if (Array.isArray(body.interests)) {
      interests = body.interests
        .filter(i => typeof i === 'string')
        .map(i => sanitizeString(i, 100))
        .filter(i => i.length > 0)
        .slice(0, 10) // Max 10 interests
    }

    // Check if webhook URL is configured
    const webhookUrl = process.env.WAITLIST_WEBHOOK_URL

    if (!webhookUrl) {
      return res.status(200).json({
        success: false,
        configured: false,
        message: 'Waitlist collection is not configured yet.'
      })
    }

    // Prepare payload for webhook
    const payload = {
      name: name || null,
      email,
      role: role || null,
      interests,
      message: message || null,
      source,
      submittedAt: new Date().toISOString(),
      site: 'Global Earnings Radar'
    }

    // Send to webhook
    try {
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (webhookResponse.ok) {
        return res.status(200).json({
          success: true,
          configured: true,
          message: 'You have joined the Pro early access list.'
        })
      } else {
        return res.status(502).json({
          success: false,
          configured: true,
          message: 'Waitlist submission is temporarily unavailable.'
        })
      }
    } catch (fetchError) {
      return res.status(502).json({
        success: false,
        configured: true,
        message: 'Waitlist submission is temporarily unavailable.'
      })
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: 'Invalid request'
    })
  }
}