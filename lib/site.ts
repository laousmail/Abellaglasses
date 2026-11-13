/**
 * Single source of truth for business facts.
 * Values marked TODO come from a public directory or are placeholders: confirm with the client.
 */
export const SITE = {
  name: 'Lunetterie Abella & De Montigny',
  shortName: 'Abella',
  tagline: 'Optométrie et lunetterie depuis 1980',
  url: 'https://www.lunetterieabella.ca', // TODO: confirm domain
  phone: '514 387-7177', // TODO: confirm
  phoneHref: 'tel:+15143877177',
  street: '8888, rue Lajeunesse', // TODO: confirm
  city: 'Montréal (Québec) H2M 1R6',
  mapsHref: 'https://www.google.com/maps/search/?api=1&query=8888+rue+Lajeunesse+Montreal',
  /** Online booking tool. null until the clinic gives us its link: the button then falls back to a phone call. */
  bookingUrl: null as string | null,
  /** Opening hours. null = placeholder shown in yellow. */
  hours: [
    { label: 'Lundi au vendredi', value: null as string | null },
    { label: 'Soirs', value: null as string | null },
    { label: 'Fin de semaine', value: null as string | null },
  ],
  /** Usual delay for glasses, in days. */
  glassesDelayDays: null as string | null,
  /** Person in charge of personal information (Loi 25). */
  privacyOfficer: null as string | null,
  privacyEmail: null as string | null,
} as const;

export const NAV_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/verres', label: 'Nos verres' },
  { href: '/prix-assurances', label: 'Prix et assurances' },
  { href: '/equipe', label: 'L’équipe' },
  { href: '/faq', label: 'Questions' },
] as const;
