import { ServicesGrid } from '@/components/public/ServicesGrid';
import { CTASection } from '@/components/public/CTASection';

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Our Services
          </h1>
          <p className="mt-4 text-lg text-black max-w-2xl mx-auto">
            From classic cuts to modern fades, we offer a comprehensive range of premium grooming services tailored to your unique style.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <ServicesGrid />

      {/* CTA */}
      <CTASection />
    </div>
  );
}
