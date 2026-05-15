import { useState } from 'react';

/**
 * Banner displayed under the product title, above the stars.
 * Ratio 702/260 ≈ 2.7. Files expected at /images/banners/{slug}.png
 * Gracefully hides if the file is missing.
 */
export default function ProductBanner({ slug, alt }) {
  const [hide, setHide] = useState(false);
  if (hide) return null;

  return (
    <div className="w-full overflow-hidden rounded-card bg-gray-100" style={{ aspectRatio: '702 / 260' }}>
      <img
        src={`/images/banners/${slug}.png`}
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
