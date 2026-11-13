import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="page-head notfound" data-nav-dark>
      <div className="wrap">
        <p className="eyebrow" style={{ color: 'var(--amber)' }}>Page introuvable</p>
        <h1>Cette page <span>n’existe pas.</span></h1>
        <div className="cta-row">
          <Link className="btn btn-amber" href="/rendez-vous" data-track="book">Prendre rendez-vous</Link>
          <Link className="btn btn-ghost" href="/">Retour à l’accueil</Link>
        </div>
      </div>
    </section>
  );
}
