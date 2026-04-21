import { motion } from 'framer-motion';
import { useScrollProgress } from '../lib/useScrollProgress';

export function ScrollProgress() {
  const p = useScrollProgress();
  return (
    <div className="scroll-progress" aria-hidden="true">
      <motion.div
        className="scroll-progress-bar"
        style={{ scaleX: p }}
        transition={{ type: 'spring', stiffness: 140, damping: 24 }}
      />
    </div>
  );
}
