'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export function CountUp({ end, duration = 3.5, suffix = '', decimals = 0, className = '' }: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      let startTime: number | null = null;
      const startValue = 0;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

        // Easing function for smooth animation
        const easeOutQuad = (t: number) => t * (2 - t);
        const easedProgress = easeOutQuad(progress);

        const currentCount = startValue + (end - startValue) * easedProgress;
        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  const displayValue = decimals > 0
    ? count.toFixed(decimals)
    : Math.floor(count).toString();

  return (
    <span ref={ref} className={className}>
      {displayValue}{suffix}
    </span>
  );
}
