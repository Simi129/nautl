'use client';

import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <main className="pt-32 pb-16 px-6 max-w-7xl mx-auto text-center border-b border-white/10">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-wider font-medium text-neutral-400 mb-8 animate-fade-in">
        <span>v2.0 is live</span>
        <span className="w-1 h-1 rounded-full bg-neutral-600"></span>
        <span className="text-white">Read the docs →</span>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-medium text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 tracking-tight mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        Orchestrate your <br /> creative workflow.
      </h1>
      
      <p className="text-lg text-neutral-500 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
        Nexus provides the backbone for high-performance teams. Manage projects, collaborate in real-time, and ship faster with our unified workspace.
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-20 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <Link href="/auth" className="h-10 px-6 rounded-full bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-all flex items-center gap-2">
          Get Started
          <ArrowRight size={16} />
        </Link>
        <button className="h-10 px-6 rounded-full bg-transparent text-white text-sm font-medium border border-white/20 hover:bg-white/10 transition-all flex items-center gap-2">
          <Play size={14} />
          Watch Demo
        </button>
      </div>

      {/* Hero Image */}
      <div className="relative w-full max-w-5xl mx-auto rounded-xl border border-white/10 overflow-hidden shadow-2xl shadow-white/5 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <img 
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&auto=format" 
          alt="Dashboard preview"
          className="w-full h-auto"
        />
      </div>
    </main>
  );
}