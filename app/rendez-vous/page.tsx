import type { Metadata } from 'next';
import { Booking, FaqList } from '@/components/Sections';
import { FAQ, FAQ_MORE } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Prendre rendez-vous',
  description: 'Réservez votre examen de la vue au 8888, rue Lajeunesse, Montréal. Rendez-vous le soir et la fin de semaine. 514 387-7177.',
  alternates: { canonical: '/rendez-vous' },
};

export default function RendezVousPage() {
  return (
    <>
      <Booking as="h1" title="Prenez soin de vos yeux." />
      <section className="pad">
        <div className="wrap">
          <p className="eyebrow">Avant de venir</p>
          <h2>Bon à savoir.</h2>
          <FaqList items={[...FAQ, ...FAQ_MORE].filter((f) => f.topic === 'rdv')} />
        </div>
      </section>
    </>
  );
}
