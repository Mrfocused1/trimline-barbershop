'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ServiceCard } from './ServiceCard';
import { useServiceStore } from '@/store/serviceStore';
import { MagneticButton } from '@/components/shared/MagneticButton';

interface ServicesGridProps {
  limit?: number;
  showViewAll?: boolean;
}

export function ServicesGrid({ limit, showViewAll = false }: ServicesGridProps) {
  const { getActiveServices } = useServiceStore();
  const services = getActiveServices();
  const displayServices = limit ? services.slice(0, limit) : services;

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-black">
            Premium grooming services tailored to your style
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} delay={index * 0.1} />
          ))}
        </div>

        {showViewAll && services.length > (limit || 0) && (
          <div className="mt-12 text-center">
            <MagneticButton variant="outline" size="lg" asChild>
              <Link href="/services">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </MagneticButton>
          </div>
        )}
      </div>
    </section>
  );
}
