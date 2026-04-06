const GMAIL_TOKEN_URL = 'https://oauth2.googleapis.com/token'
const GMAIL_SEND_URL = 'https://gmail.googleapis.com/gmail/v1/users/me/messages/send'

type GmailConfig = {
  clientId: string
  clientSecret: string
  refreshToken: string
  senderEmail: string
}

function getGmailConfig(): { config: GmailConfig | null; error: string | null } {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN
  const senderEmail = process.env.GMAIL_SENDER_EMAIL

  const missing = [
    !clientId ? 'GOOGLE_CLIENT_ID' : null,
    !clientSecret ? 'GOOGLE_CLIENT_SECRET' : null,
    !refreshToken ? 'GOOGLE_REFRESH_TOKEN' : null,
    !senderEmail ? 'GMAIL_SENDER_EMAIL' : null,
  ].filter(Boolean)

  if (missing.length > 0) {
    return {
      config: null,
      error: `Gmail API is not configured. Missing: ${missing.join(', ')}.`,
    }
  }

  return {
    config: {
      clientId,
      clientSecret,
      refreshToken,
      senderEmail,
    },
    error: null,
  }
}

function toBase64Url(value: string) {
  return Buffer.from(value)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
}

function buildRawEmail({
  from,
  to,
  subject,
  message,
}: {
  from: string
  to: string
  subject: string
  message: string
}) {
  const mime = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset="UTF-8"',
    'Content-Transfer-Encoding: 7bit',
    '',
    message,
  ].join('\r\n')

  return toBase64Url(mime)
}

async function getAccessToken(config: GmailConfig) {
  const response = await fetch(GMAIL_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      refresh_token: config.refreshToken,
      grant_type: 'refresh_token',
    }),
  })

  const payload = await response.json()

  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error_description || payload.error || 'Failed to get Gmail access token.')
  }

  return payload.access_token as string
}

export async function sendGmailMessage({
  to,
  subject,
  message,
}: {
  to: string
  subject: string
  message: string
}) {
  const { config, error } = getGmailConfig()

  if (!config) {
    throw new Error(error || 'Gmail API is not configured.')
  }

  const accessToken = await getAccessToken(config)
  const raw = buildRawEmail({
    from: config.senderEmail,
    to,
    subject,
    message,
  })

  const response = await fetch(GMAIL_SEND_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw }),
  })

  const payload = await response.json()

  if (!response.ok) {
    throw new Error(payload.error?.message || 'Failed to send Gmail message.')
  }

  return payload
}
