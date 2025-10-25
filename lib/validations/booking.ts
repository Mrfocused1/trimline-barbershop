import { z } from 'zod';

export const clientDetailsSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[\d\s\-\(\)]+$/, 'Invalid phone number format'),
});

export const bookingNotesSchema = z.object({
  notes: z.string().max(500, 'Notes must be less than 500 characters').optional(),
});

export type ClientDetailsFormData = z.infer<typeof clientDetailsSchema>;
export type BookingNotesFormData = z.infer<typeof bookingNotesSchema>;
