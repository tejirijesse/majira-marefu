import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { KenBurns } from '../components/KenBurns';
import { MagneticButton } from '../components/MagneticButton';
import { PageTransition } from '../components/PageTransition';

export function Landing() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <section className="hero">
        <KenBurns
          className="hero-img"
          src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=2400&q=80"
          alt="Dawn light on the East African coast."
          parallax
        />

        <motion.div
          className="hero-topline"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div className="mark">Majira Marefu</div>
          <div className="meta">Est. 2027 · Nairobi → Zanzibar</div>
        </motion.div>

        <motion.div
          className="hero-center"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.35, delayChildren: 0.2 } },
          }}
        >
          <motion.h1
            className="wordmark"
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0, transition: { duration: 1.6, ease: [0.22, 0.61, 0.36, 1] } },
            }}
          >
            Majira <em>Marefu</em>
          </motion.h1>
          <motion.div
            className="hero-sub"
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 0.61, 0.36, 1] } },
            }}
          >
            The long African summer <span className="dot">·</span> August 2027
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.9, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <MagneticButton
            as="button"
            className="btn btn--light"
            onClick={() => navigate('/chapter')}
            aria-label="Enter the site"
          >
            Enter <span className="arrow">→</span>
          </MagneticButton>
          <div className="hero-hint">
            By invitation · Wave I opens March 2027 &nbsp;·&nbsp;{' '}
            <Link
              to="/partners"
              style={{
                color: 'var(--bone)',
                opacity: 0.78,
                borderBottom: '1px solid rgba(244,239,230,0.4)',
                paddingBottom: '2px',
              }}
            >
              For institutions →
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </PageTransition>
  );
}
