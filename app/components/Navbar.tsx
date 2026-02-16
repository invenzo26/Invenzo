import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Left Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Invenzo Logo"
            width={40}
            height={40}
            priority
          />
          <span className="text-xl font-bold text-white">Invenzo</span>
        </div>

        {/* Right Menu */}
        <div className="flex items-center gap-8 text-slate-300">
          <a href="/" className="hover:text-white">Home</a>
          <a href="/products" className="hover:text-white">Products</a>
          <a href="/contact" className="hover:text-white">Contact</a>
        </div>

      </div>
    </nav>
  )
}