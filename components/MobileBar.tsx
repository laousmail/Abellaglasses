import Link from 'next/link';
import { SITE } from '@/lib/site';

/** Fixed call + book bar on phones. The number is shown as text next to the tel: link. */
export default function MobileBar() {
  return (
    <nav className="mbar" aria-label="Actions rapides">
      <a className="btn call" href={SITE.phoneHref} aria-label={`Appeler le ${SITE.phone}`}>
        {SITE.phone}
      </a>
      <Link className="btn btn-amber" href="/rendez-vous" data-track="book">
        Rendez-vous
      </Link>
    </nav>
  );
}
