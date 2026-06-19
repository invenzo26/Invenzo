'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, Database, Link2, Save, Shield } from 'lucide-react'
import { getSupabaseClient } from '@/lib/supabaseClient'

export default function SettingsPage() {
  const [status, setStatus] = useState<'checking' | 'connected' | 'offline'>('checking')
  const [promo, setPromo] = useState<PromoSettings>(defaultPromoSettings)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [promoStorageReady, setPromoStorageReady] = useState(true)
  const [promoWarning, setPromoWarning] = useState<string | null>(null)

  useEffect(() => {
    const checkConnection = async () => {
      const supabase = getSupabaseClient()

      if (!supabase) {
        setStatus('offline')
        return
      }

      const { error } = await supabase.from('products').select('id').limit(1)
      setStatus(error ? 'offline' : 'connected')
    }

    const loadPromo = async () => {
      const response = await fetch('/api/admin/promo', {
        credentials: 'include',
        cache: 'no-store',
      })
      const payload = await response.json()
      setPromo(payload.settings || defaultPromoSettings)
      setPromoStorageReady(payload.storageReady ?? true)
      setPromoWarning(payload.warning ?? null)
    }

    checkConnection()
    loadPromo()
  }, [])

  async function savePromoSettings(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    const response = await fetch('/api/admin/promo', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(promo),
    })

    const payload = await response.json()

    if (!response.ok) {
      setMessage(payload.error || 'Failed to save promo settings.')
      setSaving(false)
      return
    }

    setPromo(payload.settings || promo)
    setMessage('Promo card settings saved successfully.')
    setSaving(false)
  }

  const items = [
    {
      title: 'Supabase connection',
      detail:
        status === 'connected'
          ? 'Connected and queryable from the admin panel.'
          : status === 'checking'
            ? 'Checking current connection status.'
            : 'Unable to read from Supabase right now.',
      icon: Database,
    },
    {
      title: 'Auth session',
      detail: 'Admin routes are protected with Supabase session checks and admin table validation.',
      icon: Shield,
    },
    {
      title: 'Public site sync',
      detail: 'Products, contacts, and promo settings are sourced from shared backend data.',
      icon: Link2,
    },
  ]

  return (
    <div className="space-y-5">
      <div className="grid gap-3 lg:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon

          return (
            <div key={item.title} className="rounded-[1.4rem] border border-white/10 bg-[linear-gradient(145deg,rgba(24,10,42,0.92),rgba(12,16,34,0.9))] p-4 shadow-[0_18px_45px_rgba(4,8,20,0.24)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-cyan-300 ring-1 ring-white/10">
                <Icon size={18} />
              </div>

              <h3 className="mt-4 text-base font-semibold text-white">{item.title}</h3>
              <p className="mt-1.5 text-sm text-slate-400">{item.detail}</p>

              {item.title === 'Supabase connection' && (
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-slate-300">
                  <CheckCircle2 size={14} className={status === 'connected' ? 'text-emerald-300' : 'text-slate-500'} />
                  {status}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <form onSubmit={savePromoSettings} className="rounded-[1.4rem] border border-white/10 bg-[linear-gradient(145deg,rgba(24,10,42,0.92),rgba(12,16,34,0.9))] p-4 shadow-[0_18px_45px_rgba(4,8,20,0.24)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Home Promo Card</h3>
            <p className="mt-1 text-sm text-slate-400">
              Edit or disable the launch promo card shown on the home page.
            </p>
          </div>

          <label className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white">
            <input
              type="checkbox"
              checked={promo.enabled}
              onChange={(e) => setPromo((current) => ({ ...current, enabled: e.target.checked }))}
              className="h-4 w-4 rounded border-white/20 bg-transparent"
            />
            Promo enabled
          </label>
        </div>

        {(message || promoWarning) && (
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300">
            {message || promoWarning}
          </div>
        )}

        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          <Field label="Promo title">
            <input
              value={promo.title}
              onChange={(e) => setPromo((current) => ({ ...current, title: e.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-[#0e1120]/85 px-4 py-3 text-white outline-none transition focus:border-purple-400"
            />
          </Field>

          <Field label="Button label">
            <input
              value={promo.ctaLabel}
              onChange={(e) => setPromo((current) => ({ ...current, ctaLabel: e.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-[#0e1120]/85 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </Field>

          <Field label="Card link" className="lg:col-span-2">
            <input
              value={promo.href}
              onChange={(e) => setPromo((current) => ({ ...current, href: e.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-[#0e1120]/85 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </Field>

          <Field label="Promo description" className="lg:col-span-2">
            <textarea
              rows={4}
              value={promo.description}
              onChange={(e) => setPromo((current) => ({ ...current, description: e.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-[#0e1120]/85 px-4 py-3 text-white outline-none transition focus:border-purple-400"
            />
          </Field>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="submit"
            disabled={saving || !promoStorageReady}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 px-5 py-2.5 font-medium text-white transition hover:scale-[1.01] disabled:opacity-60 sm:w-auto"
          >
            <Save size={16} />
            {saving ? 'Saving...' : promoStorageReady ? 'Save promo settings' : 'Migration required'}
          </button>
        </div>
      </form>
    </div>
  )
}

function Field({
  label,
  children,
  className = '',
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <label className={`block ${className}`.trim()}>
      <span className="mb-2 block text-sm text-slate-300">{label}</span>
      {children}
    </label>
  )
}
