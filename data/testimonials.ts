export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  review: string;
  event: string;
  image: string;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Ayesha & Usman Khan',
    location: 'Lahore, Pakistan',
    rating: 5,
    review: 'Bismillah Catering made our wedding absolutely magical! The food was delicious, the decoration was stunning, and their team was incredibly professional. Every detail was perfect. Highly recommended!',
    event: 'Wedding Ceremony',
    image: '/images/testimonials/t1.jpg',
    date: 'March 2024',
  },
  {
    id: 2,
    name: 'Ahmed Raza',
    location: 'Lahore, Pakistan',
    rating: 5,
    review: 'We hired them for our corporate dinner and they exceeded all expectations. The buffet setup was world-class, the staff was polite, and the food quality was exceptional. Will definitely book again.',
    event: 'Corporate Event',
    image: '/images/testimonials/t2.jpg',
    date: 'January 2024',
  },
  {
    id: 3,
    name: 'Sana Malik',
    location: 'Lahore, Pakistan',
    rating: 5,
    review: 'Our daughter\'s birthday party was a dream come true! The decoration was so beautiful, the food was fresh and tasty. Kids absolutely loved it. Thank you Bismillah Catering for making it special!',
    event: 'Birthday Party',
    image: '/images/testimonials/t3.jpg',
    date: 'February 2024',
  },
  {
    id: 4,
    name: 'Tariq & Nadia Hassan',
    location: 'Islamabad, Pakistan',
    rating: 5,
    review: 'We came from Islamabad and were so impressed by their work. The walima decoration was breathtaking. Food was served hot and fresh. Team was punctual and professional. 10/10 experience!',
    event: 'Walima Ceremony',
    image: '/images/testimonials/t4.jpg',
    date: 'April 2024',
  },
  {
    id: 5,
    name: 'Bilal Chaudhry',
    location: 'Lahore, Pakistan',
    rating: 5,
    review: 'Their farmhouse event service is top-notch. They handled everything from decoration to catering to photography. The BBQ live station was a highlight. Guests were thoroughly impressed!',
    event: 'Farmhouse Event',
    image: '/images/testimonials/t5.jpg',
    date: 'May 2024',
  },
  {
    id: 6,
    name: 'Zara & Hamza Sheikh',
    location: 'Lahore, Pakistan',
    rating: 5,
    review: 'The mehndi decoration was absolutely gorgeous! Traditional yet modern, exactly what we envisioned. The catering team was efficient and the food was delicious. Cannot thank them enough!',
    event: 'Mehndi Night',
    image: '/images/testimonials/t6.jpg',
    date: 'June 2024',
  },
];
