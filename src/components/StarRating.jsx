import { Star } from 'lucide-react';

export default function StarRating({ rating, max = 5, size = 16, showEmpty = true }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-200'}
        />
      ))}
    </div>
  );
}
