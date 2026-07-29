'use client';

import { useEffect, useRef, useState } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale';

interface Props {
  direction?: Direction;
  delay?: number;
  children: React.ReactNode;
  className?: string;
  id?: string;
  once?: boolean;
  onViewportEnter?: () => void;
}

const transforms: Record<Direction, string> = {
  up: 'translateY(32px)',
  down: 'translateY(-32px)',
  left: 'translateX(-32px)',
  right: 'translateX(32px)',
  scale: 'scale(0.9)',
};

export default function AnimatedSection({
  direction = 'up',
  delay = 0,
  children,
  className = '',
  id,
  once = true,
  onViewportEnter,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const firedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // IntersectionObserver never fires while the page isn't being rendered
    // (background tab, prerender). Reveal straight away so content is never
    // left permanently invisible.
    if (document.hidden) setInView(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (!firedRef.current) {
            firedRef.current = true;
            onViewportEnter?.();
          }
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: 0.1, rootMargin: '-100px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [once]);

  return (
    <div
      ref={ref}
      id={id}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : transforms[direction],
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
        willChange: inView ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
