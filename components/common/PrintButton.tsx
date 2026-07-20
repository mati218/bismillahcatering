'use client';

import { FaPrint } from 'react-icons/fa';

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="print:hidden inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-dark font-semibold px-6 py-3 rounded-full transition-colors"
    >
      <FaPrint /> Print / Save as PDF
    </button>
  );
}
