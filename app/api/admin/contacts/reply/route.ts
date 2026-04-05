import { NextRequest, NextResponse } from 'next/server'
import { requireAdminApiUser } from '@/lib/adminApi'
import { ADMIN_REPLY_EMAIL } from '@/lib/adminReplyEmail'

export async function POST(req: NextRequest) {
  const auth = await requireAdminApiUser()
  if (auth.error) return auth.error

  const body = await req.json()

  return NextResponse.json({
    success: false,
    message:
      `Reply composer is ready and will use ${ADMIN_REPLY_EMAIL}, but actual email sending is not configured yet. Add an SMTP or email provider integration next.`,
  })
}
