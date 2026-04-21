import { useState } from 'react';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { Reveal } from '../components/Reveal';
import { PageTransition } from '../components/PageTransition';
import { Modal } from '../components/Modal';
import { PEOPLE } from '../lib/data';

export function Hand() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <PageTransition>
      <Nav />

      <header className="page-head">
        <div className="container">
          <Reveal as="span" className="eyebrow">
            The Hand — IV
          </Reveal>
          <Reveal delay={0.1}>
            <h1>
              <em>Who</em> is carrying the season.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="lede">
              A season is only as good as the hands that shape it. These are the cooks and guides and hosts and poets and
              the occasional elder who will be with you for some stretch of the arc. First names only, on purpose — the
              person, not the title. Click any face to read more.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="hand-grid">
            {PEOPLE.map((p, i) => (
              <Reveal key={p.name} delay={(i % 3) * 0.12}>
                <article
                  className="hand-card"
                  onClick={() => setOpenIdx(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setOpenIdx(i);
                    }
                  }}
                  aria-label={`Read more about ${p.name}, ${p.role}`}
                >
                  <div className="portrait">
                    <img loading="lazy" src={p.portrait} alt={`Portrait of ${p.name}`} />
                  </div>
                  <h4>{p.name}</h4>
                  <div className="role">{p.role}</div>
                  <p className="bio">{p.shortBio}</p>
                </article>
              </Reveal>
            ))}
          </div>
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
              <img src={PEOPLE[openIdx].portrait} alt={`Portrait of ${PEOPLE[openIdx].name}`} />
            </div>
            <div className="modal-body">
              <p className="sub">{PEOPLE[openIdx].role}</p>
              <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{PEOPLE[openIdx].name}</h3>
              <div style={{ marginTop: '1.4rem' }}>
                {PEOPLE[openIdx].longBio.map((p, i) => (
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
