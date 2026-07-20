import type { Metadata } from 'next';
import PackagesHero from './components/PackagesHero';
import PackagesSection from '@/components/home/PackagesSection';
import FAQSection from '@/components/home/FAQSection';
import ContactSection from '@/components/home/ContactSection';
import { getPackages } from '@/lib/data/packages';
import { getFaqs } from '@/lib/data/faqs';
import { getSiteSettings } from '@/lib/data/settings';

export const metadata: Metadata = {
  title: 'Wedding Packages',
  description:
    'Explore our premium wedding and event packages — Silver, Gold, Platinum, and Diamond. Transparent pricing with luxury service in Lahore.',
  openGraph: {
    title: 'Packages | Bismillah Catering',
    description: 'Premium event packages with transparent pricing.',
  },
};

export default async function PackagesPage() {
  const [packages, faqs, settings] = await Promise.all([getPackages(), getFaqs(), getSiteSettings()]);

  return (
    <>
      <PackagesHero />
      <PackagesSection packages={packages} whatsapp={settings.whatsapp} />
      <FAQSection faqs={faqs} />
      <ContactSection settings={settings} />
    </>
  );
}
