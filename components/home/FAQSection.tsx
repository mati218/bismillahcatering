'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations';
import SectionHeader from '@/components/common/SectionHeader';

const faqs = [
  {
    question: 'What areas do you serve in Lahore?',
    answer: 'We serve all areas in Lahore and surrounding regions including Islamabad, Rawalpindi, and other cities in Punjab. Our mobile catering team can reach any location for your event.',
  },
  {
    question: 'How far in advance should I book?',
    answer: 'We recommend booking at least 2-3 months in advance for weddings and large events. For smaller events, 2-4 weeks advance booking is usually sufficient. However, contact us as we often accommodate last-minute requests.',
  },
  {
    question: 'Can I customize the menu for my event?',
    answer: 'Absolutely! All our menus are fully customizable. We work with you to create the perfect menu based on your preferences, cuisine type, dietary requirements, and guest count.',
  },
  {
    question: 'Do you provide decoration services along with catering?',
    answer: 'Yes! We are a complete event management company. We provide stage decoration, floral arrangements, lighting, furniture, tableware, and everything needed for a complete event setup.',
  },
  {
    question: 'What is included in your wedding packages?',
    answer: 'Our wedding packages include catering, stage decoration, buffet setup, service staff, lighting, and event coordination. Each package is different — please check our packages section or contact us for detailed information.',
  },
  {
    question: 'Do you offer outdoor catering services?',
    answer: 'Yes, we specialize in both indoor and outdoor catering. Our team has all the equipment needed for outdoor events including marquees, mobile kitchens, generators, and complete outdoor setup.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept cash, bank transfers, and all major payment methods. We require a deposit to confirm your booking, with the balance due before or on the event day.',
  },
  {
    question: 'Can you handle events with 1000+ guests?',
    answer: 'Yes, we have the capacity and experience to manage large-scale events with 500 to 2000+ guests. Our team scales to meet the needs of any event size.',
  },
];

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

function FAQItem({ question, answer, index }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={staggerItem}
      className="border border-gray-200 hover:border-gold-500/40 rounded-xl overflow-hidden transition-colors duration-300"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left bg-white hover:bg-gold-500/5 transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <span className="font-heading font-semibold text-dark text-base md:text-lg">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isOpen ? 'bg-gold-500 text-dark' : 'bg-gray-100 text-dark/50'
          }`}
        >
          {isOpen ? <FaMinus className="text-xs" /> : <FaPlus className="text-xs" />}
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-5 md:px-6 pb-5 md:pb-6 bg-white border-t border-gray-100">
              <p className="font-body text-dark/70 text-sm md:text-base leading-relaxed pt-4">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  return (
    <section className="py-24 bg-[#FAFAFA]" aria-label="Frequently Asked Questions">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about our catering and event management services."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-3xl mx-auto space-y-3"
        >
          {faqs.map((faq, i) => (
            <FAQItem key={i} {...faq} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
