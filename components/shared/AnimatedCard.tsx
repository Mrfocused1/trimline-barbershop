'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedCard({ children, className, delay = 0 }: AnimatedCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: shouldReduceMotion ? 0.01 : 0.4,
        delay: shouldReduceMotion ? 0 : delay,
        ease: 'easeOut',
      }}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              y: -8,
              transition: { duration: 0.2 },
            }
      }
    >
      <Card className={cn('transition-shadow duration-300 hover:shadow-lg', className)}>
        {children}
      </Card>
    </motion.div>
  );
}
