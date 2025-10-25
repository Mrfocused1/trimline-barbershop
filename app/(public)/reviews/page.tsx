import { Star } from 'lucide-react';
import { ReviewCard } from '@/components/public/ReviewCard';
import { mockReviews } from '@/data/reviews';

export default function ReviewsPage() {
  const publicReviews = mockReviews.filter((r) => r.isPublic);
  const averageRating = publicReviews.reduce((acc, r) => acc + r.rating, 0) / publicReviews.length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Client Reviews
          </h1>
          <p className="mt-4 text-lg text-black max-w-2xl mx-auto">
            Hear what our valued clients have to say about their experience
          </p>

          {/* Rating Summary */}
          <div className="mt-8 inline-flex flex-col items-center space-y-2 rounded-lg bg-background p-6 shadow-sm">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-6 w-6 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <div className="text-3xl font-bold">{averageRating.toFixed(1)}</div>
            <div className="text-sm text-black">
              Based on {publicReviews.length} reviews
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {publicReviews.map((review, index) => (
              <ReviewCard key={review.id} review={review} delay={index * 0.05} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
