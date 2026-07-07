'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaPaperPlane } from 'react-icons/fa';
import { staggerContainer, staggerItem, fadeLeft, fadeRight, viewportOnce } from '@/lib/animations';
import SectionHeader from '@/components/common/SectionHeader';
import { getWhatsAppUrl } from '@/lib/utils';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
  eventType: z.string().min(1, 'Please select an event type'),
  date: z.string().min(1, 'Please select an event date'),
  guests: z.string().min(1, 'Please enter estimated guests'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

const eventTypes = [
  'Wedding', 'Mehndi', 'Barat', 'Walima', 'Engagement', 'Nikkah',
  'Birthday Party', 'Corporate Event', 'Farmhouse Event', 'Private Party',
  'Aqeeqah', 'Office Lunch', 'Hi-Tea', 'BBQ Party', 'Other',
];

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const phone = process.env.NEXT_PUBLIC_PHONE || '+92-300-0000000';
  const email = process.env.NEXT_PUBLIC_EMAIL || 'info@bismillahcatering.com';
  const location = process.env.NEXT_PUBLIC_LOCATION || 'Lahore, Pakistan';
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || '923000000000';
  const googleMap = process.env.NEXT_PUBLIC_GOOGLE_MAP || '#';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    // Build WhatsApp message
    const message = `*New Event Inquiry*%0A%0A*Name:* ${data.name}%0A*Phone:* ${data.phone}%0A*Email:* ${data.email}%0A*Event Type:* ${data.eventType}%0A*Date:* ${data.date}%0A*Guests:* ${data.guests}%0A*Message:* ${data.message}`;
    window.open(`https://wa.me/${whatsapp}?text=${message}`, '_blank');
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3.5 bg-white border rounded-xl font-body text-dark text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
      hasError
        ? 'border-red-400 focus:ring-red-400/30'
        : 'border-gray-200 focus:border-gold-500 focus:ring-gold-500/30'
    }`;

  return (
    <section className="py-24 bg-white overflow-x-hidden" aria-label="Contact Us" id="contact">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Get In Touch"
          title="Let's Plan Your Event"
          subtitle="Ready to create an unforgettable experience? Fill out the form and we'll get back to you within 24 hours."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="space-y-8"
          >
            <div>
              <h3 className="font-heading text-2xl font-bold text-dark mb-2">Contact Information</h3>
              <p className="font-body text-dark/60">We&apos;re available 7 days a week to assist with your event planning.</p>
            </div>

            <div className="space-y-5">
              {[
                { icon: <FaPhone />, label: 'Phone', value: phone, href: `tel:${phone}`, color: '#F6C945' },
                { icon: <FaWhatsapp />, label: 'WhatsApp', value: phone, href: getWhatsAppUrl(whatsapp), color: '#22c55e' },
                { icon: <FaEnvelope />, label: 'Email', value: email, href: `mailto:${email}`, color: '#3b82f6' },
                { icon: <FaMapMarkerAlt />, label: 'Location', value: location, href: googleMap, color: '#ec4899' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.label === 'Location' || item.label === 'WhatsApp' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-body text-dark/50 text-xs uppercase tracking-wider mb-0.5">{item.label}</p>
                    <p className="font-body text-dark font-medium text-sm group-hover:text-gold-600 transition-colors">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Google Map Embed Placeholder */}
            <div className="rounded-2xl overflow-hidden h-56 bg-gray-100 border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.7!2d74.2950!3d31.4850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDI5JzA2LjAiTiA3NMKwMTcnNDIuMCJF!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bismillah Catering Location"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="bg-white rounded-3xl shadow-card border border-gray-100 p-8 md:p-10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-gold-500 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-dark" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-dark mb-2">Message Sent!</h3>
                  <p className="font-body text-dark/60">We&apos;ll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <h3 className="font-heading text-xl font-bold text-dark mb-6">Send Us a Message</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-sm text-dark/70 mb-1.5 block" htmlFor="name">Full Name *</label>
                      <input id="name" {...register('name')} placeholder="Your full name" className={inputClass(!!errors.name)} />
                      {errors.name && <p className="font-body text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label className="font-body text-sm text-dark/70 mb-1.5 block" htmlFor="phone">Phone Number *</label>
                      <input id="phone" type="tel" {...register('phone')} placeholder="+92 300 0000000" className={inputClass(!!errors.phone)} />
                      {errors.phone && <p className="font-body text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>

                    <div>
                      <label className="font-body text-sm text-dark/70 mb-1.5 block" htmlFor="email">Email Address *</label>
                      <input id="email" type="email" {...register('email')} placeholder="your@email.com" className={inputClass(!!errors.email)} />
                      {errors.email && <p className="font-body text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                      <label className="font-body text-sm text-dark/70 mb-1.5 block" htmlFor="eventType">Event Type *</label>
                      <select id="eventType" {...register('eventType')} className={inputClass(!!errors.eventType)}>
                        <option value="">Select event type</option>
                        {eventTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      {errors.eventType && <p className="font-body text-red-500 text-xs mt-1">{errors.eventType.message}</p>}
                    </div>

                    <div>
                      <label className="font-body text-sm text-dark/70 mb-1.5 block" htmlFor="date">Event Date *</label>
                      <input id="date" type="date" {...register('date')} className={inputClass(!!errors.date)} />
                      {errors.date && <p className="font-body text-red-500 text-xs mt-1">{errors.date.message}</p>}
                    </div>

                    <div>
                      <label className="font-body text-sm text-dark/70 mb-1.5 block" htmlFor="guests">Estimated Guests *</label>
                      <input id="guests" type="number" {...register('guests')} placeholder="e.g., 200" className={inputClass(!!errors.guests)} />
                      {errors.guests && <p className="font-body text-red-500 text-xs mt-1">{errors.guests.message}</p>}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="font-body text-sm text-dark/70 mb-1.5 block" htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      {...register('message')}
                      rows={4}
                      placeholder="Tell us about your event..."
                      className={`${inputClass(!!errors.message)} resize-none`}
                    />
                    {errors.message && <p className="font-body text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-dark font-semibold py-4 rounded-xl transition-all duration-300 shadow-gold disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <FaPaperPlane />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </motion.button>

                    <motion.a
                      href={getWhatsAppUrl(whatsapp, 'Hello! I want to inquire about your services.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-xl transition-all duration-300"
                    >
                      <FaWhatsapp />
                      WhatsApp Us
                    </motion.a>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
