import type { Metadata } from 'next';
import { defaultMetadata } from '@/lib/config/metadata';
import ErrorBoundary from '@/components/ErrorBoundary';
import { AuthProvider } from '@/lib/context/AuthContext';
import './globals.css';

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <ErrorBoundary>
          <AuthProvider>{children}</AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
