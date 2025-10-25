import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Booking, BookingFlowState } from '@/types';

interface BookingStore {
  // All bookings
  bookings: Booking[];

  // Current booking flow state
  bookingFlow: BookingFlowState;

  // Actions
  addBooking: (booking: Booking) => void;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  deleteBooking: (id: string) => void;
  getBooking: (id: string) => Booking | undefined;

  // Booking flow actions
  setBookingFlow: (flow: Partial<BookingFlowState>) => void;
  resetBookingFlow: () => void;
}

const initialBookingFlow: BookingFlowState = {
  currentStep: 'service',
};

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      bookings: [],
      bookingFlow: initialBookingFlow,

      addBooking: (booking) =>
        set((state) => ({
          bookings: [...state.bookings, booking],
        })),

      updateBooking: (id, updates) =>
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === id ? { ...b, ...updates } : b
          ),
        })),

      deleteBooking: (id) =>
        set((state) => ({
          bookings: state.bookings.filter((b) => b.id !== id),
        })),

      getBooking: (id) => {
        return get().bookings.find((b) => b.id === id);
      },

      setBookingFlow: (flow) =>
        set((state) => ({
          bookingFlow: { ...state.bookingFlow, ...flow },
        })),

      resetBookingFlow: () =>
        set({ bookingFlow: initialBookingFlow }),
    }),
    {
      name: 'trimline-bookings-v2',
    }
  )
);
