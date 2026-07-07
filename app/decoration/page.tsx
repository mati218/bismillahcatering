import type { Metadata } from 'next';
import ContactSection from '@/components/home/ContactSection';

export const metadata: Metadata = {
  title: 'Event Decoration',
  description: 'Luxury event decoration services in Lahore. Stage decoration, floral arrangements, lighting, mehndi setup, barat, walima, and complete venue transformation.',
};

export default function DecorationPage() {
  return (
    <>
      <section className="relative pt-36 pb-24 bg-dark overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block font-body text-xs font-semibold tracking-[0.3em] uppercase bg-gold-500/10 border border-gold-500/30 text-gold-400 px-5 py-2 rounded-full mb-6">
            Premium Décor
          </span>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
            Event <span className="text-gold-500">Decoration</span>
          </h1>
          <p className="font-body text-white/70 text-lg max-w-2xl mx-auto">
            Transforming venues into breathtaking spaces with luxury décor and creative artistry.
          </p>
          <nav className="flex items-center justify-center gap-2 mt-6 font-body text-sm text-white/50">
            <a href="/" className="hover:text-gold-500 transition-colors">Home</a>
            <span>/</span>
            <span className="text-gold-500">Decoration</span>
          </nav>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Stage Decoration', desc: 'Grand stages with premium backdrops, floral arches, and luxury lighting effects.' },
              { title: 'Mehndi Setup', desc: 'Colorful and vibrant mehndi setups with traditional canopy and festive decorations.' },
              { title: 'Barat Night', desc: 'Grand barat decoration with premium backdrop, carriage, and spectacular lighting.' },
              { title: 'Walima Décor', desc: 'Elegant and sophisticated walima decoration with white, gold, and floral themes.' },
              { title: 'Engagement Setup', desc: 'Romantic engagement ceremony with premium décor and ring ceremony arrangement.' },
              { title: 'Venue Transformation', desc: 'Complete venue transformation with custom themes, lighting, and floral arrangements.' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-7 shadow-card border border-gray-100 hover:border-gold-500/30 transition-all group">
                <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center text-dark font-heading font-bold text-lg mb-4 group-hover:scale-110 transition-transform">★</div>
                <h3 className="font-heading text-xl font-bold text-dark mb-2">{item.title}</h3>
                <p className="font-body text-dark/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ContactSection />
    </>
  );
}
