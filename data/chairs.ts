import { Chair } from '@/types';

export const mockChairs: Chair[] = [
  {
    id: 'chair-1',
    number: 1,
    status: 'occupied',
    currentBooking: {
      clientName: '',
      serviceName: '',
      estimatedWaitMinutes: 15,
    },
  },
  {
    id: 'chair-2',
    number: 2,
    status: 'occupied',
    currentBooking: {
      clientName: '',
      serviceName: '',
      estimatedWaitMinutes: 25,
    },
  },
  {
    id: 'chair-3',
    number: 3,
    status: 'occupied',
    currentBooking: {
      clientName: '',
      serviceName: '',
      estimatedWaitMinutes: 30,
    },
  },
  {
    id: 'chair-4',
    number: 4,
    status: 'occupied',
    currentBooking: {
      clientName: '',
      serviceName: '',
      estimatedWaitMinutes: 40,
    },
  },
  {
    id: 'chair-5',
    number: 5,
    status: 'occupied',
    currentBooking: {
      clientName: '',
      serviceName: '',
      estimatedWaitMinutes: 55,
    },
  },
  {
    id: 'chair-6',
    number: 6,
    status: 'available',
  },
  {
    id: 'chair-7',
    number: 7,
    status: 'available',
  },
  {
    id: 'chair-8',
    number: 8,
    status: 'available',
  },
  {
    id: 'chair-9',
    number: 9,
    status: 'available',
  },
  {
    id: 'chair-10',
    number: 10,
    status: 'available',
  },
];
