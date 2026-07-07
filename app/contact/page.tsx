import type { Metadata } from 'next';
import ContactHero from './components/ContactHero';
import ContactSection from '@/components/home/ContactSection';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact Bismillah Catering for booking inquiries, quotes, and event planning. Located in Nespak Housing Society, Lahore.',
  openGraph: {
    title: 'Contact | Bismillah Catering',
    description: 'Get in touch with our team to plan your perfect event.',
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactSection />
    </>
  );
}
