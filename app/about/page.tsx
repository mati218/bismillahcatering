import type { Metadata } from 'next';
import AboutHero from './components/AboutHero';
import AboutStory from './components/AboutStory';
import AboutValues from './components/AboutValues';
import AboutTeam from './components/AboutTeam';
import StatsSection from '@/components/home/StatsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ContactSection from '@/components/home/ContactSection';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Bismillah Catering — our story, mission, and the team behind Lahore\'s premium event management company. Over 10 years of excellence.',
  openGraph: {
    title: 'About Bismillah Catering | Our Story & Mission',
    description: 'Premium catering company in Lahore with 10+ years of experience in weddings and events.',
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <StatsSection />
      <AboutValues />
      <AboutTeam />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
