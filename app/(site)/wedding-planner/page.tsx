import type { Metadata } from 'next';
import ProcessSection from '@/components/home/ProcessSection';
import PackagesSection from '@/components/home/PackagesSection';
import ContactSection from '@/components/home/ContactSection';
import { getProcessSteps } from '@/lib/data/processSteps';
import { getPackages } from '@/lib/data/packages';
import { getSiteSettings } from '@/lib/data/settings';

export const metadata: Metadata = {
  title: 'Wedding Planner',
  description: 'Complete wedding planning in Lahore. From mehndi to walima, Bismillah Catering handles every detail of your wedding with luxury service and expert coordination.',
};

export default async function WeddingPlannerPage() {
  const [steps, packages, settings] = await Promise.all([getProcessSteps(), getPackages(), getSiteSettings()]);

  return (
    <>
      <section className="relative pt-36 pb-24 bg-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full border border-gold-500 animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full border border-gold-500 animate-float" style={{ animationDelay: '2s' }} />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="inline-block font-body text-xs font-semibold tracking-[0.3em] uppercase bg-gold-500/10 border border-gold-500/30 text-gold-400 px-5 py-2 rounded-full mb-6">
            Complete Wedding Services
          </span>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
            Your Perfect <span className="text-gold-500">Wedding Planner</span>
          </h1>
          <p className="font-body text-white/70 text-lg max-w-2xl mx-auto mb-8">
            We handle every detail of your wedding — from mehndi to barat to walima — with luxury service and expert coordination.
          </p>
          <a
            href={`https://wa.me/${settings.whatsapp}?text=Hello! I want to plan my wedding.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-dark font-semibold px-10 py-4 rounded-full transition-all shadow-gold text-lg"
          >
            Plan My Wedding
          </a>
          <nav className="flex items-center justify-center gap-2 mt-8 font-body text-sm text-white/50">
            <a href="/" className="hover:text-gold-500 transition-colors">Home</a>
            <span>/</span>
            <span className="text-gold-500">Wedding Planner</span>
          </nav>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl font-bold text-dark mb-4">
              Complete <span className="text-gold-500">Wedding Ceremonies</span>
            </h2>
            <p className="font-body text-dark/60 text-lg max-w-2xl mx-auto">
              From the first ceremony to the last, we manage every moment with perfection.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Mehndi', emoji: '🌸', desc: 'Vibrant and colorful mehndi setup with traditional canopy and festive décor.' },
              { name: 'Barat', emoji: '👑', desc: 'Grand barat with premium stage, doli/carriage, fireworks and complete management.' },
              { name: 'Walima', emoji: '💐', desc: 'Elegant walima ceremony with sophisticated décor and premium dining experience.' },
              { name: 'Nikkah', emoji: '📖', desc: 'Sacred nikkah arrangement with traditional décor and graceful ambiance.' },
              { name: 'Engagement', emoji: '💍', desc: 'Romantic engagement setup with ring ceremony arrangement and premium catering.' },
              { name: 'Aqeeqah', emoji: '🤲', desc: 'Traditional aqeeqah ceremony with complete catering and family gathering management.' },
            ].map((ceremony) => (
              <div key={ceremony.name} className="bg-white rounded-2xl p-8 shadow-card border border-gray-100 hover:border-gold-500/30 text-center transition-all group hover:-translate-y-2 duration-300">
                <div className="text-5xl mb-4">{ceremony.emoji}</div>
                <h3 className="font-heading text-xl font-bold text-dark mb-2 group-hover:text-gold-600 transition-colors">{ceremony.name}</h3>
                <p className="font-body text-dark/60 text-sm leading-relaxed">{ceremony.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProcessSection steps={steps} />
      <PackagesSection packages={packages} whatsapp={settings.whatsapp} />
      <ContactSection settings={settings} />
    </>
  );
}
