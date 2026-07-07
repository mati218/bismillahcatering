import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhone(phone: string): string {
  return phone.replace(/[^0-9+]/g, '');
}

export function getWhatsAppUrl(phone: string, message?: string): string {
  const cleanPhone = formatPhone(phone);
  const encodedMessage = message ? encodeURIComponent(message) : '';
  return `https://wa.me/${cleanPhone}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
}

export function getEmailUrl(email: string, subject?: string): string {
  const encodedSubject = subject ? encodeURIComponent(subject) : '';
  return `mailto:${email}${encodedSubject ? `?subject=${encodedSubject}` : ''}`;
}
