import type { Metadata } from 'next';
import BookingForm from './components/BookingForm';
import { getSiteSettings } from '@/lib/data/settings';

export const metadata: Metadata = {
  title: 'Book Your Event',
  description:
    'Book your dream event with Bismillah Catering. Fill out our quick booking form and our team will get back to you within 24 hours.',
};

export default async function BookingPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <section className="relative pt-36 pb-16 bg-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full border border-gold-500 animate-float" />
          <div
            className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full border border-gold-500 animate-float"
            style={{ animationDelay: '2s' }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block font-body text-xs font-semibold tracking-[0.3em] uppercase bg-gold-500/10 border border-gold-500/30 text-gold-400 px-5 py-2 rounded-full mb-6">
            Reserve Your Date
          </span>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
            Book Your <span className="text-gold-500">Event</span>
          </h1>
          <p className="font-body text-white/70 text-lg max-w-2xl mx-auto">
            Tell us about your event and we&apos;ll craft the perfect experience for you.
          </p>
          <nav
            className="flex items-center justify-center gap-2 mt-6 font-body text-sm text-white/50"
            aria-label="Breadcrumb"
          >
            <a href="/" className="hover:text-gold-500 transition-colors">
              Home
            </a>
            <span>/</span>
            <span className="text-gold-500">Book Event</span>
          </nav>
        </div>
      </section>
      <BookingForm whatsapp={settings.whatsapp} />
    </>
  );
}
