import { NextRequest, NextResponse } from 'next/server'
import { requireAdminApiUser } from '@/lib/adminApi'
import { ADMIN_REPLY_EMAIL } from '@/lib/adminReplyEmail'
import { sendGmailMessage } from '@/lib/gmail'

export async function POST(req: NextRequest) {
  const auth = await requireAdminApiUser()
  if (auth.error) return auth.error

  const body = await req.json()

  const to = String(body.to || '').trim()
  const subject = String(body.subject || '').trim()
  const message = String(body.message || '').trim()

  if (!to || !subject || !message) {
    return NextResponse.json(
      {
        success: false,
        error: 'To email, subject, and message are required.',
      },
      { status: 400 }
    )
  }

  try {
    await sendGmailMessage({
      to,
      subject,
      message,
    })

    return NextResponse.json({
      success: true,
      message: `Reply sent successfully from ${process.env.GMAIL_SENDER_EMAIL || ADMIN_REPLY_EMAIL}.`,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send reply email.',
      },
      { status: 500 }
    )
  }
}
