import Link from 'next/link';
import { SITE } from '@/lib/site';

export default function Footer() {
  return (
    <footer>
      <div className="wrap foot-in">
        <div>
          <b style={{ color: 'var(--on-night)', fontFamily: 'var(--head)' }}>{SITE.name}</b>
          <br />
          {SITE.tagline}
          <br />
          {SITE.street}, {SITE.city} · <a href={SITE.phoneHref}>{SITE.phone}</a>
        </div>
        <div>
          <Link href="/confidentialite">Politique de confidentialité</Link> · <span lang="en">English</span> (bientôt)
        </div>
        <div>© {new Date().getFullYear()}</div>
      </div>
    </footer>
  );
}
