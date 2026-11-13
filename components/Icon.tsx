import type { IconName } from '@/lib/content';

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 2 } as const;

const PATHS: Record<IconName, React.ReactNode> = {
  eye: (<><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" {...S} /><circle cx="12" cy="12" r="3" {...S} /></>),
  glasses: (<><circle cx="6.5" cy="14" r="4" {...S} /><circle cx="17.5" cy="14" r="4" {...S} /><path d="M10.5 14h3M2.5 13l1-5M21.5 13l-1-5" {...S} /></>),
  lines: <path d="M4 12h16M4 7h16M4 17h10" {...S} />,
  contact: <path d="M3 13c3-5 15-5 18 0-3 4-15 4-18 0z" {...S} />,
  sun: (<><circle cx="12" cy="12" r="4" {...S} /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" {...S} /></>),
  child: (<><circle cx="12" cy="7" r="3" {...S} /><path d="M6 21c0-3.3 2.7-6 6-6s6 2.7 6 6" {...S} /></>),
  shield: <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" {...S} />,
  clock: (<><circle cx="12" cy="12" r="9" {...S} /><path d="M12 7v5l3 2" {...S} /></>),
  wrench: <path d="M14 4l6 6-9 9H5v-6z" {...S} />,
  globe: (<><circle cx="12" cy="12" r="9" {...S} /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" {...S} /></>),
  card: (<><rect x="3" y="5" width="18" height="14" rx="2" {...S} /><path d="M3 10h18" {...S} /></>),
  helmet: (<><path d="M3 11c0-3 4-5 9-5s9 2 9 5v2c0 2-2 3-4 3h-1.5l-1.5-2h-4l-1.5 2H7c-2 0-4-1-4-3z" {...S} /></>),
};

export default function Icon({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {PATHS[name]}
    </svg>
  );
}
