import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

// Verifica un token de descarga server-side. El navegador ya no consulta
// access_tokens ni leads directamente: solo recibe {status, nombre}.
export async function POST(request: NextRequest) {
  let token = ''
  try {
    const body = await request.json()
    token = typeof body?.token === 'string' ? body.token : ''
  } catch {
    return NextResponse.json({ status: 'invalid' })
  }

  if (!token) {
    return NextResponse.json({ status: 'invalid' })
  }

  const { data, error } = await supabaseAdmin
    .from('access_tokens')
    .select('id, used, expires_at, leads(nombre)')
    .eq('token', token)
    .eq('tipo', 'descarga')
    .single()

  if (error || !data) {
    return NextResponse.json({ status: 'invalid' })
  }

  if (data.expires_at && new Date(data.expires_at) < new Date()) {
    return NextResponse.json({ status: 'expired' })
  }

  // Marcar como usado (sin bloquear el reacceso si ya estaba usado — UX).
  if (!data.used) {
    await supabaseAdmin.from('access_tokens').update({ used: true }).eq('id', data.id)
  }

  const lead = data.leads as unknown as { nombre: string } | null
  return NextResponse.json({ status: 'valid', nombre: lead?.nombre ?? '' })
}