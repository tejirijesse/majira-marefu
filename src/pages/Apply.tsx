import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { PageTransition } from '../components/PageTransition';
import { APPLY_QUESTIONS } from '../lib/data';
import { useToast } from '../components/Toast';

function wordCount(s: string) {
  return (s.trim().match(/\S+/g) || []).length;
}

export function Apply() {
  const [i, setI] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const { push } = useToast();

  const q = APPLY_QUESTIONS[i];
  const total = APPLY_QUESTIONS.length;
  const current = values[q.key] || '';
  const words = wordCount(current);

  const canAdvance = useMemo(() => {
    if (!q.required) return true;
    if (!current.trim()) return false;
    if (q.minWords && words < q.minWords) return false;
    return true;
  }, [q, current, words]);

  const onPrev = () => setI((n) => Math.max(0, n - 1));
  const onNext = () => {
    if (!canAdvance) {
      if (!current.trim()) push('This question is required.');
      else if (q.minWords) push(`A few more words — at least ${q.minWords}.`);
      return;
    }
    if (i < total - 1) setI(i + 1);
    else handleSubmit();
  };

  const handleSubmit = () => {
    // In production: POST /api/applications → Supabase + Resend.
    console.log('[majira] application payload:', values);
    setSubmitted(true);
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  };

  const encouragement = useMemo(() => {
    if (!q.minWords) return '';
    if (words === 0) return '';
    if (words < q.minWords * 0.5) return 'Keep going — you have more to say.';
    if (words < q.minWords) return 'Almost there.';
    if (words < q.minWords * 2) return 'Beautifully placed.';
    return 'This is lovely. Feel free to stop.';
  }, [q.minWords, words]);

  if (submitted) {
    return (
      <PageTransition>
        <Nav />
        <header className="page-head">
          <div className="container">
            <span className="eyebrow">Application · Marefu</span>
            <h1>
              Your application has been <em>received</em>.
            </h1>
          </div>
        </header>
        <section className="section--tight">
          <div className="container" style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div className="success-panel">
              <span className="divider mx-auto" style={{ margin: '0 auto 2rem' }} />
              <p>
                We review each one personally. You will hear from us within seven days, by email, whether the answer is
                yes, not this time, or let's talk further. Thank you for taking the time to write with care.
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
            { to: '/journeys/marefu', label: '← Marefu' },
            { to: '/journeys', label: 'All journeys' },
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
          <span className="eyebrow">Application · Marefu · Thirty nights · Twelve seats</span>
          <h1>
            Twelve <em>questions</em>.
          </h1>
          <p className="lede" style={{ marginTop: '2rem' }}>
            Not a vetting. A conversation in writing. We read every one personally and reply within seven days. There
            are no wrong answers. Roughly twenty minutes.
          </p>
        </div>
      </header>

      <section className="section--tight">
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div className="form">
            <AnimatePresence mode="wait">
              <motion.div
                key={q.key}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <span className="eyebrow" style={{ marginBottom: '1rem' }}>
                  Question {i + 1} of {total}
                </span>
                <div className="step-q">{q.prompt}</div>
                {q.hint && <div className="step-hint">{q.hint}</div>}

                <div className="field">
                  {q.type === 'textarea' ? (
                    <textarea
                      rows={q.rows || 4}
                      value={current}
                      autoFocus
                      placeholder={q.placeholder}
                      onChange={(e) => setValues({ ...values, [q.key]: e.target.value })}
                    />
                  ) : (
                    <input
                      type={q.type}
                      value={current}
                      autoFocus
                      placeholder={q.placeholder}
                      onChange={(e) => setValues({ ...values, [q.key]: e.target.value })}
                    />
                  )}

                  {q.type === 'textarea' && (q.minWords || words > 0) && (
                    <div className="field-row">
                      <span>
                        {words} word{words === 1 ? '' : 's'}
                        {q.minWords ? ` · suggested ${q.minWords}+` : ''}
                      </span>
                      <span style={{ color: 'var(--ochre)' }}>{encouragement}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="step-dots" aria-hidden="true">
              {APPLY_QUESTIONS.map((_, k) => (
                <span key={k} className={`step-dot ${k === i ? 'active' : k < i ? 'done' : ''}`} />
              ))}
            </div>

            <div className="step-controls">
              <button className="link-plain" disabled={i === 0} onClick={onPrev}>
                ← Back
              </button>
              <button className="btn btn--solid" onClick={onNext} type="button">
                {i === total - 1 ? 'Submit' : 'Continue'} <span className="arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer
        links={[
          { to: '/journeys/marefu', label: '← Marefu' },
          { to: '/journeys', label: 'All journeys' },
          { to: '/letter', label: 'Letter' },
        ]}
        right="Application · by invitation · twelve seats"
      />
    </PageTransition>
  );
}
