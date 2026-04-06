'use client'

import { useEffect, useMemo, useState } from 'react'
import { Mail, Reply, Search, Send, Trash2, X } from 'lucide-react'
import { ADMIN_REPLY_EMAIL } from '@/lib/adminReplyEmail'

type Contact = {
  id: string
  name: string
  email: string
  subject: string | null
  message: string | null
  created_at: string
  replied_at?: string | null
  reply_subject?: string | null
}

type DeleteTarget = {
  id: string
  name: string
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'inbox' | 'replied'>('inbox')
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [isReplyOpen, setIsReplyOpen] = useState(false)
  const [replySubject, setReplySubject] = useState('')
  const [replyBody, setReplyBody] = useState('')
  const [replyContactNumber, setReplyContactNumber] = useState('')
  const [replyMessage, setReplyMessage] = useState<string | null>(null)
  const [sendingReply, setSendingReply] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null)

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

  const filteredContacts = useMemo(() => {
    const term = query.trim().toLowerCase()

    const sourceContacts = contacts.filter((contact) =>
      activeTab === 'inbox' ? !contact.replied_at : !!contact.replied_at
    )

    if (!term) {
      return sourceContacts
    }

    return sourceContacts.filter((contact) =>
      [contact.name, contact.email, contact.subject, contact.message]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term))
    )
  }, [activeTab, contacts, query])

  const inboxCount = contacts.filter((contact) => !contact.replied_at).length
  const repliedCount = contacts.filter((contact) => !!contact.replied_at).length

  const selectedContact =
    filteredContacts.find((contact) => contact.id === selectedContactId) ??
    filteredContacts[0] ??
    null

  useEffect(() => {
    if (selectedContactId && !filteredContacts.some((contact) => contact.id === selectedContactId)) {
      setSelectedContactId(filteredContacts[0]?.id ?? null)
    }
  }, [filteredContacts, selectedContactId])

  function openReplyCard(contact: Contact) {
    setSelectedContactId(contact.id)
    setReplySubject(contact.subject ? `Re: ${contact.subject}` : `Re: ${contact.name}`)
    setReplyBody('')
    setReplyContactNumber('')
    setReplyMessage(null)
    setIsReplyOpen(true)
  }

  async function handleDelete(contactId: string) {
    setDeleting(true)
    const response = await fetch(`/api/admin/contacts/${contactId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    const payload = await response.json()

    if (!response.ok) {
      setError(payload.error || 'Failed to delete contact.')
      setDeleting(false)
      return
    }

    setContacts((current) => current.filter((contact) => contact.id !== contactId))
    setDeleting(false)
    setDeleteTarget(null)
  }

  return (
    <div className="space-y-5">
      <section className="grid gap-3 lg:grid-cols-[0.8fr,1.2fr]">
        <div className="rounded-[1.4rem] border border-white/10 bg-gradient-to-br from-cyan-500/15 to-purple-500/10 p-4">
          <p className="text-sm text-slate-300">Messages received</p>
          <p className="mt-2 text-2xl font-semibold text-white">{inboxCount}</p>
          <p className="mt-1.5 text-sm text-slate-400">Inbox messages that still need review or a reply.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('inbox')}
              className={`rounded-2xl px-3 py-2 text-sm font-medium transition ${
                activeTab === 'inbox'
                  ? 'bg-white text-slate-950'
                  : 'border border-white/10 bg-white/[0.05] text-slate-200 hover:bg-white/[0.1]'
              }`}
            >
              Inbox ({inboxCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('replied')}
              className={`rounded-2xl px-3 py-2 text-sm font-medium transition ${
                activeTab === 'replied'
                  ? 'bg-white text-slate-950'
                  : 'border border-white/10 bg-white/[0.05] text-slate-200 hover:bg-white/[0.1]'
              }`}
            >
              Replied ({repliedCount})
            </button>
          </div>
        </div>

        <div className="rounded-[1.4rem] border border-white/10 bg-[linear-gradient(145deg,rgba(26,12,46,0.8),rgba(10,18,34,0.72))] p-4">
          <div className="flex items-center gap-3 rounded-2xl border border-purple-300/10 bg-[#0e1120]/80 px-4 py-2.5">
            <Search size={18} className="text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${activeTab === 'inbox' ? 'inbox' : 'replied'} messages`}
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-3">
          {error && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}
          {filteredContacts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-14 text-center text-slate-400">
              {activeTab === 'inbox'
                ? 'No inbox messages matched your search.'
                : 'No replied messages matched your search.'}
            </div>
          ) : (
            filteredContacts.map((contact) => (
              <article
                key={contact.id}
                className={`w-full rounded-[1.4rem] border p-4 text-left transition ${
                  selectedContact?.id === contact.id
                    ? 'border-cyan-400/30 bg-[linear-gradient(145deg,rgba(34,211,238,0.14),rgba(83,28,129,0.16))]'
                    : 'border-white/10 bg-[linear-gradient(145deg,rgba(24,10,42,0.92),rgba(12,16,34,0.9))] hover:bg-[linear-gradient(145deg,rgba(29,12,50,0.95),rgba(16,20,38,0.92))]'
                }`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-cyan-300 ring-1 ring-white/10">
                      <Mail size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="font-medium text-white">{contact.name}</p>
                      <p className="mt-1 break-all text-sm text-slate-400">{contact.email}</p>
                      <p className="mt-2 text-sm font-medium text-purple-300">
                        {contact.subject || 'No subject provided'}
                      </p>
                      {contact.replied_at && (
                        <p className="mt-2 text-xs text-cyan-300">
                          Replied on {new Date(contact.replied_at).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-3 sm:items-end">
                    <div className="flex flex-wrap gap-3 sm:justify-end">
                      <button
                        type="button"
                        onClick={() => openReplyCard(contact)}
                        className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-2.5 text-sm font-medium text-white transition hover:scale-[1.01]"
                      >
                        <Reply size={16} />
                        {contact.replied_at ? 'View reply' : 'Reply'}
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteTarget({ id: contact.id, name: contact.name })}
                        disabled={deleting}
                        className="inline-flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-200 transition hover:bg-red-500/15 disabled:opacity-60"
                      >
                        <Trash2 size={16} />
                        {deleting ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>

                    <div className="text-sm text-slate-500">
                      {new Date(contact.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-[1.4rem] border border-white/10 bg-[#0e1120]/80 p-4">
                  <p className="text-sm leading-7 text-slate-300">
                    {contact.message || 'No message body available.'}
                  </p>
                </div>
              </article>
            ))
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
                  Replies will always use the shared admin email.
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

            {replyMessage && (
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300">
                {replyMessage}
              </div>
            )}

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Field label="From email">
                <input
                  value={ADMIN_REPLY_EMAIL}
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
              <Field label="Contact number">
                <input
                  value={replyContactNumber}
                  onChange={(e) => setReplyContactNumber(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#0e1120]/85 px-4 py-2.5 text-white outline-none transition focus:border-cyan-400"
                  placeholder="Optional contact number to show in the email"
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
                disabled={!replyBody.trim() || sendingReply}
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
                      name: selectedContact.name,
                      to: selectedContact.email,
                      replyEmail: ADMIN_REPLY_EMAIL,
                      contactNumber: replyContactNumber.trim(),
                      subject: replySubject,
                      message: replyBody,
                    }),
                  })
                  const payload = await response.json()
                  if (!response.ok) {
                    setReplyMessage(payload.error || payload.message || 'Failed to send reply.')
                    setSendingReply(false)
                    return
                  }

                  setContacts((current) =>
                    current.map((contact) =>
                      contact.id === selectedContact.id
                        ? {
                            ...contact,
                            replied_at: payload.repliedAt || new Date().toISOString(),
                            reply_subject: payload.replySubject || replySubject,
                          }
                        : contact
                    )
                  )
                  setReplyMessage(payload.message || 'Reply action completed.')
                  setSendingReply(false)
                  setActiveTab('replied')
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

      {deleteTarget && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[1.6rem] border border-white/10 bg-[linear-gradient(145deg,rgba(30,10,50,0.96),rgba(15,12,38,0.97)_58%,rgba(7,21,36,0.97))] p-5 shadow-2xl shadow-black/50">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-white">Delete Message?</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  This will permanently remove the contact message from <span className="font-medium text-white">{deleteTarget.name}</span>.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-slate-200 transition hover:bg-white/[0.1]"
              >
                <X size={14} />
              </button>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/[0.1]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => handleDelete(deleteTarget.id)}
                disabled={deleting}
                className="inline-flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-200 transition hover:bg-red-500/15 disabled:opacity-60"
              >
                <Trash2 size={14} />
                {deleting ? 'Deleting...' : 'Delete'}
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
