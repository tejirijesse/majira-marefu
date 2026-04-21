import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { PageTransition } from '../components/PageTransition';
import { TIERS, type TierSlug } from '../lib/data';
import { useCounter } from '../lib/useCounter';
import { useToast } from '../components/Toast';

type Step = 0 | 1 | 2 | 3;

const RESERVABLE: TierSlug[] = ['mwanzo', 'pwani', 'safari'];

interface Form {
  tier: TierSlug;
  guests: number;
  window: string;
  name: string;
  email: string;
  phone: string;
  passport_country: string;
  diet: string;
  notes: string;
}

const DEFAULTS: Form = {
  tier: 'mwanzo',
  guests: 2,
  window: 'August — primary window',
  name: '',
  email: '',
  phone: '',
  passport_country: '',
  diet: '',
  notes: '',
};

function currency(n: number) {
  return '$' + n.toLocaleString('en-US');
}

export function Hold() {
  const [sp] = useSearchParams();
  const [step, setStep] = useState<Step>(0);
  const [form, setForm] = useState<Form>(DEFAULTS);
  const [submitted, setSubmitted] = useState(false);
  const [refNum] = useState(
    () => 'MJ-' + Math.random().toString(16).slice(2, 8).toUpperCase()
  );
  const { push } = useToast();

  // Preselect tier from ?tier=
  useEffect(() => {
    const q = sp.get('tier') as TierSlug | null;
    if (q && RESERVABLE.includes(q)) {
      setForm((f) => ({ ...f, tier: q }));
    }
  }, [sp]);

  const tier = TIERS[form.tier];
  const total = tier.priceUSD * form.guests;
  const deposit = Math.round(total / 2);
  const totalTween = useCounter(total, 700);
  const depositTween = useCounter(deposit, 700);

  const STEPS = [
    {
      title: 'Step one of four · The journey',
      question: `Confirm ${tier.name}.`,
    },
    {
      title: 'Step two · Who you are',
      question: 'Tell us a little about you.',
    },
    {
      title: 'Step three · The deposit',
      question: 'Fifty per cent now. The rest ninety days before arrival.',
    },
    { title: 'Step four · Confirm', question: 'Last look.' },
  ];

  const canAdvance = useMemo(() => {
    if (step === 1) {
      return form.name.trim() && form.email.trim() && form.phone.trim();
    }
    return true;
  }, [step, form]);

  const onNext = () => {
    if (!canAdvance) {
      push('A few fields still need you.');
      return;
    }
    if (step < 3) setStep((s) => (s + 1) as Step);
    else {
      // In production: POST /api/reservations → Stripe Checkout.
      console.log('[majira] reservation payload:', { ...form, total, deposit, refNum });
      setSubmitted(true);
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
  };

  const onPrev = () => setStep((s) => (Math.max(0, s - 1) as Step));

  const update = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  if (submitted) {
    return (
      <PageTransition>
        <Nav />
        <header className="page-head">
          <div className="container">
            <span className="eyebrow">Reservation complete</span>
            <h1>
              Your place is <em>held</em>.
            </h1>
          </div>
        </header>
        <section className="section--tight">
          <div className="container" style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div className="success-panel">
              <span className="divider mx-auto" style={{ margin: '0 auto 2rem' }} />
              <p>
                A confirmation is on its way. Your reference number is{' '}
                <strong
                  style={{
                    fontFamily: 'var(--serif)',
                    color: 'var(--umber-deep)',
                    letterSpacing: '0.08em',
                    fontWeight: 400,
                  }}
                >
                  {refNum}
                </strong>
                . We'll send a single direct concierge contact to your email within the hour.
              </p>
              <p className="closer sw" lang="sw">
                Karibu tena.
              </p>
              <p className="sw-trans" style={{ display: 'inline' }}>
                Welcome back.
              </p>
            </div>
          </div>
        </section>
        <Footer
          links={[
            { to: '/journeys', label: 'All journeys' },
            { to: '/chapter', label: 'Chapter' },
            { to: '/letter', label: 'Letter' },
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
          <span className="eyebrow">
            Reserving · {tier.name} · {tier.nights} nights
          </span>
          <h1>
            Hold a <em>place</em>.
          </h1>
          <p className="lede" style={{ marginTop: '2rem' }}>
            A fifty per cent deposit holds your place. The balance is due ninety days before arrival. Everything is
            refundable up to T-120, and half-refundable up to T-60. Beyond that, transferable but not refundable.
          </p>
        </div>
      </header>

      <section className="section--tight">
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto' }}>
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
                  {STEPS[step].title}
                </span>
                <div className="step-q">{STEPS[step].question}</div>

                {step === 0 && (
                  <>
                    <div className="field">
                      <label>Journey</label>
                      <select
                        value={form.tier}
                        onChange={(e) => update('tier', e.target.value as TierSlug)}
                      >
                        {RESERVABLE.map((slug) => {
                          const t = TIERS[slug];
                          return (
                            <option key={slug} value={slug}>
                              {t.name} — {t.nights} nights — from ${t.priceUSD.toLocaleString('en-US')}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="field">
                      <label>Number of guests</label>
                      <select
                        value={form.guests}
                        onChange={(e) => update('guests', parseInt(e.target.value, 10))}
                      >
                        {[1, 2, 3, 4].map((n) => (
                          <option key={n} value={n}>
                            {n === 1 ? 'One' : n === 2 ? 'Two' : n === 3 ? 'Three' : 'Four'}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="field">
                      <label>Preferred window</label>
                      <select value={form.window} onChange={(e) => update('window', e.target.value)}>
                        <option>August — primary window</option>
                        <option>Early September</option>
                        <option>Late September — for Safari only</option>
                        <option>No preference</option>
                      </select>
                    </div>

                    <div className="deposit-card" style={{ marginTop: '2rem' }}>
                      <div className="row">
                        <span>
                          {tier.name} · {tier.nights} nights
                        </span>
                        <span>
                          {form.guests} {form.guests === 1 ? 'guest' : 'guests'}
                        </span>
                      </div>
                      <div className="total">{currency(totalTween)} total</div>
                      <div className="deposit-line">
                        Deposit: <strong>{currency(depositTween)}</strong> · balance due T-90
                      </div>
                    </div>
                  </>
                )}

                {step === 1 && (
                  <>
                    <div className="field">
                      <label>Your name</label>
                      <input
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => update('name', e.target.value)}
                      />
                    </div>
                    <div className="field">
                      <label>Email</label>
                      <input
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                      />
                    </div>
                    <div className="field">
                      <label>Phone</label>
                      <input
                        type="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                      />
                    </div>
                    <div className="field">
                      <label>Passport issuing country</label>
                      <input
                        type="text"
                        placeholder="For visa logistics"
                        value={form.passport_country}
                        onChange={(e) => update('passport_country', e.target.value)}
                      />
                    </div>
                    <div className="field">
                      <label>Dietary notes (optional)</label>
                      <input
                        type="text"
                        placeholder="Vegetarian, allergies, fasting dates …"
                        value={form.diet}
                        onChange={(e) => update('diet', e.target.value)}
                      />
                    </div>
                    <div className="field">
                      <label>Anything we should know?</label>
                      <textarea
                        rows={4}
                        placeholder="Travelling companion, access needs, something on your mind …"
                        value={form.notes}
                        onChange={(e) => update('notes', e.target.value)}
                      />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="deposit-card">
                      <div className="row">
                        <span>
                          {tier.name} · {tier.nights} nights
                        </span>
                        <span>
                          {form.guests} {form.guests === 1 ? 'guest' : 'guests'}
                        </span>
                      </div>
                      <div className="total">{currency(totalTween)} total</div>
                      <div className="deposit-line">
                        Deposit today: <strong>{currency(depositTween)}</strong> · balance {currency(total - deposit)}{' '}
                        due T-90
                      </div>
                    </div>

                    <div
                      style={{
                        border: '1px dashed rgba(107,74,43,0.35)',
                        padding: '1.6rem',
                        borderRadius: '2px',
                      }}
                    >
                      <p
                        style={{
                          fontSize: '0.78rem',
                          letterSpacing: '0.22em',
                          textTransform: 'uppercase',
                          color: 'var(--ochre)',
                          marginBottom: '0.8rem',
                        }}
                      >
                        Payment · demo mode
                      </p>
                      <p style={{ fontSize: '0.94rem', color: 'var(--umber)', lineHeight: 1.6, maxWidth: '56ch' }}>
                        In the live build, this step hands off to Stripe Checkout for the deposit, and stores a pending
                        reservation in Supabase. The balance is invoiced automatically at T-120. A second payment
                        adapter allows AXK Network rails to be swapped in as primary processor without refactoring.
                      </p>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <p
                      style={{
                        fontSize: '1rem',
                        color: 'var(--umber)',
                        lineHeight: 1.7,
                        marginBottom: '1.4rem',
                      }}
                    >
                      We will email you a confirmation with a reference number and a single direct contact at our
                      concierge desk within the hour. Two weeks before you travel you will receive a simple pre-arrival
                      note — nothing alarming, mostly what to pack and what not to worry about.
                    </p>

                    <div className="deposit-card">
                      <div className="row">
                        <span>For</span>
                        <span>{form.name || '—'}</span>
                      </div>
                      <div className="row">
                        <span>{tier.name} · {tier.nights} nights</span>
                        <span>{form.guests} {form.guests === 1 ? 'guest' : 'guests'}</span>
                      </div>
                      <div className="row">
                        <span>Window</span>
                        <span>{form.window}</span>
                      </div>
                      <div className="total" style={{ marginTop: '0.6rem' }}>{currency(totalTween)} total</div>
                      <div className="deposit-line">
                        Deposit today: <strong>{currency(depositTween)}</strong>
                      </div>
                    </div>

                    <p className="step-hint" style={{ marginTop: '1rem' }}>
                      By submitting, you accept the deposit terms and the cancellation policy. Neither is a trap. We
                      reply to every question on the same day.
                    </p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="step-dots" aria-hidden="true">
              {[0, 1, 2, 3].map((k) => (
                <span key={k} className={`step-dot ${k === step ? 'active' : k < step ? 'done' : ''}`} />
              ))}
            </div>

            <div className="step-controls">
              <button className="link-plain" disabled={step === 0} onClick={onPrev}>
                ← Back
              </button>
              <button className="btn btn--solid" onClick={onNext} type="button">
                {step === 3 ? 'Confirm reservation' : 'Continue'} <span className="arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer
        links={[
          { to: '/journeys', label: 'All journeys' },
          { to: '/chapter', label: 'Chapter' },
          { to: '/letter', label: 'Letter' },
        ]}
      />
    </PageTransition>
  );
}
