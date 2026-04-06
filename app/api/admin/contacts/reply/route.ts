import { NextRequest, NextResponse } from 'next/server'
import { requireAdminApiUser } from '@/lib/adminApi'
import { ADMIN_REPLY_EMAIL } from '@/lib/adminReplyEmail'
import { sendGmailMessage } from '@/lib/gmail'
import { buildReplyEmailTemplate } from '@/lib/replyEmailTemplate'
import { getSupabaseServerClient } from '@/lib/supabaseServer'

export async function POST(req: NextRequest) {
  const auth = await requireAdminApiUser()
  if (auth.error) return auth.error

  const body = await req.json()

  const contactId = String(body.contactId || '').trim()
  const to = String(body.to || '').trim()
  const subject = String(body.subject || '').trim()
  const message = String(body.message || '').trim()

  if (!contactId || !to || !subject || !message) {
    return NextResponse.json(
      {
        success: false,
        error: 'Contact id, to email, subject, and message are required.',
      },
      { status: 400 }
    )
  }

  try {
    const emailTemplate = buildReplyEmailTemplate({
      recipientName: String(body.name || '').trim(),
      subject,
      message,
      senderEmail: process.env.GMAIL_SENDER_EMAIL || ADMIN_REPLY_EMAIL,
    })

    await sendGmailMessage({
      to,
      subject,
      text: emailTemplate.text,
      html: emailTemplate.html,
    })

    const { client: supabase } = getSupabaseServerClient()

    if (supabase) {
      const { error: updateError } = await supabase
        .from('contacts')
        .update({
          replied_at: new Date().toISOString(),
          reply_subject: subject,
        })
        .eq('id', contactId)

      if (updateError) {
        return NextResponse.json(
          {
            success: false,
            error: updateError.message,
          },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({
      success: true,
      repliedAt: new Date().toISOString(),
      replySubject: subject,
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
