import type { Metadata } from 'next'
import { Nunito, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import TigoChat from '@/components/tigo/TigoChat'

const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' })

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
      <body className={`${nunito.variable} ${inter.variable} ${jetbrainsMono.variable} bg-contigo-white text-contigo-navy antialiased`}>
        {children}
        <TigoChat />
      </body>
    </html>
  )
}
