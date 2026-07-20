import { getSiteSettings } from '@/lib/data/settings';
import { PageHeader } from '@/components/admin/ui';
import SettingsForm from '@/components/admin/settings/SettingsForm';

export const metadata = { title: 'Site Settings' };

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <PageHeader title="Site Settings" description="Manage company info, contact details, and address shown across the site." />
      <SettingsForm
        initial={{
          companyName: settings.companyName,
          phone: settings.phone,
          whatsapp: settings.whatsapp,
          email: settings.email,
          address: settings.address,
          googleMapUrl: settings.googleMapUrl,
          logoUrl: settings.logoUrl,
          ogImageUrl: settings.ogImageUrl,
          aboutText: settings.aboutText,
          foundedYear: settings.foundedYear,
        }}
      />
    </div>
  );
}
