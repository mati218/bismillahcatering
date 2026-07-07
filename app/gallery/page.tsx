import type { Metadata } from 'next';
import GalleryHero from './components/GalleryHero';
import GalleryGrid from './components/GalleryGrid';
import ContactSection from '@/components/home/ContactSection';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Browse our gallery of weddings, mehndi, barat, walima, birthday parties, corporate events, and more. See the work that makes Bismillah Catering special.',
  openGraph: {
    title: 'Gallery | Bismillah Catering',
    description: 'Photos and videos from our premium events in Lahore.',
  },
};

export default function GalleryPage() {
  return (
    <>
      <GalleryHero />
      <GalleryGrid />
      <ContactSection />
    </>
  );
}
