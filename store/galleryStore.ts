import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GalleryImage } from '@/types';
import { mockGallery } from '@/data/gallery';

interface GalleryStore {
  images: GalleryImage[];

  // Actions
  addImage: (image: GalleryImage) => void;
  updateImage: (id: string, updates: Partial<GalleryImage>) => void;
  deleteImage: (id: string) => void;
  getPublicImages: () => GalleryImage[];
}

export const useGalleryStore = create<GalleryStore>()(
  persist(
    (set, get) => ({
      images: mockGallery,

      addImage: (image) =>
        set((state) => ({
          images: [...state.images, image],
        })),

      updateImage: (id, updates) =>
        set((state) => ({
          images: state.images.map((img) =>
            img.id === id ? { ...img, ...updates } : img
          ),
        })),

      deleteImage: (id) =>
        set((state) => ({
          images: state.images.filter((img) => img.id !== id),
        })),

      getPublicImages: () => {
        return get()
          .images.filter((img) => img.isPublic)
          .sort((a, b) => a.displayOrder - b.displayOrder);
      },
    }),
    {
      name: 'trimline-gallery-v2',
    }
  )
);
