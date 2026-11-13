/** Page copy shared between the homepage and inner pages. */

export type IconName =
  | 'eye' | 'glasses' | 'lines' | 'contact' | 'sun' | 'child' | 'shield' | 'clock' | 'wrench' | 'globe' | 'card' | 'helmet';

export type Service = { icon: IconName; title: string; text: string; details?: string[]; feature?: boolean };

export const SERVICES: Service[] = [
  {
    icon: 'eye', feature: true, title: 'Examen de la vue complet',
    text: 'On prend le temps de comprendre vos besoins et de tout vous expliquer.',
    details: ['Vision de près et de loin', 'Santé de l’œil', 'Ordonnance pour lunettes ou lentilles'],
  },
  {
    icon: 'glasses', title: 'Lunettes de prescription',
    text: 'Un grand choix de montures et de verres, pour tous les budgets.',
    details: ['Montures pour tous les styles', 'Conseils pour votre visage et votre usage', 'Ajustement inclus'],
  },
  {
    icon: 'lines', title: 'Verres progressifs',
    text: 'Voir de près comme de loin, avec une seule paire.',
    details: ['Mesures prises avec soin', 'Plusieurs niveaux de verres, expliqués simplement', 'Suivi pendant l’adaptation'],
  },
  {
    icon: 'contact', title: 'Lentilles cornéennes',
    text: 'Ajustement et suivi pour porter vos lentilles en tout confort.',
    details: ['Premier essai et apprentissage', 'Lentilles journalières ou mensuelles', 'Suivi régulier'],
  },
  {
    icon: 'sun', title: 'Lunettes solaires',
    text: 'Avec ou sans prescription, pour protéger vos yeux avec style.',
    details: ['Protection UV', 'Verres polarisés disponibles selon les modèles', 'Avec votre correction'],
  },
  {
    icon: 'child', title: 'Enfants et myopie',
    text: 'Examens pour enfants et verres de contrôle de la myopie.',
    details: ['Examens adaptés aux enfants', 'Verres de contrôle de la myopie', 'Montures solides'],
  },
];

export const EXTRA_SERVICES: Service[] = [
  {
    icon: 'helmet', title: 'Lunettes de sport et de sécurité',
    text: 'Des lunettes qui tiennent en place et protègent vos yeux, au travail comme au jeu.',
    details: ['Avec ou sans prescription', 'Montures enveloppantes et résistantes'],
  },
  {
    icon: 'wrench', title: 'Ajustements et réparations',
    text: 'Sur place, même si vos lunettes ont été achetées ailleurs.',
    details: ['Ajustement des branches et des plaquettes', 'Petites réparations'],
  },
];

export const LAYERS = [
  { c: '#9AA2FF', disc: 'rgba(154,162,255,.55)', title: 'Le verre et votre correction', text: 'Taillé selon votre ordonnance.' },
  { c: '#4FDCCB', disc: 'rgba(79,220,203,.5)', title: 'Le durcissement', text: 'Résiste mieux aux rayures du quotidien.' },
  { c: '#F7BE68', disc: 'rgba(247,190,104,.55)', title: 'L’anti-reflet', text: 'Moins de reflets, une vision plus nette, comme avec Crizal.' },
  { c: '#FF9474', disc: 'rgba(255,148,116,.5)', title: 'La protection UV', text: 'Pour protéger vos yeux du soleil.' },
];

export const BRANDS = ['Tom Ford', 'Varilux', 'Crizal', 'Silhouette', 'Etnia Barcelona', 'Perry Ellis'];

/** price: null = placeholder until the client gives us the number. */
export const PRICES: { title: string; note: string; price: string | null; from: boolean }[] = [
  { title: 'Examen de la vue complet', note: 'Adultes et enfants', price: null, from: true },
  { title: 'Lunettes complètes', note: 'Monture et verres simple vision', price: null, from: true },
  { title: 'Verres progressifs', note: 'Près et loin, une seule paire', price: null, from: true },
  { title: 'Ajustements et petites réparations', note: 'Sur place', price: null, from: false },
];

export const TEAM = [
  { initials: 'SM', name: 'Dr Sylvain de Montigny', role: 'Optométriste · Examens de la vue pour toute la famille' },
  { initials: 'YA', name: 'Yazid Abella', role: 'Opticien d’ordonnances · Conseils, ajustements, après-vente' },
];

/** answer may contain {delay}, replaced with the usual delay (or a placeholder). */
export const FAQ: { q: string; a: string; topic: 'prix' | 'service' | 'rdv' }[] = [
  { topic: 'prix', q: 'Est-ce que mes assurances couvrent l’examen et les lunettes ?', a: 'Ça dépend de votre régime. Apportez votre carte d’assurance : on vérifie avec vous ce qui est couvert, avant l’achat.' },
  { topic: 'service', q: 'Quand mes lunettes seront-elles prêtes ?', a: 'Habituellement en {delay} jours. On vous appelle dès qu’elles sont prêtes.' },
  { topic: 'service', q: 'Faites-vous les ajustements et les réparations sur place ?', a: 'Oui. Passez nous voir, même si vos lunettes ont été achetées ailleurs.' },
  { topic: 'rdv', q: 'Êtes-vous ouverts le soir et la fin de semaine ?', a: 'Oui. Consultez nos heures plus bas ou appelez-nous pour réserver.' },
  { topic: 'service', q: 'Faites-vous des examens pour les enfants ?', a: 'Oui, ainsi que des verres de contrôle de la myopie pour les jeunes.' },
  { topic: 'prix', q: 'Avez-vous des promotions ?', a: 'Demandez-nous les offres du moment, en boutique ou par téléphone.' },
];

export const FAQ_MORE: typeof FAQ = [
  { topic: 'prix', q: 'Puis-je apporter une ordonnance faite ailleurs ?', a: 'Oui. Apportez votre ordonnance récente et on vous aide à choisir monture et verres.' },
  { topic: 'rdv', q: 'Parlez-vous anglais ?', a: 'Oui, nous servons nos patients en français, en anglais et dans d’autres langues.' },
  { topic: 'rdv', q: 'Que dois-je apporter à mon examen ?', a: 'Vos lunettes ou lentilles actuelles, votre carte d’assurance maladie et votre carte d’assurance privée si vous en avez une.' },
];
