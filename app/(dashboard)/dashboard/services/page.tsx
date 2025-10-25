'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useServiceStore } from '@/store/serviceStore';
import { formatPrice, formatDuration } from '@/lib/utils';

export default function ServicesManagementPage() {
  const { services, updateService } = useServiceStore();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Services Management</h1>
          <p className="text-black">Manage your service offerings</p>
        </div>
        <Button>Add Service</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle>{service.name}</CardTitle>
                <Badge variant={service.isActive ? 'success' : 'secondary'}>
                  {service.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-black">Duration</span>
                <span className="font-medium">{formatDuration(service.durationMin)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-black">Price</span>
                <span className="font-medium">{formatPrice(service.priceGBP)}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => updateService(service.id, { isActive: !service.isActive })}
                >
                  {service.isActive ? 'Deactivate' : 'Activate'}
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
