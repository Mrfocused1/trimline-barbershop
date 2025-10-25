'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { mockChairs } from '@/data/chairs';
import { ChairGrid } from '@/components/live/ChairGrid';
import { Button } from '@/components/ui/button';
import { Chair } from '@/types';

export default function LiveAvailabilityPage() {
  const [chairs, setChairs] = useState<Chair[]>(mockChairs);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
      // In a real app, this would fetch fresh data from the server
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Live Chair Availability
              </h1>
              <p className="mt-3 text-base text-black">
                Select your preferred chair in real-time
              </p>
              <div className="mt-4 flex items-center justify-center space-x-3 text-sm">
                <span className="text-black">Updated: {lastUpdated.toLocaleTimeString()}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="h-9 px-4 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-all duration-200"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chair Grid Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ChairGrid chairs={chairs} />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
