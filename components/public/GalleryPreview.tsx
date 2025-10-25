'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { BeforeAfterSlider } from '@/components/shared/BeforeAfterSlider';
import { mockGallery } from '@/data/gallery';

export function GalleryPreview() {
  const shouldReduceMotion = useReducedMotion();
  const publicImages = mockGallery.filter((img) => img.isPublic).slice(0, 9);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Our Work
          </h2>
          <p className="mt-4 text-lg text-black">
            Before & after transformations
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {publicImages.map((image, index) => (
            <motion.div
              key={image.id}
              className="relative"
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <BeforeAfterSlider
                beforeImage={image.beforeUrl || image.afterUrl}
                afterImage={image.afterUrl}
                alt={image.caption || 'Gallery image'}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
