import { NextRequest, NextResponse } from 'next/server'
import { requireAdminApiUser } from '@/lib/adminApi'

export async function POST(req: NextRequest) {
  const auth = await requireAdminApiUser()
  if (auth.error) return auth.error

  const body = await req.json()
  const replyEmail = body.replyEmail?.trim()

  if (!replyEmail) {
    return NextResponse.json({ error: 'Add a reply email in Admin Settings before sending replies.' }, { status: 400 })
  }

  return NextResponse.json({
    success: false,
    message:
      'Reply composer is ready, but actual email sending is not configured yet. Add an SMTP or email provider integration next.',
  })
}
