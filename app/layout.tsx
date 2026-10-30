import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { defaultMetadata } from '@/lib/config/metadata';
import ErrorBoundary from '@/components/ErrorBoundary';
import { AuthProvider } from '@/lib/context/AuthContext';
import './globals.css';

// Self-hosted (SIL OFL 1.1, licences in app/fonts) so builds never depend on a font CDN.
const display = localFont({
  src: [
    { path: './fonts/newsreader-latin-wght-normal.woff2', weight: '200 800', style: 'normal' },
    { path: './fonts/newsreader-latin-wght-italic.woff2', weight: '200 800', style: 'italic' },
  ],
  variable: '--font-display',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

const sans = localFont({
  src: [{ path: './fonts/ibm-plex-sans-latin-wght-normal.woff2', weight: '100 700', style: 'normal' }],
  variable: '--font-sans',
  display: 'swap',
  fallback: ['system-ui', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
});

const mono = localFont({
  src: [
    { path: './fonts/ibm-plex-mono-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/ibm-plex-mono-latin-500-normal.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-mono',
  display: 'swap',
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
});

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  themeColor: '#F4F0E8',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ErrorBoundary>
          <AuthProvider>{children}</AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
