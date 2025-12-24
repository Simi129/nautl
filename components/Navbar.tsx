import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-black rounded-full"></div>
          </div>
          <span className="text-sm font-medium tracking-tight text-white">NEXUS</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-xs font-medium text-neutral-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/auth" className="text-xs font-medium text-neutral-400 hover:text-white transition-colors">
            Log in
          </Link>
          <Link href="/auth" className="text-xs font-medium bg-white text-black px-3 py-1.5 rounded-full hover:bg-neutral-200 transition-colors">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}