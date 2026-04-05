'use client'

import { useEffect, useMemo, useState } from 'react'
import { Mail, Reply, Search, Send, Trash2, X } from 'lucide-react'

type Contact = {
  id: string
  name: string
  email: string
  subject: string | null
  message: string | null
  created_at: string
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [query, setQuery] = useState('')
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [isReplyOpen, setIsReplyOpen] = useState(false)
  const [replyEmail, setReplyEmail] = useState('')
  const [replySubject, setReplySubject] = useState('')
  const [replyBody, setReplyBody] = useState('')
  const [replyMessage, setReplyMessage] = useState<string | null>(null)
  const [sendingReply, setSendingReply] = useState(false)

  useEffect(() => {
    loadContacts()
  }, [])

  async function loadContacts() {
    const supabaseResponse = await fetch('/api/admin/contacts', {
      credentials: 'include',
      cache: 'no-store',
    }).catch(() => null)

    if (supabaseResponse && supabaseResponse.ok) {
      const payload = await supabaseResponse.json()
      setContacts((payload.contacts as Contact[]) || [])
      setError(null)
      return
    }

    setError('Failed to load contacts.')
  }

  useEffect(() => {
    const loadProfile = async () => {
      const response = await fetch('/api/admin/profile', {
        credentials: 'include',
        cache: 'no-store',
      })

      if (!response.ok) {
        return
      }

      const payload = await response.json()
      setReplyEmail(payload.profile?.replyEmail || '')
    }

    loadProfile()
  }, [])

  const filteredContacts = useMemo(() => {
    const term = query.trim().toLowerCase()

    if (!term) {
      return contacts
    }

    return contacts.filter((contact) =>
      [contact.name, contact.email, contact.subject, contact.message]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term))
    )
  }, [contacts, query])

  const selectedContact =
    filteredContacts.find((contact) => contact.id === selectedContactId) ??
    filteredContacts[0] ??
    null

  useEffect(() => {
    if (!selectedContactId && filteredContacts[0]?.id) {
      setSelectedContactId(filteredContacts[0].id)
    }

    if (selectedContactId && !filteredContacts.some((contact) => contact.id === selectedContactId)) {
      setSelectedContactId(filteredContacts[0]?.id ?? null)
    }
  }, [filteredContacts, selectedContactId])

  function openReplyCard(contact: Contact) {
    setSelectedContactId(contact.id)
    setReplySubject(contact.subject || `Re: ${contact.name}`)
    setReplyBody('')
    setReplyMessage(null)
    setIsReplyOpen(true)
  }

  return (
    <div className="space-y-5">
      <section className="grid gap-3 lg:grid-cols-[0.8fr,1.2fr]">
        <div className="rounded-[1.4rem] border border-white/10 bg-gradient-to-br from-cyan-500/15 to-purple-500/10 p-4">
          <p className="text-sm text-slate-300">Messages received</p>
          <p className="mt-2 text-2xl font-semibold text-white">{contacts.length}</p>
          <p className="mt-1.5 text-sm text-slate-400">All contact-form entries synced from the website.</p>
        </div>

        <div className="rounded-[1.4rem] border border-white/10 bg-[linear-gradient(145deg,rgba(26,12,46,0.8),rgba(10,18,34,0.72))] p-4">
          <div className="flex items-center gap-3 rounded-2xl border border-purple-300/10 bg-[#0e1120]/80 px-4 py-2.5">
            <Search size={18} className="text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, email, subject, or message"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.9fr,1.1fr]">
        <div className="space-y-3">
          {error && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}
          {filteredContacts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-14 text-center text-slate-400">
              No contact messages matched your search.
            </div>
          ) : (
            filteredContacts.map((contact) => (
              <button
                key={contact.id}
                type="button"
                onClick={() => setSelectedContactId(contact.id)}
                className={`w-full rounded-[1.4rem] border p-4 text-left transition ${
                  selectedContact?.id === contact.id
                    ? 'border-cyan-400/30 bg-[linear-gradient(145deg,rgba(34,211,238,0.14),rgba(83,28,129,0.16))]'
                    : 'border-white/10 bg-[linear-gradient(145deg,rgba(24,10,42,0.92),rgba(12,16,34,0.9))] hover:bg-[linear-gradient(145deg,rgba(29,12,50,0.95),rgba(16,20,38,0.92))]'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-medium text-white">{contact.name}</p>
                    <p className="mt-1 truncate text-sm text-slate-400">{contact.email}</p>
                    <p className="mt-3 truncate text-sm text-purple-300">
                      {contact.subject || 'No subject provided'}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-3">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        openReplyCard(contact)
                      }}
                      className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-3 py-2 text-xs font-medium text-cyan-200 transition hover:bg-cyan-500/15"
                    >
                      <Reply size={14} />
                      Reply
                    </button>

                    <span className="text-xs text-slate-500">
                      {new Date(contact.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>

        <div className="rounded-[1.4rem] border border-white/10 bg-[linear-gradient(145deg,rgba(24,10,42,0.92),rgba(12,16,34,0.9))] p-4 shadow-[0_18px_45px_rgba(4,8,20,0.24)]">
          {selectedContact ? (
            <>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-cyan-300 ring-1 ring-white/10">
                    <Mail size={18} />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">{selectedContact.name}</h3>
                    <p className="mt-1 text-sm text-slate-400">{selectedContact.email}</p>
                    <p className="mt-2 text-sm font-medium text-purple-300">
                      {selectedContact.subject || 'No subject provided'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-3 sm:items-end">
                  <div className="flex flex-wrap gap-3 sm:justify-end">
                    <button
                      type="button"
                      onClick={() => openReplyCard(selectedContact)}
                      className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-2.5 text-sm font-medium text-white transition hover:scale-[1.01]"
                    >
                      <Reply size={16} />
                      Reply
                    </button>

                    <button
                      type="button"
                      onClick={async () => {
                        const confirmed = window.confirm('Delete this contact message?')
                        if (!confirmed) return

                        setDeleting(true)
                        const response = await fetch(`/api/admin/contacts/${selectedContact.id}`, {
                          method: 'DELETE',
                          credentials: 'include',
                        })
                        const payload = await response.json()

                        if (!response.ok) {
                          setError(payload.error || 'Failed to delete contact.')
                          setDeleting(false)
                          return
                        }

                        setContacts((current) => current.filter((contact) => contact.id !== selectedContact.id))
                        setDeleting(false)
                      }}
                      disabled={deleting}
                      className="inline-flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-200 transition hover:bg-red-500/15 disabled:opacity-60"
                    >
                      <Trash2 size={16} />
                      {deleting ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>

                  <div className="text-sm text-slate-500">
                    {new Date(selectedContact.created_at).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-[1.4rem] border border-white/10 bg-[#0e1120]/80 p-4">
                <p className="text-sm leading-7 text-slate-300">
                  {selectedContact.message || 'No message body available.'}
                </p>
              </div>
            </>
          ) : (
            <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-14 text-center text-slate-400">
              Select a message to view the full contact details.
            </div>
          )}
        </div>
      </section>

      {isReplyOpen && selectedContact && (
        <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-8 backdrop-blur-sm">
          <div className="w-full max-w-3xl rounded-[1.6rem] border border-white/10 bg-[linear-gradient(145deg,rgba(30,10,50,0.96),rgba(15,12,38,0.97)_58%,rgba(7,21,36,0.97))] p-5 shadow-2xl shadow-black/50 backdrop-blur-2xl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-white">Reply to {selectedContact.name}</h3>
                <p className="mt-1 text-sm text-slate-400">
                  Replies will use the admin profile email configured in Settings.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsReplyOpen(false)}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-slate-200 transition hover:bg-white/[0.1]"
              >
                <X size={14} />
                Close
              </button>
            </div>

            {(replyMessage || !replyEmail) && (
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300">
                {replyMessage || 'Add a reply email in Settings before sending replies.'}
              </div>
            )}

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Field label="From email">
                <input
                  value={replyEmail}
                  readOnly
                  className="w-full rounded-2xl border border-white/10 bg-[#0e1120]/85 px-4 py-2.5 text-slate-300 outline-none"
                />
              </Field>

              <Field label="To email">
                <input
                  value={selectedContact.email}
                  readOnly
                  className="w-full rounded-2xl border border-white/10 bg-[#0e1120]/85 px-4 py-2.5 text-slate-300 outline-none"
                />
              </Field>
            </div>

            <div className="mt-4">
              <Field label="Subject">
                <input
                  value={replySubject}
                  onChange={(e) => setReplySubject(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#0e1120]/85 px-4 py-2.5 text-white outline-none transition focus:border-purple-400"
                />
              </Field>
            </div>

            <div className="mt-4">
              <Field label="Reply message">
                <textarea
                  rows={6}
                  value={replyBody}
                  onChange={(e) => setReplyBody(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#0e1120]/85 px-4 py-2.5 text-white outline-none transition focus:border-cyan-400"
                  placeholder="Write your reply here..."
                />
              </Field>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                disabled={!replyEmail || !replyBody.trim() || sendingReply}
                onClick={async () => {
                  setSendingReply(true)
                  setReplyMessage(null)

                  const response = await fetch('/api/admin/contacts/reply', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                      contactId: selectedContact.id,
                      to: selectedContact.email,
                      replyEmail,
                      subject: replySubject,
                      message: replyBody,
                    }),
                  })
                  const payload = await response.json()
                  setReplyMessage(payload.message || payload.error || 'Reply action completed.')
                  setSendingReply(false)
                }}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 px-5 py-2.5 font-medium text-white transition hover:scale-[1.01] disabled:opacity-60"
              >
                <Send size={16} />
                {sendingReply ? 'Sending...' : 'Send reply'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-slate-300">{label}</span>
      {children}
    </label>
  )
}
