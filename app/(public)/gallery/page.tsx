'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { BeforeAfterSlider } from '@/components/shared/BeforeAfterSlider';
import { mockGallery } from '@/data/gallery';

export default function GalleryPage() {
  const shouldReduceMotion = useReducedMotion();
  const publicImages = mockGallery.filter((img) => img.isPublic);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Gallery
          </h1>
          <p className="mt-4 text-lg text-black max-w-2xl mx-auto">
            Browse our portfolio of before & after transformations showcasing precision cuts, fades, and styling.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {publicImages.map((image, index) => (
              <motion.div
                key={image.id}
                className="relative"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <BeforeAfterSlider
                  beforeImage={image.beforeUrl || image.afterUrl}
                  afterImage={image.afterUrl}
                  alt={image.caption || 'Gallery image'}
                />
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 rounded-b-lg pointer-events-none">
                    <p className="text-sm font-medium text-white">{image.caption}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
