export default function Loading() {
  return (
    <main
      className="relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-300"
      style={{ background: 'var(--bg-layered)', color: 'var(--text-primary)' }}
    >

      <div
        className="pointer-events-none absolute h-[540px] w-[min(100vw,760px)] opacity-20"
        style={{ background: 'radial-gradient(ellipse at center, var(--metallic-highlight), transparent 70%)' }}
      />

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
