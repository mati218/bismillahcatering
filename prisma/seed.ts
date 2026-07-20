import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { services } from './seed-data/services';
import { packages } from './seed-data/packages';
import { galleryEvents } from './seed-data/gallery';
import { testimonials } from './seed-data/testimonials';

const prisma = new PrismaClient();

const whyChooseUsReasons = [
  { icon: 'FaLeaf', title: 'Fresh Food Always', description: 'We use only the freshest ingredients, prepared on the day of your event for maximum taste and quality.', color: '#22c55e' },
  { icon: 'FaUsers', title: 'Professional Team', description: 'Our trained team of chefs, decorators, and managers ensures flawless execution of every event.', color: '#3b82f6' },
  { icon: 'FaTag', title: 'Affordable Packages', description: 'Premium quality at competitive prices. Customizable packages to fit every budget without compromise.', color: '#f59e0b' },
  { icon: 'FaGem', title: 'Luxury Decoration', description: 'World-class décor with premium materials, floral arrangements, and lighting that transforms any venue.', color: '#8b5cf6' },
  { icon: 'FaUserTie', title: 'Experienced Staff', description: 'Over 10 years of experience with a dedicated team that has mastered the art of event management.', color: '#ec4899' },
  { icon: 'FaClock', title: 'On-Time Service', description: 'We believe punctuality is key. Every setup, service, and delivery is completed on schedule.', color: '#14b8a6' },
  { icon: 'FaHeart', title: 'Complete Wedding Planning', description: 'From engagement to walima — we manage every ceremony with care, love, and attention to detail.', color: '#ef4444' },
  { icon: 'FaHome', title: 'Farmhouse Management', description: 'Expert farmhouse event coordination with full outdoor setup, décor, and catering services.', color: '#f97316' },
];

const processSteps = [
  { number: '01', icon: 'FaPhone', title: 'Contact Us', description: 'Reach out via phone, WhatsApp, or our contact form. Share your event vision and requirements.', color: '#F6C945' },
  { number: '02', icon: 'FaClipboardList', title: 'Planning Session', description: 'We meet with you to plan every detail — menu, décor, theme, guest list, and timeline.', color: '#3b82f6' },
  { number: '03', icon: 'FaTools', title: 'Execution', description: 'Our professional team sets up everything with precision, ensuring nothing is overlooked.', color: '#22c55e' },
  { number: '04', icon: 'FaGlassCheers', title: 'Enjoy Your Event', description: 'Relax and enjoy your special day while we handle all the details for you.', color: '#ec4899' },
];

const faqs = [
  { question: 'What areas do you serve in Lahore?', answer: 'We serve all areas in Lahore and surrounding regions including Islamabad, Rawalpindi, and other cities in Punjab. Our mobile catering team can reach any location for your event.' },
  { question: 'How far in advance should I book?', answer: 'We recommend booking at least 2-3 months in advance for weddings and large events. For smaller events, 2-4 weeks advance booking is usually sufficient. However, contact us as we often accommodate last-minute requests.' },
  { question: 'Can I customize the menu for my event?', answer: 'Absolutely! All our menus are fully customizable. We work with you to create the perfect menu based on your preferences, cuisine type, dietary requirements, and guest count.' },
  { question: 'Do you provide decoration services along with catering?', answer: 'Yes! We are a complete event management company. We provide stage decoration, floral arrangements, lighting, furniture, tableware, and everything needed for a complete event setup.' },
  { question: 'What is included in your wedding packages?', answer: 'Our wedding packages include catering, stage decoration, buffet setup, service staff, lighting, and event coordination. Each package is different — please check our packages section or contact us for detailed information.' },
  { question: 'Do you offer outdoor catering services?', answer: 'Yes, we specialize in both indoor and outdoor catering. Our team has all the equipment needed for outdoor events including marquees, mobile kitchens, generators, and complete outdoor setup.' },
  { question: 'What payment methods do you accept?', answer: 'We accept cash, bank transfers, and all major payment methods. We require a deposit to confirm your booking, with the balance due before or on the event day.' },
  { question: 'Can you handle events with 1000+ guests?', answer: 'Yes, we have the capacity and experience to manage large-scale events with 500 to 2000+ guests. Our team scales to meet the needs of any event size.' },
];

const socialLinks = [
  { platform: 'Facebook', url: process.env.NEXT_PUBLIC_FACEBOOK || 'https://www.facebook.com/bismillahcatering', icon: 'FaFacebook', order: 1 },
  { platform: 'Instagram', url: process.env.NEXT_PUBLIC_INSTAGRAM || 'https://www.instagram.com/bismillahcaterers.pk/', icon: 'FaInstagram', order: 2 },
  { platform: 'YouTube', url: process.env.NEXT_PUBLIC_YOUTUBE || 'https://www.youtube.com/@bismillahcatering', icon: 'FaYoutube', order: 3 },
  { platform: 'TikTok', url: process.env.NEXT_PUBLIC_TIKTOK || 'https://www.tiktok.com/@bismillahcatering', icon: 'FaTiktok', order: 4 },
];

