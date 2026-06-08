export default function Loading() {
  return (
    <main
      className="relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-300"
      style={{ background: 'var(--bg-layered)', color: 'var(--text-primary)' }}
    >

      <div className="absolute h-[700px] w-[700px] rounded-full blur-[160px] opacity-20" style={{ background: 'var(--metallic-highlight)' }} />

      <div className="relative z-10 flex flex-col items-center gap-6">

        <div
          className="w-16 h-16 border-4 rounded-full animate-spin"
          style={{
            borderColor: 'var(--border-color)',
            borderTopColor: 'var(--gold-primary)',
          }}
        />

        <h2 className="text-xl font-semibold" style={{ color: 'var(--gold-primary)' }}>
          Loading...
        </h2>

      </div>

    </main>
  )
}
