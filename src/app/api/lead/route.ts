import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

const NOMBRE_FLUJO = 'curso-sociales-2026-junio'
const SOURCE = 'Curso Sociales 2026 · Junio · Málaga'
const CONSENT_TEXT = 'Acepto la política de protección de datos'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  let payload: { nombre?: unknown; email?: unknown; privacyChecked?: unknown }
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  // --- Validación de entrada (sin Zod: no está en el stack de este proyecto) ---
  const nombre = typeof payload.nombre === 'string' ? payload.nombre.trim() : ''
  const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : ''
  const privacyChecked = payload.privacyChecked === true

  if (!nombre || nombre.length > 120) {
    return NextResponse.json({ error: 'Nombre requerido' }, { status: 400 })
  }
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
  }
  if (!privacyChecked) {
    return NextResponse.json({ error: 'Falta aceptar la política de protección de datos' }, { status: 400 })
  }

  const now = new Date().toISOString()
  // Prueba de consentimiento (art. 7 RGPD): de dónde vino y qué aceptó.
  const consentIp =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    null

  try {
    // 1. Upsert lead por email
    const { data: leadData, error: leadError } = await supabaseAdmin
      .from('leads')
      .upsert(
        {
          nombre,
          email,
          source: SOURCE,
          privacy_accepted: true,
          privacy_accepted_at: now,
        },
        { onConflict: 'email', ignoreDuplicates: false }
      )
      .select('id')
      .single()

    if (leadError) throw leadError
    const leadId = leadData.id

    // 2. Upsert flujo_embudo: única fila por (lead_id, nombre_flujo)
    const { data: existingFlujo, error: existingFlujoError } = await supabaseAdmin
      .from('flujos_embudo')
      .select('id')
      .eq('lead_id', leadId)
      .eq('nombre_flujo', NOMBRE_FLUJO)
      .maybeSingle()

    if (existingFlujoError) throw existingFlujoError

    const isFirstTime = !existingFlujo
    const tagsProceso = isFirstTime
      ? ['nuevo', 'cursos-sociales-2026', 'junio-2026', 'ia-juridico-laboral']
      : ['recurrente', 'cursos-sociales-2026', 'junio-2026', 'ia-juridico-laboral']

    const { error: flujoError } = await supabaseAdmin
      .from('flujos_embudo')
      .upsert(
        {
          lead_id: leadId,
          nombre_flujo: NOMBRE_FLUJO,
          status_actual: isFirstTime ? 'nuevo' : 'recurrente',
          actividad: 'lead_activo',
          tags_proceso: tagsProceso,
          fecha_ultima_interaccion: now,
        },
        { onConflict: 'lead_id,nombre_flujo', ignoreDuplicates: false }
      )

    if (flujoError) throw flujoError

    // 3. Reutilizar access_token activo si existe; si no, crear uno nuevo.
    const { data: existingToken, error: existingTokenError } = await supabaseAdmin
      .from('access_tokens')
      .select('token')
      .eq('lead_id', leadId)
      .eq('tipo', 'descarga')
      .or('used.is.null,used.eq.false')
      .or(`expires_at.is.null,expires_at.gt.${now}`)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (existingTokenError) throw existingTokenError

    if (!existingToken) {
      const { error: tokenError } = await supabaseAdmin
        .from('access_tokens')
        .insert({
          lead_id: leadId,
          tipo: 'descarga',
          metadata: {
            fuente: NOMBRE_FLUJO,
            evento: 'IA aplicada al sector jurídico-laboral · Málaga 16 jun 2026',
            nombre,
            email,
            // Prueba de consentimiento reforzada (PD-09)
            consent_text: CONSENT_TEXT,
            consent_ip: consentIp,
            consent_at: now,
          },
        })

      if (tokenError) throw tokenError
    }

    // n8n se notifica automáticamente vía trigger de Supabase.
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Error al registrar lead:', err instanceof Error ? err.message : 'desconocido')
    return NextResponse.json({ error: 'No se pudo registrar' }, { status: 500 })
  }
}