async function main() {
  // ── Admin user ──
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@bismillahcatering.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: { email: adminEmail, passwordHash, name: 'Admin' },
  });
  console.log(`Admin user ready: ${adminEmail}`);

  // ── Site settings (singleton) ──
  await prisma.siteSetting.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      companyName: process.env.NEXT_PUBLIC_COMPANY_NAME || 'Bismillah Catering',
      phone: process.env.NEXT_PUBLIC_PHONE || '+92-300-0000000',
      whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '923000000000',
      email: process.env.NEXT_PUBLIC_EMAIL || 'info@bismillahcatering.com',
      address: process.env.NEXT_PUBLIC_LOCATION || 'Lahore, Pakistan',
      googleMapUrl: process.env.NEXT_PUBLIC_GOOGLE_MAP || '#',
      aboutText:
        "Since 2014, Bismillah Catering has been the go-to choice for weddings, corporate events, and private parties across Lahore. Our commitment to quality and service has earned us the trust of over 1000 families.",
      foundedYear: 2014,
    },
  });
  console.log('Site settings ready');

  // ── Services ──
  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {},
      create: {
        title: s.title,
        slug: s.slug,
        description: s.description,
        longDescription: s.longDescription,
        icon: s.icon,
        image: s.image,
        startingPrice: s.startingPrice,
        features: s.features,
        idealFor: s.idealFor,
        order: s.id,
        gallery: {
          create: s.gallery.map((g, i) => ({ src: g.src, alt: g.alt, type: g.type, order: i })),
        },
        highlights: {
          create: s.highlights.map((h, i) => ({ icon: h.icon, title: h.title, description: h.description, order: i })),
        },
      },
    });
  }
  console.log(`Seeded ${services.length} services`);

  // ── Packages ──
  for (const p of packages) {
    const existing = await prisma.package.findFirst({ where: { name: p.name } });
    if (existing) continue;
    await prisma.package.create({
      data: {
        name: p.name,
        tier: p.tier,
        tagline: p.tagline,
        price: p.price,
        priceNote: p.priceNote,
        featured: p.featured,
        badge: p.badge,
        color: p.color,
        order: p.id,
        features: {
          create: p.features.map((f, i) => ({ text: f.text, included: f.included, order: i })),
        },
      },
    });
  }
  console.log(`Seeded ${packages.length} packages`);

  // ── Gallery ──
  for (const e of galleryEvents) {
    const existing = await prisma.galleryEvent.findFirst({ where: { title: e.title } });
    if (existing) continue;
    await prisma.galleryEvent.create({
      data: {
        title: e.title,
        category: e.category,
        cover: e.cover,
        description: e.description,
        date: e.date,
        featured: e.featured ?? false,
        order: e.id,
        images: {
          create: e.images.map((img, i) => ({ src: img.src, caption: img.caption, order: i })),
        },
      },
    });
  }
  console.log(`Seeded ${galleryEvents.length} gallery events`);

  // ── Testimonials ──
  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({ where: { name: t.name, event: t.event } });
    if (existing) continue;
    await prisma.testimonial.create({
      data: {
        name: t.name,
        location: t.location,
        rating: t.rating,
        review: t.review,
        event: t.event,
        image: t.image,
        date: t.date,
        order: t.id,
      },
    });
  }
  console.log(`Seeded ${testimonials.length} testimonials`);

  // ── Why Choose Us ──
  const wcuCount = await prisma.whyChooseUsReason.count();
  if (wcuCount === 0) {
    await prisma.whyChooseUsReason.createMany({
      data: whyChooseUsReasons.map((r, i) => ({ ...r, order: i })),
    });
  }
  console.log('Seeded why-choose-us reasons');

  // ── Process steps ──
  const stepCount = await prisma.processStep.count();
  if (stepCount === 0) {
    await prisma.processStep.createMany({
      data: processSteps.map((s, i) => ({ ...s, order: i })),
    });
  }
  console.log('Seeded process steps');

  // ── FAQs ──
  const faqCount = await prisma.faq.count();
  if (faqCount === 0) {
    await prisma.faq.createMany({
      data: faqs.map((f, i) => ({ ...f, order: i })),
    });
  }
  console.log('Seeded FAQs');

  // ── Social links ──
  const socialCount = await prisma.socialLink.count();
  if (socialCount === 0) {
    await prisma.socialLink.createMany({ data: socialLinks });
  }
  console.log('Seeded social links');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
