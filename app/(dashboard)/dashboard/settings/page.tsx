'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useBarberStore } from '@/store/barberStore';

export default function SettingsPage() {
  const { barber } = useBarberStore();

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-black">Manage your business settings and preferences</p>
      </div>

      {/* Business Information */}
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>Update your business details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Business Name</Label>
            <Input defaultValue="Trimline" />
          </div>
          <div className="space-y-2">
            <Label>Your Name</Label>
            <Input defaultValue={barber.name} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" defaultValue={barber.email} />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input type="tel" defaultValue={barber.phone} />
          </div>
          <div className="space-y-2">
            <Label>Bio</Label>
            <Textarea defaultValue={barber.bio} rows={4} />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Booking Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Settings</CardTitle>
          <CardDescription>Configure how bookings work</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Booking Buffer (minutes)</Label>
            <Input
              type="number"
              defaultValue={barber.settings.bookingBufferMin}
              min="0"
              step="5"
            />
            <p className="text-xs text-black">
              Time buffer between appointments for cleanup and preparation
            </p>
          </div>
          <div className="space-y-2">
            <Label>Advance Booking (days)</Label>
            <Input
              type="number"
              defaultValue={barber.settings.advanceBookingDays}
              min="1"
            />
            <p className="text-xs text-black">
              How far in advance clients can book appointments
            </p>
          </div>
          <div className="space-y-2">
            <Label>Deposit Percentage (%)</Label>
            <Input
              type="number"
              defaultValue={barber.settings.depositPercentage}
              min="0"
              max="100"
            />
            <p className="text-xs text-black">
              Percentage of service price required as deposit
            </p>
          </div>
          <div className="space-y-2">
            <Label>Cancellation Notice (hours)</Label>
            <Input
              type="number"
              defaultValue={barber.settings.cancellationHours}
              min="1"
            />
            <p className="text-xs text-black">
              Minimum hours notice required for free cancellation
            </p>
          </div>
          <Button>Save Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
}
