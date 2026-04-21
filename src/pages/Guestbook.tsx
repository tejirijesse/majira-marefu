import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { Reveal } from '../components/Reveal';
import { PageTransition } from '../components/PageTransition';
import { useToast } from '../components/Toast';

export function Guestbook() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tier, setTier] = useState('');
  const [city, setCity] = useState('');
  const [note, setNote] = useState('');
  const [sent, setSent] = useState(false);
  const { push } = useToast();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      push('Name and email please.');
      return;
    }
    // Production: POST /api/waitlist
    console.log('[majira] guestbook submission:', { name, email, tier, city, note });
    setSent(true);
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  };

  return (
    <PageTransition>
      <Nav />

      <header className="page-head">
        <div className="container">
          <Reveal as="span" className="eyebrow">
            The Guestbook — V
          </Reveal>
          <Reveal delay={0.1}>
            <h1>
              Leave your name. <em>We</em> will remember.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="lede">
              The guestbook is our waitlist. Wave I of seats opens to a handful of invited guests in March 2027. Wave II
              opens to the guestbook in May. Wave III opens to everyone in June, at a fifteen per cent lift. Adding your
              name here is how you are invited into Wave II.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="section">
        <div className="container" style={{ maxWidth: '680px', margin: '0 auto' }}>
          {sent ? (
            <Reveal>
              <div className="success-panel">
                <span className="divider mx-auto" style={{ margin: '0 auto 2rem' }} />
                <h3 style={{ marginBottom: '1.2rem' }}>
                  Your name is in the <em>book</em>.
                </h3>
                <p>
                  We will write to you in February 2027 with details of Wave II. Nothing to do in the meantime, except
                  perhaps to read{' '}
                  <Link to="/chapter" className="inline" style={{ color: 'var(--ochre)', borderBottom: '1px solid var(--ochre)' }}>
                    the chapter
                  </Link>{' '}
                  if you have not already.
                </p>
                <p className="closer sw" lang="sw">
                  Karibu.
                </p>
                <p className="sw-trans" style={{ display: 'inline' }}>
                  Welcome.
                </p>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <form className="form" onSubmit={submit} noValidate>
                <div className="field">
                  <label htmlFor="g-name">Your name</label>
                  <input
                    id="g-name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="g-email">Email</label>
                  <input
                    id="g-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="g-tier">Which journey interests you most?</label>
                  <select id="g-tier" value={tier} onChange={(e) => setTier(e.target.value)}>
                    <option value="">Still thinking</option>
                    <option value="mwanzo">Mwanzo — seven nights</option>
                    <option value="pwani">Pwani — twelve nights</option>
                    <option value="safari">Safari — eighteen nights</option>
                    <option value="marefu">Marefu — thirty nights (application)</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="g-city">Where you live (optional)</label>
                  <input
                    id="g-city"
                    type="text"
                    placeholder="Lagos · London · Nairobi · New York …"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="g-note">Anything you'd like us to know (optional)</label>
                  <textarea
                    id="g-note"
                    rows={4}
                    placeholder="Travelling with a partner, a dietary note, a question …"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
                <div
                  className="field"
                  style={{ marginTop: '2rem', display: 'flex', gap: '1.4rem', alignItems: 'center', flexWrap: 'wrap' }}
                >
                  <button className="btn btn--solid" type="submit">
                    Add me to the guestbook <span className="arrow">→</span>
                  </button>
                  <Link to="/letter" className="link-plain">
                    Or write a letter instead
                  </Link>
                </div>
              </form>
            </Reveal>
          )}
        </div>
      </section>

      <section className="section--tight" style={{ background: 'var(--oat)' }}>
        <div className="container" style={{ maxWidth: '64ch', margin: '0 auto' }}>
          <p className="eyebrow text-center" style={{ display: 'block', textAlign: 'center' }}>
            The release calendar
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2rem',
              textAlign: 'center',
              marginTop: '2rem',
            }}
          >
            {[
              { wave: 'Wave I', date: 'March 2027', note: 'By invitation. A small list.' },
              { wave: 'Wave II', date: 'May 2027', note: 'Open to the guestbook.' },
              { wave: 'Wave III', date: 'June 2027', note: 'Public. Prices lift fifteen per cent.' },
            ].map((w) => (
              <Reveal key={w.wave}>
                <h4 style={{ fontSize: '1.2rem' }}>{w.wave}</h4>
                <p
                  style={{
                    fontSize: '0.82rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--ochre)',
                    marginTop: '0.4rem',
                  }}
                >
                  {w.date}
                </p>
                <p style={{ marginTop: '0.8rem', fontSize: '0.95rem', color: 'var(--umber)' }}>{w.note}</p>
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
    </PageTransition>
  );
}
