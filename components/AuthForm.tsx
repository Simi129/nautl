'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Github, Mail } from 'lucide-react';

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // В реальном приложении здесь была бы логика аутентификации
    router.push('/dashboard');
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

          {/* Social Login */}
          <div className="space-y-3 mb-6">
            <button className="w-full h-11 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center gap-3 text-sm font-medium text-white">
              <Github size={18} />
              Continue with GitHub
            </button>
            <button className="w-full h-11 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center gap-3 text-sm font-medium text-white">
              <Mail size={18} />
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
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
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
                <a href="#" className="text-white hover:underline">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full h-11 rounded-lg bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          {/* Toggle */}
          <p className="text-sm text-neutral-500 text-center mt-6">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-white hover:underline font-medium"
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