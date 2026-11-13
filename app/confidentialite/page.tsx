import type { Metadata } from 'next';
import Fill from '@/components/Fill';
import { Booking, PageHead } from '@/components/Sections';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Comment la Lunetterie Abella & De Montigny protège vos renseignements personnels (Loi 25).',
  alternates: { canonical: '/confidentialite' },
};

// DRAFT: to be reviewed by the client (and ideally a lawyer) before launch.
export default function ConfidentialitePage() {
  return (
    <>
      <PageHead eyebrow="Confidentialité" title="Vos renseignements," accent="protégés." lead="Nous recueillons le moins d’information possible, et seulement pour vous servir." />
      <section className="pad">
        <div className="wrap prose">
          <p><strong>Dernière mise à jour :</strong> <Fill placeholder="date à confirmer" /></p>

          <h2>Responsable de la protection des renseignements personnels</h2>
          <p>Conformément à la Loi 25, la personne responsable est <Fill value={SITE.privacyOfficer} placeholder="nom à confirmer" />. Vous pouvez la joindre au {SITE.phone} ou par courriel à <Fill value={SITE.privacyEmail} placeholder="courriel à confirmer" />.</p>

          <h2>Ce que ce site recueille</h2>
          <ul>
            <li>Ce site ne vous demande aucun renseignement de santé.</li>
            <li>Votre choix de taille du texte est gardé dans votre navigateur seulement. Il ne nous est jamais envoyé.</li>
            <li>Si vous nous écrivez ou prenez rendez-vous, nous utilisons votre nom et vos coordonnées seulement pour vous répondre.</li>
            <li>Mesure d’audience : aucun outil n’est chargé sans votre consentement. Si vous l’acceptez, nous mesurons de façon globale les visites et les clics (par exemple sur « Appeler »).</li>
          </ul>

          <h2>Où sont vos renseignements</h2>
          <p>Le site est hébergé par Vercel. Les renseignements que nous conservons le sont au Canada lorsque c’est possible. Nous ne vendons jamais vos renseignements.</p>

          <h2>Vos droits</h2>
          <p>Vous pouvez demander à consulter, corriger ou supprimer vos renseignements, ou retirer votre consentement, en communiquant avec la personne responsable ci-dessus. Vous pouvez aussi porter plainte auprès de la Commission d’accès à l’information du Québec.</p>

          <h2>Votre dossier à la clinique</h2>
          <p>Votre dossier d’examen est tenu à la clinique selon les règles de notre ordre professionnel. Il n’est pas lié à ce site Web.</p>
        </div>
      </section>
      <Booking />
    </>
  );
}
