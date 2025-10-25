'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hero } from '@/components/public/Hero';
import { ServicesGrid } from '@/components/public/ServicesGrid';
import { LiveFeatureSection } from '@/components/public/LiveFeatureSection';
import { GalleryPreview } from '@/components/public/GalleryPreview';
import { ReviewsSection } from '@/components/public/ReviewsSection';
import { CTASection } from '@/components/public/CTASection';
import { LoadingScreen } from '@/components/shared/LoadingScreen';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload hero image
    const heroImage = new Image();
    heroImage.src = 'https://github.com/Mrfocused1/Blog1/blob/main/Image_fx-37.jpg?raw=true';

    heroImage.onload = () => {
      // Wait a bit for effect, then hide loading screen
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    };

    // Fallback in case image fails to load
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="bg-black"
      >
        <Hero />
        <div className="bg-white">
          <GalleryPreview />
          <ServicesGrid limit={3} showViewAll />
          <LiveFeatureSection />
          <ReviewsSection limit={3} />
          <CTASection />
        </div>
      </motion.div>
    </>
  );
}
