import type { Metadata } from 'next';
import ContactSection from '@/components/home/ContactSection';
import { getSiteSettings } from '@/lib/data/settings';

export const metadata: Metadata = {
  title: 'Farmhouse Events',
  description: 'Premium farmhouse event management in Lahore. Complete outdoor setup, catering, decoration and coordination for unforgettable farmhouse celebrations.',
};

export default async function FarmhousePage() {
  const settings = await getSiteSettings();

  return (
    <>
      <section className="relative pt-36 pb-24 bg-dark overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block font-body text-xs font-semibold tracking-[0.3em] uppercase bg-gold-500/10 border border-gold-500/30 text-gold-400 px-5 py-2 rounded-full mb-6">
            Outdoor Events
          </span>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
            <span className="text-gold-500">Farmhouse</span> Events
          </h1>
          <p className="font-body text-white/70 text-lg max-w-2xl mx-auto">
            Magical outdoor celebrations with complete setup, catering, and premium decoration.
          </p>
          <nav className="flex items-center justify-center gap-2 mt-6 font-body text-sm text-white/50">
            <a href="/" className="hover:text-gold-500 transition-colors">Home</a>
            <span>/</span>
            <span className="text-gold-500">Farmhouse Events</span>
          </nav>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold text-dark mb-6">
              Make Your Farmhouse Event <span className="text-gold-500">Unforgettable</span>
            </h2>
            <p className="font-body text-dark/70 text-lg leading-relaxed mb-8">
              Bismillah Catering specializes in complete farmhouse event management. We handle everything from venue setup to catering to photography — ensuring your outdoor event is as stunning as you imagined.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              {[
                'Complete outdoor setup and decoration', 'Premium catering with live stations',
                'Furniture, lighting & sound system', 'Stage and backdrop decoration',
                'Photography & videography', 'Event coordination & management',
                'BBQ and live cooking stations', 'Floral arrangements & centerpieces',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 font-body text-dark/80">
                  <span className="w-6 h-6 rounded-full bg-gold-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-dark" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <ContactSection settings={settings} />
    </>
  );
}
