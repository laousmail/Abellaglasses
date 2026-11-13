import type { Metadata } from 'next';
import Link from 'next/link';
import { Booking, PageHead, ServiceCard, Trust } from '@/components/Sections';
import { EXTRA_SERVICES, SERVICES } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Services : examen de la vue, lunettes, lentilles',
  description: 'Examen de la vue complet, lunettes de prescription, verres progressifs, lentilles cornéennes, solaires, enfants et myopie, sport et sécurité. Rue Lajeunesse, Montréal.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <PageHead eyebrow="Nos services" title="Tout pour vos yeux," accent="au même endroit." lead="De l’examen de la vue jusqu’aux ajustements après l’achat, une seule équipe vous suit.">
        <div className="cta-row">
          <Link className="btn btn-amber" href="/rendez-vous" data-track="book">Prendre rendez-vous</Link>
          <Link className="btn btn-ghost" href="/prix-assurances">Voir nos prix</Link>
        </div>
      </PageHead>
      <Trust />
      <section className="pad">
        <div className="wrap">
          <div className="grid" style={{ marginTop: 0 }}>
            {[...SERVICES, ...EXTRA_SERVICES].map((s) => <ServiceCard key={s.title} s={s} details />)}
          </div>
          <p className="lead" style={{ marginTop: '2.5rem' }}>
            Pas sûr de ce qu’il vous faut ? <Link href="/verres" style={{ color: 'var(--amber-ink)', fontWeight: 700 }}>Voyez comment on choisit vos verres</Link>, ou appelez-nous.
          </p>
        </div>
      </section>
      <Booking />
    </>
  );
}
