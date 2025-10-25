'use client';

import { format, isToday, parseISO } from 'date-fns';
import { Calendar, PoundSterling, Users, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useBookingStore } from '@/store/bookingStore';
import { formatPrice } from '@/lib/utils';

export default function DashboardPage() {
  const { bookings } = useBookingStore();

  const todayBookings = bookings.filter((b) =>
    isToday(parseISO(b.startTime))
  );

  const upcomingBookings = bookings.filter((b) =>
    parseISO(b.startTime) > new Date() && !isToday(parseISO(b.startTime))
  );

  const totalRevenue = bookings
    .filter((b) => b.status === 'confirmed' || b.status === 'completed')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const stats = [
    {
      name: "Today's Appointments",
      value: todayBookings.length,
      icon: Calendar,
      description: `${todayBookings.filter((b) => b.status === 'confirmed').length} confirmed`,
    },
    {
      name: 'Upcoming Bookings',
      value: upcomingBookings.length,
      icon: Clock,
      description: 'Next 30 days',
    },
    {
      name: 'Total Revenue',
      value: formatPrice(totalRevenue),
      icon: PoundSterling,
      description: 'All time',
    },
    {
      name: 'Total Clients',
      value: new Set(bookings.map((b) => b.client.email)).size,
      icon: Users,
      description: 'Unique clients',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-black">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                <Icon className="h-4 w-4 text-black" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-black">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
          <CardDescription>
            {todayBookings.length === 0
              ? 'No appointments scheduled for today'
              : `${todayBookings.length} appointment${todayBookings.length !== 1 ? 's' : ''} today`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {todayBookings.length === 0 ? (
            <div className="py-12 text-center text-black">
              <Calendar className="mx-auto h-12 w-12 mb-4" />
              <p>No appointments scheduled for today</p>
            </div>
          ) : (
            <div className="space-y-4">
              {todayBookings
                .sort((a, b) => parseISO(a.startTime).getTime() - parseISO(b.startTime).getTime())
                .map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{booking.client.name}</p>
                        <Badge
                          variant={
                            booking.status === 'confirmed'
                              ? 'success'
                              : booking.status === 'completed'
                              ? 'secondary'
                              : 'outline'
                          }
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-black">
                        {booking.service.name} • {formatPrice(booking.service.priceGBP)}
                      </p>
                      <p className="text-sm text-black">
                        {booking.client.phone} • {booking.client.email}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {format(parseISO(booking.startTime), 'h:mm a')}
                      </p>
                      <p className="text-sm text-black">
                        {booking.service.durationMin} min
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Bookings */}
      {upcomingBookings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Bookings</CardTitle>
            <CardDescription>Next {upcomingBookings.slice(0, 5).length} appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingBookings
                .sort((a, b) => parseISO(a.startTime).getTime() - parseISO(b.startTime).getTime())
                .slice(0, 5)
                .map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="space-y-1">
                      <p className="font-semibold">{booking.client.name}</p>
                      <p className="text-sm text-black">
                        {booking.service.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {format(parseISO(booking.startTime), 'MMM d, h:mm a')}
                      </p>
                      <Badge variant="outline">{booking.status}</Badge>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
