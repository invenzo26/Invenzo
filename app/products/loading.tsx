export default function Loading() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center transition-colors duration-300"
      style={{ background: 'var(--bg-layered)', color: 'var(--text-primary)' }}
    >

      <div className="flex flex-col items-center gap-6">

        <div
          className="w-14 h-14 border-4 rounded-full animate-spin"
          style={{
            borderColor: 'var(--border-color)',
            borderTopColor: 'var(--gold-primary)',
          }}
        />

        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Loading Products...
        </p>

      </div>

    </main>
  )
}
