// Facebook Pixel ID: 2217131959095573
// Google Analytics 4 (gtag.js): G-WDMRBMV3B4
// Both pixels are initialized in index.html.

const FB_PIXEL_ID = '2217131959095573';

function fbq(...args) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq(...args);
  }
}

function gtag(...args) {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag === 'function') {
      window.gtag(...args);
    } else {
      window.dataLayer.push(args);
    }
  }
}

export const trackEvent = (eventName, data = {}) => {
  try {
    fbq('trackCustom', eventName, data);
    gtag('event', eventName, data);
  } catch (error) {
    console.warn('[Analytics] trackEvent error:', error);
  }
};

export const trackPageView = (pageName, pageUrl) => {
  try {
    fbq('track', 'PageView');
    gtag('event', 'page_view', {
      page_title: pageName,
      page_location: typeof window !== 'undefined' ? window.location.href : pageUrl,
      page_path: pageUrl || (typeof window !== 'undefined' ? window.location.pathname : ''),
    });
  } catch (error) {
    console.warn('[Analytics] trackPageView error:', error);
  }
};

export const trackProductView = (product) => {
  try {
    const fbData = {
      content_ids: [String(product.id)],
      content_name: product.name,
      content_type: 'product',
      value: product.price,
      currency: product.currency === 'FCFA' ? 'XOF' : product.currency,
    };
    fbq('track', 'ViewContent', fbData);

    gtag('event', 'view_item', {
      currency: product.currency === 'FCFA' ? 'XOF' : product.currency,
      value: product.price,
      items: [{
        item_id: String(product.id),
        item_name: product.name,
        item_category: product.category,
        price: product.price,
      }],
    });
  } catch (error) {
    console.warn('[Analytics] trackProductView error:', error);
  }
};

export const trackInitiateCheckout = (product) => {
  try {
    const fbData = {
      content_ids: [String(product.id)],
      content_name: product.name,
      content_type: 'product',
      value: product.price,
      currency: product.currency === 'FCFA' ? 'XOF' : product.currency,
      num_items: 1,
    };
    fbq('track', 'InitiateCheckout', fbData);

    gtag('event', 'begin_checkout', {
      currency: product.currency === 'FCFA' ? 'XOF' : product.currency,
      value: product.price,
      items: [{
        item_id: String(product.id),
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity: 1,
      }],
    });
  } catch (error) {
    console.warn('[Analytics] trackInitiateCheckout error:', error);
  }
};

export const trackPurchase = (product, orderId) => {
  try {
    const fbData = {
      content_ids: [String(product.id)],
      content_name: product.name,
      content_type: 'product',
      value: product.price,
      currency: product.currency === 'FCFA' ? 'XOF' : product.currency,
      num_items: 1,
    };
    fbq('track', 'Purchase', fbData);

    gtag('event', 'purchase', {
      transaction_id: orderId || `order_${Date.now()}`,
      currency: product.currency === 'FCFA' ? 'XOF' : product.currency,
      value: product.price,
      items: [{
        item_id: String(product.id),
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity: 1,
      }],
    });
  } catch (error) {
    console.warn('[Analytics] trackPurchase error:', error);
  }
};

export { FB_PIXEL_ID };
