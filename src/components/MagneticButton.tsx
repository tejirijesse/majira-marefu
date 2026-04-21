import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, type ReactNode, type MouseEvent } from 'react';

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
  as?: 'button' | 'a' | 'span';
  href?: string;
  onClick?: (e: MouseEvent) => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  'aria-label'?: string;
}

/**
 * Button that subtly pulls toward the cursor on hover.
 * Disabled on coarse pointer + reduced-motion.
 */
export function MagneticButton({
  children,
  strength = 14,
  className,
  as = 'button',
  href,
  onClick,
  type = 'button',
  disabled,
  ...rest
}: MagneticProps) {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 15, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 180, damping: 15, mass: 0.5 });

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    mx.set(dx * strength);
    my.set(dy * strength);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const commonProps = {
    ref: ref as never,
    style: { x: sx, y: sy } as never,
    className,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    onClick,
    ...rest,
  };

  if (as === 'a') {
    return (
      <motion.a href={href} {...commonProps}>
        {children}
      </motion.a>
    );
  }
  if (as === 'span') {
    return <motion.span {...commonProps}>{children}</motion.span>;
  }
  return (
    <motion.button type={type} disabled={disabled} {...commonProps}>
      {children}
    </motion.button>
  );
}
