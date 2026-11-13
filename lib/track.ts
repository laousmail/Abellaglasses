/**
 * GA4 event helper. Does nothing until analytics is loaded (after Loi 25 consent),
 * so a missing or blocked tag never breaks the page.
 * Events: book_click, call_click, directions_click, form_submit, comfort_set, faq_open.
 */
type Params = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params: Params = {}) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', event, params);
    }
  } catch {
    /* analytics must never break the site */
  }
}
