'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAvailabilityStore } from '@/store/availabilityStore';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function AvailabilityPage() {
  const { rules, updateRule } = useAvailabilityStore();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Availability Management</h1>
        <p className="text-black">Set your weekly availability and blackout dates</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
          <CardDescription>Configure your available hours for each day</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {DAYS.map((day, index) => {
            const rule = rules.find((r) => r.dayOfWeek === index);
            return (
              <div key={day} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <p className="font-semibold w-32">{day}</p>
                  {rule && rule.isActive ? (
                    <>
                      <Badge variant="success">Open</Badge>
                      <p className="text-sm text-black">
                        {rule.startTime} - {rule.endTime}
                      </p>
                    </>
                  ) : (
                    <Badge variant="secondary">Closed</Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  {rule && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateRule(rule.id, { isActive: !rule.isActive })}
                    >
                      {rule.isActive ? 'Close' : 'Open'}
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    Edit Hours
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Blackout Dates</CardTitle>
          <CardDescription>Block off specific dates when you're unavailable</CardDescription>
        </CardHeader>
        <CardContent>
          <Button>Add Blackout Date</Button>
        </CardContent>
      </Card>
    </div>
  );
}
