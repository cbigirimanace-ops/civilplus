// Facebook Pixel ID: 2217131959095573
// Google Tag Manager: GTM-XXXXXXX

const FB_PIXEL_ID = '2217131959095573';

function fbq(...args) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq(...args);
  }
}

function gtmPush(eventData) {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventData);
  }
}

export const trackEvent = (eventName, data = {}) => {
  try {
    // Facebook Pixel custom event
    fbq('trackCustom', eventName, data);

    // Google Tag Manager push
    gtmPush({
      event: eventName,
      ...data,
    });
  } catch (error) {
    console.warn('[Analytics] trackEvent error:', error);
  }
};

export const trackPageView = (pageName, pageUrl) => {
  try {
    // Facebook Pixel PageView
    fbq('track', 'PageView');

    // GTM PageView
    gtmPush({
      event: 'pageview',
      page: {
        title: pageName,
        url: pageUrl || window.location.pathname,
      },
    });
  } catch (error) {
    console.warn('[Analytics] trackPageView error:', error);
  }
};

export const trackProductView = (product) => {
  try {
    const eventData = {
      content_ids: [String(product.id)],
      content_name: product.name,
      content_type: 'product',
      value: product.price,
      currency: product.currency === 'FCFA' ? 'XOF' : product.currency,
    };

    // Facebook Pixel ViewContent
    fbq('track', 'ViewContent', eventData);

    // GTM
    gtmPush({
      event: 'view_item',
      ecommerce: {
        items: [
          {
            item_id: String(product.id),
            item_name: product.name,
            item_category: product.category,
            price: product.price,
            currency: product.currency,
          },
        ],
      },
    });
  } catch (error) {
    console.warn('[Analytics] trackProductView error:', error);
  }
};

export const trackInitiateCheckout = (product) => {
  try {
    const eventData = {
      content_ids: [String(product.id)],
      content_name: product.name,
      content_type: 'product',
      value: product.price,
      currency: product.currency === 'FCFA' ? 'XOF' : product.currency,
      num_items: 1,
    };

    // Facebook Pixel InitiateCheckout
    fbq('track', 'InitiateCheckout', eventData);

    // GTM
    gtmPush({
      event: 'begin_checkout',
      ecommerce: {
        items: [
          {
            item_id: String(product.id),
            item_name: product.name,
            item_category: product.category,
            price: product.price,
            currency: product.currency,
            quantity: 1,
          },
        ],
        value: product.price,
        currency: product.currency,
      },
    });
  } catch (error) {
    console.warn('[Analytics] trackInitiateCheckout error:', error);
  }
};

export const trackPurchase = (product, orderId) => {
  try {
    const eventData = {
      content_ids: [String(product.id)],
      content_name: product.name,
      content_type: 'product',
      value: product.price,
      currency: product.currency === 'FCFA' ? 'XOF' : product.currency,
      num_items: 1,
    };

    // Facebook Pixel Purchase
    fbq('track', 'Purchase', eventData);

    // GTM
    gtmPush({
      event: 'purchase',
      ecommerce: {
        transaction_id: orderId || `order_${Date.now()}`,
        value: product.price,
        currency: product.currency,
        items: [
          {
            item_id: String(product.id),
            item_name: product.name,
            item_category: product.category,
            price: product.price,
            quantity: 1,
          },
        ],
      },
    });
  } catch (error) {
    console.warn('[Analytics] trackPurchase error:', error);
  }
};
