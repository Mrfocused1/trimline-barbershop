'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { MagneticButton } from '@/components/shared/MagneticButton';
import { CountUp } from '@/components/shared/CountUp';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { mockBarber } from '@/data/barber';

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://github.com/Mrfocused1/Blog1/blob/main/Image_fx-37.jpg?raw=true"
          alt="Professional barber at work"
          className="h-full w-full object-cover"
        />
        {/* Dark gradient overlays for text readability - left side only */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          {/* Text Content */}
          <div className="flex flex-col space-y-6">
            {/* Rating */}
            <motion.div
              className="inline-flex items-center space-x-2 text-sm"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-white">
                Rated 5.0 from 100+ clients
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
            >
              Level Up
              <span className="block text-white">Your Trim</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-base text-white md:text-lg max-w-[70%] md:max-w-lg"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
            >
              {mockBarber.bio}
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease: 'easeOut' }}
            >
              <MagneticButton size="default" className="border-2 border-white bg-transparent w-fit" asChild>
                <Link href="/booking">
                  Book Appointment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </MagneticButton>

              <MagneticButton variant="outline" size="default" className="border-white bg-transparent text-white hover:bg-white hover:text-black w-fit" asChild>
                <Link href="/services">View Services</Link>
              </MagneticButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0, ease: 'easeOut' }}
            >
              <div>
                <div className="text-3xl font-bold text-white">
                  <CountUp end={12} suffix="+" />
                </div>
                <div className="text-sm text-white">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">
                  <CountUp end={5.0} decimals={1} />
                </div>
                <div className="text-sm text-white">Average Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">
                  <CountUp end={500} suffix="+" />
                </div>
                <div className="text-sm text-white">Happy Clients</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
