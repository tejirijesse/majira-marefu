import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { Reveal } from '../components/Reveal';
import { PageTransition } from '../components/PageTransition';
import { useToast } from '../components/Toast';

export function Letter() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const { push } = useToast();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      push('Please fill all fields before sending.');
      return;
    }
    // Production: POST /api/waitlist { type: 'letter' }
    console.log('[majira] letter submission:', { name, email, message });
    setSent(true);
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  };

  return (
    <PageTransition>
      <Nav />

      <header className="page-head">
        <div className="container">
          <Reveal as="span" className="eyebrow">
            The Letter — VI
          </Reveal>
          <Reveal delay={0.1}>
            <h1>
              Write to <em>us</em>.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="lede">
              If you would like to join us, write to us. Tell us who you are, and what brought you here, and which
              journey caught your eye. We reply to every letter, usually within three days.
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
                  Your letter has <em>arrived</em>.
                </h3>
                <p>
                  We will write back within three days. In the meantime, you might like to read{' '}
                  <Link to="/chapter" className="inline" style={{ color: 'var(--ochre)', borderBottom: '1px solid var(--ochre)' }}>
                    the chapter
                  </Link>
                  , or look at the{' '}
                  <Link to="/arc" className="inline" style={{ color: 'var(--ochre)', borderBottom: '1px solid var(--ochre)' }}>
                    four stops
                  </Link>{' '}
                  that make the arc.
                </p>
                <p className="closer sw" lang="sw">
                  Asante.
                </p>
                <p className="sw-trans" style={{ display: 'inline' }}>
                  Thank you.
                </p>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <form className="form" onSubmit={submit} noValidate>
                <div className="field">
                  <label htmlFor="l-name">Your name</label>
                  <input
                    id="l-name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="l-email">Where we can write back</label>
                  <input
                    id="l-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="hint">We do not add you to a mailing list. This is just how we reply.</div>
                </div>
                <div className="field">
                  <label htmlFor="l-msg">Your letter</label>
                  <textarea
                    id="l-msg"
                    rows={6}
                    required
                    placeholder="Tell us who you are and what brought you here."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <div className="field" style={{ marginTop: '2.4rem' }}>
                  <button className="btn btn--solid" type="submit">
                    Send <span className="arrow">→</span>
                  </button>
                </div>
              </form>
            </Reveal>
          )}
        </div>
      </section>

      <Footer
        links={[
          { to: '/chapter', label: 'Chapter' },
          { to: '/journeys', label: 'Journeys' },
          { to: '/guestbook', label: 'Guestbook' },
        ]}
      />
    </PageTransition>
  );
}
