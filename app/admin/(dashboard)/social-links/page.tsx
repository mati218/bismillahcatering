import { prisma } from '@/lib/prisma';
import { PageHeader } from '@/components/admin/ui';
import SocialLinkManager from '@/components/admin/social-links/SocialLinkManager';

export const metadata = { title: 'Social Links' };

export default async function AdminSocialLinksPage() {
  const links = await prisma.socialLink.findMany({ orderBy: { order: 'asc' } });

  return (
    <div>
      <PageHeader title="Social Links" description="Manage the social media links shown in the footer." />
      <SocialLinkManager initial={links} />
    </div>
  );
}
