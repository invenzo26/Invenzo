export default function Loading() {
  return (
    <main className="
      min-h-screen
      flex flex-col
      items-center
      justify-center
      bg-gradient-to-br
      from-black via-purple-950 to-black
      text-white
    ">

      <div className="flex flex-col items-center gap-6">

        <div className="
          w-14 h-14
          border-4
          border-purple-500/30
          border-t-cyan-400
          rounded-full
          animate-spin
        " />

        <p className="text-lg text-slate-300">
          Loading Products...
        </p>

      </div>

    </main>
  )
}