// SEO metadata configuration for Contigo platform
import { Metadata } from 'next';

export const siteConfig = {
  name: 'Contigo',
  tagline: 'With you, every step.',
  description: 'Contigo is a Holistic English Language Teaching (ELT) Student Performance Intelligence Platform that tracks grades, mood, seating, and wellbeing.',
  url: 'https://contigo.vercel.app',
  ogImage: '/og-image.png',
  links: {
    github: 'https://github.com/Anas-BS/contigo',
  },
};

export const defaultMetadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'ELT',
    'English Language Teaching',
    'Student Performance',
    'Education Platform',
    'AI Assistant',
    'Tigo',
    'Classroom Analytics',
    'Student Wellbeing',
    'Educational Technology',
    'Learning Analytics',
  ],
  authors: [
    {
      name: 'Anas-BS',
      url: 'https://github.com/Anas-BS',
    },
  ],
  creator: 'Anas-BS',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@contigo',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

// Helper function to generate page-specific metadata
export function generatePageMetadata(
  title: string,
  description?: string,
  path?: string
): Metadata {
  return {
    title,
    description: description || siteConfig.description,
    openGraph: {
      title,
      description: description || siteConfig.description,
      url: path ? `${siteConfig.url}${path}` : siteConfig.url,
    },
    twitter: {
      title,
      description: description || siteConfig.description,
    },
  };
}
