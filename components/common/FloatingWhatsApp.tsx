'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { getWhatsAppUrl } from '@/lib/utils';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || '923000000000';
  const message = 'Hello! I would like to inquire about your catering and event services.';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="bg-white rounded-2xl shadow-luxury p-4 w-64 mr-2"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <FaWhatsapp className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-dark text-sm">Bismillah Catering</p>
                  <p className="text-green-500 text-xs">● Online</p>
                </div>
              </div>
              <button
                onClick={() => setShowTooltip(false)}
                className="text-dark/40 hover:text-dark transition-colors"
                aria-label="Close"
              >
                <FaTimes />
              </button>
            </div>
            <p className="text-dark/70 text-sm mb-3">
              👋 Hello! How can we help you plan your perfect event?
            </p>
            <a
              href={getWhatsAppUrl(whatsapp, message)}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-500 hover:bg-green-600 text-white text-center font-semibold py-2 rounded-full text-sm transition-colors"
            >
              Start Chat
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowTooltip(!showTooltip)}
        className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-luxury flex items-center justify-center text-white text-2xl animate-pulse-gold relative"
        aria-label="Open WhatsApp Chat"
      >
        <FaWhatsapp />
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" />
      </motion.button>
    </div>
  );
}
