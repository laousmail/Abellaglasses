'use client';

import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { loadGsap, prefersReducedMotion } from '@/lib/gsap';
import type { GlassesState } from '@/lib/glasses3d';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef<GlassesState>({ ry: -0.42, rx: 0.14, x: 1, tint: 0 });
  const [no3d, setNo3d] = useState(false);

  /* 3D glasses, loaded after first paint. Falls back to the static SVG if anything fails. */
  useEffect(() => {
    let cancelled = false;
    let dispose: (() => void) | undefined;
    const start = () => {
      import('@/lib/glasses3d')
        .then(({ initGlasses }) => {
          if (cancelled || !canvasRef.current || !pinRef.current) return;
          const h = initGlasses(canvasRef.current, state.current, { reduce: prefersReducedMotion(), observe: pinRef.current });
          if (!h) setNo3d(true);
          else dispose = h.dispose;
        })
        .catch(() => { if (!cancelled) setNo3d(true); });
    };
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    if (ric) ric(start, { timeout: 600 }); else setTimeout(start, 50);
    return () => { cancelled = true; dispose?.(); };
  }, []);

  /* Scroll story: pinned hero, glasses turn, lenses tint amber. Skipped with reduced motion. */
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    const root = document.documentElement;
    loadGsap().then(({ gsap }) => {
      if (cancelled || !sectionRef.current) return;
      root.classList.add('js-scroll');
      const s = state.current;
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: '+=230%', scrub: 0.8, pin: pinRef.current, anticipatePin: 1 },
        });
        tl.to(s, { ry: 0, rx: 0.05, x: 0, duration: 1, ease: 'power2.inOut' }, 0)
          .to('.hero-copy', { autoAlpha: 0, y: -50, duration: 0.6 }, 0.15)
          .to('.scroll-hint', { autoAlpha: 0, duration: 0.2 }, 0.1)
          .fromTo('.step.s1', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 0.55)
          .to('.step.s1', { autoAlpha: 0, y: -30, duration: 0.3 }, 1.2)
          .to(s, { ry: 1.3, rx: 0.16, duration: 1, ease: 'power2.inOut' }, 1.1)
          .fromTo('.step.s2', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 1.55)
          .to('.step.s2', { autoAlpha: 0, y: -30, duration: 0.3 }, 2.2)
          .to(s, { ry: -0.38, rx: 0.08, tint: 1, duration: 1, ease: 'power2.inOut' }, 2.1)
          .fromTo('.step.s3', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 2.55)
          .to({}, { duration: 0.5 }, 3);
      }, sectionRef);
    }).catch(() => {});
    return () => {
      cancelled = true;
      ctx?.revert();
      root.classList.remove('js-scroll');
    };
  }, []);

  return (
    <section className={'hero' + (no3d ? ' no3d' : '')} id="top" aria-label="Accueil" ref={sectionRef} data-nav-dark>
      <div className="hero-pin" ref={pinRef}>
        <canvas id="glasses3d" ref={canvasRef} aria-hidden="true" />
        <svg className="glasses-fallback" viewBox="0 0 812 360" aria-hidden="true">
          <circle cx="200" cy="190" r="150" fill="rgba(207,224,255,.08)" stroke="#E8A23E" strokeWidth="10" />
          <circle cx="612" cy="190" r="150" fill="rgba(207,224,255,.08)" stroke="#E8A23E" strokeWidth="10" />
          <path d="M350 175 Q406 130 462 175" fill="none" stroke="#E8A23E" strokeWidth="10" />
        </svg>
        <div className="wrap hero-copy">
          <p className="eyebrow">Optométrie et lunetterie · Depuis 1980</p>
          <h1>Voyez la <span>différence.</span></h1>
          <p className="hero-sub">Examen complet, conseils honnêtes et lunettes pour tous les budgets, sur la rue Lajeunesse.</p>
          <div className="cta-row">
            <Link className="btn btn-amber" href="/rendez-vous" data-track="book">Prendre rendez-vous</Link>
            <Link className="btn btn-ghost" href="/prix-assurances">Voir nos prix</Link>
          </div>
        </div>
        <div className="wrap steps">
          <p className="step s1"><b>L’examen</b>Un examen complet, sans vous presser.</p>
          <p className="step s2"><b>Les montures</b>Choisies avec vous, pour tous les budgets.</p>
          <p className="step s3"><b>Les solaires</b>Avec ou sans prescription.</p>
        </div>
        <p className="scroll-hint" aria-hidden="true">Défilez</p>
      </div>
    </section>
  );
}
