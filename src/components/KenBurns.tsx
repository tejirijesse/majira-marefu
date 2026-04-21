import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface Props {
  src: string;
  className?: string;
  alt?: string;
  /** Add parallax response to mouse movement. Desktop only. */
  parallax?: boolean;
}

/**
 * Slow pan + zoom background image. Optional parallax on mouse move (desktop).
 * Used on the landing hero and tier-page heroes.
 */
export function KenBurns({ src, className, parallax = false, alt = '' }: Props) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const frameRef = useRef(0);

  useEffect(() => {
    if (!parallax) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handle = (e: MouseEvent) => {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        setOffset({
          x: (e.clientX / window.innerWidth - 0.5) * -14,
          y: (e.clientY / window.innerHeight - 0.5) * -10,
        });
      });
    };
    window.addEventListener('mousemove', handle);
    return () => {
      window.removeEventListener('mousemove', handle);
      cancelAnimationFrame(frameRef.current);
    };
  }, [parallax]);

  return (
    <motion.div
      className={className}
      style={{ backgroundImage: `url(${src})` }}
      role="img"
      aria-label={alt}
      animate={{
        scale: [1, 1.08, 1],
        x: offset.x,
        y: offset.y,
      }}
      transition={{
        scale: { duration: 24, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' },
        x: { type: 'spring', stiffness: 50, damping: 20 },
        y: { type: 'spring', stiffness: 50, damping: 20 },
      }}
    />
  );
}
