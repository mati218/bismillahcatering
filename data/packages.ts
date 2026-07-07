export interface PackageFeature {
  text: string;
  included: boolean;
}

export interface Package {
  id: number;
  name: string;
  tier: 'silver' | 'gold' | 'platinum' | 'diamond';
  tagline: string;
  price: string;
  priceNote: string;
  featured: boolean;
  badge?: string;
  color: string;
  features: PackageFeature[];
}

export const packages: Package[] = [
  {
    id: 1,
    name: 'Silver',
    tier: 'silver',
    tagline: 'Perfect Start',
    price: 'PKR 1,50,000',
    priceNote: 'Starting from',
    featured: false,
    color: '#C0C0C0',
    features: [
      { text: 'Food for 100 Guests', included: true },
      { text: 'Basic Stage Decoration', included: true },
      { text: 'Buffet Setup', included: true },
      { text: 'Service Staff (5 Waiters)', included: true },
      { text: 'Basic Lighting', included: true },
      { text: 'Table & Chair Arrangement', included: true },
      { text: 'Professional Photography', included: false },
      { text: 'Sound System', included: false },
      { text: 'Floral Decoration', included: false },
      { text: 'Wedding Management', included: false },
      { text: 'Farmhouse Coordination', included: false },
      { text: '24/7 Support', included: false },
    ],
  },
  {
    id: 2,
    name: 'Gold',
    tier: 'gold',
    tagline: 'Popular Choice',
    price: 'PKR 3,50,000',
    priceNote: 'Starting from',
    featured: false,
    color: '#F6C945',
    features: [
      { text: 'Food for 200 Guests', included: true },
      { text: 'Premium Stage Decoration', included: true },
      { text: 'Grand Buffet Setup', included: true },
      { text: 'Service Staff (10 Waiters)', included: true },
      { text: 'Premium Lighting', included: true },
      { text: 'Table & Chair Arrangement', included: true },
      { text: 'Professional Photography', included: true },
      { text: 'Sound System', included: true },
      { text: 'Floral Decoration', included: false },
      { text: 'Wedding Management', included: false },
      { text: 'Farmhouse Coordination', included: false },
      { text: '24/7 Support', included: false },
    ],
  },
  {
    id: 3,
    name: 'Platinum',
    tier: 'platinum',
    tagline: 'Best Value',
    price: 'PKR 6,00,000',
    priceNote: 'Starting from',
    featured: true,
    badge: 'Most Popular',
    color: '#E5E4E2',
    features: [
      { text: 'Food for 400 Guests', included: true },
      { text: 'Luxury Stage Decoration', included: true },
      { text: 'Grand Buffet + Live Counters', included: true },
      { text: 'Service Staff (20 Waiters)', included: true },
      { text: 'Luxury Lighting', included: true },
      { text: 'Premium Furniture', included: true },
      { text: 'Professional Photography & Video', included: true },
      { text: 'Sound System & DJ', included: true },
      { text: 'Premium Floral Decoration', included: true },
      { text: 'Complete Wedding Management', included: true },
      { text: 'Farmhouse Coordination', included: false },
      { text: '24/7 Support', included: false },
    ],
  },
  {
    id: 4,
    name: 'Diamond',
    tier: 'diamond',
    tagline: 'Ultimate Luxury',
    price: 'PKR 12,00,000',
    priceNote: 'Starting from',
    featured: false,
    badge: 'Exclusive',
    color: '#B9F2FF',
    features: [
      { text: 'Food for 600+ Guests', included: true },
      { text: 'Grand Luxury Stage', included: true },
      { text: 'Royal Buffet + Multiple Live Counters', included: true },
      { text: 'Service Staff (30+ Waiters)', included: true },
      { text: 'Grand Lighting & Effects', included: true },
      { text: 'Royal Furniture & Decor', included: true },
      { text: 'Cinematic Photography & Videography', included: true },
      { text: 'Premium Sound & Entertainment', included: true },
      { text: 'Luxury Floral Arrangement', included: true },
      { text: 'Full Event Management', included: true },
      { text: 'Farmhouse & Venue Coordination', included: true },
      { text: '24/7 Dedicated Support', included: true },
    ],
  },
];
