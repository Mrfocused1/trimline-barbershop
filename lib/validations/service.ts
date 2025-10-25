import { z } from 'zod';

export const serviceSchema = z.object({
  name: z.string().min(2, 'Service name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  durationMin: z.number().min(15, 'Duration must be at least 15 minutes'),
  priceGBP: z.number().min(1, 'Price must be at least £1'),
  isActive: z.boolean().default(true),
  displayOrder: z.number().default(0),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;
