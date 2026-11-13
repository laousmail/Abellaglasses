'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import Logo from './Logo';
import { NAV_LINKS } from '@/lib/site';
import { track } from '@/lib/track';
import { loadGsap } from '@/lib/gsap';

type Level = 'std' | 'lg' | 'xl';
const LABELS: Record<Level, string> = { std: 'Standard', lg: 'Grand', xl: 'Très grand' };
const KEY = 'abella-comfort';
const SEEN = 'abella-comfort-seen';

function read(k: string) {
  try { return localStorage.getItem(k); } catch { return null; }
}
function write(k: string, v: string) {
  try { localStorage.setItem(k, v); } catch { /* private mode: the choice just isn't remembered */ }
}

const CHART: { cls: string; level: Level; label: string; text: string }[] = [
  { cls: 'l1', level: 'xl', label: 'Ligne 1, très grande', text: 'E' },
  { cls: 'l2', level: 'xl', label: 'Ligne 2', text: 'F P' },
  { cls: 'l3', level: 'lg', label: 'Ligne 3', text: 'T O Z' },
  { cls: 'l4', level: 'lg', label: 'Ligne 4', text: 'L P E D' },
  { cls: 'l5', level: 'std', label: 'Ligne 5', text: 'P E C F D' },
  { cls: 'l6', level: 'std', label: 'Ligne 6, la plus petite', text: 'E D F C Z P' },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [level, setLevelState] = useState<Level>('std');
  const [solid, setSolid] = useState(false);
  const [live, setLive] = useState('');
  const aaRef = useRef<HTMLButtonElement>(null);

  /* ---------- Reading comfort ---------- */
  useEffect(() => {
    const saved = read(KEY) as Level | null;
    if (saved && saved in LABELS) setLevelState(saved);
    if (!read(SEEN) && !saved) {
      const t = setTimeout(() => setOpen(true), 1400);
      return () => clearTimeout(t);
    }
  }, []);

  const setLevel = useCallback((l: Level) => {
    document.documentElement.setAttribute('data-comfort', l);
    write(KEY, l);
    setLevelState(l);
    setLive('Taille du texte : ' + LABELS[l]);
    track('comfort_set', { level: l });
    loadGsap().then(({ ScrollTrigger }) => setTimeout(() => ScrollTrigger.refresh(), 60)).catch(() => {});
  }, []);

  const close = useCallback((refocus: boolean) => {
    setOpen(false);
    write(SEEN, '1');
    if (refocus) aaRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(true); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  /* ---------- Nav: light text over a dark top band, solid after ---------- */
  useEffect(() => {
    const band = document.querySelector('[data-nav-dark]');
    const update = () => setSolid(!band || band.getBoundingClientRect().bottom < 72);
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [pathname]);

  return (
    <>
      <header className={'nav' + (solid ? ' solid' : '')} id="nav">
        <div className="wrap nav-in">
          <Logo />
          <ul className="links">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} aria-current={pathname === l.href ? 'page' : undefined}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <button
            ref={aaRef}
            className="aa"
            type="button"
            aria-label="Confort de lecture : changer la taille du texte"
            aria-controls="comfort"
            aria-expanded={open}
            onClick={() => (open ? close(false) : setOpen(true))}
          >
            Aa
          </button>
          <Link className="btn btn-amber" href="/rendez-vous" data-track="book" aria-current={pathname === '/rendez-vous' ? 'page' : undefined}>
            Prendre rendez-vous
          </Link>
        </div>
      </header>

      <div className="comfort" id="comfort" role="dialog" aria-labelledby="comfortTitle" hidden={!open}>
        <button className="x" type="button" aria-label="Fermer" onClick={() => close(true)}>×</button>
        <p className="eyebrow">Confort de lecture</p>
        <h2 id="comfortTitle">Quelle ligne lisez-vous sans effort ?</h2>
        <div className="chart" role="group" aria-label="Lignes de lecture, de la plus grande à la plus petite">
          {CHART.map((c) => (
            <button key={c.cls} type="button" className={c.cls} aria-label={c.label} onClick={() => setLevel(c.level)}>
              {c.text}
            </button>
          ))}
        </div>
        <p className="hint">Touchez la plus petite ligne que vous lisez confortablement. Le site s’adapte à vous.</p>
        <div className="levels" role="group" aria-label="Taille du texte">
          {(Object.keys(LABELS) as Level[]).map((l) => (
            <button key={l} type="button" aria-pressed={level === l} onClick={() => setLevel(l)}>
              {LABELS[l]}
            </button>
          ))}
        </div>
        <p className="note">
          Ce n’est pas un examen de la vue. Si la lecture était difficile,{' '}
          <Link href="/rendez-vous" data-track="book" onClick={() => close(false)}>prenez rendez-vous</Link>.
        </p>
      </div>
      <p className="sr" aria-live="polite">{live}</p>
    </>
  );
}
