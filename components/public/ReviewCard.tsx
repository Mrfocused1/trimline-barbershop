import { Star } from 'lucide-react';
import { Review } from '@/types';
import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { CardContent, CardHeader } from '@/components/ui/card';
import { format, parseISO } from 'date-fns';

interface ReviewCardProps {
  review: Review;
  delay?: number;
}

export function ReviewCard({ review, delay = 0 }: ReviewCardProps) {
  return (
    <AnimatedCard delay={delay}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">{review.clientName}</h3>
            <p className="text-sm text-black">
              {format(parseISO(review.date), 'MMMM d, yyyy')}
            </p>
          </div>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < review.rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-black leading-relaxed">{review.comment}</p>
      </CardContent>
    </AnimatedCard>
  );
}
