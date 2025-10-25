import Link from 'next/link';
import { Clock } from 'lucide-react';
import { Service } from '@/types';
import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatPrice, formatDuration } from '@/lib/utils';

interface ServiceCardProps {
  service: Service;
  delay?: number;
}

export function ServiceCard({ service, delay = 0 }: ServiceCardProps) {
  return (
    <AnimatedCard delay={delay} className="h-full flex flex-col">
      <CardHeader className="flex-none">
        <CardTitle>{service.name}</CardTitle>
        <CardDescription className="line-clamp-3">{service.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-black">
            <Clock className="h-4 w-4" />
            <span>{formatDuration(service.durationMin)}</span>
          </div>
          <div className="font-semibold">
            <span>{formatPrice(service.priceGBP)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-none">
        <Button variant="outline" className="w-full" asChild>
          <Link href="/booking">Book Now</Link>
        </Button>
      </CardFooter>
    </AnimatedCard>
  );
}
