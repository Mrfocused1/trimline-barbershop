import {
  addMinutes,
  format,
  isBefore,
  isAfter,
  parseISO,
  startOfDay,
  addDays,
  getDay,
  isSameDay,
  parse,
} from 'date-fns';
import { AvailabilityRule, Booking, Service, TimeSlot, BlackoutDate } from '@/types';

/**
 * Generate time slots for a given date and service
 */
export function generateTimeSlots(
  date: Date,
  service: Service,
  availabilityRules: AvailabilityRule[],
  existingBookings: Booking[],
  blackoutDates: BlackoutDate[],
  bufferMin: number = 15
): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const dayOfWeek = getDay(date);

  // Check if date has a blackout
  const hasBlackout = blackoutDates.some((blackout) => {
    const blackoutDate = parseISO(blackout.date);
    return isSameDay(date, blackoutDate) && blackout.allDay;
  });

  if (hasBlackout) {
    return slots;
  }

  // Get availability rule for this day
  const rule = availabilityRules.find(
    (r) => r.dayOfWeek === dayOfWeek && r.isActive
  );

  if (!rule) {
    return slots;
  }

  // Parse start and end times
  const [startHour, startMin] = rule.startTime.split(':').map(Number);
  const [endHour, endMin] = rule.endTime.split(':').map(Number);

  let currentTime = new Date(date);
  currentTime.setHours(startHour, startMin, 0, 0);

  const endTime = new Date(date);
  endTime.setHours(endHour, endMin, 0, 0);

  // Generate slots
  while (isBefore(currentTime, endTime)) {
    const slotEnd = addMinutes(currentTime, service.durationMin);

    // Check if slot end time is within business hours
    if (isAfter(slotEnd, endTime)) {
      break;
    }

    // Check if slot conflicts with existing bookings
    const isAvailable = !existingBookings.some((booking) => {
      const bookingStart = parseISO(booking.startTime);
      const bookingEnd = parseISO(booking.endTime);

      // Check if there's any overlap
      return (
        (isBefore(currentTime, bookingEnd) && isAfter(slotEnd, bookingStart)) ||
        isSameDay(currentTime, bookingStart)
      );
    });

    slots.push({
      startTime: currentTime.toISOString(),
      endTime: slotEnd.toISOString(),
      isAvailable,
    });

    // Move to next slot (service duration + buffer)
    currentTime = addMinutes(currentTime, service.durationMin + bufferMin);
  }

  return slots;
}

/**
 * Get available dates for booking (next N days based on advance booking setting)
 */
export function getAvailableDates(
  advanceBookingDays: number,
  availabilityRules: AvailabilityRule[]
): Date[] {
  const dates: Date[] = [];
  const today = startOfDay(new Date());

  for (let i = 1; i <= advanceBookingDays; i++) {
    const date = addDays(today, i);
    const dayOfWeek = getDay(date);

    // Check if there's an active availability rule for this day
    const hasAvailability = availabilityRules.some(
      (r) => r.dayOfWeek === dayOfWeek && r.isActive
    );

    if (hasAvailability) {
      dates.push(date);
    }
  }

  return dates;
}

/**
 * Format time slot for display
 */
export function formatTimeSlot(slot: TimeSlot): string {
  const start = parseISO(slot.startTime);
  const end = parseISO(slot.endTime);
  return `${format(start, 'h:mm a')} - ${format(end, 'h:mm a')}`;
}
