/** Loads GSAP + ScrollTrigger on demand so motion never blocks the first paint. */
export async function loadGsap() {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger };
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
