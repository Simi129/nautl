'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Github, Mail, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isSignUp) {
        // Регистрация
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });

        if (error) throw error;

        if (data.user) {
          setMessage('Check your email to confirm your account!');
          setTimeout(() => {
            router.push('/dashboard');
            router.refresh();
          }, 2000);
        }
      } else {
        // Вход
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        router.push('/dashboard');
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubAuth = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 justify-center mb-12">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
          </div>
          <span className="text-base font-medium tracking-tight text-white">NEXUS</span>
        </Link>

        {/* Auth Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
          <h2 className="text-2xl font-medium text-white mb-2 text-center">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="text-sm text-neutral-500 mb-8 text-center">
            {isSignUp ? 'Get started with Nexus today' : 'Sign in to your account'}
          </p>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
              {error}
            </div>
          )}
          {message && (
            <div className="mb-6 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 text-sm">
              {message}
            </div>
          )}

          {/* Social Login */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handleGitHubAuth}
              disabled={loading}
              className="w-full h-11 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center gap-3 text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Github size={18} />}
              Continue with GitHub
            </button>
            <button
              onClick={handleGoogleAuth}
              disabled={loading}
              className="w-full h-11 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center gap-3 text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Mail size={18} />}
              Continue with Google
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-neutral-900 px-2 text-neutral-500">Or continue with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {isSignUp && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required={isSignUp}
                  className="w-full h-11 bg-black border border-neutral-800 rounded-lg px-4 text-sm text-white focus:outline-none focus:border-neutral-600 transition-colors"
                  placeholder="John Doe"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-11 bg-black border border-neutral-800 rounded-lg px-4 text-sm text-white focus:outline-none focus:border-neutral-600 transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full h-11 bg-black border border-neutral-800 rounded-lg px-4 text-sm text-white focus:outline-none focus:border-neutral-600 transition-colors"
                placeholder="••••••••"
              />
            </div>

            {!isSignUp && (
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-neutral-400 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-neutral-700 bg-black" />
                  Remember me
                </label>
                <button
                  type="button"
                  onClick={async () => {
                    if (!email) {
                      setError('Please enter your email first');
                      return;
                    }
                    setLoading(true);
                    const { error } = await supabase.auth.resetPasswordForEmail(email, {
                      redirectTo: `${window.location.origin}/auth/reset-password`,
                    });
                    if (error) {
                      setError(error.message);
                    } else {
                      setMessage('Check your email for password reset link');
                    }
                    setLoading(false);
                  }}
                  className="text-white hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          {/* Toggle */}
          <p className="text-sm text-neutral-500 text-center mt-6">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
                setMessage(null);
              }}
              className="text-white hover:underline font-medium"
              disabled={loading}
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>

        {/* Terms */}
        <p className="text-xs text-neutral-600 text-center mt-8">
          By continuing, you agree to our{' '}
          <a href="#" className="text-neutral-400 hover:text-white">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-neutral-400 hover:text-white">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}