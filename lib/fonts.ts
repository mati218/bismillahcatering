/**
 * Font configuration
 * Using next/font/google with preconnect disabled fallback to system fonts
 * when network is unavailable at build time.
 */

// We use CSS @import in globals.css for the actual Google Fonts loading at runtime.
// These exported variables provide the CSS variable names for Tailwind.

export const fontVariables = {
  inter: '--font-inter',
  playfair: '--font-playfair',
  cormorant: '--font-cormorant',
};
