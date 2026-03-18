import type { Metadata } from "next";
import "./globals.css";
import TigoChat from "@/components/tigo/TigoChat";

export const metadata: Metadata = {
  title: "Contigo — With you, every step.",
  description:
    "A Holistic English Language Teaching (ELT) Student Performance Intelligence Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts — loaded via CSS import as fallback */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased bg-contigo-white text-contigo-navy font-inter">
        {children}
        <TigoChat />
      </body>
    </html>
  );
}
