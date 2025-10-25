'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Client } from '@/types';
import { clientDetailsSchema, ClientDetailsFormData } from '@/lib/validations/booking';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ClientDetailsFormProps {
  initialData?: Client & { notes?: string };
  onSubmit: (data: ClientDetailsFormData & { notes?: string }) => void;
  notes?: string;
}

export function ClientDetailsForm({ initialData, onSubmit, notes: initialNotes }: ClientDetailsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ClientDetailsFormData & { notes?: string }>({
    resolver: zodResolver(clientDetailsSchema),
    defaultValues: initialData || {},
  });

  const notesValue = watch('notes');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Your Information</h2>
        <p className="text-black">We'll use this to confirm your appointment</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            {...register('name')}
            placeholder="John Doe"
            className={errors.name ? 'border-destructive' : ''}
          />
          {errors.name && (
            <p className="text-sm text-black">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="john@example.com"
            className={errors.email ? 'border-destructive' : ''}
          />
          {errors.email && (
            <p className="text-sm text-black">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            placeholder="(555) 123-4567"
            className={errors.phone ? 'border-destructive' : ''}
          />
          {errors.phone && (
            <p className="text-sm text-black">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Special Requests (Optional)</Label>
          <Textarea
            id="notes"
            {...register('notes')}
            placeholder="Any specific requests or preferences..."
            rows={4}
            className={errors.notes ? 'border-destructive' : ''}
          />
          {errors.notes && (
            <p className="text-sm text-black">{errors.notes.message}</p>
          )}
          <p className="text-xs text-black">
            {notesValue?.length || 0} / 500 characters
          </p>
        </div>

        <button type="submit" className="hidden" id="client-form-submit" />
      </form>
    </div>
  );
}
