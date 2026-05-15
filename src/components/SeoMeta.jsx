import { useEffect } from 'react';

/**
 * Lightweight SEO helper — sets <title>, meta description, OG tags and an optional JSON-LD block.
 * No external library; manipulates <head> directly.
 */
export default function SeoMeta({
  title,
  description,
  image,
  url,
  type = 'website',
  jsonLd,
}) {
  useEffect(() => {
    if (title) document.title = title;

    const setMeta = (selector, value) => {
      if (value == null) return;
      let tag = document.head.querySelector(selector);
      if (!tag) {
        tag = document.createElement('meta');
        if (selector.includes('property=')) {
          tag.setAttribute('property', selector.match(/property="([^"]+)"/)[1]);
        } else if (selector.includes('name=')) {
          tag.setAttribute('name', selector.match(/name="([^"]+)"/)[1]);
        }
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', value);
    };

    if (description) setMeta('meta[name="description"]', description);
    if (title) setMeta('meta[property="og:title"]', title);
    if (description) setMeta('meta[property="og:description"]', description);
    if (image) setMeta('meta[property="og:image"]', image);
    if (url) setMeta('meta[property="og:url"]', url);
    setMeta('meta[property="og:type"]', type);
    setMeta('meta[name="twitter:card"]', 'summary_large_image');
    if (title) setMeta('meta[name="twitter:title"]', title);
    if (description) setMeta('meta[name="twitter:description"]', description);
    if (image) setMeta('meta[name="twitter:image"]', image);

    // JSON-LD
    let script = document.head.querySelector('script[data-seo="jsonld"]');
    if (jsonLd) {
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo', 'jsonld');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    } else if (script) {
      script.remove();
    }
  }, [title, description, image, url, type, jsonLd]);

  return null;
}
