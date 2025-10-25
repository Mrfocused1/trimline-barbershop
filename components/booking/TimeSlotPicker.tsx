'use client';

import { useState } from 'react';
import { format, addDays, startOfDay, parseISO } from 'date-fns';
import { Calendar, Check } from 'lucide-react';
import { Service, TimeSlot } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn, formatDuration } from '@/lib/utils';
import { generateTimeSlots, formatTimeSlot } from '@/lib/availability';
import { useBookingStore } from '@/store/bookingStore';
import { useAvailabilityStore } from '@/store/availabilityStore';
import { useBarberStore } from '@/store/barberStore';

interface TimeSlotPickerProps {
  service: Service;
  selectedSlot?: TimeSlot;
  onSelect: (slot: TimeSlot) => void;
  sameDayOnly?: boolean;
}

export function TimeSlotPicker({ service, selectedSlot, onSelect, sameDayOnly = false }: TimeSlotPickerProps) {
  // If sameDayOnly (from live page), start with today, otherwise tomorrow
  const [selectedDate, setSelectedDate] = useState<Date>(
    sameDayOnly ? startOfDay(new Date()) : addDays(startOfDay(new Date()), 1)
  );

  const { bookings } = useBookingStore();
  const { getActiveRules, blackoutDates } = useAvailabilityStore();
  const { barber } = useBarberStore();

  const availableRules = getActiveRules();
  const timeSlots = generateTimeSlots(
    selectedDate,
    service,
    availableRules,
    bookings,
    blackoutDates,
    barber.settings.bookingBufferMin
  );

  // Generate dates: only today if sameDayOnly, otherwise next 14 days starting from tomorrow
  const dates = sameDayOnly
    ? [startOfDay(new Date())]
    : Array.from({ length: 14 }, (_, i) => addDays(startOfDay(new Date()), i + 1));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Select Date & Time</h2>
        <p className="text-black">
          {sameDayOnly ? (
            <>Book your same-day appointment for {service.name} ({formatDuration(service.durationMin)})</>
          ) : (
            <>Choose your preferred date and time for {service.name} ({formatDuration(service.durationMin)})</>
          )}
        </p>
      </div>

      {/* Date Selector */}
      <div>
        <h3 className="mb-3 font-semibold">Select Date</h3>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
          {dates.map((date) => {
            const isSelected = format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
            return (
              <Button
                key={date.toISOString()}
                variant={isSelected ? 'default' : 'outline'}
                className={cn("flex flex-col h-auto py-3")}
                onClick={() => setSelectedDate(date)}
              >
                <span className="text-xs">{format(date, 'EEE')}</span>
                <span className="text-lg font-bold">{format(date, 'd')}</span>
                <span className="text-xs">{format(date, 'MMM')}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Time Slot Selector */}
      <div>
        <h3 className="mb-3 font-semibold">
          Available Times for {format(selectedDate, 'EEEE, MMMM d')}
        </h3>
        {timeSlots.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Calendar className="mx-auto h-12 w-12 text-black" />
              <p className="mt-4 text-black">
                No available time slots for this date. Please select another date.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {timeSlots.map((slot) => {
              const isSelected = selectedSlot?.startTime === slot.startTime;
              return (
                <Button
                  key={slot.startTime}
                  variant={isSelected ? 'default' : 'outline'}
                  disabled={!slot.isAvailable}
                  onClick={() => slot.isAvailable && onSelect(slot)}
                  className={cn(
                    "relative",
                    !slot.isAvailable && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {format(parseISO(slot.startTime), 'h:mm a')}
                  {isSelected && (
                    <Check className="ml-2 h-4 w-4" />
                  )}
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
