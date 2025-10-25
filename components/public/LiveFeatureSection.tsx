'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RadialChairView } from '@/components/live/RadialChairView';
import { mockChairs } from '@/data/chairs';

export function LiveFeatureSection() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-4"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3 text-black">
              Live Shop Floor
            </h2>
            <p className="text-base text-black max-w-2xl mx-auto mb-2">
              See real-time chair availability and estimated wait times. Click any chair to see details.
            </p>
            <p className="text-sm text-black/70 max-w-2xl mx-auto">
              Click on a <span className="inline-flex items-center px-2 py-1 rounded-full bg-red-500 text-white text-xs font-semibold">red chair</span> to see live availability and countdown timers
            </p>
          </motion.div>

          {/* Radial Chair View */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <RadialChairView chairs={mockChairs} />
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-4"
          >
            <Button
              size="lg"
              className="bg-black text-white hover:bg-gray-800"
              asChild
            >
              <Link href="/live">
                View Full Live Availability
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
