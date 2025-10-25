'use client';

import { useState, useEffect } from 'react';
import { Chair } from '@/types';
import { ChairCard } from './ChairCard';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Clock } from 'lucide-react';

interface ChairGridProps {
  chairs: Chair[];
}

export function ChairGrid({ chairs }: ChairGridProps) {
  const [selectedChair, setSelectedChair] = useState<Chair | null>(null);
  const [expandedChairId, setExpandedChairId] = useState<string | null>(null);
  const router = useRouter();

  // Calculate maximum wait time from all occupied chairs
  const maxWaitTime = chairs
    .filter((c) => c.status === 'occupied' && c.currentBooking)
    .reduce((max, chair) => {
      const waitTime = chair.currentBooking?.estimatedWaitMinutes || 0;
      return Math.max(max, waitTime);
    }, 0);

  const [totalCountdown, setTotalCountdown] = useState(maxWaitTime);

  // Update total countdown every minute
  useEffect(() => {
    setTotalCountdown(maxWaitTime);
  }, [maxWaitTime]);

  useEffect(() => {
    if (totalCountdown > 0) {
      const interval = setInterval(() => {
        setTotalCountdown((prev) => Math.max(0, prev - 1));
      }, 60000); // Update every minute

      return () => clearInterval(interval);
    }
  }, [totalCountdown]);

  const handleChairSelect = (chair: Chair) => {
    if (chair.status === 'available') {
      setSelectedChair(selectedChair?.id === chair.id ? null : chair);
    }
  };

  const handleChairExpand = (chair: Chair) => {
    setExpandedChairId(expandedChairId === chair.id ? null : chair.id);
  };

  const handleContinueBooking = () => {
    if (selectedChair) {
      // Navigate to booking page with selected chair and fromLive flag for same-day restriction
      router.push(`/booking?chair=${selectedChair.number}&fromLive=true`);
    }
  };

  const availableCount = chairs.filter((c) => c.status === 'available').length;
  const occupiedCount = chairs.filter((c) => c.status === 'occupied').length;

  // Sort chairs by number to ensure they're in order
  const sortedChairs = [...chairs].sort((a, b) => a.number - b.number);

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Chair Layout - Cinema Style */}
      <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
        <div className="text-center mb-8">
          <div className="text-sm font-semibold text-black uppercase tracking-wider mb-4">
            Shop Floor
          </div>
        </div>

        {/* Chairs in Order */}
        <div className="grid grid-cols-3 md:grid-cols-10 gap-4 mb-8 justify-items-center">
          {sortedChairs.map((chair) => (
            <ChairCard
              key={chair.id}
              chair={chair}
              onSelect={handleChairSelect}
              isSelected={selectedChair?.id === chair.id}
              isExpanded={expandedChairId === chair.id}
              onExpand={handleChairExpand}
            />
          ))}
        </div>

        {/* Continue Button */}
        {selectedChair && (
          <div className="flex justify-center mt-8 pt-8 border-t">
            <Button
              size="lg"
              onClick={handleContinueBooking}
              className="bg-black text-white hover:bg-gray-800"
            >
              Continue with Chair {selectedChair.number}
            </Button>
          </div>
        )}
      </div>

      {/* Stats & Legend */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stats */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="font-semibold mb-4 text-black">Current Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded bg-green-500"></div>
                <span className="text-sm text-black">Available</span>
              </div>
              <span className="text-lg font-bold text-green-600">{availableCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded bg-red-500"></div>
                <span className="text-sm text-black">Occupied</span>
              </div>
              <span className="text-lg font-bold text-red-600">{occupiedCount}</span>
            </div>
            {totalCountdown > 0 && (
              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-black" />
                  <span className="text-sm text-black">All chairs free in</span>
                </div>
                <span className="text-lg font-bold text-black">{totalCountdown} min</span>
              </div>
            )}
            {selectedChair && (
              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded bg-yellow-400"></div>
                  <span className="text-sm text-black">Your Selection</span>
                </div>
                <span className="text-lg font-bold text-yellow-600">#{selectedChair.number}</span>
              </div>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="font-semibold mb-4 text-black">How to Use</h3>
          <div className="space-y-3 text-sm text-black">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold mt-0.5">
                1
              </div>
              <p>Click on a <span className="text-green-600 font-semibold">green chair</span> to select</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold mt-0.5">
                2
              </div>
              <p>Hover over <span className="text-red-600 font-semibold">red chairs</span> to see wait time</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold mt-0.5">
                3
              </div>
              <p>Click "Continue" to book your selected chair</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
