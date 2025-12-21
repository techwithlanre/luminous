/* Analytics helper for Google Analytics (GA4)

- Loads the gtag script using Vite env var `VITE_GA_MEASUREMENT_ID`.
- Exposes `initAnalytics`, `trackPageview`, and `trackClick`.

Notes:
- Set VITE_GA_MEASUREMENT_ID in your environment (e.g. `.env.local`).
- Pageviews are sent manually (send_page_view: false) so single-page-app navigation uses `trackPageview`.
*/

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

const MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID as string) || '';
let _isInitialized = false;
let _lastClickTs = 0;
const CLICK_THROTTLE_MS = 150; // avoid flooding

export function isEnabled() {
  return Boolean(MEASUREMENT_ID);
}

export function initAnalytics() {
  if (!MEASUREMENT_ID) return;
  if (_isInitialized) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer!.push(arguments);
  } as any;

  window.gtag('js', new Date());
  // disable automatic page_view so we can send controlled page views in our SPA
  window.gtag('config', MEASUREMENT_ID, { send_page_view: false });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  _isInitialized = true;
}

export function trackPageview(path: string) {
  if (!isEnabled() || !window.gtag) return;
  try {
    window.gtag('event', 'page_view', {
      page_path: path,
    });
  } catch (err) {
    // swallow failures silently
    // console.debug('trackPageview failed', err);
  }
}

export function trackClick(ev: MouseEvent) {
  if (!isEnabled() || !window.gtag) return;

  const now = Date.now();
  if (now - _lastClickTs < CLICK_THROTTLE_MS) return;
  _lastClickTs = now;

  const target = ev.target as HTMLElement | null;
  if (!target) return;

  // find closest clickable element with useful info
  const el = target.closest('a,button,[role="button"],input,svg') as HTMLElement | null || target;
  const tag = el.tagName;
  const id = el.id || undefined;
  const classes = el.className ? String(el.className).slice(0, 200) : undefined;
  let label: string | undefined;

  if (el instanceof HTMLAnchorElement && el.href) {
    label = el.href;
  } else {
    const text = el.textContent?.trim();
    if (text) label = text.length > 100 ? text.slice(0, 100) : text;
  }

  try {
    window.gtag('event', 'click', {
      event_category: 'engagement',
      event_label: label || undefined,
      element_id: id,
      element_classes: classes,
      element_tag: tag,
      page_path: location.pathname,
    });
  } catch (err) {
    // ignore
  }
}
