import type { Metadata } from 'next';
import LensLayers from '@/components/LensLayers';
import Icon from '@/components/Icon';
import { Booking, Brands } from '@/components/Sections';

export const metadata: Metadata = {
  title: 'Nos verres : ce qui fait un bon verre',
  description: 'Correction, durcissement, anti-reflet, protection UV : les couches de vos verres expliquées simplement, pour choisir en confiance.',
  alternates: { canonical: '/verres' },
};

const CHOICES = [
  { icon: 'glasses' as const, title: 'Simple vision', text: 'Une seule correction, pour voir de loin ou de près. Le choix le plus courant.' },
  { icon: 'lines' as const, title: 'Progressifs', text: 'De près, à mi-distance et de loin, dans une seule paire, sans ligne visible.' },
  { icon: 'eye' as const, title: 'Verres pour l’écran', text: 'Pensés pour la distance de l’ordinateur, pour les longues journées de travail.' },
  { icon: 'sun' as const, title: 'Une deuxième paire', text: 'Des solaires à votre vue ou une paire de rechange : demandez-nous les options.' },
];

export default function VerresPage() {
  return (
    <>
      <LensLayers as="h1" navDark />
      <section className="pad">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Choisir ses verres</p>
            <h2>Le bon verre pour votre journée.</h2>
            <p className="lead">On regarde avec vous votre ordonnance, votre travail et vos loisirs, puis on vous explique les options et leurs prix, sans pression.</p>
          </div>
          <div className="grid">
            {CHOICES.map((c) => (
              <article key={c.title} className="card reveal">
                <span className="ic"><Icon name={c.icon} /></span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Brands />
      <Booking title="Venez essayer, sans engagement." />
    </>
  );
}
