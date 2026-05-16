import { useState } from 'react';

/**
 * Banner displayed under the product title, above the stars.
 * Ratio 702/260 ≈ 2.7.
 * Pass either `src` (preferred — uses product.banner) or `slug` (back-compat).
 * Gracefully hides if the file is missing.
 */
export default function ProductBanner({ src, slug, alt }) {
  const [hide, setHide] = useState(false);
  if (hide) return null;

  // Fallback when no explicit src: try /images/banners/{slug}.webp
  const url = src || (slug ? `/images/banners/${slug}.webp` : null);
  if (!url) return null;

  return (
    <div className="w-full overflow-hidden rounded-card bg-gray-100" style={{ aspectRatio: '702 / 260' }}>
      <img
        src={url}
        alt={alt || ''}
        loading="eager"
        decoding="async"
        fetchpriority="high"
        className="w-full h-full object-cover"
        onError={() => setHide(true)}
      />
    </div>
  );
}
