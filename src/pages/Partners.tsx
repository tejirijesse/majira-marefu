import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { Reveal } from '../components/Reveal';
import { PageTransition } from '../components/PageTransition';
import { MagneticButton } from '../components/MagneticButton';
import {
  SEGMENTS,
  type SegmentKey,
  PARTNER_TIMELINE,
  CAPABILITIES,
  CASE_STUDIES,
  OPERATING_PARTNERS,
} from '../lib/partnerData';

export function Partners() {
  const [segment, setSegment] = useState<SegmentKey>('corporate');
  const [openCap, setOpenCap] = useState<string>('Operational');
  const [caseIdx, setCaseIdx] = useState(0);
  const [casePaused, setCasePaused] = useState(false);

  const seg = SEGMENTS[segment];
  const cs = CASE_STUDIES[caseIdx];

  // Auto-advance case studies
  useEffect(() => {
    if (casePaused) return;
    const id = window.setInterval(() => {
      setCaseIdx((i) => (i + 1) % CASE_STUDIES.length);
    }, 9000);
    return () => window.clearInterval(id);
  }, [casePaused]);

  return (
    <PageTransition>
      <Nav />

      <header className="partner-hero">
        <div className="container">
          <Reveal as="span" className="eyebrow">
            For Institutions, Delegations & Firms
          </Reveal>
          <Reveal delay={0.08}>
            <h1>
              Private seasons, commissioned. <em>Not</em> packaged.
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="lede" style={{ marginTop: '2rem' }}>
              Majira Marefu operates private seasons between August and October each year in Kenya and Tanzania. Firms,
              sovereign delegations, foundations, and universities commission a segment of the public season — or book
              the programme exclusively. We design around your objective, your calendar, and your constraints. We do
              not run panels.
            </p>
          </Reveal>
          <Reveal delay={0.28}>
            <div style={{ marginTop: '2.4rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/brief" className="btn btn--solid">
                Request a confidential brief <span className="arrow">→</span>
              </Link>
              <a href="#how" className="link-plain">
                Or see how a season gets built ↓
              </a>
            </div>
          </Reveal>
        </div>
      </header>

      {/* Trust strip */}
      <div className="trust-strip">
        <div className="trust-label">Operating in partnership with</div>
        <div className="trust-marquee">
          {OPERATING_PARTNERS.map((p) => (
            <Reveal key={p} as="span" className="partner">
              {p}
            </Reveal>
          ))}
        </div>
      </div>

      {/* Segment selector */}
      <section className="section">
        <div className="container">
          <Reveal as="span" className="eyebrow">
            Who we host
          </Reveal>
          <Reveal>
            <h2 style={{ maxWidth: '20ch' }}>
              Three kinds of partner. <em>One</em> way of working.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              style={{
                maxWidth: '58ch',
                marginTop: '1.4rem',
                fontSize: 'clamp(1rem, 1.2vw, 1.1rem)',
                color: 'var(--umber)',
              }}
            >
              Tell us which of these you are, and the page will reshape around the things that matter to your kind of
              organisation.
            </p>
          </Reveal>

          <div className="segment-selector" role="tablist" aria-label="Partner segment selector">
            {(Object.keys(SEGMENTS) as SegmentKey[]).map((k) => {
              const s = SEGMENTS[k];
              return (
                <button
                  key={k}
                  role="tab"
                  aria-selected={segment === k}
                  className={`segment-chip ${segment === k ? 'active' : ''}`}
                  onClick={() => setSegment(k)}
                >
                  <div className="chip-label">{s.label}</div>
                  <div className="chip-short">{s.short}</div>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={segment}
              className="segment-panel"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
              role="tabpanel"
            >
              <p className="intro">{seg.intro}</p>

              <h4>Who commissions us</h4>
              <ul className="segment-buyers">
                {seg.typicalBuyers.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>

              <h4 style={{ marginTop: '2.4rem' }}>How it's held</h4>
              <div className="segment-formats">
                {seg.formats.map((f) => (
                  <div key={f.title} className="segment-format">
                    <div className="segment-format-title">{f.title}</div>
                    <div className="segment-format-detail">{f.detail}</div>
                  </div>
                ))}
              </div>

              <div className="segment-meta">
                <div>
                  <div className="meta-label">Scale</div>
                  <div className="meta-value">{seg.scale}</div>
                </div>
                <div>
                  <div className="meta-label">Lead time</div>
                  <div className="meta-value">{seg.leadTime}</div>
                </div>
                <div>
                  <div className="meta-label">Indicative pricing</div>
                  <div className="meta-value">{seg.pricingNote}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Case study carousel */}
      <section
        className="case-wrap"
        onMouseEnter={() => setCasePaused(true)}
        onMouseLeave={() => setCasePaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={cs.slug}
            className="case-slide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="case-type">{cs.orgType}</div>
            <p className="case-quote">"{cs.quote}"</p>
            <div className="case-attribution">
              <span className="org">{cs.org}</span>
              {cs.attribution}
            </div>
            <p className="case-summary">{cs.summary}</p>
            <div className="case-metrics">
              {cs.metrics.map((m) => (
                <div key={m.label}>
                  <div className="case-metric-label">{m.label}</div>
                  <div className="case-metric-value">{m.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="case-controls">
          <div className="case-dots" aria-hidden="true">
            {CASE_STUDIES.map((_, i) => (
              <button
                key={i}
                className={`case-dot ${i === caseIdx ? 'active' : ''}`}
                onClick={() => setCaseIdx(i)}
                aria-label={`Show case ${i + 1}`}
              />
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button
              className="case-arrow"
              onClick={() => setCaseIdx((i) => (i - 1 + CASE_STUDIES.length) % CASE_STUDIES.length)}
              aria-label="Previous case study"
            >
              ←
            </button>
            <button
              className="case-arrow"
              onClick={() => setCaseIdx((i) => (i + 1) % CASE_STUDIES.length)}
              aria-label="Next case study"
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* How a season gets built */}
      <section className="section" id="how">
        <div className="container">
          <Reveal as="span" className="eyebrow">
            From brief to departure
          </Reveal>
          <Reveal>
            <h2 style={{ maxWidth: '22ch' }}>
              How a <em>commissioned</em> season gets built.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              className="lede"
              style={{ marginTop: '1.4rem', maxWidth: '62ch' }}
            >
              Seven phases, roughly ten weeks from first brief to signed engagement, then a steady build through to
              delivery. Every phase has a named counterpart on our side and on yours. Nothing is negotiated twice.
            </p>
          </Reveal>
        </div>

        <div className="container" style={{ marginTop: '3rem' }}>
          <div className="timeline-track">
            {PARTNER_TIMELINE.map((p) => (
              <Reveal key={p.n} as="span">
                <article className="timeline-phase">
                  <div className="n">{p.n}</div>
                  <div className="t-title">{p.title}</div>
                  <div className="t-duration">{p.duration}</div>
                  <p className="t-detail">{p.detail}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <p
            style={{
              marginTop: '1.6rem',
              fontSize: '0.78rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--ochre)',
            }}
          >
            Scroll sideways →
          </p>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section--tight" style={{ background: 'var(--oat)' }}>
        <div className="container">
          <Reveal as="span" className="eyebrow">
            What we're equipped for
          </Reveal>
          <Reveal>
            <h2 style={{ maxWidth: '22ch' }}>
              Operationally <em>serious</em>. Legally thorough. Quietly kind.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              className="lede"
              style={{ marginTop: '1.4rem', marginBottom: '3rem', maxWidth: '62ch' }}
            >
              Tap any category to read the specifics. None of this is decorative. Every line here has been asked for by
              a partner at some point, and every line is how we work by default.
            </p>
          </Reveal>

          <div className="capabilities">
            {CAPABILITIES.map((cap) => {
              const open = openCap === cap.category;
              return (
                <div key={cap.category} className="cap-block">
                  <button
                    className="cap-head"
                    onClick={() => setOpenCap(open ? '' : cap.category)}
                    aria-expanded={open}
                  >
                    <span className="cap-head-label">{cap.category}</span>
                    <span className={`cap-head-toggle ${open ? 'open' : ''}`}>+</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        className="cap-body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
                      >
                        <ul>
                          {cap.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center', maxWidth: '62ch', margin: '0 auto' }}>
          <Reveal as="span" className="eyebrow">
            Next step
          </Reveal>
          <Reveal>
            <h2 style={{ maxWidth: '22ch', margin: '0 auto' }}>
              Send us a brief. <em>We</em> reply within five working days.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              style={{
                marginTop: '1.4rem',
                fontSize: 'clamp(1rem, 1.2vw, 1.1rem)',
                color: 'var(--umber)',
                margin: '1.4rem auto 0',
              }}
            >
              Four short steps, roughly eight minutes. It goes straight to our director. If mutual NDA is required
              before detail, say so at the first step — we send one over by return.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ marginTop: '2.4rem' }}>
              <MagneticButton as="a" href="/majira-marefu/brief" className="btn btn--solid">
                Request a confidential brief <span className="arrow">→</span>
              </MagneticButton>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <p
              style={{
                marginTop: '1.6rem',
                fontSize: '0.76rem',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'var(--umber)',
                opacity: 0.7,
              }}
            >
              Or write to partners@majiramarefu.com · +254 (0) 20 000 0000
            </p>
          </Reveal>
        </div>
      </section>

      <Footer
        links={[
          { to: '/chapter', label: 'Chapter' },
          { to: '/journeys', label: 'Journeys' },
          { to: '/brief', label: 'Partner brief' },
        ]}
      />
    </PageTransition>
  );
}
