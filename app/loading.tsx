export default function Loading() {
  return (
    <main className="
      relative min-h-screen
      flex items-center justify-center
      bg-gradient-to-br
      from-black via-purple-950 to-black
      text-white
      overflow-hidden
    ">

      {/* Background Glow */}
      <div className="
        absolute
        w-[700px] h-[700px]
        bg-purple-600/20
        blur-[160px]
        rounded-full
      " />

      <div className="relative z-10 flex flex-col items-center gap-6">

        {/* Spinner */}
        <div className="
          w-16 h-16
          border-4
          border-purple-500/30
          border-t-cyan-400
          rounded-full
          animate-spin
          animate-spin
        " />

        {/* Text */}
        <h2 className="
          text-xl font-semibold
          bg-gradient-to-r
          from-purple-400
          via-pink-400
          to-cyan-400
          bg-clip-text
          text-transparent
        ">
          Loading...
        </h2>

      </div>

    </main>
  )
}