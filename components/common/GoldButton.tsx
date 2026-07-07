'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GoldButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  external?: boolean;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  icon?: ReactNode;
  iconRight?: boolean;
}

export default function GoldButton({
  children,
  href,
  onClick,
  variant = 'solid',
  size = 'md',
  external = false,
  className,
  type = 'button',
  disabled = false,
  icon,
  iconRight = false,
}: GoldButtonProps) {
  const sizeClasses = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-7 py-3 text-base',
    lg: 'px-10 py-4 text-lg',
  };

  const variantClasses = {
    solid: 'bg-gold-500 hover:bg-gold-600 text-dark border-2 border-gold-500 shadow-gold hover:shadow-gold-lg',
    outline: 'bg-transparent hover:bg-gold-500 text-white hover:text-dark border-2 border-gold-500',
    ghost: 'bg-transparent hover:bg-gold-500/10 text-gold-500 border-2 border-transparent',
  };

  const baseClasses = cn(
    'relative inline-flex items-center justify-center gap-2.5 font-body font-semibold rounded-full transition-all duration-300 overflow-hidden',
    sizeClasses[size],
    variantClasses[variant],
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
  );

  const content = (
    <>
      {/* Ripple background */}
      <span className="absolute inset-0 rounded-full bg-white/0 hover:bg-white/10 transition-colors duration-300" />
      {icon && !iconRight && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
      {icon && iconRight && <span className="relative z-10">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="inline-block"
      >
        {external ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
            {content}
          </a>
        ) : (
          <Link href={href} className={baseClasses}>
            {content}
          </Link>
        )}
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={baseClasses}
    >
      {content}
    </motion.button>
  );
}
