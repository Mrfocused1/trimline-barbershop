'use client';

import { motion, MotionProps } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

interface MotionWrapperProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wrapper component that respects prefers-reduced-motion
 * Falls back to a simple div when motion is reduced
 */
export function MotionWrapper({ children, className, ...motionProps }: MotionWrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} {...motionProps}>
      {children}
    </motion.div>
  );
}
