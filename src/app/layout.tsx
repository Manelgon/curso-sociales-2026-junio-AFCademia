import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] })

export const metadata: Metadata = {
  title: 'Charla AFC Cantabria - Automatización de Emails con IA | AFCademía',
  description: 'Acceso a los materiales exclusivos de la charla sobre automatización de emails con IA para administradores de fincas. Manual, prácticas, diapositivas, cheatsheet y prompts listos para usar.',
  keywords: 'automatización, email, IA, AFC, Cantabria, administradores de fincas, Make.com',
  openGraph: {
    title: 'Charla AFC Cantabria - Automatización con IA',
    description: 'Tus 5 materiales exclusivos: Manual, Prácticas, Diapositivas, Cheatsheet y Prompts de IA.',
    type: 'website',
    url: 'https://afcademia.com',
    siteName: 'AFCademía',
    images: [
      {
        url: 'https://afcademia.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AFCademía - Automatización de Emails con IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Charla AFC Cantabria - Automatización con IA',
    description: 'Tus 5 materiales exclusivos listos para descargar',
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
