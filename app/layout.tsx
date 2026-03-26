import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Contigo — With you, every step.',
  description:
    'Contigo is a Holistic English Language Teaching (ELT) Student Performance Intelligence Platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700&family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-arc-bg text-arc-text">{children}</body>
    </html>
  );
}
