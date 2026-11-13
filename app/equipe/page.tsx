import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import { Booking, PageHead, Quote, TeamGrid } from '@/components/Sections';

export const metadata: Metadata = {
  title: 'L’équipe',
  description: 'Une clinique familiale depuis 1980 : Dr Sylvain de Montigny, optométriste, et Yazid Abella, opticien d’ordonnances.',
  alternates: { canonical: '/equipe' },
};

const VALUES = [
  { icon: 'clock' as const, title: 'Le temps qu’il faut', text: 'Un examen complet, sans vous presser, et des réponses à toutes vos questions.' },
  { icon: 'shield' as const, title: 'Des conseils honnêtes', text: 'On vous propose ce dont vous avez besoin, pas plus. Les prix sont clairs avant l’achat.' },
  { icon: 'wrench' as const, title: 'On vous suit après', text: 'Ajustements et petites réparations sur place, aussi longtemps que vous portez vos lunettes.' },
];

export default function EquipePage() {
  return (
    <>
      <PageHead eyebrow="L’équipe" title="Des visages," accent="pas une chaîne." lead="Une clinique familiale de la rue Lajeunesse, depuis 1980, où l’on vous reconnaît d’une visite à l’autre." />
      <section className="pad">
        <div className="wrap">
          <TeamGrid />
        </div>
      </section>
      <Quote />
      <section className="pad">
        <div className="wrap">
          <p className="eyebrow">Nos valeurs</p>
          <h2>Ce qui ne change pas depuis 1980.</h2>
          <div className="grid">
            {VALUES.map((v) => (
              <article key={v.title} className="card reveal">
                <span className="ic"><Icon name={v.icon} /></span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Booking title="Venez nous rencontrer." />
    </>
  );
}
