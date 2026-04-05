'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  ExternalLink,
  Link2,
  Pencil,
  Plus,
  Save,
  Search,
  Sparkles,
  Tag,
  Trash2,
  X,
} from 'lucide-react'

type Product = {
  id: string
  name: string
  slug: string | null
  tagline: string | null
  description: string | null
  live_url: string | null
  features: string[] | null
}

type ProductFormState = {
  name: string
  slug: string
  tagline: string
  description: string
  live_url: string
  featuresText: string
}

const emptyForm: ProductFormState = {
  name: '',
  slug: '',
  tagline: '',
  description: '',
  live_url: '',
  featuresText: '',
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [editingProductId, setEditingProductId] = useState<string | null>(null)
  const [form, setForm] = useState<ProductFormState>(emptyForm)
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    const response = await fetch('/api/admin/products', {
      credentials: 'include',
      cache: 'no-store',
    })
    const payload = await response.json()

    if (response.ok) {
      setProducts((payload.products as Product[]) || [])
    } else {
      setError(payload.error || 'Failed to load products.')
    }

    setLoading(false)
  }

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase()

    if (!term) {
      return products
    }

    return products.filter((product) =>
      [product.name, product.slug, product.tagline, product.description]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term))
    )
  }, [products, search])

  function slugify(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  function beginCreate() {
    setEditingProductId(null)
    setForm(emptyForm)
    setError(null)
    setSuccess(null)
    setIsFormOpen(true)
  }

  function beginEdit(product: Product) {
    setEditingProductId(product.id)
    setForm({
      name: product.name || '',
      slug: product.slug || '',
      tagline: product.tagline || '',
      description: product.description || '',
      live_url: product.live_url || '',
      featuresText: (product.features || []).join('\n'),
    })
    setError(null)
    setSuccess(null)
    setIsFormOpen(true)
  }

  function updateForm<K extends keyof ProductFormState>(key: K, value: ProductFormState[K]) {
    setForm((current) => ({
      ...current,
      [key]: value,
      ...(key === 'name' && !editingProductId && !current.slug
        ? { slug: slugify(String(value)) }
        : {}),
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(null)

    const payload = {
      name: form.name.trim(),
      slug: (form.slug.trim() || slugify(form.name)).trim(),
      tagline: form.tagline.trim() || null,
      description: form.description.trim() || null,
      live_url: form.live_url.trim() || null,
      features: form.featuresText
        .split('\n')
        .map((entry) => entry.trim())
        .filter(Boolean),
    }

    const response = await fetch(
      editingProductId ? `/api/admin/products/${editingProductId}` : '/api/admin/products',
      {
        method: editingProductId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      }
    )

    const result = await response.json()

    if (!response.ok) {
      setError(result.error || 'Failed to save product.')
      setSaving(false)
      return
    }

    setSuccess(editingProductId ? 'Product updated successfully.' : 'Product created successfully.')
    setSaving(false)
    setEditingProductId(null)
    setForm(emptyForm)
    setIsFormOpen(false)
    await fetchProducts()
  }

  async function handleDelete(productId: string) {
    const confirmed = window.confirm('Delete this product from the admin catalog?')

    if (!confirmed) {
      return
    }

    setDeletingId(productId)
    setError(null)
    setSuccess(null)

    const response = await fetch(`/api/admin/products/${productId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    const result = await response.json()

    if (!response.ok) {
      setError(result.error || 'Failed to delete product.')
      setDeletingId(null)
      return
    }

    setSuccess('Product deleted successfully.')
    setDeletingId(null)
    if (editingProductId === productId) {
      beginCreate()
    }
    await fetchProducts()
  }

  return (
    <div className="space-y-5">
      <section className="grid gap-3 xl:grid-cols-[1.15fr,0.85fr]">
        <div className="rounded-[1.4rem] border border-white/10 bg-gradient-to-br from-purple-500/15 to-cyan-500/10 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-300">Catalog entries</p>
              <p className="mt-2 text-2xl font-semibold text-white">{products.length}</p>
              <p className="mt-1.5 text-sm text-slate-400">Products synced from Supabase and ready for editing.</p>
            </div>

            <button
              type="button"
              onClick={beginCreate}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/15"
            >
              <Plus size={16} />
              New Product
            </button>
          </div>
        </div>

        <div className="rounded-[1.4rem] border border-white/10 bg-[linear-gradient(145deg,rgba(26,12,46,0.8),rgba(10,18,34,0.72))] p-4">
          <div className="flex items-center gap-3 rounded-2xl border border-purple-300/10 bg-[#0e1120]/80 px-4 py-2.5">
            <Search size={18} className="text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, slug, tagline, or description"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>
        </div>
      </section>

      {(error || success) && (
        <div className={`rounded-2xl border px-4 py-3 text-sm ${error ? 'border-red-500/20 bg-red-500/10 text-red-200' : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-200'}`}>
          {error || success}
        </div>
      )}

      <section>
        <div className="space-y-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="animate-pulse rounded-[1.4rem] border border-white/10 bg-[linear-gradient(145deg,rgba(24,10,42,0.92),rgba(12,16,34,0.9))] p-4">
                <div className="h-6 w-2/3 rounded bg-white/10" />
                <div className="mt-3 h-4 w-1/3 rounded bg-white/10" />
                <div className="mt-5 h-4 w-full rounded bg-white/10" />
                <div className="mt-2 h-4 w-5/6 rounded bg-white/10" />
              </div>
            ))
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-14 text-center text-slate-400">
              No products matched your current search.
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className="rounded-[1.4rem] border border-white/10 bg-[linear-gradient(145deg,rgba(24,10,42,0.92),rgba(12,16,34,0.9))] p-4 shadow-[0_18px_45px_rgba(4,8,20,0.24)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1">
                        <Tag size={12} />
                        {product.slug || 'no-slug'}
                      </span>
                        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1">
                        <Sparkles size={12} />
                        {(product.features || []).length} features
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => beginEdit(product)}
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-slate-200 transition hover:bg-white/[0.1]"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(product.id)}
                      disabled={deletingId === product.id}
                      className="inline-flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-200 transition hover:bg-red-500/15 disabled:opacity-60"
                    >
                      <Trash2 size={14} />
                      {deletingId === product.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>

                <p className="mt-4 text-sm font-medium text-purple-300">{product.tagline || 'No tagline added yet.'}</p>
                <p className="mt-2 text-sm text-slate-400 line-clamp-3">
                  {product.description || 'No description available for this product yet.'}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {(product.features || []).slice(0, 4).map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-slate-300"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="mt-4">
                  {product.live_url ? (
                    <a
                      href={product.live_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200"
                    >
                      <ExternalLink size={14} />
                      Open live URL
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-sm text-slate-500">
                      <Link2 size={14} />
                      No live URL added
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {isFormOpen && (
        <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-8 backdrop-blur-sm">
          <div className="w-full max-w-3xl rounded-[1.6rem] border border-white/10 bg-[linear-gradient(145deg,rgba(30,10,50,0.96),rgba(15,12,38,0.97)_58%,rgba(7,21,36,0.97))] p-5 shadow-2xl shadow-black/50 backdrop-blur-2xl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {editingProductId ? 'Edit Product' : 'Create Product'}
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  Manage the same product fields shown on the public product pages.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsFormOpen(false)
                  setEditingProductId(null)
                  setForm(emptyForm)
                }}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-slate-200 transition hover:bg-white/[0.1]"
              >
                <X size={14} />
                Close
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
              <Field label="Product name">
                <input
                  value={form.name}
                  onChange={(e) => updateForm('name', e.target.value)}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-[#0e1120]/85 px-4 py-2.5 text-white outline-none transition focus:border-purple-400"
                  placeholder="Enter product name"
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Slug">
                  <input
                    value={form.slug}
                    onChange={(e) => updateForm('slug', slugify(e.target.value))}
                    required
                    className="w-full rounded-2xl border border-white/10 bg-[#0e1120]/85 px-4 py-2.5 text-white outline-none transition focus:border-purple-400"
                    placeholder="enter-product-slug"
                  />
                </Field>

                <Field label="Live URL">
                  <input
                    value={form.live_url}
                    onChange={(e) => updateForm('live_url', e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-[#0e1120]/85 px-4 py-2.5 text-white outline-none transition focus:border-cyan-400"
                    placeholder="https://your-product-link.com"
                  />
                </Field>
              </div>

              <Field label="Tagline">
                <input
                  value={form.tagline}
                  onChange={(e) => updateForm('tagline', e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#0e1120]/85 px-4 py-2.5 text-white outline-none transition focus:border-purple-400"
                  placeholder="Enter a short product tagline"
                />
              </Field>

              <Field label="Description">
                <textarea
                  value={form.description}
                  onChange={(e) => updateForm('description', e.target.value)}
                  rows={5}
                  className="w-full rounded-2xl border border-white/10 bg-[#0e1120]/85 px-4 py-2.5 text-white outline-none transition focus:border-purple-400"
                  placeholder="Write a clear overview for this product."
                />
              </Field>

              <Field label="Features">
                <textarea
                  value={form.featuresText}
                  onChange={(e) => updateForm('featuresText', e.target.value)}
                  rows={5}
                  className="w-full rounded-2xl border border-white/10 bg-[#0e1120]/85 px-4 py-2.5 text-white outline-none transition focus:border-cyan-400"
                  placeholder={'Add one feature per line\nFeature one\nFeature two'}
                />
              </Field>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 px-5 py-2.5 font-medium text-white transition hover:scale-[1.01] disabled:opacity-60"
              >
                <Save size={16} />
                {saving ? 'Saving...' : editingProductId ? 'Update Product' : 'Create Product'}
              </button>
            </form>
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
