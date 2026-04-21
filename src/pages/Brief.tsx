import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { PageTransition } from '../components/PageTransition';
import { BRIEF_STEPS, SEGMENTS } from '../lib/partnerData';
import { useToast } from '../components/Toast';

type Values = Record<string, string>;

const FRIENDLY_LABELS: Values = {
  corporate: 'Corporation',
  pe_vc: 'PE / VC',
  family_office: 'Family office',
  government: 'Government body',
  diplomatic: 'Diplomatic mission',
  university: 'University / research',
  foundation: 'Foundation',
  ngo: 'NGO / non-profit',
  arts: 'Arts / cultural',
  other: 'Other',

  private_buyout: 'Private buyout',
  reserved_week: 'Reserved week',
  bespoke: 'Bespoke',
  not_sure: 'Advise us',

  standard: 'Standard NDA',
  nda_mutual: 'Mutual NDA required',
  chatham: 'Chatham House',
  full: 'Full confidentiality',

  u250: 'Under $250K',
  '250-500': '$250K–500K',
  '500-1m': '$500K–1M',
  '1m-2m': '$1M–2M',
  '2m+': 'Over $2M',
};

function friendly(v: string): string {
  return FRIENDLY_LABELS[v] ?? v;
}

export function Brief() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>({});
  const [submitted, setSubmitted] = useState(false);
  const [ref] = useState(() => 'MM-' + Math.random().toString(16).slice(2, 8).toUpperCase());
  const { push } = useToast();

  const currentStep = BRIEF_STEPS[step];
  const total = BRIEF_STEPS.length;

  const set = (k: string, v: string) => setValues((prev) => ({ ...prev, [k]: v }));

  const canAdvance = useMemo(() => {
    return currentStep.fields.every((f) => {
      if (!f.required) return true;
      return values[f.key] && values[f.key].trim().length > 0;
    });
  }, [currentStep, values]);

  const segmentHint = useMemo(() => {
    const t = values.org_type;
    if (['corporate', 'pe_vc', 'family_office'].includes(t)) return SEGMENTS.corporate.label;
    if (['government', 'diplomatic'].includes(t)) return SEGMENTS.government.label;
    if (['university', 'foundation', 'ngo', 'arts'].includes(t)) return SEGMENTS.institution.label;
    return null;
  }, [values.org_type]);

  const onNext = () => {
    if (!canAdvance) {
      push('A few required fields still.');
      return;
    }
    if (step < total - 1) setStep((s) => s + 1);
    else handleSubmit();
  };

  const onPrev = () => setStep((s) => Math.max(0, s - 1));

  const handleSubmit = () => {
    // Production: POST /api/brief → Supabase + Resend admin notification.
    console.log('[majira] partner brief payload:', { ...values, ref });
    setSubmitted(true);
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  };

  const summaryEntries: [string, string][] = useMemo(() => {
    const out: [string, string][] = [];
    if (values.org) out.push(['Organisation', values.org]);
    if (values.org_type) out.push(['Type', friendly(values.org_type)]);
    if (values.contact_name) out.push(['Contact', values.contact_name]);
    if (values.format) out.push(['Format', friendly(values.format)]);
    if (values.party_size) out.push(['Party', values.party_size + ' guests']);
    if (values.dates) out.push(['Dates', values.dates]);
    if (values.confidentiality) out.push(['Confidentiality', friendly(values.confidentiality)]);
    if (values.budget_band) out.push(['Budget', friendly(values.budget_band)]);
    return out;
  }, [values]);

  if (submitted) {
    return (
      <PageTransition>
        <Nav />
        <header className="page-head">
          <div className="container">
            <span className="eyebrow">Partner brief received</span>
            <h1>
              Your brief has <em>arrived</em>.
            </h1>
          </div>
        </header>
        <section className="section--tight">
          <div className="container" style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div className="success-panel">
              <span className="divider mx-auto" style={{ margin: '0 auto 2rem' }} />
              <p>
                Your reference is{' '}
                <strong
                  style={{
                    fontFamily: 'var(--serif)',
                    color: 'var(--umber-deep)',
                    letterSpacing: '0.08em',
                    fontWeight: 400,
                  }}
                >
                  {ref}
                </strong>
                . It has gone straight to our director and the regional lead for your segment. You will receive a draft
                engagement memo within five working days. If mutual NDA was requested, a draft is already on its way.
              </p>
              <p className="closer sw" lang="sw">
                Asante sana.
              </p>
              <p className="sw-trans" style={{ display: 'inline' }}>
                Thank you, deeply.
              </p>
            </div>
          </div>
        </section>
        <Footer
          links={[
            { to: '/partners', label: '← Partners' },
            { to: '/journeys', label: 'Journeys' },
            { to: '/chapter', label: 'Chapter' },
          ]}
        />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Nav />

      <header className="page-head" style={{ paddingBottom: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="container">
          <span className="eyebrow">Confidential partner brief · Four steps · Roughly eight minutes</span>
          <h1>
            Tell us the <em>shape</em> of it.
          </h1>
          <p className="lede" style={{ marginTop: '2rem' }}>
            Four short steps. Nothing here is a sales form — we do not grade briefs by budget, and we reply to every
            one with a real human response. If mutual NDA is required before detail, say so on step three.
          </p>
        </div>
      </header>

      <section className="section--tight">
        <div
          className="container"
          style={{
            maxWidth: '860px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
            gap: 'clamp(2rem, 4vw, 3rem)',
          }}
        >
          <div className="form">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <span className="eyebrow" style={{ marginBottom: '1rem' }}>
                  Step {step + 1} of {total} · {currentStep.title}
                </span>

                {currentStep.fields.map((f) => (
                  <div key={f.key} className="field">
                    <label htmlFor={`f-${f.key}`}>{f.prompt}</label>
                    {f.type === 'textarea' ? (
                      <textarea
                        id={`f-${f.key}`}
                        rows={f.rows || 4}
                        placeholder={f.placeholder}
                        value={values[f.key] || ''}
                        onChange={(e) => set(f.key, e.target.value)}
                      />
                    ) : f.type === 'select' ? (
                      <select
                        id={`f-${f.key}`}
                        value={values[f.key] || ''}
                        onChange={(e) => set(f.key, e.target.value)}
                      >
                        {f.options?.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        id={`f-${f.key}`}
                        type={f.type}
                        placeholder={f.placeholder}
                        value={values[f.key] || ''}
                        onChange={(e) => set(f.key, e.target.value)}
                      />
                    )}
                    {f.hint && <div className="hint">{f.hint}</div>}
                    {f.key === 'org_type' && segmentHint && (
                      <div
                        className="hint"
                        style={{ color: 'var(--ochre)', marginTop: '0.6rem' }}
                      >
                        → We will route this to our {segmentHint.toLowerCase()} desk.
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            <div className="step-dots" aria-hidden="true" style={{ margin: '2.4rem 0 0' }}>
              {BRIEF_STEPS.map((_, k) => (
                <span key={k} className={`step-dot ${k === step ? 'active' : k < step ? 'done' : ''}`} />
              ))}
            </div>

            <div className="step-controls">
              <button className="link-plain" disabled={step === 0} onClick={onPrev}>
                ← Back
              </button>
              <button className="btn btn--solid" onClick={onNext} type="button">
                {step === total - 1 ? 'Send brief' : 'Continue'} <span className="arrow">→</span>
              </button>
            </div>
          </div>

          {/* Live summary preview */}
          <aside>
            <div className="brief-summary" style={{ position: 'sticky', top: '6rem' }}>
              <div className="label">Your brief — so far</div>
              {summaryEntries.length === 0 ? (
                <p style={{ fontStyle: 'italic', color: 'var(--umber)', opacity: 0.7, fontSize: '0.9rem' }}>
                  The summary fills in as you answer. Nothing is sent until you press Send.
                </p>
              ) : (
                summaryEntries.map(([k, v]) => (
                  <div key={k} className="row">
                    <span className="row-key">{k}</span>
                    <span className="row-val">{v}</span>
                  </div>
                ))
              )}
              <div
                style={{
                  marginTop: '1.4rem',
                  paddingTop: '1.2rem',
                  borderTop: '1px solid rgba(107,74,43,0.18)',
                  fontSize: '0.78rem',
                  color: 'var(--umber)',
                  opacity: 0.8,
                  lineHeight: 1.6,
                }}
              >
                Confidential. Reviewed only by our director and the regional lead for your segment. GDPR-aligned; erased
                on request.
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer
        links={[
          { to: '/partners', label: '← Partners' },
          { to: '/journeys', label: 'Journeys' },
          { to: '/chapter', label: 'Chapter' },
        ]}
        right="Reply within five working days"
      />
    </PageTransition>
  );
}
