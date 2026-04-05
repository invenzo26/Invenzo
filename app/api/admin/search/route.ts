import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { getSupabaseServerClient } from '@/lib/supabaseServer'
import { isAdmin } from '@/lib/checkAdmin'

async function requireAdmin() {
  const cookieStore = await cookies()
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    return { error: NextResponse.json({ error: 'Supabase is not configured.' }, { status: 500 }) }
  }

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set() {},
      remove() {},
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  }

  const allowed = await isAdmin(user.id)

  if (!allowed) {
    return { error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) }
  }

  return { user }
}

export async function GET(req: NextRequest) {
  const auth = await requireAdmin()
  if (auth.error) return auth.error

  const query = req.nextUrl.searchParams.get('q')?.trim() || ''

  if (!query) {
    return NextResponse.json({ results: [] })
  }

  const supabase = getSupabaseServerClient()

  if (!supabase) {
    return NextResponse.json({ results: [] })
  }

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
    supabase.auth.admin.listUsers({ page: 1, perPage: 1000 }),
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
