'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

const DELIVERABLES = [
  {
    num: '01',
    title: 'Manual del Alumno',
    desc: 'Guía completa paso a paso para construir tu primera automatización de email desde cero.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    tag: 'PDF Guía',
  },
  {
    num: '02',
    title: 'Cuaderno de Prácticas',
    desc: 'Ejercicios y plantillas para que practiques y consolides lo aprendido en la charla.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
    tag: 'Ejercicios',
  },
  {
    num: '03',
    title: 'Diapositivas de la Charla',
    desc: 'Todas las diapositivas de la sesión de hoy para que puedas repasar el contenido cuando quieras.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    tag: 'Presentación',
  },
  {
    num: '04',
    title: 'Cheatsheet Make.com + IA',
    desc: 'Hoja de referencia rápida con los módulos, conexiones y prompts más usados. Tenla siempre a mano.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    tag: 'Referencia rápida',
  },
  {
    num: '05',
    title: 'Plantillas de Prompts',
    desc: 'Los 3 prompts listos para copiar y pegar en Make. Adaptables a tu despacho.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <path d="M9 13h6M9 17h4"/>
      </svg>
    ),
    tag: 'Prompts IA',
  },
]

export default function Home() {
  const [email, setEmail] = useState('')
  const [nombre, setNombre] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [privacyChecked, setPrivacyChecked] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !nombre) {
      setError('Por favor rellena nombre y email.')
      return
    }
    if (!privacyChecked) {
      setError('Debes aceptar la política de protección de datos.')
      return
    }
    setError('')
    setLoading(true)

    try {
      // 1. Insertar o recuperar lead (upsert por email)
      const { data: leadData, error: leadError } = await supabase
        .from('leads')
        .upsert(
          {
            nombre,
            email,
            source: 'Charla AFC Cantabria',
            privacy_accepted: privacyChecked,
            privacy_accepted_at: new Date().toISOString(),
          },
          { onConflict: 'email', ignoreDuplicates: false }
        )
        .select('id')
        .single()

      if (leadError) throw leadError

      const leadId = leadData.id

      // 2. Insertar flujo_embudo con etiqueta de la charla
      const { error: flujoError } = await supabase
        .from('flujos_embudo')
        .insert({
          lead_id: leadId,
          nombre_flujo: 'charla-afc-cantabria',
          status_actual: 'nuevo',
          actividad: 'lead_activo',
          tags_proceso: ['charla-cantabria-2026', 'automatiza-email'],
          fecha_ultima_interaccion: new Date().toISOString(),
        })

      if (flujoError && flujoError.code !== '23505') throw flujoError

      // 3. Generar token de descarga
      const { data: tokenData, error: tokenError } = await supabase
        .from('access_tokens')
        .insert({
          lead_id: leadId,
          tipo: 'descarga',
          metadata: {
            fuente: 'charla-afc-cantabria',
            evento: 'Automatiza tu email - AFC Cantabria 2026',
            nombre,
            email,
          },
        })
        .select('token')
        .single()

      if (tokenError) throw tokenError

      const downloadToken = tokenData.token

      // n8n es notificado automáticamente via trigger de Supabase
      window.location.href = '/confirmar'
    } catch (err) {
      console.error('Error al registrar lead:', err)
      // Si hay error de Supabase pero el lead ya existe, igualmente continuamos
      window.location.href = '/confirmar'
    }
  }

  return (
    <main style={{ background: '#faf9f5', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>

      {/* HEADER */}
      <header style={{ background: '#003F6B', padding: '16px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F47A20" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
          <span style={{ color: '#fff', fontWeight: 800, fontSize: 18, letterSpacing: '-0.5px' }}>AFC<span style={{ color: '#F47A20' }}>ademia</span></span>
        </div>
      </header>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #003F6B 0%, #012A47 100%)', padding: '64px 24px 80px', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(244,122,32,0.12)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -40, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(244,122,32,0.2)',
            border: '1px solid rgba(244,122,32,0.4)',
            color: '#F47A20',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '6px 16px',
            borderRadius: 100,
            marginBottom: 24,
          }}>
            Materiales exclusivos · Charla AFC Cantabria
          </div>

          <h1 style={{ color: '#fff', fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 20, letterSpacing: '-1px' }}>
            Tus materiales de la charla<br />
            <span style={{ color: '#F47A20' }}>te esperan aquí</span>
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 18, lineHeight: 1.6, marginBottom: 12 }}>
            Introduce tu email y te los enviamos al instante.<br />
            <strong style={{ color: '#fff' }}>4 recursos</strong> para que puedas aplicar lo de hoy desde mañana.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px 80px', transform: 'translateY(-40px)' }}>

        {/* Deliverables grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 40 }}>
          {DELIVERABLES.map((d) => (
            <div key={d.num} style={{
              background: '#fff',
              border: '1px solid #e8e4dc',
              borderRadius: 16,
              padding: 24,
              boxShadow: '0 2px 12px rgba(0,63,107,0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: 'rgba(244,122,32,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F47A20',
              }}>
                {d.icon}
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#F47A20', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
                  {d.tag}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#003F6B', marginBottom: 6, lineHeight: 1.3 }}>{d.title}</h3>
                <p style={{ fontSize: 13, color: '#7a7060', lineHeight: 1.5 }}>{d.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form card */}
        <div style={{
          background: '#fff',
          border: '2px solid #003F6B',
          borderRadius: 20,
          padding: 'clamp(28px, 5vw, 48px)',
          maxWidth: 520,
          margin: '0 auto',
          boxShadow: '0 8px 40px rgba(0,63,107,0.12)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>📥</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#003F6B', marginBottom: 8 }}>
              Accede a los 4 materiales gratis
            </h2>
            <p style={{ fontSize: 14, color: '#7a7060' }}>
              Te enviamos un email de confirmación. Al confirmar, accedes a todos los recursos.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#003F6B', marginBottom: 6 }}>
                Nombre *
              </label>
              <input
                type="text"
                placeholder="Tu nombre"
                required
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1.5px solid #e8e4dc',
                  borderRadius: 10,
                  fontSize: 15,
                  outline: 'none',
                  background: '#faf9f5',
                  color: '#1a1a1a',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#003F6B', marginBottom: 6 }}>
                Email *
              </label>
              <input
                type="email"
                placeholder="tu@email.com"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1.5px solid #e8e4dc',
                  borderRadius: 10,
                  fontSize: 15,
                  outline: 'none',
                  background: '#faf9f5',
                  color: '#1a1a1a',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {error && (
              <p style={{ fontSize: 13, color: '#c0392b', textAlign: 'center' }}>{error}</p>
            )}

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 0' }}>
              <input
                type="checkbox"
                id="privacy"
                checked={privacyChecked}
                onChange={e => setPrivacyChecked(e.target.checked)}
                style={{
                  width: 18,
                  height: 18,
                  cursor: 'pointer',
                  marginTop: 2,
                  flexShrink: 0,
                }}
              />
              <label htmlFor="privacy" style={{ fontSize: 12, color: '#7a7060', lineHeight: 1.5, cursor: 'pointer' }}>
                Acepto la{' '}
                <a
                  href="https://afcademia.com/privacidad#politica-privacidad-title"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#003F6B', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}
                >
                  política de protección de datos
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !privacyChecked}
              style={{
                background: (loading || !privacyChecked) ? '#ccc' : '#F47A20',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '16px 24px',
                fontSize: 16,
                fontWeight: 700,
                cursor: (loading || !privacyChecked) ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                transition: 'opacity 0.2s',
                marginTop: 4,
              }}
            >
              {loading ? 'Enviando...' : (
                <>
                  Enviarme los materiales
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
                  </svg>
                </>
              )}
            </button>

            <p style={{ fontSize: 12, color: '#aaa8a0', textAlign: 'center', lineHeight: 1.4 }}>
              Sin spam. Solo tus materiales. Puedes darte de baja cuando quieras.
            </p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #e8e4dc', padding: '24px', textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: '#aaa8a0' }}>
          © 2026 AFCademIA · <a href="#" style={{ color: '#aaa8a0' }}>Privacidad</a>
        </p>
      </footer>
    </main>
  )
}
