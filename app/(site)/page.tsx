import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import MarqueeSection from '@/components/home/MarqueeSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import ServicesSection from '@/components/home/ServicesSection';
import GalleryPreview from '@/components/home/GalleryPreview';
import PackagesSection from '@/components/home/PackagesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ProcessSection from '@/components/home/ProcessSection';
import FAQSection from '@/components/home/FAQSection';
import ContactSection from '@/components/home/ContactSection';
import StatsSection from '@/components/home/StatsSection';
import { getServices } from '@/lib/data/services';
import { getWhyChooseUsReasons } from '@/lib/data/whyChooseUs';
import { getGalleryEvents } from '@/lib/data/gallery';
import { getPackages } from '@/lib/data/packages';
import { getTestimonials } from '@/lib/data/testimonials';
import { getProcessSteps } from '@/lib/data/processSteps';
import { getFaqs } from '@/lib/data/faqs';
import { getSiteSettings } from '@/lib/data/settings';

export const metadata: Metadata = {
  title: 'Bismillah Catering | Premium Wedding & Event Catering in Lahore',
  description:
    'Bismillah Catering — Lahore\'s most trusted premium catering and event management company. Specializing in weddings, barat, mehndi, walima, corporate events, birthday parties & complete event management.',
};

export default async function HomePage() {
  const [services, reasons, events, packages, testimonials, steps, faqs, settings] = await Promise.all([
    getServices(),
    getWhyChooseUsReasons(),
    getGalleryEvents(),
    getPackages(),
    getTestimonials(),
    getProcessSteps(),
    getFaqs(),
    getSiteSettings(),
  ]);

  return (
    <>
      <HeroSection whatsapp={settings.whatsapp} phone={settings.phone} />
      <MarqueeSection />
      <StatsSection />
      <WhyChooseUs reasons={reasons} />
      <ServicesSection services={services} />
      <GalleryPreview events={events} />
      <PackagesSection packages={packages} whatsapp={settings.whatsapp} />
      <TestimonialsSection testimonials={testimonials} />
      <ProcessSection steps={steps} />
      <FAQSection faqs={faqs} />
      <ContactSection settings={settings} />
    </>
  );
}
