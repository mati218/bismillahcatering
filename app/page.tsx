import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import MarqueeSection from '@/components/home/MarqueeSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import GalleryPreview from '@/components/home/GalleryPreview';
import PackagesSection from '@/components/home/PackagesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ProcessSection from '@/components/home/ProcessSection';
import FAQSection from '@/components/home/FAQSection';
import ContactSection from '@/components/home/ContactSection';
import StatsSection from '@/components/home/StatsSection';

export const metadata: Metadata = {
  title: 'Bismillah Catering | Premium Wedding & Event Catering in Lahore',
  description:
    'Bismillah Catering — Lahore\'s most trusted premium catering and event management company. Specializing in weddings, barat, mehndi, walima, corporate events, birthday parties & complete event management.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <StatsSection />
      <WhyChooseUs />
      <GalleryPreview />
      <PackagesSection />
      <TestimonialsSection />
      <ProcessSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
