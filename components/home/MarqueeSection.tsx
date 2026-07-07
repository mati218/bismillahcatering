'use client';

const items = [
  'Wedding Planning', '✦', 'Catering Services', '✦', 'Stage Decoration', '✦',
  'Mehndi Setup', '✦', 'Barat Setup', '✦', 'Walima Setup', '✦',
  'Birthday Parties', '✦', 'Corporate Events', '✦', 'Farmhouse Events', '✦',
  'Live BBQ', '✦', 'Buffet Setup', '✦', 'Outdoor Catering', '✦',
];

export default function MarqueeSection() {
  return (
    <div className="bg-gold-500 py-4 overflow-hidden" aria-hidden="true">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="font-body text-dark font-semibold text-sm mx-4 uppercase tracking-wider flex-shrink-0">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
