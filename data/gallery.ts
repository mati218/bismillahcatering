export type GalleryCategory =
  | 'all'
  | 'wedding'
  | 'birthday'
  | 'private'
  | 'corporate'
  | 'farmhouse'
  | 'decoration'
  | 'food'
  | 'buffet'
  | 'bbq'
  | 'live-cooking';

export interface GalleryImage {
  src: string;
  caption?: string;
}

export interface GalleryEvent {
  id: number;
  title: string;
  category: GalleryCategory;
  cover: string;           // thumbnail shown in the grid
  images: GalleryImage[];  // all photos for this event
  description?: string;
  date?: string;
  featured?: boolean;
}

export const galleryCategories: { label: string; value: GalleryCategory }[] = [
  { label: 'All',          value: 'all' },
  { label: 'Wedding',      value: 'wedding' },
  { label: 'Birthday',     value: 'birthday' },
  { label: 'Private Party',value: 'private' },
  { label: 'Corporate',    value: 'corporate' },
  { label: 'Farmhouse',    value: 'farmhouse' },
  { label: 'Decoration',   value: 'decoration' },
  { label: 'Food',         value: 'food' },
  { label: 'Buffet',       value: 'buffet' },
  { label: 'BBQ',          value: 'bbq' },
  { label: 'Live Cooking', value: 'live-cooking' },
];

