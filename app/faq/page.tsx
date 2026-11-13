import type { Metadata } from 'next';
import { Booking, FaqList, PageHead } from '@/components/Sections';
import { FAQ, FAQ_MORE } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Questions fréquentes',
  description: 'Assurances, prix, promotions, délai pour vos lunettes, ajustements sur place, examens pour enfants : nos réponses.',
  alternates: { canonical: '/faq' },
};

export default function FaqPage() {
  return (
    <>
      <PageHead eyebrow="Questions fréquentes" title="Vous nous demandez" accent="souvent." lead="Vous ne trouvez pas votre réponse ? Appelez-nous, on vous répond rapidement." />
      <section className="pad">
        <div className="wrap">
          <FaqList items={[...FAQ, ...FAQ_MORE]} />
        </div>
      </section>
      <Booking />
    </>
  );
}
