'use client';

import { useLayoutEffect, useRef } from 'react';
import { LAYERS } from '@/lib/content';
import { loadGsap, prefersReducedMotion } from '@/lib/gsap';

/**
 * Exploded lens layers. GSAP animates only the --gap custom property,
 * never the discs' CSS 3D transforms.
 */
export default function LensLayers({ as: Heading = 'h2', navDark = false }: { as?: 'h1' | 'h2'; navDark?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    loadGsap().then(({ gsap }) => {
      if (cancelled || !sectionRef.current) return;
      ctx = gsap.context(() => {
        const lt = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: '+=160%', scrub: 0.8, pin: true, anticipatePin: 1 },
        });
        lt.fromTo(stageRef.current, { '--gap': '0rem' }, { '--gap': window.innerWidth < 900 ? '3.2rem' : '4.4rem', duration: 1, ease: 'power2.out' }, 0)
          .fromTo('.layer-list li', { autoAlpha: 0.3, x: -16 }, { autoAlpha: 1, x: 0, stagger: 0.22, duration: 0.4 }, 0.1);
      }, sectionRef);
    }).catch(() => {});
    return () => { cancelled = true; ctx?.revert(); };
  }, []);

  return (
    <section className="lens dark" id="verres" aria-label="Ce qui fait un bon verre" ref={sectionRef} data-nav-dark={navDark || undefined}>
      <div className="wrap lens-in">
        <div>
          <p className="eyebrow">Nos verres</p>
          <Heading style={Heading === 'h1' ? { fontSize: 'clamp(2.5rem,7vw,4.4rem)', fontWeight: 800 } : undefined}>Ce qui fait un bon verre.</Heading>
          <p className="lead">Vos verres ont plusieurs couches. On vous explique chacune, pour que vous choisissiez en confiance.</p>
          <ol className="layer-list">
            {LAYERS.map((l, i) => (
              <li key={l.title} style={{ '--c': l.c } as React.CSSProperties}>
                <span className="n">{i + 1}</span>
                <div><h3>{l.title}</h3><p>{l.text}</p></div>
              </li>
            ))}
          </ol>
        </div>
        <div className="stage" ref={stageRef} aria-hidden="true">
          {LAYERS.map((l, i) => (
            <div key={l.title} className="disc" style={{ '--i': i, '--c': l.disc } as React.CSSProperties} />
          ))}
        </div>
      </div>
    </section>
  );
}
