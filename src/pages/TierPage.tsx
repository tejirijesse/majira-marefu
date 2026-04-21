import { Link, Navigate, useParams } from 'react-router-dom';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { Reveal } from '../components/Reveal';
import { PageTransition } from '../components/PageTransition';
import { KenBurns } from '../components/KenBurns';
import { TIERS, TIER_ORDER, type TierSlug, PRICE_WORDS } from '../lib/data';

export function TierPage() {
  const { slug } = useParams<{ slug: string }>();
  if (!slug || !(slug in TIERS)) {
    return <Navigate to="/journeys" replace />;
  }
  const tier = TIERS[slug as TierSlug];
  const idx = TIER_ORDER.indexOf(tier.slug);
  const prev = idx > 0 ? TIERS[TIER_ORDER[idx - 1]] : null;
  const next = idx < TIER_ORDER.length - 1 ? TIERS[TIER_ORDER[idx + 1]] : null;

  return (
    <PageTransition>
      <Nav />

      <section className="tier-hero">
        <KenBurns className="tier-hero-img" src={tier.heroImage} alt="" />
        <div className="tier-hero-inner">
          <Reveal>
            <div className="trans">
              {tier.roman} · {tier.translation}
              {tier.ctaType === 'apply' ? ' · By application' : ''}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 lang="sw">{tier.name}</h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="tier-blurb">{tier.tagline}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <span className="tag">
              {tier.nights} nights · {tier.window} · {tier.capacity} guests
            </span>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          {tier.narrative.map((p, i) => (
            <Reveal key={i}>
              <p>{p}</p>
              {i === 0 && tier.images[0] && (
                <figure className="fig" style={{ marginTop: '3rem' }}>
                  <div className="fig-inner">
                    <img loading="lazy" src={tier.images[0].src} alt={tier.images[0].alt} />
                  </div>
                  <figcaption>{tier.images[0].caption}</figcaption>
                </figure>
              )}
            </Reveal>
          ))}

          {tier.images[1] && (
            <Reveal as="span">
              <figure className="fig">
                <div className="fig-inner">
                  <img loading="lazy" src={tier.images[1].src} alt={tier.images[1].alt} />
                </div>
                <figcaption>{tier.images[1].caption}</figcaption>
              </figure>
            </Reveal>
          )}

          <Reveal>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.2rem' }}>What is included</h3>
            <p>{tier.inclusions}</p>
            <p>
              <strong style={{ fontWeight: 500, color: 'var(--umber-deep)' }}>Not included:</strong> {tier.notIncluded}
            </p>
          </Reveal>

          <Reveal>
            <div className="text-center" style={{ padding: '3rem 0' }}>
              <span className="divider mx-auto" style={{ margin: '0 auto 1.6rem' }} />
              <p
                style={{
                  fontSize: '0.82rem',
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: 'var(--umber)',
                  opacity: 0.78,
                }}
              >
                From {PRICE_WORDS(tier.priceUSD)} · per guest
                {tier.ctaType === 'apply' ? ' · twelve seats' : ''}
              </p>
              <p
                style={{
                  fontSize: '0.8rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--ochre)',
                  marginTop: '0.5rem',
                }}
              >
                {tier.ctaType === 'apply' ? 'Application only · review within seven days' : 'Deposit · fifty per cent · balance due T-90'}
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="text-center" style={{ marginTop: '2rem' }}>
              {tier.ctaType === 'apply' ? (
                <Link className="btn btn--solid" to="/apply">
                  Apply for Marefu <span className="arrow">→</span>
                </Link>
              ) : (
                <Link className="btn btn--solid" to={`/hold?tier=${tier.slug}`}>
                  Hold a place <span className="arrow">→</span>
                </Link>
              )}
              <p
                style={{
                  marginTop: '1.2rem',
                  fontSize: '0.76rem',
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: 'var(--umber)',
                  opacity: 0.7,
                }}
              >
                {tier.ctaType === 'apply'
                  ? 'Twelve questions · roughly twenty minutes'
                  : 'Wave I opens March 2027 · by invitation'}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer
        links={[
          ...(prev
            ? [{ to: `/journeys/${prev.slug}`, label: `← ${prev.name}` }]
            : [{ to: '/journeys', label: 'All journeys' }]),
          { to: '/journeys', label: 'All journeys' },
          ...(next
            ? [{ to: `/journeys/${next.slug}`, label: `${next.name} →` }]
            : [{ to: '/letter', label: 'Letter' }]),
        ]}
      />
    </PageTransition>
  );
}
