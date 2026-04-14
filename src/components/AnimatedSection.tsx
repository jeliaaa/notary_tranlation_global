'use client';

import { motion, type Variants } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale';

interface Props {
  direction?: Direction;
  delay?: number;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const variants: Record<Direction, Variants> = {
  up: {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  down: {
    hidden: { y: -40, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  left: {
    hidden: { x: -40, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
  right: {
    hidden: { x: 40, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
  scale: {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  },
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
      variants={variants[direction]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}