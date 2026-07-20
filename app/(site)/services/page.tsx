import type { Metadata } from 'next';
import ServicesHero from './components/ServicesHero';
import ServicesGrid from './components/ServicesGrid';
import ProcessSection from '@/components/home/ProcessSection';
import ContactSection from '@/components/home/ContactSection';
import { getServices } from '@/lib/data/services';
import { getProcessSteps } from '@/lib/data/processSteps';
import { getSiteSettings } from '@/lib/data/settings';

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Bismillah Catering offers complete event services including wedding planning, catering, stage decoration, mehndi, barat, walima, corporate events, birthday parties, BBQ, and more in Lahore.',
  openGraph: {
    title: 'Services | Bismillah Catering',
    description: 'Complete event management and catering services in Lahore.',
  },
};

export default async function ServicesPage() {
  const [services, steps, settings] = await Promise.all([getServices(), getProcessSteps(), getSiteSettings()]);

  return (
    <>
      <ServicesHero />
      <ServicesGrid services={services} />
      <ProcessSection steps={steps} />
      <ContactSection settings={settings} />
    </>
  );
}
