'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function AdminContacts() {
  const [contacts, setContacts] = useState<any[]>([])

  useEffect(() => {
    const loadContacts = async () => {
      const { data } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false })

      setContacts(data || [])
    }

    loadContacts()
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Contact Submissions</h1>

      <div className="overflow-x-auto rounded-xl border border-zinc-800">
        <table className="w-full">
          <thead className="bg-zinc-950">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Subject</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {contacts.map((c) => (
              <tr key={c.id} className="border-t border-zinc-800 hover:bg-zinc-800">
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.email}</td>
                <td className="p-3">{c.subject}</td>
                <td className="p-3">{new Date(c.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}