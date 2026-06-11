'use client'

import { useState } from 'react'
import Footer from '@/shared/components/Footer'

const DELIVERABLES = [
  {
    num: '01',
    title: 'Diapositivas de la ponencia',
    desc: '33 slides en 16:9 para proyectar. QR a materiales, divisores por bloque, prompts y bonus hacia automatizaciones.',
    tag: 'Proyección',
  },
  {
    num: '02',
    title: 'Folleto del asistente',
    desc: '9 páginas A4 con fundamentos, herramientas, casos de uso, 3 prompts, RGPD y plan de acción. Print-ready.',
    tag: 'Imprimible A4',
  },
  {
    num: '03',
    title: '10 prompts esenciales',
    desc: '5 prompts jurídicos + 5 de gestión, listos para copiar, con tips de verificación. Claude · ChatGPT · Perplexity.',
    tag: 'Post-ponencia',
  },
  {
    num: '04',
    title: 'Tarjeta A5 · referencia rápida',
    desc: 'Doble cara con lo esencial: QR a materiales, las 5 IAs, verticales, RGPD, fórmula del prompt y la frase del curso.',
    tag: 'Imprimible A5',
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
      // Toda la lógica de BD vive ahora en /api/lead (server-side, service_role).
      // El navegador ya no toca Supabase directamente.
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, privacyChecked }),
      })
      window.location.href = '/confirmar'
    } catch (err) {
      console.error('Error al registrar lead:', err)
      // Mantengo el comportamiento previo: continuar a /confirmar igualmente.
      window.location.href = '/confirmar'
    }
  }

  return (
    <main style={{ background: '#faf9f5', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>

      {/* HEADER */}
      <header style={{ background: '#003F6B', padding: '16px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/logo-afcademia.webp" alt="AFCademía" width={36} height={36} style={{ background: '#fff', borderRadius: 8, padding: 4 }} />
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
            Materiales · Ponencia 16 jun 2026 · Málaga
          </div>

          <h1 style={{ color: '#fff', fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 20, letterSpacing: '-1px' }}>
            IA aplicada al sector<br />
            <span style={{ color: '#F47A20' }}>jurídico-laboral</span>
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 18, lineHeight: 1.6, marginBottom: 12 }}>
            Introduce tu email y te enviamos los materiales al instante.<br />
            <strong style={{ color: '#fff' }}>4 recursos</strong> para aplicar lo de hoy desde mañana en tu despacho.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px 80px', transform: 'translateY(-40px)' }}>

        {/* Deliverables grid: 3+2 layout en desktop, responsive abajo */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 40 }} className="deliverables-grid">
          {DELIVERABLES.map((d) => (
            <div
              key={d.num}
              style={{
                background: '#fff',
                border: '1px solid #e8e4dc',
                borderRadius: 16,
                padding: 24,
                boxShadow: '0 2px 12px rgba(0,63,107,0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
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
                  href="https://afcademia.com/politica-de-privacidad/"
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

      <Footer />
    </main>
  )
}
