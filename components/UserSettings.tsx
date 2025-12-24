'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { Loader2, Save } from 'lucide-react';

interface UserSettingsProps {
  user: User;
}

export default function UserSettings({ user }: UserSettingsProps) {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const supabase = createClient();

  useEffect(() => {
    // Загружаем данные из user_metadata
    setFullName(user.user_metadata?.full_name || '');
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Обновляем user_metadata
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
        },
      });

      if (error) throw error;

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      
      // Перезагрузка страницы через 1 секунду чтобы обновить данные
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'An error occurred' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-medium text-white mb-6">Profile Settings</h2>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-500/10 border border-green-500/20 text-green-500'
              : 'bg-red-500/10 border border-red-500/20 text-red-500'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user.email || ''}
            disabled
            className="w-full h-11 bg-neutral-800 border border-neutral-700 rounded-lg px-4 text-sm text-neutral-500 cursor-not-allowed"
          />
          <p className="mt-1 text-xs text-neutral-500">Email cannot be changed</p>
        </div>

        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-neutral-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full h-11 bg-black border border-neutral-800 rounded-lg px-4 text-sm text-white focus:outline-none focus:border-neutral-600 transition-colors"
            placeholder="John Doe"
          />
          <p className="mt-1 text-xs text-neutral-500">
            This name will be displayed in your dashboard
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 rounded-lg bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={16} />
              Save Changes
            </>
          )}
        </button>
      </form>

      <div className="mt-8 p-4 bg-neutral-900 border border-neutral-800 rounded-lg">
        <h3 className="text-sm font-medium text-white mb-2">Account Information</h3>
        <div className="space-y-2 text-sm text-neutral-400">
          <div>
            <span className="text-neutral-500">Provider:</span>{' '}
            {user.app_metadata?.provider || 'email'}
          </div>
          <div>
            <span className="text-neutral-500">Account created:</span>{' '}
            {new Date(user.created_at).toLocaleDateString()}
          </div>
          {user.last_sign_in_at && (
            <div>
              <span className="text-neutral-500">Last sign in:</span>{' '}
              {new Date(user.last_sign_in_at).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}