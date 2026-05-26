import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] })

export const metadata: Metadata = {
  title: 'IA aplicada al sector jurídico-laboral · Málaga 16 jun 2026 | AFCademIA',
  description: 'Materiales de la ponencia de Roberto Díaz en el Colegio GS Málaga y Melilla: diapositivas, folleto del asistente, 10 prompts esenciales y tarjeta A5 de referencia rápida.',
  keywords: 'IA, jurídico, laboral, graduados sociales, Málaga, Roberto Díaz, AFCademIA, prompts, RGPD',
  icons: {
    icon: '/logo-afcademia.webp',
    shortcut: '/logo-afcademia.webp',
    apple: '/logo-afcademia.webp',
  },
  openGraph: {
    title: 'IA aplicada al sector jurídico-laboral · AFCademIA',
    description: 'Tus 4 materiales de la ponencia: diapositivas, folleto A4, 10 prompts esenciales y tarjeta A5.',
    type: 'website',
    url: 'https://graduadossociales2026.afcademia.com',
    siteName: 'AFCademIA',
    images: [
      {
        url: 'https://afcademia.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AFCademIA - IA aplicada al sector jurídico-laboral',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IA aplicada al sector jurídico-laboral · AFCademIA',
    description: 'Tus 4 materiales de la ponencia listos para descargar',
    creator: '@AFCademia',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
