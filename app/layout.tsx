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
      <body className="antialiased">{children}</body>
    </html>
  );
}
