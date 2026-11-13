import Link from 'next/link';
import Icon from './Icon';
import Fill from './Fill';
import { SITE } from '@/lib/site';
import { BRANDS, FAQ, PRICES, SERVICES, TEAM, type Service } from '@/lib/content';

/* ---------- Page header for inner pages (dark band, nav reads light on it) ---------- */
export function PageHead({ eyebrow, title, accent, lead, children }: { eyebrow: string; title: string; accent?: string; lead?: string; children?: React.ReactNode }) {
  return (
    <section className="page-head" data-nav-dark>
      <div className="wrap">
        <p className="eyebrow" style={{ color: 'var(--amber)' }}>{eyebrow}</p>
        <h1>{title}{accent && <> <span>{accent}</span></>}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}

/* ---------- Trust strip ---------- */
export function Trust() {
  const items: [Parameters<typeof Icon>[0]['name'], string][] = [
    ['shield', 'Depuis 1980'],
    ['clock', 'Soirs et fins de semaine'],
    ['wrench', 'Réparations sur place'],
    ['globe', 'Français, anglais et plus'],
  ];
  return (
    <section className="trust" aria-label="Pourquoi nous choisir">
      <ul className="wrap">
        {items.map(([icon, text]) => <li key={text}><Icon name={icon} />{text}</li>)}
      </ul>
    </section>
  );
}

/* ---------- Service cards ---------- */
export function ServiceCard({ s, details = false, cta = true }: { s: Service; details?: boolean; cta?: boolean }) {
  return (
    <article className={'card reveal' + (s.feature ? ' feature' : '')}>
      <span className="ic"><Icon name={s.icon} /></span>
      <h3>{s.title}</h3>
      <p>{s.text}</p>
      {details && s.details && <ul>{s.details.map((d) => <li key={d}>{d}</li>)}</ul>}
      {s.feature && cta && <a className="more" href="#rendez-vous" data-track="book">Réserver un examen →</a>}
    </article>
  );
}

export function Services() {
  return (
    <section className="pad" id="services">
      <div className="wrap">
        <p className="eyebrow">Nos services</p>
        <h2>Tout pour vos yeux, au même endroit.</h2>
        <p className="lead">De l’examen de la vue jusqu’aux ajustements après l’achat, une seule équipe vous suit.</p>
        <div className="grid">
          {SERVICES.map((s) => <ServiceCard key={s.title} s={s} />)}
        </div>
        <p style={{ marginTop: '2rem' }}><Link className="more" href="/services">Tous nos services →</Link></p>
      </div>
    </section>
  );
}

/* ---------- Brands marquee ---------- */
export function Brands() {
  const row = (hidden: boolean) =>
    BRANDS.flatMap((b) => [
      <span key={b + hidden} aria-hidden={hidden || undefined}>{b}</span>,
      <span key={b + hidden + 'dot'} className="dim" aria-hidden="true">·</span>,
    ]);
  return (
    <section className="brands" aria-label="Nos marques">
      <div className="wrap"><p className="eyebrow">Les marques que nous aimons</p></div>
      <div className="marquee">{row(false)}{row(true)}</div>
    </section>
  );
}

/* ---------- Prices ---------- */
export function PriceList() {
  return (
    <div className="price-list">
      {PRICES.map((p) => (
        <div key={p.title} className="card price reveal">
          <div><h3>{p.title}</h3><small>{p.note}</small></div>
          <strong>{p.from && 'à partir de '}<Fill value={p.price} placeholder="__ $" /></strong>
        </div>
      ))}
    </div>
  );
}

export function InsuranceCard() {
  return (
    <aside className="card feature ins reveal">
      <span className="ic"><Icon name="card" /></span>
      <h3 style={{ fontSize: '1.4rem' }}>Vos assurances, expliquées</h3>
      <p>La plupart des régimes couvrent une partie de l’examen et des lunettes. Apportez votre carte : on vérifie avec vous ce qui est couvert, avant l’achat.</p>
      <a className="btn btn-amber" href="#rendez-vous" style={{ marginTop: '.6rem', alignSelf: 'flex-start' }}>Poser une question</a>
    </aside>
  );
}

export function Prices() {
  return (
    <section className="pad" id="prix">
      <div className="wrap">
        <p className="eyebrow">Prix et assurances</p>
        <h2>Des prix clairs. Vraiment.</h2>
        <p className="lead">Une clinique indépendante n’est pas forcément plus chère. Voici nos prix de départ, sans surprise.</p>
        <div className="prices-in">
          <PriceList />
          <InsuranceCard />
        </div>
      </div>
    </section>
  );
}

/* ---------- Quote ---------- */
export function Quote() {
  return (
    <section className="quote-band" aria-label="Notre approche">
      <div className="wrap">
        <p>« Je prends tout le temps qu’il faut pour <span>vous écouter</span>. »</p>
        <small>Yazid Abella, opticien</small>
      </div>
    </section>
  );
}

/* ---------- Team ---------- */
export function TeamGrid() {
  return (
    <div className="team">
      {TEAM.map((p) => (
        <article key={p.name} className="card person reveal">
          <span className="avatar" aria-hidden="true">{p.initials}</span>
          <div><h3>{p.name}</h3><p>{p.role}</p></div>
        </article>
      ))}
    </div>
  );
}

export function Team() {
  return (
    <section className="pad" id="equipe">
      <div className="wrap">
        <p className="eyebrow">L’équipe</p>
        <h2>Des visages, pas une chaîne.</h2>
        <p className="lead">Une clinique familiale où l’on vous reconnaît d’une visite à l’autre.</p>
        <TeamGrid />
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
export function FaqList({ items = FAQ }: { items?: typeof FAQ }) {
  return (
    <div className="faq">
      {items.map((f) => {
        const [before, after] = f.a.split('{delay}');
        return (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{before}{after !== undefined && <><Fill value={SITE.glassesDelayDays} />{after}</>}</p>
          </details>
        );
      })}
    </div>
  );
}

export function Faq({ items, title = 'Vous nous demandez souvent.' }: { items?: typeof FAQ; title?: string }) {
  return (
    <section className="pad" id="faq" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <p className="eyebrow">Questions fréquentes</p>
        <h2>{title}</h2>
        <FaqList items={items} />
      </div>
    </section>
  );
}

/* ---------- Booking (ends every page) ---------- */
export function Booking({ title = 'Prenez soin de vos yeux.', as: Heading = 'h2' }: { title?: string; as?: 'h1' | 'h2' }) {
  return (
    <section className="book dark pad" id="rendez-vous" data-nav-dark={Heading === 'h1' || undefined} style={Heading === 'h1' ? { paddingTop: '10rem' } : undefined}>
      <div className="wrap book-in">
        <div>
          <p className="eyebrow">Rendez-vous</p>
          <Heading style={Heading === 'h1' ? { fontSize: 'clamp(2.4rem,6vw,4.4rem)', fontWeight: 800 } : undefined}>{title}</Heading>
          {SITE.bookingUrl ? (
            <>
              <p className="lead">Réservez en ligne en une minute, ou appelez-nous. On vous répond rapidement.</p>
              <div className="cta-row">
                <a className="btn btn-amber" href={SITE.bookingUrl} data-track="book" rel="noopener">Réserver en ligne</a>
                <a className="btn btn-ghost" href={SITE.phoneHref} style={{ color: 'var(--on-night)' }}>Appeler le {SITE.phone}</a>
              </div>
            </>
          ) : (
            <>
              {/* No online booking link yet: the phone is the booking channel, so nothing is a dead end. */}
              <p className="lead">Appelez-nous pour réserver. On vous répond rapidement.</p>
              <div className="cta-row">
                <a className="btn btn-amber" href={SITE.phoneHref} data-track="book">Réserver au {SITE.phone}</a>
                <a className="btn btn-ghost" href={SITE.mapsHref} style={{ color: 'var(--on-night)' }} rel="noopener">Itinéraire</a>
              </div>
            </>
          )}
        </div>
        <div className="card">
          <p className="eyebrow">Nous joindre</p>
          <a className="phone" href={SITE.phoneHref}>{SITE.phone}</a>
          <p>{SITE.street}<br />{SITE.city}</p>
          <a className="more" href={SITE.mapsHref} style={{ color: 'var(--amber)' }} rel="noopener">Itinéraire →</a>
          <table className="hours" aria-label="Heures d’ouverture">
            <tbody>
              {SITE.hours.map((h) => (
                <tr key={h.label}>
                  <td>{h.label}</td>
                  <td><Fill value={h.value} placeholder="à confirmer" style={{ color: 'var(--ink)' }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
