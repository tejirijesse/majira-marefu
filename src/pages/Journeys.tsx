import { Link } from 'react-router-dom';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { Reveal } from '../components/Reveal';
import { PageTransition } from '../components/PageTransition';
import { TIERS, TIER_ORDER, PRICE_WORDS } from '../lib/data';

export function Journeys() {
  return (
    <PageTransition>
      <Nav />

      <header className="page-head">
        <div className="container">
          <Reveal as="span" className="eyebrow">
            The Journeys — III
          </Reveal>
          <Reveal delay={0.1}>
            <h1>
              Four lengths. <em>One</em> season.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="lede">
              You can join the season for a week or for the full thirty nights. Every journey shares the same hands, the
              same table, the same pace — only the amount of time you stay changes. Prices are for one guest; couples
              and small groups are held together where possible.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="section--tight">
        <div className="container">
          {TIER_ORDER.map((slug, i) => {
            const tier = TIERS[slug];
            const flip = i % 2 === 1;
            return (
              <Reveal key={slug}>
                <Link to={`/journeys/${slug}`} className={`tier-row ${flip ? 'tier-row--flip' : ''}`}>
                  <div className="tier-media">
                    <img loading="lazy" src={tier.heroImage} alt="" />
                  </div>
                  <div className="tier-body">
                    <h3 className="sw" lang="sw">
                      {tier.name}
                    </h3>
                    <div className="trans">{tier.translation}</div>
                    <p className="tagline">{tier.tagline}</p>
                    <div className="price">
                      From {PRICE_WORDS(tier.priceUSD)} · {tier.nights} nights
                      {tier.ctaType === 'apply' ? ' · by application' : ''}
                    </div>
                    <span className="btn">
                      {tier.ctaType === 'apply' ? 'Read and apply' : 'Read the journey'} <span className="arrow">→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section--tight" style={{ background: 'var(--oat)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '52ch', margin: '0 auto' }}>
          <p className="eyebrow">A note on release</p>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--umber)', margin: '0 auto' }}>
            Seats release in three waves. Wave I (March 2027) is by invitation. Wave II (May) opens to the guestbook.
            Wave III (June) opens publicly, at a fifteen per cent lift. Deposits hold a place; the balance is due ninety
            days before arrival.
          </p>
          <div className="mt-3">
            <Link className="btn" to="/guestbook">
              Join the guestbook <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer
        links={[
          { to: '/chapter', label: 'Chapter' },
          { to: '/arc', label: 'The Arc' },
          { to: '/letter', label: 'Letter' },
        ]}
      />
    </PageTransition>
  );
}
