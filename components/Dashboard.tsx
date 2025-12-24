'use client';

import { useState } from 'react';
import { LayoutDashboard, MessageCircle, Settings } from 'lucide-react';
import Link from 'next/link';
import PortfolioTab from './dashboard/PortfolioTab';
import ChatTab from './dashboard/ChatTab';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'chat'>('portfolio');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-16 bg-neutral-900 border-r border-neutral-800 flex flex-col items-center py-4 gap-6 z-50">
        <Link href="/" className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <div className="w-3 h-3 bg-black rounded-full"></div>
        </Link>
        
        <div className="flex-1 flex flex-col gap-4">
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              activeTab === 'portfolio' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-white'
            }`}
          >
            <LayoutDashboard size={20} />
          </button>
          
          <button
            onClick={() => setActiveTab('chat')}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              activeTab === 'chat' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-white'
            }`}
          >
            <MessageCircle size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <button className="w-10 h-10 rounded-lg flex items-center justify-center text-neutral-500 hover:text-white transition-colors">
            <Settings size={20} />
          </button>
          
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
            alt="User"
            className="w-8 h-8 rounded-full object-cover cursor-pointer"
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-16 flex-1">
        {activeTab === 'portfolio' && <PortfolioTab />}
        {activeTab === 'chat' && <ChatTab />}
      </main>
    </div>
  );
}