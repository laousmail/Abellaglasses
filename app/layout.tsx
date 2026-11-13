import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/plus-jakarta-sans';
import '@fontsource-variable/dm-sans';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBar from '@/components/MobileBar';
import ClientEffects from '@/components/ClientEffects';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.name, template: `%s · ${SITE.name}` },
  description: 'Optométrie et lunetterie depuis 1980, rue Lajeunesse à Montréal. Examen de la vue complet, lunettes pour tous les budgets, conseils honnêtes.',
  openGraph: { type: 'website', locale: 'fr_CA', siteName: SITE.name },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#0A0E1A' };

/* Applied before first paint: saved reading-comfort level (no flash) and a `js` class
   that hides the SVG glasses fallback while the 3D loads. */
const boot = `(function(){var d=document.documentElement;d.classList.add('js');try{var l=localStorage.getItem('abella-comfort');if(l==='lg'||l==='xl')d.setAttribute('data-comfort',l);}catch(e){}})();`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Optician',
  name: SITE.name,
  telephone: '+1-514-387-7177',
  address: { '@type': 'PostalAddress', streetAddress: '8888, rue Lajeunesse', addressLocality: 'Montréal', addressRegion: 'QC', postalCode: 'H2M 1R6', addressCountry: 'CA' },
  foundingDate: '1980',
  areaServed: ['Ahuntsic-Cartierville', 'Villeray', 'Mont-Royal', 'Laval', 'Youville', 'Saint-Léonard'],
  url: SITE.url,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-comfort="std" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a className="skip" href="#main">Aller au contenu</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileBar />
        <ClientEffects />
      </body>
    </html>
  );
}
