'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: null as File | null,
  })

  const loadProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    setProducts(data || [])
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const uploadImage = async (file: File) => {
    const ext = file.name.split('.').pop()
    const fileName = `${Date.now()}.${ext}`

    const { error } = await supabase.storage
      .from('products')
      .upload(fileName, file)

    if (error) throw error

    const { data } = supabase.storage
      .from('products')
      .getPublicUrl(fileName)

    return data.publicUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let image_url = ''

      if (form.image) {
        image_url = await uploadImage(form.image)
      }

      await supabase.from('products').insert([{
        name: form.name,
        description: form.description,
        price: Number(form.price),
        image_url,
      }])

      setForm({ name: '', description: '', price: '', image: null })
      loadProducts()
    } catch (err) {
      alert('Upload failed')
    }

    setLoading(false)
  }

  const deleteProduct = async (id: string) => {
    if (!confirm('Delete this product?')) return

    await supabase.from('products').delete().eq('id', id)
    loadProducts()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Product Management</h1>

      {/* ADD PRODUCT FORM */}
      <form onSubmit={handleSubmit} className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 mb-10 grid md:grid-cols-2 gap-4">
        <input
          placeholder="Product Name"
          className="p-3 rounded bg-zinc-800"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          placeholder="Price"
          type="number"
          className="p-3 rounded bg-zinc-800"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        <textarea
          placeholder="Description"
          className="p-3 rounded bg-zinc-800 col-span-2"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, image: e.target.files?.[0] || null })}
          className="col-span-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-white text-black py-3 rounded font-semibold col-span-2 hover:opacity-90"
        >
          {loading ? 'Uploading...' : 'Add Product'}
        </button>
      </form>

      {/* PRODUCT LIST */}
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
            {p.image_url && (
              <img src={p.image_url} alt={p.name} className="h-48 w-full object-cover" />
            )}

            <div className="p-4">
              <h2 className="text-lg font-bold">{p.name}</h2>
              <p className="text-zinc-400 text-sm mt-1">{p.description}</p>

              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold">₹{p.price}</span>
                <button
                  onClick={() => deleteProduct(p.id)}
                  className="bg-red-600 px-4 py-1 rounded text-sm hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}