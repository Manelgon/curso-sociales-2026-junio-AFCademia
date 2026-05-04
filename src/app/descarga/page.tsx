'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const MATERIALS = [
  {
    num: '01',
    title: 'Manual del Alumno',
    subtitle: 'Construye tu automatización paso a paso',
    html: '/01 Manual del Alumno.html',
    pdf: '/Manual del Alumno · Construye tu automatización paso a paso · AFCademIA.pdf',
    tag: 'PDF Guía',
  },
  {
    num: '02',
    title: 'Cuaderno de Prácticas',
    subtitle: 'Ejercicios para consolidar lo aprendido',
    html: '/02 Cuaderno de Practicas.html',
    pdf: '/Cuaderno de prácticas · AFCademIA.pdf',
    tag: 'Ejercicios',
  },
  {
    num: '03',
    title: 'Diapositivas de la Charla',
    subtitle: 'Automatización emails con IA',
    html: '/03 Diapositivas.html',
    pdf: '/Diapositivas · Automatización emails con IA · AFCademIA.pdf',
    tag: 'Presentación',
  },
  {
    num: '04',
    title: 'Cheatsheet Make.com + IA',
    subtitle: 'Referencia rápida siempre a mano',
    html: '/04 Cheatsheet.html',
    pdf: '/Cheatsheet · Make.com + IA · AFCademIA.pdf',
    tag: 'Referencia rápida',
  },
  {
    num: '05',
    title: 'Plantillas de Prompts',
    subtitle: 'Los 3 prompts listos para copiar y pegar',
    html: '/05 Plantillas Prompts.html',
    pdf: '/Plantillas de prompts · AFCademIA.pdf',
    tag: 'Prompts IA',
  },
]

type Status = 'loading' | 'valid' | 'invalid' | 'expired'

import { Suspense } from 'react'

function MaterialItem({ m }: { m: typeof MATERIALS[0] }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      style={{
        background: '#fff',
        border: '1.5px solid #e8e4dc',
        borderRadius: 16,
        boxShadow: '0 2px 12px rgba(0,63,107,0.06)',
        transition: 'box-shadow 0.15s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,63,107,0.12)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,63,107,0.06)'
      }}
    >
      {/* HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: expanded ? '1px solid #e8e4dc' : 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
          <div>
            <div style={{ fontSize: 11, color: '#aaa8a0', marginBottom: 4 }}>Material {m.num}</div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#003F6B', marginBottom: 4 }}>{m.title}</h3>
            <p style={{ fontSize: 13, color: '#7a7060' }}>{m.subtitle}</p>
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#F47A20',
            fontSize: 20,
            transition: 'transform 0.2s',
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          ▼
        </button>
      </div>

      {/* DROPDOWN MENU */}
      {expanded && (
        <div style={{ padding: '16px 24px', borderTop: '1px solid #e8e4dc', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ fontSize: 13, color: '#7a7060', margin: '0 0 8px', lineHeight: 1.5 }}>
            {m.subtitle}
          </p>

          <a
            href={(m as any).html}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'rgba(244,122,32,0.1)',
              color: '#F47A20',
              border: 'none',
              padding: '12px 16px',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600,
              textAlign: 'left',
              textDecoration: 'none',
              display: 'block',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => {
              (e.target as HTMLElement).style.background = 'rgba(244,122,32,0.2)'
            }}
            onMouseLeave={e => {
              (e.target as HTMLElement).style.background = 'rgba(244,122,32,0.1)'
            }}
          >
            🔗 Abrir recurso
          </a>

          <button
            onClick={() => {
              const fileName = ((m as any).html.split('/').pop() || 'material').replace('.html', '')
              window.location.href = `/api/download?file=${encodeURIComponent(fileName + '.html')}`
            }}
            style={{
              background: '#F47A20',
              color: '#fff',
              border: 'none',
              padding: '12px 16px',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600,
              textAlign: 'left',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => {
              (e.target as HTMLElement).style.background = '#e06b1b'
            }}
            onMouseLeave={e => {
              (e.target as HTMLElement).style.background = '#F47A20'
            }}
          >
            ⬇️ Descargar HTML
          </button>

          <button
            onClick={() => {
              const fileName = (m as any).pdf.split('/').pop() || 'material'
              window.location.href = `/api/download?file=${encodeURIComponent(fileName)}`
            }}
            style={{
              background: '#003F6B',
              color: '#fff',
              border: 'none',
              padding: '12px 16px',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600,
              textAlign: 'left',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => {
              (e.target as HTMLElement).style.background = '#012A47'
            }}
            onMouseLeave={e => {
              (e.target as HTMLElement).style.background = '#003F6B'
            }}
          >
            ⬇️ Descargar PDF
          </button>
        </div>
      )}
    </div>
  )
}

