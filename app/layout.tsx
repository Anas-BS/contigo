import type { Metadata } from 'next'
import './globals.css'
import TigoChat from '@/components/tigo/TigoChat'

export const metadata: Metadata = {
  title: 'Contigo — With you, every step.',
  description: 'Holistic ELT Student Performance Intelligence Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-contigo-white text-contigo-navy antialiased">
        {children}
        <TigoChat />
      </body>
    </html>
  )
}
