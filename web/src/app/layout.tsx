import type { Metadata } from 'next';
import '@carbon/styles/css/styles.css';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { CarbonExperienceProvider, CarbonRouteMotion } from '@/components/CarbonExperience';

export const metadata: Metadata = {
  metadataBase: new URL('https://blog.kmerhosting.com'),
  title: { default: 'KmerHosting Blog | Hosting and infrastructure guides', template: '%s | KmerHosting Blog' },
  description: 'Practical guides for faster, safer, more reliable websites, covering hosting, infrastructure, domains, email, databases, and DevOps.',
  openGraph: { type: 'website', siteName: 'KmerHosting Blog', title: 'KmerHosting Blog', description: 'Practical guides for faster, safer, more reliable websites.', url: 'https://blog.kmerhosting.com' },
  twitter: { card: 'summary', title: 'KmerHosting Blog', description: 'Practical guides for faster, safer, more reliable websites.' },
  alternates: { canonical: 'https://blog.kmerhosting.com' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" suppressHydrationWarning>
    <body>
      <CarbonExperienceProvider>
        <SiteHeader />
        <main id="main-content"><CarbonRouteMotion>{children}</CarbonRouteMotion></main>
        <SiteFooter />
      </CarbonExperienceProvider>
    </body>
  </html>;
}