export const galleryEvents: GalleryEvent[] = [
  /* ─── WEDDING ─── */
  {
    id: 1,
    title: 'Grand Wedding Ceremony',
    category: 'wedding',
    cover: 'https://images.unsplash.com/photo-1519741347686-c1e331fcb4f4?w=800&q=80',
    featured: true,
    description: 'A complete luxury wedding package — stage, décor, catering, and full coordination.',
    date: 'March 2024',
    images: [
      { src: 'https://images.unsplash.com/photo-1519741347686-c1e331fcb4f4?w=1200&q=80', caption: 'Grand wedding stage with floral arch' },
      { src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=80', caption: 'Barat night lighting setup' },
      { src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1200&q=80', caption: 'Walima elegant table arrangement' },
      { src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80', caption: 'Couple stage seating area' },
      { src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=1200&q=80', caption: 'Floral entrance arch' },
    ],
  },
  {
    id: 2,
    title: 'Mehndi Night Celebration',
    category: 'wedding',
    cover: 'https://images.unsplash.com/photo-1583939411023-14783179e581?w=800&q=80',
    featured: true,
    description: 'Vibrant mehndi setup with colourful canopy, marigold garlands, and festive lighting.',
    date: 'February 2024',
    images: [
      { src: 'https://images.unsplash.com/photo-1583939411023-14783179e581?w=1200&q=80', caption: 'Mehndi canopy setup' },
      { src: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=1200&q=80', caption: 'Fairy lights and floral backdrop' },
      { src: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=1200&q=80', caption: 'Seating arrangement with floral décor' },
      { src: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&q=80', caption: 'Stage area with warm lighting' },
    ],
  },
  {
    id: 3,
    title: 'Barat Night Extravaganza',
    category: 'wedding',
    cover: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
    featured: true,
    description: 'Grand barat stage with throne seating, fireworks coordination, and full venue transformation.',
    date: 'January 2024',
    images: [
      { src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=80', caption: 'Grand barat stage' },
      { src: 'https://images.unsplash.com/photo-1519741347686-c1e331fcb4f4?w=1200&q=80', caption: 'Venue entrance decoration' },
      { src: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&q=80', caption: 'Floral welcome arch' },
      { src: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=80', caption: 'Dinner buffet setup for guests' },
      { src: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=1200&q=80', caption: 'Floral arrangements on tables' },
      { src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1200&q=80', caption: 'Reception area setup' },
    ],
  },

  /* ─── BIRTHDAY ─── */
  {
    id: 4,
    title: 'Magical Birthday Bash',
    category: 'birthday',
    cover: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
    featured: true,
    description: 'Themed birthday party with balloon arches, custom cake, and full entertainment setup.',
    date: 'April 2024',
    images: [
      { src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80', caption: 'Balloon arch birthday setup' },
      { src: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1200&q=80', caption: 'Kids themed decoration area' },
      { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80', caption: 'Cake table display' },
      { src: 'https://images.unsplash.com/photo-1578022761797-b8636ac1773c?w=1200&q=80', caption: 'Dessert and candy station' },
    ],
  },
  {
    id: 5,
    title: 'Kids Birthday Extravaganza',
    category: 'birthday',
    cover: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80',
    featured: false,
    description: 'Colourful kids party with cartoon theme, clown entertainment, and custom sweet table.',
    date: 'March 2024',
    images: [
      { src: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1200&q=80', caption: 'Kids party colour theme' },
      { src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80', caption: 'Balloon ceiling décor' },
      { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80', caption: 'Themed birthday cake' },
    ],
  },

  /* ─── CORPORATE ─── */
  {
    id: 6,
    title: 'Corporate Annual Dinner',
    category: 'corporate',
    cover: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    featured: false,
    description: 'Professional corporate dinner with full catering, AV setup, and branded stage.',
    date: 'December 2023',
    images: [
      { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80', caption: 'Corporate event hall setup' },
      { src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80', caption: 'Stage and AV equipment' },
      { src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=80', caption: 'Corporate dinner table arrangement' },
      { src: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&q=80', caption: 'Conference hi-tea spread' },
      { src: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=80', caption: 'Buffet dinner layout' },
    ],
  },
  {
    id: 7,
    title: 'Office Product Launch',
    category: 'corporate',
    cover: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
    featured: false,
    description: 'Product launch event with hi-tea service, branded backdrop, and premium catering.',
    date: 'November 2023',
    images: [
      { src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80', caption: 'Branded stage setup' },
      { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80', caption: 'Guest seating arrangement' },
      { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', caption: 'Hi-tea food spread' },
    ],
  },

  /* ─── FARMHOUSE ─── */
  {
    id: 8,
    title: 'Farmhouse Family Gala',
    category: 'farmhouse',
    cover: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
    featured: true,
    description: 'Beautiful outdoor farmhouse event with fairy lights, outdoor dining, and live BBQ.',
    date: 'October 2023',
    images: [
      { src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80', caption: 'Farmhouse outdoor setup at dusk' },
      { src: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=1200&q=80', caption: 'Open-air dining area' },
      { src: 'https://images.unsplash.com/photo-1476932799985-28b4f4cdb56a?w=1200&q=80', caption: 'Fairy light garden décor' },
      { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80', caption: 'Live BBQ counter outdoors' },
      { src: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1200&q=80', caption: 'Grill master at work' },
    ],
  },

  /* ─── DECORATION ─── */
  {
    id: 9,
    title: 'Luxury Stage Decoration',
    category: 'decoration',
    cover: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80',
    featured: true,
    description: 'Grand stage with towering floral arch, LED curtain lighting, and velvet draping.',
    date: 'September 2023',
    images: [
      { src: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&q=80', caption: 'Stage floral arch design' },
      { src: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=1200&q=80', caption: 'Detailed floral arrangements' },
      { src: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=1200&q=80', caption: 'Fairy light backdrop' },
      { src: 'https://images.unsplash.com/photo-1519741347686-c1e331fcb4f4?w=1200&q=80', caption: 'Full stage view' },
      { src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1200&q=80', caption: 'Table centrepieces' },
      { src: 'https://images.unsplash.com/photo-1583939411023-14783179e581?w=1200&q=80', caption: 'Entrance floral welcome' },
    ],
  },
  {
    id: 10,
    title: 'Floral Arch & Table Décor',
    category: 'decoration',
    cover: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&q=80',
    featured: false,
    description: 'Premium floral arches, centrepieces, and table dressings for a grand celebration.',
    date: 'August 2023',
    images: [
      { src: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=1200&q=80', caption: 'Premium floral arch' },
      { src: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&q=80', caption: 'Stage entrance arch' },
      { src: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=1200&q=80', caption: 'Centrepiece floral design' },
    ],
  },

  /* ─── FOOD ─── */
  {
    id: 11,
    title: 'Premium Food Showcase',
    category: 'food',
    cover: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    featured: false,
    description: 'Exquisite food presentation by our expert chefs for a 300-guest wedding dinner.',
    date: 'July 2023',
    images: [
      { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80', caption: 'Main course display' },
      { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', caption: 'Dessert station' },
      { src: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=80', caption: 'Full food spread layout' },
      { src: 'https://images.unsplash.com/photo-1476932799985-28b4f4cdb56a?w=1200&q=80', caption: 'Fresh salad and starters' },
    ],
  },

  /* ─── BUFFET ─── */
  {
    id: 12,
    title: 'Royal Buffet for 500 Guests',
    category: 'buffet',
    cover: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80',
    featured: true,
    description: 'Grand tiered buffet display with live counters and uniformed service staff.',
    date: 'June 2023',
    images: [
      { src: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=80', caption: 'Full buffet display setup' },
      { src: 'https://images.unsplash.com/photo-1476932799985-28b4f4cdb56a?w=1200&q=80', caption: 'Live counter with chef service' },
      { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80', caption: 'Premium main course display' },
      { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', caption: 'Dessert and sweet station' },
      { src: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1200&q=80', caption: 'Live BBQ counter at buffet' },
    ],
  },

  /* ─── BBQ ─── */
  {
    id: 13,
    title: 'Sizzling BBQ Night',
    category: 'bbq',
    cover: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    featured: true,
    description: 'Live BBQ stations with expert grill masters, premium cuts, and chef performances.',
    date: 'May 2023',
    images: [
      { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80', caption: 'Live BBQ station setup' },
      { src: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1200&q=80', caption: 'Chef grilling premium cuts' },
      { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80', caption: 'BBQ platter presentation' },
      { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', caption: 'Meat display counter' },
    ],
  },
  {
    id: 14,
    title: 'Outdoor BBQ Party',
    category: 'bbq',
    cover: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80',
    featured: false,
    description: 'Outdoor BBQ party at a farmhouse with live grilling, music, and premium service.',
    date: 'April 2023',
    images: [
      { src: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1200&q=80', caption: 'Outdoor grill setup' },
      { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80', caption: 'Evening BBQ ambiance' },
      { src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80', caption: 'Farmhouse setting at night' },
    ],
  },

  /* ─── LIVE COOKING ─── */
  {
    id: 15,
    title: 'Live Cooking Show',
    category: 'live-cooking',
    cover: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    featured: false,
    description: 'Interactive live cooking demonstration with chef performance and audience engagement.',
    date: 'March 2023',
    images: [
      { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80', caption: 'Chef performing live cooking' },
      { src: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1200&q=80', caption: 'Live kitchen station' },
      { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', caption: 'Freshly plated dishes' },
      { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80', caption: 'Course presentation' },
    ],
  },

  /* ─── PRIVATE ─── */
  {
    id: 16,
    title: 'Engagement Ceremony',
    category: 'private',
    cover: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&q=80',
    featured: true,
    description: 'Romantic engagement ceremony with floral décor, ring exchange stage, and premium catering.',
    date: 'February 2023',
    images: [
      { src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=1200&q=80', caption: 'Engagement ring exchange stage' },
      { src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80', caption: 'Romantic floral backdrop' },
      { src: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=1200&q=80', caption: 'Floral centrepiece design' },
      { src: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=80', caption: 'Engagement dinner spread' },
      { src: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=1200&q=80', caption: 'Fairy light canopy' },
    ],
  },
  {
    id: 17,
    title: 'Exclusive Private Party',
    category: 'private',
    cover: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
    featured: false,
    description: 'Intimate private gathering with luxury decoration, personalised menu, and dedicated staff.',
    date: 'January 2023',
    images: [
      { src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80', caption: 'Private party hall setup' },
      { src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=1200&q=80', caption: 'Intimate floral décor' },
      { src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1200&q=80', caption: 'Dinner table arrangement' },
    ],
  },
];

// ── backward-compat: flat list used by GalleryPreview homepage ──
export const galleryItems = galleryEvents.map((e) => ({
  id: e.id,
  title: e.title,
  category: e.category,
  type: 'image' as const,
  image: e.cover,
  description: e.description,
  featured: e.featured,
}));
