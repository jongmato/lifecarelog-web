'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

// Animation tokens from motion designer
const EASING = [0.22, 1, 0.36, 1] as const
const SPRING_HOVER = { type: 'spring', stiffness: 300, damping: 25 } as const

interface BentoCardProps {
  children: React.ReactNode
  className?: string
  index?: number
  accentColor?: string
}

export function BentoCard({
  children,
  className,
  index = 0,
  accentColor,
}: BentoCardProps) {
  const shouldReduceMotion = useReducedMotion()

  const staggerDelay = index * 0.08

  const variants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: staggerDelay,
        ease: EASING,
      },
    },
  }

  const hoverAnimation = shouldReduceMotion
    ? {}
    : { y: -4, transition: SPRING_HOVER }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      whileHover={hoverAnimation}
      viewport={{ once: true, amount: 0.1 }}
      className={cn(
        'bg-card border border-border rounded-xl shadow-sm p-6',
        'flex flex-col',
        className
      )}
      style={
        accentColor
          ? { borderTop: `3px solid ${accentColor}` }
          : undefined
      }
    >
      {children}
    </motion.div>
  )
}
