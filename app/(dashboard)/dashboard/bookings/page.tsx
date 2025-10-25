'use client';

import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Search, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useBookingStore } from '@/store/bookingStore';
import { formatPrice } from '@/lib/utils';
import { BookingStatus } from '@/types';

export default function BookingsPage() {
  const { bookings, updateBooking } = useBookingStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');

  const filteredBookings = bookings
    .filter((b) => {
      const matchesSearch =
        b.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.service.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || b.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => parseISO(b.startTime).getTime() - parseISO(a.startTime).getTime());

  const statusCounts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
  };

  const handleStatusChange = (bookingId: string, newStatus: BookingStatus) => {
    updateBooking(bookingId, { status: newStatus });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Bookings Management</h1>
        <p className="text-black">View and manage all appointments</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card
          className={`cursor-pointer transition-colors ${
            statusFilter === 'all' ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => setStatusFilter('all')}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.all}</div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-colors ${
            statusFilter === 'pending' ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => setStatusFilter('pending')}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.pending}</div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-colors ${
            statusFilter === 'confirmed' ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => setStatusFilter('confirmed')}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.confirmed}</div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-colors ${
            statusFilter === 'completed' ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => setStatusFilter('completed')}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.completed}</div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-colors ${
            statusFilter === 'cancelled' ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => setStatusFilter('cancelled')}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.cancelled}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black" />
          <Input
            placeholder="Search by name, email, or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Bookings List */}
      <Card>
        <CardHeader>
          <CardTitle>
            {statusFilter === 'all' ? 'All Bookings' : `${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)} Bookings`}
          </CardTitle>
          <CardDescription>
            {filteredBookings.length} booking{filteredBookings.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredBookings.length === 0 ? (
            <div className="py-12 text-center text-black">
              <p>No bookings found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-semibold text-lg">{booking.client.name}</p>
                            <p className="text-sm text-black">
                              {booking.client.email} • {booking.client.phone}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-black">Service</p>
                            <p className="font-medium">{booking.service.name}</p>
                          </div>
                          <div>
                            <p className="text-black">Date & Time</p>
                            <p className="font-medium">
                              {format(parseISO(booking.startTime), 'MMM d, yyyy • h:mm a')}
                            </p>
                          </div>
                          <div>
                            <p className="text-black">Price</p>
                            <p className="font-medium">{formatPrice(booking.totalPrice)}</p>
                          </div>
                          <div>
                            <p className="text-black">Deposit Paid</p>
                            <p className="font-medium text-green-600">
                              {formatPrice(booking.depositPaid)}
                            </p>
                          </div>
                        </div>

                        {booking.notes && (
                          <div className="rounded-lg bg-muted/50 p-3">
                            <p className="text-xs font-medium text-black mb-1">
                              Special Requests:
                            </p>
                            <p className="text-sm">{booking.notes}</p>
                          </div>
                        )}
                      </div>

                      <div className="ml-4 flex flex-col items-end gap-2">
                        <Badge
                          variant={
                            booking.status === 'confirmed'
                              ? 'success'
                              : booking.status === 'completed'
                              ? 'secondary'
                              : booking.status === 'cancelled'
                              ? 'destructive'
                              : 'outline'
                          }
                        >
                          {booking.status}
                        </Badge>

                        {booking.status === 'confirmed' && (
                          <div className="flex flex-col gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusChange(booking.id, 'completed')}
                            >
                              Mark Complete
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleStatusChange(booking.id, 'cancelled')}
                            >
                              Cancel
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
