import { Barber } from '@/types';

export const mockBarber: Barber = {
  id: 'barber-1',
  name: 'Marcus Johnson',
  email: 'marcus@trimline.com',
  bio: 'Expert cuts, fades, and beard grooming with 12+ years of premium service.',
  phone: '(555) 123-4567',
  profileImage: '/images/barber-profile.jpg',
  settings: {
    bookingBufferMin: 15,
    advanceBookingDays: 30,
    depositPercentage: 25,
    cancellationHours: 24,
  },
};
