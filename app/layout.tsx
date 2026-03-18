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
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
