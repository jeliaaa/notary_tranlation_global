'use client';

import { motion } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale';

interface Props {
  direction?: Direction;
  delay?: number;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const initialMap: Record<Direction, object> = {
  up: { y: 40, opacity: 0 },
  down: { y: -40, opacity: 0 },
  left: { x: -40, opacity: 0 },
  right: { x: 40, opacity: 0 },
  scale: { scale: 0.9, opacity: 0 },
};

const animateMap: Record<Direction, object> = {
  up: { y: 0, opacity: 1 },
  down: { y: 0, opacity: 1 },
  left: { x: 0, opacity: 1 },
  right: { x: 0, opacity: 1 },
  scale: { scale: 1, opacity: 1 },
};

export default function AnimatedSection({
  direction = 'up',
  delay = 0,
  children,
  className,
  id,
}: Props) {
  return (
    <motion.div
      id={id}
      className={className}
      initial={initialMap[direction]}
      whileInView={animateMap[direction]}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
