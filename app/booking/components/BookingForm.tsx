'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaCalendarAlt, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations';
import { getWhatsAppUrl } from '@/lib/utils';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  email: z.string().email('Enter a valid email address'),
  eventType: z.string().min(1, 'Please select an event type'),
  package: z.string().min(1, 'Please select a package'),
  date: z.string().min(1, 'Please select an event date'),
  venue: z.string().min(2, 'Please enter a venue'),
  guests: z.string().min(1, 'Please enter guest count'),
  budget: z.string().min(1, 'Please select a budget range'),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const eventTypes = [
  'Wedding (Full Package)', 'Mehndi Night', 'Barat', 'Walima', 'Engagement', 'Nikkah Ceremony',
  'Birthday Party', 'Corporate Event', 'Farmhouse Event', 'Private Party', 'Aqeeqah',
  'Office Lunch / Hi-Tea', 'BBQ Party', 'Outdoor Catering', 'Other',
];

const packageOptions = ['Silver', 'Gold', 'Platinum', 'Diamond', 'Custom / Not Sure'];
const budgetRanges = [
  'Under PKR 1,00,000', 'PKR 1-3 Lakh', 'PKR 3-6 Lakh',
  'PKR 6-10 Lakh', 'PKR 10-20 Lakh', 'PKR 20 Lakh+',
];

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || '923000000000';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    const msg =
      `*🎉 New Event Booking Request*%0A%0A` +
      `*Name:* ${data.name}%0A` +
      `*Phone:* ${data.phone}%0A` +
      `*Email:* ${data.email}%0A` +
      `*Event Type:* ${data.eventType}%0A` +
      `*Package:* ${data.package}%0A` +
      `*Date:* ${data.date}%0A` +
      `*Venue:* ${data.venue}%0A` +
      `*Guests:* ${data.guests}%0A` +
      `*Budget:* ${data.budget}%0A` +
      (data.message ? `*Message:* ${data.message}` : '');

    window.open(`https://wa.me/${whatsapp}?text=${msg}`, '_blank');
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 6000);
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3.5 bg-white border rounded-xl font-body text-dark text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
      hasError
        ? 'border-red-400 focus:ring-red-400/30'
        : 'border-gray-200 focus:border-gold-500 focus:ring-gold-500/30'
    }`;

  return (
    <section className="py-16 bg-[#FAFAFA]">
      <div className="container mx-auto px-4 max-w-4xl">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 rounded-full bg-gold-500 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-dark" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="font-heading text-3xl font-bold text-dark mb-3">Booking Request Sent!</h2>
            <p className="font-body text-dark/60 text-lg mb-6 max-w-md mx-auto">
              Your booking request has been sent via WhatsApp. Our team will contact you within a few hours.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-gold-500 text-dark font-semibold px-8 py-3 rounded-full hover:bg-gold-600 transition-colors shadow-gold"
            >
              Back to Home
            </a>
          </motion.div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            viewport={viewportOnce}
            className="bg-white rounded-3xl shadow-card border border-gray-100 p-8 md:p-12"
          >
            <motion.div variants={staggerItem} className="mb-8">
              <h2 className="font-heading text-2xl font-bold text-dark mb-2">Complete Booking Form</h2>
              <p className="font-body text-dark/60 text-sm">
                Fill in your event details and we&apos;ll send you a confirmation via WhatsApp.
              </p>
            </motion.div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <motion.div variants={staggerItem}>
                  <label className="font-body text-sm text-dark/70 mb-1.5 block" htmlFor="b-name">
                    Full Name *
                  </label>
                  <input
                    id="b-name"
                    {...register('name')}
                    placeholder="Your full name"
                    className={inputClass(!!errors.name)}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </motion.div>

                {/* Phone */}
                <motion.div variants={staggerItem}>
                  <label className="font-body text-sm text-dark/70 mb-1.5 block" htmlFor="b-phone">
                    Phone Number *
                  </label>
                  <input
                    id="b-phone"
                    type="tel"
                    {...register('phone')}
                    placeholder="+92 300 0000000"
                    className={inputClass(!!errors.phone)}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </motion.div>

                {/* Email */}
                <motion.div variants={staggerItem}>
                  <label className="font-body text-sm text-dark/70 mb-1.5 block" htmlFor="b-email">
                    Email Address *
                  </label>
                  <input
                    id="b-email"
                    type="email"
                    {...register('email')}
                    placeholder="your@email.com"
                    className={inputClass(!!errors.email)}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </motion.div>

                {/* Event Type */}
                <motion.div variants={staggerItem}>
                  <label className="font-body text-sm text-dark/70 mb-1.5 block" htmlFor="b-eventType">
                    Event Type *
                  </label>
                  <select
                    id="b-eventType"
                    {...register('eventType')}
                    className={inputClass(!!errors.eventType)}
                  >
                    <option value="">Select event type</option>
                    {eventTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.eventType && (
                    <p className="text-red-500 text-xs mt-1">{errors.eventType.message}</p>
                  )}
                </motion.div>

                {/* Package */}
                <motion.div variants={staggerItem}>
                  <label className="font-body text-sm text-dark/70 mb-1.5 block" htmlFor="b-package">
                    Preferred Package *
                  </label>
                  <select
                    id="b-package"
                    {...register('package')}
                    className={inputClass(!!errors.package)}
                  >
                    <option value="">Select package</option>
                    {packageOptions.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                  {errors.package && (
                    <p className="text-red-500 text-xs mt-1">{errors.package.message}</p>
                  )}
                </motion.div>

                {/* Date */}
                <motion.div variants={staggerItem}>
                  <label className="font-body text-sm text-dark/70 mb-1.5 block" htmlFor="b-date">
                    <FaCalendarAlt className="inline mr-1 text-gold-500" /> Event Date *
                  </label>
                  <input
                    id="b-date"
                    type="date"
                    {...register('date')}
                    className={inputClass(!!errors.date)}
                  />
                  {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                </motion.div>

                {/* Venue */}
                <motion.div variants={staggerItem}>
                  <label className="font-body text-sm text-dark/70 mb-1.5 block" htmlFor="b-venue">
                    <FaMapMarkerAlt className="inline mr-1 text-gold-500" /> Venue / Location *
                  </label>
                  <input
                    id="b-venue"
                    {...register('venue')}
                    placeholder="e.g., Grand Hall, DHA Lahore"
                    className={inputClass(!!errors.venue)}
                  />
                  {errors.venue && <p className="text-red-500 text-xs mt-1">{errors.venue.message}</p>}
                </motion.div>

                {/* Guests */}
                <motion.div variants={staggerItem}>
                  <label className="font-body text-sm text-dark/70 mb-1.5 block" htmlFor="b-guests">
                    <FaUsers className="inline mr-1 text-gold-500" /> Estimated Guests *
                  </label>
                  <input
                    id="b-guests"
                    type="number"
                    min="1"
                    {...register('guests')}
                    placeholder="e.g., 300"
                    className={inputClass(!!errors.guests)}
                  />
                  {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests.message}</p>}
                </motion.div>

                {/* Budget */}
                <motion.div variants={staggerItem} className="md:col-span-2">
                  <label className="font-body text-sm text-dark/70 mb-1.5 block" htmlFor="b-budget">
                    Budget Range *
                  </label>
                  <select
                    id="b-budget"
                    {...register('budget')}
                    className={inputClass(!!errors.budget)}
                  >
                    <option value="">Select budget range</option>
                    {budgetRanges.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                  {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget.message}</p>}
                </motion.div>

                {/* Message */}
                <motion.div variants={staggerItem} className="md:col-span-2">
                  <label className="font-body text-sm text-dark/70 mb-1.5 block" htmlFor="b-message">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    id="b-message"
                    {...register('message')}
                    rows={4}
                    placeholder="Any specific requirements, theme preferences, or questions..."
                    className={`${inputClass(false)} resize-none`}
                  />
                </motion.div>
              </div>

              {/* Submit */}
              <motion.div variants={staggerItem} className="mt-8 flex flex-col sm:flex-row gap-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-dark font-semibold text-lg py-4 rounded-full transition-all shadow-gold disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <FaWhatsapp className="text-xl" />
                  {isSubmitting ? 'Submitting...' : 'Submit Booking via WhatsApp'}
                </motion.button>
                <a
                  href={getWhatsAppUrl(whatsapp, 'Hello! I want to discuss my event with Bismillah Catering.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold text-lg px-8 py-4 rounded-full transition-all"
                >
                  <FaWhatsapp />
                  Chat Directly
                </a>
              </motion.div>

              <p className="font-body text-dark/40 text-xs text-center mt-4">
                Your information is safe and will only be used for event planning purposes.
              </p>
            </form>
          </motion.div>
        )}
      </div>
    </section>
  );
}
