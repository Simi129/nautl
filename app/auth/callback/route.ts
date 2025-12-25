import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/dashboard'
  const origin = requestUrl.origin

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Успешная авторизация - редирект в dashboard
      return NextResponse.redirect(`${origin}${next}`)
    }
    
    // Если ошибка при обмене кода
    console.error('Auth callback error:', error)
    return NextResponse.redirect(`${origin}/auth?error=auth_callback_error`)
  }

  // Нет кода - редирект на auth
  return NextResponse.redirect(`${origin}/auth`)
}