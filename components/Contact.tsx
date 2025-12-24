'use client';

import { ArrowRight, Github, Twitter, Linkedin } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-medium text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 tracking-tight mb-4">
          Ready to get started?
        </h2>
        <p className="text-neutral-500 mb-10">
          Join thousands of teams already using Nexus to build better products.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="/auth"
            className="h-12 px-8 rounded-full bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-all flex items-center gap-2"
          >
            Start Free Trial
            <ArrowRight size={16} />
          </a>
          <button className="h-12 px-8 rounded-full bg-transparent text-white text-sm font-medium border border-white/20 hover:bg-white/10 transition-all">
            Schedule Demo
          </button>
        </div>

        {/* Footer */}
        <div className="pt-16 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-black rounded-full"></div>
              </div>
              <span className="text-sm font-medium tracking-tight text-white">NEXUS</span>
            </div>
            
            <div className="flex items-center gap-6 text-xs text-neutral-500">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Docs</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>

            <div className="flex items-center gap-4">
              <a href="#" className="text-neutral-500 hover:text-white transition-colors">
                <Github size={18} />
              </a>
              <a href="#" className="text-neutral-500 hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-neutral-500 hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          <p className="text-xs text-neutral-600 mt-8">
            © 2024 Nexus. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}