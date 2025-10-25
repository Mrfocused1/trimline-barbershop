'use client';

import { Check } from 'lucide-react';
import { Service } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatPrice, formatDuration, cn } from '@/lib/utils';
import { AnimatedCard } from '@/components/shared/AnimatedCard';

interface ServiceSelectorProps {
  services: Service[];
  selectedService?: Service;
  onSelect: (service: Service) => void;
}

export function ServiceSelector({ services, selectedService, onSelect }: ServiceSelectorProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Select a Service</h2>
        <p className="text-black">Choose the service you'd like to book</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((service, index) => (
          <button
            key={service.id}
            onClick={() => onSelect(service)}
            className="text-left transition-all h-full"
          >
            <AnimatedCard delay={index * 0.05} className={cn(
              "cursor-pointer transition-all h-full flex flex-col",
              selectedService?.id === service.id && "ring-2 ring-primary"
            )}>
              <CardHeader className="flex-none">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      {service.name}
                      {selectedService?.id === service.id && (
                        <div className="rounded-full bg-primary p-1">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </CardTitle>
                    <CardDescription className="mt-2 line-clamp-3">{service.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex items-end">
                <div className="flex items-center justify-between text-sm font-medium w-full">
                  <span>{formatDuration(service.durationMin)}</span>
                  <span className="text-lg">{formatPrice(service.priceGBP)}</span>
                </div>
              </CardContent>
            </AnimatedCard>
          </button>
        ))}
      </div>
    </div>
  );
}
