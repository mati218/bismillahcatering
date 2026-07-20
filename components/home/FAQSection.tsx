'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations';
import SectionHeader from '@/components/common/SectionHeader';
import type { getFaqs } from '@/lib/data/faqs';

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
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
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

export default function FAQSection({ faqs }: { faqs: Awaited<ReturnType<typeof getFaqs>> }) {
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
            <FAQItem key={faq.id} question={faq.question} answer={faq.answer} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
