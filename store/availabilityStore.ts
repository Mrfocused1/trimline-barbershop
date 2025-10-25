import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AvailabilityRule, BlackoutDate } from '@/types';
import { mockAvailability, mockBlackoutDates } from '@/data/availability';

interface AvailabilityStore {
  rules: AvailabilityRule[];
  blackoutDates: BlackoutDate[];

  // Actions
  addRule: (rule: AvailabilityRule) => void;
  updateRule: (id: string, updates: Partial<AvailabilityRule>) => void;
  deleteRule: (id: string) => void;
  getActiveRules: () => AvailabilityRule[];

  addBlackoutDate: (blackout: BlackoutDate) => void;
  deleteBlackoutDate: (id: string) => void;
}

export const useAvailabilityStore = create<AvailabilityStore>()(
  persist(
    (set, get) => ({
      rules: mockAvailability,
      blackoutDates: mockBlackoutDates,

      addRule: (rule) =>
        set((state) => ({
          rules: [...state.rules, rule],
        })),

      updateRule: (id, updates) =>
        set((state) => ({
          rules: state.rules.map((r) =>
            r.id === id ? { ...r, ...updates } : r
          ),
        })),

      deleteRule: (id) =>
        set((state) => ({
          rules: state.rules.filter((r) => r.id !== id),
        })),

      getActiveRules: () => {
        return get().rules.filter((r) => r.isActive);
      },

      addBlackoutDate: (blackout) =>
        set((state) => ({
          blackoutDates: [...state.blackoutDates, blackout],
        })),

      deleteBlackoutDate: (id) =>
        set((state) => ({
          blackoutDates: state.blackoutDates.filter((b) => b.id !== id),
        })),
    }),
    {
      name: 'trimline-availability-v2',
    }
  )
);
