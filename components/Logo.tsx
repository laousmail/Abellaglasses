import Link from 'next/link';

export default function Logo() {
  return (
    <Link className="logo" href="/" aria-label="Lunetterie Abella et De Montigny, accueil">
      <svg viewBox="0 0 64 30" aria-hidden="true">
        <circle cx="16" cy="15" r="12" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="48" cy="15" r="12" fill="none" stroke="#E8A23E" strokeWidth="3" />
        <path d="M28 13 Q32 9 36 13" fill="none" stroke="currentColor" strokeWidth="3" />
      </svg>
      <div>
        <b>Abella</b>
        <span>&amp; De Montigny</span>
      </div>
    </Link>
  );
}