function DescargaContent() {
  const params = useSearchParams()
  const token = params.get('token')
  const [status, setStatus] = useState<Status>('loading')
  const [nombre, setNombre] = useState('')

  useEffect(() => {
    if (!token) {
      setStatus('invalid')
      return
    }
    verifyToken(token)
  }, [token])

  const verifyToken = async (t: string) => {
    const { data, error } = await supabase
      .from('access_tokens')
      .select('id, used, expires_at, leads(nombre)')
      .eq('token', t)
      .eq('tipo', 'descarga')
      .single()

    if (error || !data) {
      setStatus('invalid')
      return
    }

    if (new Date(data.expires_at) < new Date()) {
      setStatus('expired')
      return
    }

    // Guardar nombre del lead
    const lead = data.leads as unknown as { nombre: string } | null
    if (lead?.nombre) setNombre(lead.nombre)

    // Marcar como usado (sin bloquear el acceso si ya fue usado — UX mejor)
    if (!data.used) {
      await supabase
        .from('access_tokens')
        .update({ used: true })
        .eq('id', data.id)
    }

    setStatus('valid')
  }

  if (status === 'loading') {
    return (
      <PageShell>
        <div style={{ textAlign: 'center', padding: '80px 24px' }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            border: '3px solid rgba(0,63,107,0.15)',
            borderTopColor: '#003F6B',
            margin: '0 auto 16px',
            animation: 'spin 0.8s linear infinite',
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ color: '#7a7060', fontSize: 15 }}>Verificando acceso...</p>
        </div>
      </PageShell>
    )
  }

  if (status === 'invalid') {
    return (
      <PageShell>
        <div style={{ textAlign: 'center', padding: '80px 24px', maxWidth: 440, margin: '0 auto' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#003F6B', marginBottom: 12 }}>
            Enlace no válido
          </h1>
          <p style={{ color: '#7a7060', fontSize: 15, lineHeight: 1.6, marginBottom: 28 }}>
            Este enlace no existe o ya no es válido. Vuelve al formulario para solicitar los materiales de nuevo.
          </p>
          <a
            href="/"
            style={{
              display: 'inline-block',
              background: '#003F6B',
              color: '#fff',
              padding: '14px 28px',
              borderRadius: 12,
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
            }}
          >
            Volver al formulario
          </a>
        </div>
      </PageShell>
    )
  }

  if (status === 'expired') {
    return (
      <PageShell>
        <div style={{ textAlign: 'center', padding: '80px 24px', maxWidth: 440, margin: '0 auto' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⏰</div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#003F6B', marginBottom: 12 }}>
            Enlace caducado
          </h1>
          <p style={{ color: '#7a7060', fontSize: 15, lineHeight: 1.6, marginBottom: 28 }}>
            Este enlace tenía validez de 7 días y ha expirado. Regístrate de nuevo para recibir un enlace fresco.
          </p>
          <a
            href="/"
            style={{
              display: 'inline-block',
              background: '#003F6B',
              color: '#fff',
              padding: '14px 28px',
              borderRadius: 12,
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
            }}
          >
            Solicitar de nuevo
          </a>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell>
      {/* SUCCESS BANNER */}
      <section style={{
        background: 'linear-gradient(135deg, #003F6B 0%, #012A47 100%)',
        padding: '48px 24px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(244,122,32,0.15)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={{ fontSize: 44, marginBottom: 16 }}>🎉</div>
          <h1 style={{ color: '#fff', fontSize: 'clamp(22px, 4vw, 38px)', fontWeight: 900, marginBottom: 12, lineHeight: 1.2 }}>
            {nombre ? `¡Hola ${nombre.split(' ')[0]}!` : '¡Acceso confirmado!'} Aquí tienes tus materiales
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 16, lineHeight: 1.5 }}>
            Todo lo que necesitas para empezar a automatizar tus emails desde mañana.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px 80px', transform: 'translateY(-40px)' }}>

        {/* MATERIALS LIST */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 56 }}>
          {MATERIALS.map((m) => (
            <MaterialItem key={m.num} m={m} />
          ))}
        </div>

        {/* UPSELL AFCADEMIA */}
        <div style={{
          background: 'linear-gradient(135deg, #003F6B 0%, #012A47 100%)',
          borderRadius: 24,
          padding: 'clamp(32px, 5vw, 56px)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 180, height: 180, borderRadius: '50%', background: 'rgba(244,122,32,0.15)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', maxWidth: 620 }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(244,122,32,0.2)',
              border: '1px solid rgba(244,122,32,0.4)',
              color: '#F47A20',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              padding: '5px 14px', borderRadius: 100, marginBottom: 20,
            }}>
              ¿Quieres ir más allá?
            </div>

            <h2 style={{ color: '#fff', fontSize: 'clamp(20px, 3.5vw, 32px)', fontWeight: 900, marginBottom: 14, lineHeight: 1.2 }}>
              Domina la automatización con IA en profundidad
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
              La charla de hoy ha sido solo el aperitivo. En AFCademIA tienes el curso completo para
              administradores de fincas: flujos reales de automatización, gestión de incidencias,
              comunicaciones con propietarios — todo con IA y sin código.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 12, marginBottom: 28 }}>
              {['Flujos completos de automatización', 'Casos reales de fincas', 'Comunidad de administradores', 'Actualizaciones incluidas'].map(b => (
                <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#F47A20" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                  <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14 }}>{b}</span>
                </div>
              ))}
            </div>

            <a
              href="https://afcademia.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault()
                window.open('https://afcademia.com', '_blank')
              }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#F47A20', color: '#fff',
                padding: '15px 28px', borderRadius: 12,
                fontSize: 15, fontWeight: 700, textDecoration: 'none',
                boxShadow: '0 0 30px rgba(244,122,32,0.35)',
              }}
            >
              Descubrir AFCademIA
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </PageShell>
  )
}

export default function DescargaPage() {
  return (
    <Suspense fallback={
      <PageShell>
        <div style={{ textAlign: 'center', padding: '80px 24px' }}>
          <p style={{ color: '#7a7060' }}>Cargando...</p>
        </div>
      </PageShell>
    }>
      <DescargaContent />
    </Suspense>
  )
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ background: '#faf9f5', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      <header style={{ background: '#003F6B', padding: '16px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/logo-afcademia.webp" alt="AFCademía" width={34} height={34} style={{ background: '#fff', borderRadius: 8, padding: 4 }} />
          <span style={{ color: '#fff', fontWeight: 800, fontSize: 17 }}>AFC<span style={{ color: '#F47A20' }}>ademia</span></span>
        </div>
      </header>
      {children}
      <footer style={{ borderTop: '1px solid #e8e4dc', padding: '20px', textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: '#aaa8a0' }}>© 2026 AFCademIA</p>
      </footer>
    </main>
  )
}
