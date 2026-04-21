import { motion, type MotionProps } from 'framer-motion';
import { useReveal } from '../lib/useReveal';
import type { ReactNode } from 'react';

interface RevealProps extends MotionProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: 'div' | 'section' | 'article' | 'span' | 'p';
  className?: string;
}

/**
 * Fade + lift element when it enters the viewport.
 */
export function Reveal({ children, delay = 0, y = 28, as = 'div', className, ...rest }: RevealProps) {
  const { ref, inView } = useReveal();
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref as never}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1], delay }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
