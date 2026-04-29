import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] })

export const metadata: Metadata = {
  title: 'Automatízatelo | Consultoría de Automatización e IA para PYMEs en Barcelona',
  description: 'Automatiza los procesos de tu PYME con inteligencia artificial. Consultoría especializada en Barcelona. Ahorra hasta un 70% de tiempo en tareas repetitivas.',
  keywords: 'automatización, inteligencia artificial, IA, PYME, Barcelona, consultoría, Make.com, procesos, productividad',
  openGraph: {
    title: 'Automatízatelo | Automatización e IA para PYMEs',
    description: 'Deja de perder 40 horas al mes en tareas repetitivas. Automatiza tu PYME con IA.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
