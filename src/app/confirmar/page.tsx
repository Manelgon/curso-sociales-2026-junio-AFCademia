export default function ConfirmarPage() {
  return (
    <main style={{
      background: '#faf9f5',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* HEADER */}
      <header style={{ background: '#003F6B', padding: '16px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F47A20" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
          <span style={{ color: '#fff', fontWeight: 800, fontSize: 18, letterSpacing: '-0.5px' }}>AFC<span style={{ color: '#F47A20' }}>ademia</span></span>
        </div>
      </header>

      {/* CONTENT */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
        <div style={{
          background: '#fff',
          border: '1px solid #e8e4dc',
          borderRadius: 20,
          padding: 'clamp(32px, 5vw, 56px)',
          maxWidth: 480,
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 8px 40px rgba(0,63,107,0.08)',
        }}>
          {/* Email icon */}
          <div style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'rgba(0,63,107,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
          }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#003F6B" strokeWidth="1.5">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M2 8l10 5 10-5"/>
            </svg>
          </div>

          <h1 style={{ fontSize: 26, fontWeight: 900, color: '#003F6B', marginBottom: 12, lineHeight: 1.2 }}>
            ¡Revisa tu email!
          </h1>

          <p style={{ fontSize: 16, color: '#5a5248', lineHeight: 1.6, marginBottom: 8 }}>
            Te hemos enviado un email de confirmación.
          </p>
          <p style={{ fontSize: 15, color: '#7a7060', lineHeight: 1.6, marginBottom: 32 }}>
            Haz clic en el enlace del email para confirmar tu dirección y acceder inmediatamente a los <strong style={{ color: '#003F6B' }}>4 materiales de la charla</strong>.
          </p>

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32, textAlign: 'left' }}>
            {[
              { n: '1', text: 'Abre tu bandeja de entrada' },
              { n: '2', text: 'Busca el email de AFCademIA' },
              { n: '3', text: 'Haz clic en "Confirmar y descargar"' },
            ].map(step => (
              <div key={step.n} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: '#F47A20',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {step.n}
                </div>
                <span style={{ fontSize: 14, color: '#5a5248' }}>{step.text}</span>
              </div>
            ))}
          </div>

          <div style={{
            background: 'rgba(0,63,107,0.05)',
            border: '1px solid rgba(0,63,107,0.1)',
            borderRadius: 10,
            padding: '12px 16px',
            fontSize: 13,
            color: '#7a7060',
            lineHeight: 1.5,
          }}>
            ¿No lo ves? Revisa la carpeta de <strong>spam o promociones</strong>. Si aun así no llega, escríbenos a{' '}
            <a href="mailto:hola@afcademia.com" style={{ color: '#003F6B', fontWeight: 600 }}>hola@afcademia.com</a>
          </div>
        </div>
      </div>

      <footer style={{ borderTop: '1px solid #e8e4dc', padding: '20px', textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: '#aaa8a0' }}>© 2026 AFCademIA</p>
      </footer>
    </main>
  )
}
