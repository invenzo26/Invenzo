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
      clientId: clientId as string,
      clientSecret: clientSecret as string,
      refreshToken: refreshToken as string,
      senderEmail: senderEmail as string,
    },
    error: null,
  }
}

function toBase64Url(value: string) {
  return Buffer.from(value, 'utf8')
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
}

function encodeMimeHeader(value: string) {
  const sanitized = value.replace(/[\r\n]/g, ' ').trim()

  if (/^[\x20-\x7E]*$/.test(sanitized)) {
    return sanitized
  }

  return `=?UTF-8?B?${Buffer.from(sanitized, 'utf8').toString('base64')}?=`
}

function encodeMimeBody(value: string) {
  const encoded = Buffer.from(value, 'utf8').toString('base64')
  return encoded.match(/.{1,76}/g)?.join('\r\n') || ''
}

function buildRawEmail({
  from,
  to,
  subject,
  text,
  html,
}: {
  from: string
  to: string
  subject: string
  text: string
  html?: string
}) {
  const mime = html
    ? [
        `From: ${encodeMimeHeader(from)}`,
        `To: ${encodeMimeHeader(to)}`,
        `Subject: ${encodeMimeHeader(subject)}`,
        'MIME-Version: 1.0',
        'Content-Type: multipart/alternative; boundary="invenzo-boundary"',
        '',
        '--invenzo-boundary',
        'Content-Type: text/plain; charset="UTF-8"',
        'Content-Transfer-Encoding: base64',
        '',
        encodeMimeBody(text),
        '',
        '--invenzo-boundary',
        'Content-Type: text/html; charset="UTF-8"',
        'Content-Transfer-Encoding: base64',
        '',
        encodeMimeBody(html),
        '',
        '--invenzo-boundary--',
      ].join('\r\n')
    : [
        `From: ${encodeMimeHeader(from)}`,
        `To: ${encodeMimeHeader(to)}`,
        `Subject: ${encodeMimeHeader(subject)}`,
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset="UTF-8"',
        'Content-Transfer-Encoding: base64',
        '',
        encodeMimeBody(text),
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
  text,
  html,
}: {
  to: string
  subject: string
  text: string
  html?: string
}) {
  const { config, error } = getGmailConfig()

  if (!config) {
    throw new Error(error || 'Gmail API is not configured.')
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    throw new Error('The recipient email address is invalid.')
  }

  const accessToken = await getAccessToken(config)
  const raw = buildRawEmail({
    from: config.senderEmail,
    to,
    subject,
    text,
    html,
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
