import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const token_hash = requestUrl.searchParams.get('token_hash')
  const type = requestUrl.searchParams.get('type')
  const next = requestUrl.searchParams.get('next') ?? '/dashboard'
  const origin = requestUrl.origin

  // Обработка email verification
  if (token_hash && type) {
    const supabase = await createClient()
    
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as any,
    })
    
    if (!error) {
      // Успешная верификация email - редирект в dashboard
      return NextResponse.redirect(`${origin}/dashboard`)
    }
    
    console.error('Email verification error:', error)
    return NextResponse.redirect(`${origin}/auth?error=verification_error`)
  }

  // Обработка OAuth callback
  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Успешная авторизация - редирект в dashboard
      return NextResponse.redirect(`${origin}${next}`)
    }
    
    console.error('Auth callback error:', error)
    return NextResponse.redirect(`${origin}/auth?error=auth_callback_error`)
  }

  // Нет параметров - редирект на auth
  return NextResponse.redirect(`${origin}/auth`)
}