import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/common/FloatingWhatsApp';
import { getSiteSettings } from '@/lib/data/settings';
import { getSocialLinks } from '@/lib/data/socialLinks';
import { getServices } from '@/lib/data/services';

// Re-fetch content from the DB at most once a minute so admin panel edits
// show up on the live site without requiring a full rebuild/redeploy.
export const revalidate = 60;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, socialLinks, services] = await Promise.all([
    getSiteSettings(),
    getSocialLinks(),
    getServices(),
  ]);

  return (
    <>
      <Navbar settings={settings} services={services} />
      <main>{children}</main>
      <Footer settings={settings} socialLinks={socialLinks} />
      <FloatingWhatsApp whatsapp={settings.whatsapp} />
    </>
  );
}
