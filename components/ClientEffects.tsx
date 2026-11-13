'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { loadGsap, prefersReducedMotion } from '@/lib/gsap';
import { track } from '@/lib/track';
import { SITE } from '@/lib/site';

/** Card reveal on scroll + GA4 click events. Content is visible without JS; this only adds motion. */
export default function ClientEffects() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
          gsap.from(el, { y: 40, autoAlpha: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
        });
      });
    }).catch(() => {});
    return () => { cancelled = true; ctx?.revert(); };
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      if (a.dataset.track === 'book') track('book_click', { page: location.pathname });
      else if (href.startsWith('tel:')) track('call_click', { page: location.pathname });
      if (href === SITE.mapsHref) track('directions_click', { page: location.pathname });
    };
    // toggle doesn't bubble: listen in the capture phase
    const onToggle = (e: Event) => {
      const d = e.target as HTMLDetailsElement;
      if (d.tagName === 'DETAILS' && d.open) track('faq_open', { question: d.querySelector('summary')?.textContent || '' });
    };
    document.addEventListener('click', onClick);
    document.addEventListener('toggle', onToggle, true);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('toggle', onToggle, true);
    };
  }, []);

  return null;
}
