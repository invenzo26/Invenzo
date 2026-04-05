'use client'

import { useEffect, useState } from 'react'
import { Mail, UserRound } from 'lucide-react'

type AdminUser = {
  id: string
  email: string | null
  created_at?: string | null
  last_sign_in_at?: string | null
  is_admin: boolean
}

export default function UsersPage() {
  const [admins, setAdmins] = useState<AdminUser[]>([])
  const [summary, setSummary] = useState({ totalAuthUsers: 0, totalAdmins: 0 })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadAdmins()
  }, [])

  async function loadAdmins() {
    const response = await fetch('/api/admin/users', {
      credentials: 'include',
      cache: 'no-store',
    })

    const payload = await response.json()

    if (!response.ok) {
      setError(payload.error || 'Failed to load users.')
      return
    }

    setError(null)
    setAdmins((payload.users as AdminUser[]) || [])
    setSummary({
      totalAuthUsers: payload.totalAuthUsers || 0,
      totalAdmins: payload.totalAdmins || 0,
    })
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-3 lg:grid-cols-2">
        <div className="rounded-[1.4rem] border border-white/10 bg-gradient-to-br from-purple-500/15 to-cyan-500/10 p-4">
          <p className="text-sm text-slate-300">Supabase auth users</p>
          <p className="mt-2 text-2xl font-semibold text-white">{summary.totalAuthUsers}</p>
          <p className="mt-1.5 text-sm text-slate-400">Accounts currently present in Supabase Auth.</p>
        </div>

        <div className="rounded-[1.4rem] border border-white/10 bg-[linear-gradient(145deg,rgba(24,10,42,0.92),rgba(12,16,34,0.9))] p-4">
          <p className="text-sm text-slate-300">Admin-enabled users</p>
          <p className="mt-2 text-2xl font-semibold text-white">{summary.totalAdmins}</p>
          <p className="mt-1.5 text-sm text-slate-400">Users currently listed in the admin access table.</p>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="grid gap-4">
        {admins.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-14 text-center text-slate-400">
            No auth users were returned from Supabase.
          </div>
        ) : (
          admins.map((admin) => (
            <div key={admin.id} className="rounded-[1.4rem] border border-white/10 bg-[linear-gradient(145deg,rgba(24,10,42,0.92),rgba(12,16,34,0.9))] p-4 shadow-[0_18px_45px_rgba(4,8,20,0.24)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-cyan-300 ring-1 ring-white/10">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-white">{admin.email || 'No email available'}</p>
                    <p className="mt-1 text-sm text-slate-400">
                      {admin.is_admin ? 'Admin access enabled' : 'User account'}
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-slate-300">
                  <UserRound size={14} />
                  {admin.created_at
                    ? `Created ${new Date(admin.created_at).toLocaleDateString()}`
                    : 'Created date unavailable'}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
