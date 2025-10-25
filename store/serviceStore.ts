import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Service } from '@/types';
import { mockServices } from '@/data/services';

interface ServiceStore {
  services: Service[];

  // Actions
  addService: (service: Service) => void;
  updateService: (id: string, updates: Partial<Service>) => void;
  deleteService: (id: string) => void;
  getService: (id: string) => Service | undefined;
  getActiveServices: () => Service[];
}

export const useServiceStore = create<ServiceStore>()(
  persist(
    (set, get) => ({
      services: mockServices,

      addService: (service) =>
        set((state) => ({
          services: [...state.services, service],
        })),

      updateService: (id, updates) =>
        set((state) => ({
          services: state.services.map((s) =>
            s.id === id ? { ...s, ...updates } : s
          ),
        })),

      deleteService: (id) =>
        set((state) => ({
          services: state.services.filter((s) => s.id !== id),
        })),

      getService: (id) => {
        return get().services.find((s) => s.id === id);
      },

      getActiveServices: () => {
        return get()
          .services.filter((s) => s.isActive)
          .sort((a, b) => a.displayOrder - b.displayOrder);
      },
    }),
    {
      name: 'trimline-services-v2',
    }
  )
);
