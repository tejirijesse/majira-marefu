import { Link } from 'react-router-dom';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { Reveal } from '../components/Reveal';
import { PageTransition } from '../components/PageTransition';

export function Chapter() {
  return (
    <PageTransition>
      <Nav />

      <header className="page-head">
        <div className="container">
          <Reveal as="span" className="eyebrow">
            The Chapter — I
          </Reveal>
          <Reveal delay={0.1}>
            <h1>
              A season, <em>not</em> a holiday.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="lede">
              <span className="sw" lang="sw">
                Majira marefu
              </span>
              <span className="sw-trans">a long season</span>
            </p>
          </Reveal>
        </div>
      </header>

      <section className="section">
        <div className="container prose">
          <Reveal>
            <p>
              There is a Swahili word for the stretch of a year when the weather settles, the days are long, and the
              household slows down enough to notice. <span className="sw" lang="sw">Majira</span>. It is more than a
              season. It is a disposition — a willingness to let things take their time.
            </p>
            <p className="indent">
              We are building a chapter around that word. Between late August and early October of 2027, forty guests
              will travel slowly through the places that raised many of us — Nairobi, the Mara, the Lamu archipelago,
              Zanzibar — in the company of cooks and conservationists and poets and the occasional uncle who tells the
              stories nobody else will.
            </p>
          </Reveal>

          <Reveal as="span">
            <figure className="fig">
              <div className="fig-inner">
                <img
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2000&q=80"
                  alt="Acacia trees at dusk in the Maasai Mara, Kenya."
                />
              </div>
              <figcaption>Mara, last light</figcaption>
            </figure>
          </Reveal>

          <Reveal>
            <p>
              This is not a safari. It is not a retreat. It is not a festival. Those formats compress time. We are doing
              the opposite — stretching a month into the shape it used to hold, when leaving home meant something.
            </p>
            <p>
              You will sleep in four rooms across five weeks, if you come for the whole arc. You will eat breakfast with
              the same three people every morning for a week, and by the end of that week you will know things about
              them you would not have learned in a year of dinners.
            </p>
          </Reveal>

          <Reveal as="span">
            <figure className="fig">
              <div className="fig-inner">
                <img
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1589182337358-2cb63099350c?auto=format&fit=crop&w=2000&q=80"
                  alt="Dhow sailing off the coast of Lamu."
                />
              </div>
              <figcaption>
                Lamu, at <span className="sw" lang="sw">asubuhi</span> — morning
              </figcaption>
            </figure>
          </Reveal>

          <Reveal>
            <p>
              There are four journeys, held at four lengths. <span className="sw" lang="sw">Mwanzo</span> is seven
              nights — a gentle entry. <span className="sw" lang="sw">Pwani</span> is twelve, spent along the coast.{' '}
              <span className="sw" lang="sw">Safari</span> is eighteen, the full arc from savannah to sea.{' '}
              <span className="sw" lang="sw">Marefu</span> is thirty. The long one. Twelve seats. By application.
            </p>
            <p>
              You can read about them on{' '}
              <Link to="/journeys" className="inline">
                the next page
              </Link>
              . Or you can skip ahead to{' '}
              <Link to="/letter" className="inline">
                the letter
              </Link>
              , and write to us directly.
            </p>
          </Reveal>

          <Reveal>
            <div className="text-center" style={{ marginTop: '3rem' }}>
              <span className="divider mx-auto" style={{ margin: '0 auto 1.6rem' }} />
              <p className="sw" lang="sw" style={{ fontSize: '1.6rem', margin: '0 auto 0.3rem' }}>
                Karibu.
              </p>
              <p className="sw-trans" style={{ display: 'inline' }}>
                Welcome.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer
        links={[
          { to: '/arc', label: 'The Arc' },
          { to: '/journeys', label: 'Journeys' },
          { to: '/letter', label: 'Letter' },
        ]}
      />
    </PageTransition>
  );
}
