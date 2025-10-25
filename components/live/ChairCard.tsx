'use client';

import { useState, useEffect } from 'react';
import { Armchair, Clock, Scissors } from 'lucide-react';
import { Chair } from '@/types';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface ChairCardProps {
  chair: Chair;
  onSelect: (chair: Chair) => void;
  isSelected: boolean;
  isExpanded: boolean;
  onExpand: (chair: Chair) => void;
}

export function ChairCard({ chair, onSelect, isSelected, isExpanded, onExpand }: ChairCardProps) {
  const [countdown, setCountdown] = useState(chair.currentBooking?.estimatedWaitMinutes || 0);
  const totalServiceTime = 60; // Total service time in minutes
  const [showProgressBar, setShowProgressBar] = useState(false);
  const router = useRouter();

  // Simulate countdown timer
  useEffect(() => {
    if (chair.status === 'occupied' && chair.currentBooking) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 60000); // Update every minute

      return () => clearInterval(interval);
    }
  }, [chair.status, chair.currentBooking]);

  // Animate progress bar on expand
  useEffect(() => {
    if (isExpanded) {
      setShowProgressBar(false);
      const timer = setTimeout(() => setShowProgressBar(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isExpanded]);

  const getStartTime = (waitMinutes: number) => {
    const totalServiceTime = 60;
    const elapsedTime = totalServiceTime - waitMinutes;
    const now = new Date();
    now.setMinutes(now.getMinutes() - elapsedTime);
    return now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  const getFinishTime = (waitMinutes: number) => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + waitMinutes);
    return now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  const handleBookChair = () => {
    router.push(`/booking?chair=${chair.number}&fromLive=true`);
  };

  const getIconColor = () => {
    if (isSelected) {
      return 'text-yellow-400';
    }

    switch (chair.status) {
      case 'available':
        return 'text-green-500';
      case 'occupied':
        return 'text-red-500';
      default:
        return 'text-gray-400';
    }
  };

  const isClickable = true; // Both available and occupied chairs are now clickable
  const iconColor = getIconColor();

  return (
    <div className="relative">
      <button
        className={cn(
          'relative p-4 rounded-lg transition-all transform border-2',
          'bg-white',
          isSelected ? 'border-yellow-400' : isExpanded ? 'border-black' : 'border-gray-300',
          'cursor-pointer hover:scale-110 hover:border-gray-400'
        )}
        onClick={() => {
          onExpand(chair);
          if (chair.status === 'available') {
            onSelect(chair);
          }
        }}
      >
        <Armchair className={cn('h-8 w-8', iconColor)} />
      </button>

      {/* Chair Number Label */}
      <div className="text-center mt-1 text-xs font-medium text-black">
        {chair.number}
      </div>

      {/* Expanded Details for Occupied Chairs */}
      {isExpanded && chair.status === 'occupied' && chair.currentBooking && (
        <Card className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white backdrop-blur-lg border-black/20 shadow-xl overflow-visible z-50">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-black/50"></div>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center mb-2">
              <Badge className="bg-red-500 text-white border-red-400">
                OCCUPIED
              </Badge>
              <span className="text-xs font-mono text-black/70">Chair {chair.number}</span>
            </div>
            <CardTitle className="text-base text-black">Current Session</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-black space-y-4">
            {/* Service */}
            <div>
              <div className="flex items-center mb-1">
                <Scissors className="w-4 h-4 mr-2 text-black/70" />
                <span className="text-xs uppercase tracking-wider text-black/70">Service</span>
              </div>
              <p className="font-semibold">{chair.currentBooking.serviceName || 'Haircut'}</p>
            </div>

            {/* Timing */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs uppercase tracking-wider text-black/70 mb-1">Start Time</div>
                <p className="font-mono text-sm">{getStartTime(countdown)}</p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-black/70 mb-1">Est. Finish</div>
                <p className="font-mono text-sm">{getFinishTime(countdown)}</p>
              </div>
            </div>

            {/* Countdown */}
            <div className="pt-3 border-t border-black/10">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-black/70" />
                  <span className="text-xs uppercase tracking-wider text-black/70">Time Remaining</span>
                </div>
                <span className="font-mono text-lg font-bold text-black">{countdown} min</span>
              </div>
              <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-1000 ease-out"
                  style={{
                    width: showProgressBar
                      ? `${Math.max(0, Math.min(100, (countdown / totalServiceTime) * 100))}%`
                      : '0%',
                  }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Expanded Details for Available Chairs */}
      {isExpanded && chair.status === 'available' && (
        <Card className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white backdrop-blur-lg border-black/20 shadow-xl overflow-visible z-50">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-black/50"></div>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center mb-2">
              <Badge className="bg-green-500 text-white border-green-400">
                AVAILABLE
              </Badge>
              <span className="text-xs font-mono text-black/70">Chair {chair.number}</span>
            </div>
            <CardTitle className="text-base text-black">Ready to Book</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-black">
            <p className="mb-4 text-black/80">This chair is available now for same-day booking.</p>
            <Button
              className="w-full bg-green-500 text-white hover:bg-green-600"
              onClick={(e) => {
                e.stopPropagation();
                handleBookChair();
              }}
            >
              Book Chair {chair.number}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
