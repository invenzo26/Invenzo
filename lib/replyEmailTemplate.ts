function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function formatHtmlMessage(message: string) {
  return escapeHtml(message).replace(/\n/g, '<br />')
}

function toTelHref(contactNumber: string) {
  return `tel:${contactNumber.replace(/[^\d+]/g, '')}`
}

export function buildReplyEmailTemplate({
  recipientName,
  subject,
  message,
  senderEmail,
  contactNumber,
}: {
  recipientName?: string
  subject: string
  message: string
  senderEmail: string
  contactNumber?: string
}) {
  const safeName = recipientName?.trim() || 'there'
  const safeSubject = escapeHtml(subject)
  const htmlMessage = formatHtmlMessage(message)
  const safeContactNumber = contactNumber?.trim() || ''
  const safeTelHref = safeContactNumber ? toTelHref(safeContactNumber) : ''

  const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${safeSubject}</title>
  </head>
  <body style="margin:0;padding:0;background:#070b14;font-family:Segoe UI,Arial,sans-serif;color:#e5eefc;">
    <div style="padding:32px 16px;background:radial-gradient(circle at top, rgba(147,51,234,0.28), transparent 34%), radial-gradient(circle at bottom right, rgba(34,211,238,0.18), transparent 30%), #070b14;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;margin:0 auto;border-collapse:separate;">
        <tr>
          <td style="padding:0 0 18px 0;">
            <div style="display:inline-block;padding:8px 14px;border:1px solid rgba(255,255,255,0.12);border-radius:999px;background:rgba(255,255,255,0.04);color:#8be9fd;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;">
              Invenzo AI Solutions
            </div>
          </td>
        </tr>
        <tr>
          <td style="border:1px solid rgba(255,255,255,0.1);border-radius:28px;background:linear-gradient(145deg, rgba(26,12,46,0.95), rgba(9,18,36,0.96));padding:32px;box-shadow:0 24px 60px rgba(0,0,0,0.35);">
            <div style="height:4px;width:120px;border-radius:999px;background:linear-gradient(90deg,#a855f7,#22d3ee);margin-bottom:24px;"></div>
            <p style="margin:0 0 10px 0;font-size:14px;color:#8fa3bf;">Hello ${escapeHtml(safeName)},</p>
            <h1 style="margin:0 0 16px 0;font-size:28px;line-height:1.2;color:#ffffff;">${safeSubject}</h1>
            <div style="padding:22px;border:1px solid rgba(255,255,255,0.08);border-radius:22px;background:rgba(10,17,32,0.75);font-size:15px;line-height:1.8;color:#d7e3f5;">
              ${htmlMessage}
            </div>
            <div style="margin-top:24px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.08);font-size:14px;line-height:1.8;color:#a7b7cf;">
              <strong style="display:block;color:#ffffff;">Team Invenzo</strong>
              <span style="color:#8be9fd;">${escapeHtml(senderEmail)}</span>
              ${safeContactNumber ? `<br /><span style="color:#d7e3f5;">Contact: <a href="${escapeHtml(safeTelHref)}" style="color:#d7e3f5;text-decoration:none;">${escapeHtml(safeContactNumber)}</a></span>` : ''}
            </div>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>`.trim()

  const text = [
    `Hello ${safeName},`,
    '',
    subject,
    '',
    message,
    '',
    'Team Invenzo',
    senderEmail,
    ...(safeContactNumber ? [`Contact: ${safeContactNumber}`] : []),
  ].join('\n')

  return { html, text }
}
