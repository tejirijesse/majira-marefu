import { useCallback, useEffect, useRef, useState } from 'react';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { Reveal } from '../components/Reveal';
import { PageTransition } from '../components/PageTransition';
import { Modal } from '../components/Modal';
import { ARC_STOPS } from '../lib/data';
import { Link } from 'react-router-dom';

export function Arc() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const scrollTo = useCallback((idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const w = track.clientWidth;
    if (window.matchMedia('(max-width: 820px)').matches) {
      // vertical stacked
      const h = window.innerHeight * 0.82;
      track.scrollTo({ top: idx * h, behavior: 'smooth' });
    } else {
      track.scrollTo({ left: idx * w, behavior: 'smooth' });
    }
  }, []);

  // Sync active dot to scroll position
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const isVertical = window.matchMedia('(max-width: 820px)').matches;
        const metric = isVertical ? track.scrollTop / (window.innerHeight * 0.82) : track.scrollLeft / track.clientWidth;
        setActive(Math.round(metric));
      });
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (openIdx !== null) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        scrollTo(Math.min(ARC_STOPS.length - 1, active + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        scrollTo(Math.max(0, active - 1));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, openIdx, scrollTo]);

  return (
    <PageTransition>
      <Nav />

      <header className="page-head">
        <div className="container">
          <Reveal as="span" className="eyebrow">
            The Arc — II
          </Reveal>
          <Reveal delay={0.1}>
            <h1>
              Four stops. <em>One</em> long season.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="lede">
              The arc moves from the highlands of Nairobi to the grasslands of the Mara, down to the old coast at Lamu,
              and out to the spice islands at Zanzibar. You can join for any portion. The whole arc takes thirty nights.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p
              style={{
                marginTop: '1rem',
                fontSize: '0.78rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'var(--ochre)',
              }}
            >
              Click a stop · arrow keys · scroll sideways →
            </p>
          </Reveal>
        </div>
      </header>

      <section style={{ position: 'relative' }}>
        <div className="arc-track" ref={trackRef} aria-label="The four stops of Majira Marefu">
          {ARC_STOPS.map((stop, i) => (
            <article
              key={stop.name}
              className="arc-stop"
              onClick={() => setOpenIdx(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setOpenIdx(i);
                }
              }}
            >
              <div className="arc-stop-bg" style={{ backgroundImage: `url(${stop.image})` }} />
              <div>
                <div className="idx">{stop.idx} · {stop.category}</div>
                <h3 className="sw" lang="sw">
                  {stop.name}
                </h3>
                <p>{stop.short}</p>
                <span className="learn">Learn more</span>
              </div>
            </article>
          ))}
        </div>

        <div className="arc-dots" aria-hidden="true">
          {ARC_STOPS.map((s, i) => (
            <button
              key={s.name}
              className={`arc-dot ${i === active ? 'active' : ''}`}
              onClick={() => scrollTo(i)}
              aria-label={`Go to ${s.name}`}
            />
          ))}
        </div>

        <div className="arc-controls" aria-label="Arc navigation">
          <button
            className="arc-btn"
            onClick={() => scrollTo(Math.max(0, active - 1))}
            disabled={active === 0}
            aria-label="Previous stop"
          >
            ←
          </button>
          <button
            className="arc-btn"
            onClick={() => scrollTo(Math.min(ARC_STOPS.length - 1, active + 1))}
            disabled={active === ARC_STOPS.length - 1}
            aria-label="Next stop"
          >
            →
          </button>
        </div>
      </section>

      <section className="section--tight">
        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
        >
          <div>
            <p className="eyebrow" style={{ marginBottom: '0.8rem' }}>
              Ready to read the journeys
            </p>
            <h3 style={{ maxWidth: '26ch' }}>Four lengths. Four ways to hold a season.</h3>
          </div>
          <Link className="btn" to="/journeys">
            See the journeys <span className="arrow">→</span>
          </Link>
        </div>
      </section>

      <Footer
        links={[
          { to: '/chapter', label: 'Chapter' },
          { to: '/journeys', label: 'Journeys' },
          { to: '/letter', label: 'Letter' },
        ]}
      />

      <Modal open={openIdx !== null} onClose={() => setOpenIdx(null)}>
        {openIdx !== null && (
          <>
            <div className="modal-media">
              <img src={ARC_STOPS[openIdx].image} alt="" />
            </div>
            <div className="modal-body">
              <p className="sub">
                {ARC_STOPS[openIdx].idx} · {ARC_STOPS[openIdx].category}
              </p>
              <h3 className="sw" lang="sw" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                {ARC_STOPS[openIdx].name}
              </h3>
              <div style={{ marginTop: '1.4rem' }}>
                {ARC_STOPS[openIdx].long.map((p, i) => (
                  <p
                    key={i}
                    style={{
                      fontSize: '1.02rem',
                      lineHeight: 1.75,
                      color: 'var(--umber)',
                      marginBottom: '1.2rem',
                      maxWidth: 'none',
                    }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </>
        )}
      </Modal>
    </PageTransition>
  );
}
