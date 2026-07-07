import type { Metadata } from 'next';
import PackagesHero from './components/PackagesHero';
import PackagesSection from '@/components/home/PackagesSection';
import FAQSection from '@/components/home/FAQSection';
import ContactSection from '@/components/home/ContactSection';

export const metadata: Metadata = {
  title: 'Wedding Packages',
  description:
    'Explore our premium wedding and event packages — Silver, Gold, Platinum, and Diamond. Transparent pricing with luxury service in Lahore.',
  openGraph: {
    title: 'Packages | Bismillah Catering',
    description: 'Premium event packages with transparent pricing.',
  },
};

export default function PackagesPage() {
  return (
    <>
      <PackagesHero />
      <PackagesSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
