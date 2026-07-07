'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full border border-gold-500 animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full border border-gold-500 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="font-heading text-[140px] md:text-[200px] font-bold text-gold-500 leading-none mb-4">
            404
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
            Page Not Found
          </h1>
          <p className="font-body text-white/70 text-lg max-w-md mx-auto mb-10">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-dark font-semibold px-10 py-4 rounded-full transition-all shadow-gold text-lg"
          >
            <FaHome />
            Go Back Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
