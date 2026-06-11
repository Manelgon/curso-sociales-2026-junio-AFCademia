export default function Footer() {
  return (
    <footer className="footer" id="contacto">
      <div className="container">
        <div className="footer-content">
          {/* Marca */}
          <div className="footer-section">
            <h3 className="footer-logo">
              AFCadem<span>IA</span>
            </h3>
            <p>
              La academia tecnológica para profesionales jurídico-laborales. Aprende a aplicar
              IA con criterio en tu despacho, ahorrar horas en gestión y mantener tu
              responsabilidad profesional.
            </p>
            <div className="footer-social">
              <a
                href="https://www.linkedin.com/company/afcademia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.78C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.78 24h20.44c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/afcademia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22.68 0H1.32C.59 0 0 .59 0 1.32v21.36C0 23.41.59 24 1.32 24h11.5v-9.29H9.69v-3.62h3.13V8.41c0-3.1 1.89-4.79 4.66-4.79 1.32 0 2.46.1 2.79.14v3.24h-1.92c-1.5 0-1.79.71-1.79 1.76v2.31h3.59l-.47 3.62h-3.12V24h6.12c.73 0 1.32-.59 1.32-1.32V1.32C24 .59 23.41 0 22.68 0z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@afcademia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5a3 3 0 00-2.1 2.1C0 8 0 12 0 12s0 4 .5 5.8a3 3 0 002.1 2.1C4.4 20.4 12 20.4 12 20.4s7.6 0 9.4-.5a3 3 0 002.1-2.1C24 16 24 12 24 12s0-4-.5-5.8zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z" />
                </svg>
              </a>
            </div>
            <div className="footer-copyright desktop-copyright">
              <p>&copy; 2026 AFCademIA. Todos los derechos reservados.</p>
            </div>
          </div>

          {/* Contacto */}
          <div className="footer-section">
            <h4>Contacto</h4>
            <ul className="footer-contact">
              <li>
                <span className="icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                  </svg>
                </span>
                <span>Málaga, España</span>
              </li>
              <li>
                <span className="icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </span>
                <a href="mailto:cursos@afcademia.com">cursos@afcademia.com</a>
              </li>
              <li>
                <span className="icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                  </svg>
                </span>
                <a href="https://afcademia.com" target="_blank" rel="noopener noreferrer">
                  afcademia.com
                </a>
              </li>
            </ul>
          </div>

          {/* Formación */}
          <div className="footer-section">
            <h4>Formación</h4>
            <ul className="footer-links">
              <li>
                <a href="https://afcademia.com/#beneficios" target="_blank" rel="noopener noreferrer">
                  Beneficios
                </a>
              </li>
              <li>
                <a href="https://afcademia.com/#quienes-somos" target="_blank" rel="noopener noreferrer">
                  Quiénes Somos
                </a>
              </li>
              <li>
                <a href="https://afcademia.com/#valores" target="_blank" rel="noopener noreferrer">
                  Valores AFC
                </a>
              </li>
              <li>
                <a href="https://afcademia.com/#que-ofrecemos" target="_blank" rel="noopener noreferrer">
                  Qué Ofrecemos
                </a>
              </li>
              <li>
                <a href="https://afcademia.com/#clase-gratuita" target="_blank" rel="noopener noreferrer">
                  Clase Gratuita
                </a>
              </li>
              <li>
                <a href="https://afcademia.com/#faq" target="_blank" rel="noopener noreferrer">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-section">
            <h4>Legal</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="https://afcademia.com/aviso-legal/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Aviso Legal
                </a>
              </li>
              <li>
                <a
                  href="https://afcademia.com/politica-de-privacidad/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a
                  href="https://afcademia.com/politica-de-cookies/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Política de Cookies
                </a>
              </li>
              <li>
                <a
                  href="https://afcademia.com/accesibilidad#declaracion-accesibilidad-title"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Declaración de Accesibilidad
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-copyright mobile-copyright">
          <p>&copy; 2026 AFCademIA. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
