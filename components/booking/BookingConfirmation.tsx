'use client';

import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { CheckCircle2, Calendar, Clock, Mail, Phone, MapPin } from 'lucide-react';
import { Booking } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';
import { mockBarber } from '@/data/barber';

interface BookingConfirmationProps {
  booking: Booking;
}

export function BookingConfirmation({ booking }: BookingConfirmationProps) {
  return (
    <div className="space-y-6">
      {/* Success Message */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20">
          <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-500" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Booking Confirmed!</h2>
          <p className="text-black mt-2">
            We've sent a confirmation email to {booking.client.email}
          </p>
        </div>
      </div>

      {/* Booking Details */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Appointment Details</CardTitle>
            <Badge variant="success">Confirmed</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-black mt-0.5" />
            <div>
              <p className="font-medium">
                {format(parseISO(booking.startTime), 'EEEE, MMMM d, yyyy')}
              </p>
              <p className="text-sm text-black">
                {format(parseISO(booking.startTime), 'h:mm a')} -{' '}
                {format(parseISO(booking.endTime), 'h:mm a')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-black mt-0.5" />
            <div>
              <p className="font-medium">{booking.service.name}</p>
              <p className="text-sm text-black">
                {booking.service.description}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-black mt-0.5" />
            <div>
              <p className="font-medium">Trimline Barber</p>
              <p className="text-sm text-black">
                123 Main Street, Downtown, ST 12345
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Client Information */}
      <Card>
        <CardHeader>
          <CardTitle>Your Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-black" />
            <span className="text-sm">{booking.client.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-black" />
            <span className="text-sm">{booking.client.phone}</span>
          </div>
          {booking.notes && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm font-medium mb-1">Special Requests:</p>
              <p className="text-sm text-black">{booking.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-black">Service Total</span>
            <span>{formatPrice(booking.totalPrice)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-black">Deposit Paid</span>
            <span className="text-green-600">{formatPrice(booking.depositPaid)}</span>
          </div>
          <div className="flex justify-between border-t pt-3 font-semibold">
            <span>Balance Due at Appointment</span>
            <span>{formatPrice(booking.totalPrice - booking.depositPaid)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Important Information */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>Important Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            • Please arrive 5 minutes early to your appointment
          </p>
          <p>
            • Cancellations must be made {mockBarber.settings.cancellationHours} hours in advance for a full refund
          </p>
          <p>
            • You can view or manage your booking from the confirmation email
          </p>
          <p>
            • For questions, call us at {mockBarber.phone}
          </p>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild className="flex-1">
          <Link href="/">Back to Home</Link>
        </Button>
        <Button asChild variant="outline" className="flex-1">
          <Link href="/services">Book Another Service</Link>
        </Button>
      </div>
    </div>
  );
}
