import type { Metadata } from 'next';
import Link from 'next/link';
import { Booking, FaqList, InsuranceCard, PageHead, PriceList } from '@/components/Sections';
import { FAQ, FAQ_MORE } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Prix et assurances',
  description: 'Nos prix de départ pour l’examen de la vue, les lunettes et les verres progressifs, et comment fonctionnent vos assurances. Sans surprise.',
  alternates: { canonical: '/prix-assurances' },
};

const STEPS = [
  { title: 'Apportez votre carte', text: 'Votre carte d’assurance maladie et celle de votre assurance privée, si vous en avez une.' },
  { title: 'On vérifie avec vous', text: 'On regarde ce que votre régime couvre pour l’examen, les lunettes et les lentilles.' },
  { title: 'Vous décidez, avant l’achat', text: 'Vous connaissez le montant à payer avant de choisir. On vous remet les reçus pour votre réclamation.' },
];

export default function PrixPage() {
  return (
    <>
      <PageHead eyebrow="Prix et assurances" title="Des prix clairs." accent="Vraiment." lead="Une clinique indépendante n’est pas forcément plus chère. Voici nos prix de départ, sans surprise." />
      <section className="pad">
        <div className="wrap">
          <div className="prices-in" style={{ marginTop: 0 }}>
            <PriceList />
            <InsuranceCard />
          </div>
        </div>
      </section>
      <section className="pad" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="eyebrow">Vos assurances</p>
          <h2>Comment ça marche.</h2>
          <ol className="how">
            {STEPS.map((s) => (
              <li key={s.title} className="card reveal"><h3>{s.title}</h3><p>{s.text}</p></li>
            ))}
          </ol>
          <h2 style={{ marginTop: '5rem', fontSize: 'clamp(1.6rem,3.6vw,2.4rem)' }}>Questions sur les prix</h2>
          <FaqList items={[...FAQ, ...FAQ_MORE].filter((f) => f.topic === 'prix')} />
          <p style={{ marginTop: '1.5rem' }}><Link className="more" href="/faq">Toutes les questions →</Link></p>
        </div>
      </section>
      <Booking />
    </>
  );
}
