'use client';

import { ReviewCard } from './ReviewCard';
import { mockReviews } from '@/data/reviews';

interface ReviewsSectionProps {
  limit?: number;
}

export function ReviewsSection({ limit = 3 }: ReviewsSectionProps) {
  const publicReviews = mockReviews.filter((r) => r.isPublic);
  const displayReviews = publicReviews.slice(0, limit);

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            What Clients Say
          </h2>
          <p className="mt-4 text-lg text-black">
            Real feedback from our valued clients
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayReviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
