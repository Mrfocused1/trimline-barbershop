import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Barber } from '@/types';
import { mockBarber } from '@/data/barber';

interface BarberStore {
  barber: Barber;

  // Actions
  updateBarber: (updates: Partial<Barber>) => void;
  updateSettings: (updates: Partial<Barber['settings']>) => void;
}

export const useBarberStore = create<BarberStore>()(
  persist(
    (set) => ({
      barber: mockBarber,

      updateBarber: (updates) =>
        set((state) => ({
          barber: { ...state.barber, ...updates },
        })),

      updateSettings: (updates) =>
        set((state) => ({
          barber: {
            ...state.barber,
            settings: { ...state.barber.settings, ...updates },
          },
        })),
    }),
    {
      name: 'trimline-barber-v2',
    }
  )
);
