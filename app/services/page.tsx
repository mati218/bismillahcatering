import type { Metadata } from 'next';
import ServicesHero from './components/ServicesHero';
import ServicesGrid from './components/ServicesGrid';
import ProcessSection from '@/components/home/ProcessSection';
import ContactSection from '@/components/home/ContactSection';

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Bismillah Catering offers complete event services including wedding planning, catering, stage decoration, mehndi, barat, walima, corporate events, birthday parties, BBQ, and more in Lahore.',
  openGraph: {
    title: 'Services | Bismillah Catering',
    description: 'Complete event management and catering services in Lahore.',
  },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <ProcessSection />
      <ContactSection />
    </>
  );
}
