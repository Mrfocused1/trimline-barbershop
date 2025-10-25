import { AvailabilityRule, BlackoutDate } from '@/types';

export const mockAvailability: AvailabilityRule[] = [
  {
    id: 'av-1',
    dayOfWeek: 1, // Monday
    startTime: '09:00',
    endTime: '18:00',
    isActive: true,
  },
  {
    id: 'av-2',
    dayOfWeek: 2, // Tuesday
    startTime: '09:00',
    endTime: '18:00',
    isActive: true,
  },
  {
    id: 'av-3',
    dayOfWeek: 3, // Wednesday
    startTime: '09:00',
    endTime: '18:00',
    isActive: true,
  },
  {
    id: 'av-4',
    dayOfWeek: 4, // Thursday
    startTime: '09:00',
    endTime: '20:00',
    isActive: true,
  },
  {
    id: 'av-5',
    dayOfWeek: 5, // Friday
    startTime: '09:00',
    endTime: '20:00',
    isActive: true,
  },
  {
    id: 'av-6',
    dayOfWeek: 6, // Saturday
    startTime: '08:00',
    endTime: '16:00',
    isActive: true,
  },
  {
    id: 'av-7',
    dayOfWeek: 0, // Sunday
    startTime: '10:00',
    endTime: '14:00',
    isActive: false, // Closed on Sundays by default
  },
];

export const mockBlackoutDates: BlackoutDate[] = [
  // Add future blackout dates as needed
];
