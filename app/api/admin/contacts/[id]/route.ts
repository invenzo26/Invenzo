import { NextRequest, NextResponse } from 'next/server'
import { requireAdminApiUser } from '@/lib/adminApi'

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminApiUser()
  if (auth.error) return auth.error

  const supabase = auth.supabase
  const { id } = await params

  const { error } = await supabase.from('contacts').delete().eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
