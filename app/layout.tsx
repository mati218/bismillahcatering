import type { Metadata } from 'next';
import './globals.css';
import { getSiteSettings } from '@/lib/data/settings';
import { getSocialLinks } from '@/lib/data/socialLinks';

export const revalidate = 60;

export const metadata: Metadata = {
  metadataBase: new URL('https://bismillahcatering.com'),
  title: {
    default: 'Bismillah Catering | Premium Wedding & Event Catering in Lahore',
    template: '%s | Bismillah Catering',
  },
  description:
    "Bismillah Catering — Lahore's premium catering and complete event management company. Expert in weddings, mehndi, barat, walima, corporate events, birthday parties, BBQ, and more.",
  keywords: [
    'catering lahore',
    'wedding catering',
    'event management lahore',
    'bismillah catering',
    'wedding planner lahore',
    'mehndi decoration',
    'barat setup',
    'walima catering',
    'birthday party catering',
    'corporate events lahore',
    'farmhouse events',
    'bbq catering',
    'buffet setup lahore',
    'stage decoration',
    'nespak housing society lahore',
  ],
  authors: [{ name: 'Bismillah Catering' }],
  creator: 'Bismillah Catering',
  publisher: 'Bismillah Catering',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: 'https://bismillahcatering.com',
    siteName: 'Bismillah Catering',
    title: 'Bismillah Catering | Premium Wedding & Event Catering in Lahore',
    description:
      'Premium catering and complete event management in Lahore. Weddings, corporate events, farmhouse parties & more.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Bismillah Catering — Premium Event Management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bismillah Catering | Premium Wedding & Event Catering',
    description: 'Premium catering and event management in Lahore, Pakistan.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://bismillahcatering.com',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [settings, socialLinks] = await Promise.all([getSiteSettings(), getSocialLinks()]);

  return (
    <html lang="en">
      <head>
        {/* Google Fonts loaded at runtime (not next/font to avoid build-time network requirement) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FoodEstablishment',
              name: settings.companyName,
              description: 'Premium catering and complete event management in Lahore',
              url: 'https://bismillahcatering.com',
              telephone: settings.phone,
              email: settings.email,
              address: {
                '@type': 'PostalAddress',
                streetAddress: settings.address,
                addressLocality: 'Lahore',
                postalCode: '54000',
                addressCountry: 'PK',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '31.485',
                longitude: '74.295',
              },
              openingHours: 'Mo-Su 08:00-22:00',
              servesCuisine: ['Pakistani', 'Mughlai', 'BBQ', 'Continental'],
              priceRange: '$$',
              image: settings.logoUrl,
              sameAs: socialLinks.map((s) => s.url),
            }),
          }}
        />
      </head>
      <body className="font-body antialiased bg-white text-dark overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
