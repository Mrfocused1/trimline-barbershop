'use client';

import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { MagneticButton } from '@/components/shared/MagneticButton';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

export function CTASection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="relative overflow-hidden rounded-2xl p-8 md:p-12 lg:p-16"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://github.com/Mrfocused1/Blog1/blob/main/banner%20card%20background.jpg?raw=true"
              alt="Barbershop background"
              className="h-full w-full object-cover object-right md:object-center"
            />
            {/* Gradient overlay - stronger on mobile, lighter on desktop */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20 md:from-black/70 md:via-black/30 md:to-transparent" />
          </div>

          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Ready to Look Your Best?
            </h2>
            <p className="mt-4 text-lg text-white">
              Book your appointment today and experience premium grooming services.
              Walk-ins welcome, but appointments are recommended.
            </p>

            <div className="mt-8">
              <MagneticButton
                size="lg"
                variant="secondary"
                asChild
              >
                <Link href="/booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Appointment
                </Link>
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
