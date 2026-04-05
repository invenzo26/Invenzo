import { NextRequest, NextResponse } from 'next/server'
import { requireAdminApiUser } from '@/lib/adminApi'
import { getSupabaseServerClient } from '@/lib/supabaseServer'

export async function GET(req: NextRequest) {
  const auth = await requireAdminApiUser()
  if (auth.error) return auth.error

  const query = req.nextUrl.searchParams.get('q')?.trim() || ''

  if (!query) {
    return NextResponse.json({ results: [] })
  }

  const supabaseServer = getSupabaseServerClient()
  const supabase = supabaseServer ?? auth.supabase

  const [productsResult, contactsResult, authUsersResult] = await Promise.all([
    supabase
      .from('products')
      .select('id, name, slug, tagline')
      .or(`name.ilike.%${query}%,slug.ilike.%${query}%,tagline.ilike.%${query}%`)
      .limit(5),
    supabase
      .from('contacts')
      .select('id, name, email, subject')
      .or(`name.ilike.%${query}%,email.ilike.%${query}%,subject.ilike.%${query}%`)
      .limit(5),
    supabaseServer?.auth.admin.listUsers({ page: 1, perPage: 1000 }) ??
      Promise.resolve({ data: { users: [] }, error: null }),
  ])

  const authUsers = (authUsersResult.data?.users || [])
    .filter((user) => (user.email || '').toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5)
    .map((user) => ({
      id: user.id,
      title: user.email || 'No email',
      subtitle: user.id,
      href: '/admin/dashboard/users',
      type: 'User',
    }))

  const results = [
    ...((productsResult.data || []).map((product) => ({
      id: product.id,
      title: product.name,
      subtitle: product.slug || product.tagline || 'Product',
      href: '/admin/dashboard/products',
      type: 'Product',
    })) || []),
    ...((contactsResult.data || []).map((contact) => ({
      id: contact.id,
      title: contact.name,
      subtitle: contact.email || contact.subject || 'Contact',
      href: '/admin/dashboard/contacts',
      type: 'Contact',
    })) || []),
    ...authUsers,
  ]

  return NextResponse.json({ results })
}
