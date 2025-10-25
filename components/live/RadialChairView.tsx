'use client';

import { useState, useEffect, useRef } from 'react';
import { Armchair, Clock, Scissors } from 'lucide-react';
import { Chair } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface RadialChairViewProps {
  chairs: Chair[];
}

export function RadialChairView({ chairs }: RadialChairViewProps) {
  const [expandedChairId, setExpandedChairId] = useState<string | null>(null);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [countdown, setCountdown] = useState<Record<string, number>>({});
  const [showProgressBar, setShowProgressBar] = useState(false);
  const totalServiceTime = 60; // Total service time in minutes
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Initialize countdown timers
  useEffect(() => {
    const initialCountdown: Record<string, number> = {};
    chairs.forEach((chair) => {
      if (chair.status === 'occupied' && chair.currentBooking) {
        initialCountdown[chair.id] = chair.currentBooking.estimatedWaitMinutes;
      }
    });
    setCountdown(initialCountdown);
  }, [chairs]);

  // Update countdown every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((chairId) => {
          if (updated[chairId] > 0) {
            updated[chairId] = updated[chairId] - 1;
          }
        });
        return updated;
      });
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Auto-rotation
  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate]);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedChairId(null);
      setAutoRotate(true);
    }
  };

  const toggleChair = (chairId: string, chair: Chair) => {
    if (expandedChairId === chairId) {
      setExpandedChairId(null);
      setAutoRotate(true);
      setShowProgressBar(false);
    } else {
      setExpandedChairId(chairId);
      setAutoRotate(false);
      // Trigger animation
      setShowProgressBar(false);
      setTimeout(() => setShowProgressBar(true), 100);
    }
  };

  const handleBookChair = (chair: Chair) => {
    router.push(`/booking?chair=${chair.number}&fromLive=true`);
  };

  const calculateChairPosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 180;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.5, Math.min(1, 0.5 + 0.5 * ((1 + Math.sin(radian)) / 2)));

    return { x, y, angle, zIndex, opacity };
  };

  const getStartTime = (waitMinutes: number) => {
    // Assume average haircut is 60 minutes total
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

  return (
    <div
      className="w-full min-h-[550px] flex flex-col items-center justify-center bg-white overflow-visible py-4"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl min-h-[550px] flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{ perspective: '1000px' }}
        >
          {/* Center - Barber Shop Icon */}
          <div className="absolute w-20 h-20 rounded-full bg-white flex items-center justify-center z-10 shadow-lg shadow-black/30">
            <div className="absolute w-24 h-24 rounded-full border border-black/20 animate-ping opacity-70"></div>
            <div
              className="absolute w-28 h-28 rounded-full border border-black/10 animate-ping opacity-50"
              style={{ animationDelay: '0.5s' }}
            ></div>
            <Scissors className="w-10 h-10 text-black" strokeWidth={1.5} />
          </div>

          {/* Chairs */}
          {chairs.map((chair, index) => {
            const position = calculateChairPosition(index, chairs.length);
            const isExpanded = expandedChairId === chair.id;
            const currentCountdown = countdown[chair.id] || 0;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={chair.id}
                className="absolute transition-all duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleChair(chair.id, chair);
                }}
              >
                {/* Chair Icon */}
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center
                    ${isExpanded ? 'scale-125' : ''}
                    ${
                      chair.status === 'available'
                        ? 'bg-green-500 border-green-400'
                        : 'bg-red-500 border-red-400'
                    }
                    border-4 transition-all duration-300 transform
                    ${isExpanded ? 'shadow-lg shadow-white/30' : ''}
                  `}
                >
                  <Armchair className="w-6 h-6 text-white" />
                </div>

                {/* Chair Number */}
                <div
                  className={`
                    absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap
                    text-xs font-bold tracking-wider
                    transition-all duration-300
                    ${isExpanded ? 'text-black scale-125' : 'text-black/70'}
                  `}
                >
                  #{chair.number}
                </div>

                {/* Expanded Details Card */}
                {isExpanded && chair.status === 'occupied' && chair.currentBooking && (
                  <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-72 bg-white backdrop-blur-lg border-black/20 shadow-xl overflow-visible">
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
                          <p className="font-mono text-sm">{getStartTime(currentCountdown)}</p>
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-wider text-black/70 mb-1">Est. Finish</div>
                          <p className="font-mono text-sm">{getFinishTime(currentCountdown)}</p>
                        </div>
                      </div>

                      {/* Countdown */}
                      <div className="pt-3 border-t border-black/10">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-black/70" />
                            <span className="text-xs uppercase tracking-wider text-black/70">Time Remaining</span>
                          </div>
                          <span className="font-mono text-lg font-bold text-black">{currentCountdown} min</span>
                        </div>
                        <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-1000 ease-out"
                            style={{
                              width: showProgressBar
                                ? `${Math.max(0, Math.min(100, (currentCountdown / totalServiceTime) * 100))}%`
                                : '0%',
                            }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Available Chair - Book Now Option */}
                {isExpanded && chair.status === 'available' && (
                  <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-white backdrop-blur-lg border-black/20 shadow-xl overflow-visible">
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
                          handleBookChair(chair);
                        }}
                      >
                        Book Chair {chair.number}
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
