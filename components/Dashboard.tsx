'use client';

import { useState, useEffect } from 'react';
import { LayoutDashboard, MessageCircle, Settings, LogOut, Loader2, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import PortfolioTab from './dashboard/PortfolioTab';
import ChatTab from './dashboard/ChatTab';
import UserSettings from './UserSettings';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'chat'>('portfolio');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    // Подписка на изменения авторизации
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  // Получаем имя пользователя или email
  const getUserDisplayName = () => {
    if (!user) return '';
    return user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
  };

  // Получаем аватар пользователя
  const getUserAvatar = () => {
    if (!user) return 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100';
    return user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(getUserDisplayName())}&background=fff&color=000`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }

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
            title="Portfolio"
          >
            <LayoutDashboard size={20} />
          </button>
          
          <button
            onClick={() => setActiveTab('chat')}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              activeTab === 'chat' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-white'
            }`}
            title="Chat"
          >
            <MessageCircle size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <button 
            onClick={() => setShowSettings(true)}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-neutral-500 hover:text-white transition-colors"
            title="Settings"
          >
            <Settings size={20} />
          </button>
          
          <button
            onClick={handleSignOut}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-neutral-500 hover:text-red-500 transition-colors"
            title="Sign Out"
          >
            <LogOut size={20} />
          </button>
          
          <div className="relative group">
            <img
              src={getUserAvatar()}
              alt={getUserDisplayName()}
              className="w-8 h-8 rounded-full object-cover cursor-pointer"
              onClick={() => setShowSettings(true)}
            />
            {/* Tooltip with user info */}
            <div className="absolute left-full ml-2 bottom-0 bg-neutral-800 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="font-medium">{getUserDisplayName()}</div>
              <div className="text-neutral-400">{user?.email}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-16 flex-1">
        {/* Top Bar with User Info */}
        <div className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="px-6 h-14 flex items-center justify-between">
            <h1 className="text-sm font-medium text-white">
              {activeTab === 'portfolio' ? 'Portfolio' : 'Chat'}
            </h1>
            
            <div 
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setShowSettings(true)}
            >
              <div className="text-right">
                <div className="text-sm font-medium text-white">{getUserDisplayName()}</div>
                <div className="text-xs text-neutral-500">{user?.email}</div>
              </div>
              <img
                src={getUserAvatar()}
                alt={getUserDisplayName()}
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'portfolio' && <PortfolioTab />}
        {activeTab === 'chat' && <ChatTab />}
      </main>

      {/* Settings Modal */}
      {showSettings && user && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowSettings(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-neutral-500 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <X size={20} />
            </button>
            
            <UserSettings user={user} />
          </div>
        </div>
      )}
    </div>
  );
}