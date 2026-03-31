'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

// Animation tokens
const EASING = [0.22, 1, 0.36, 1] as const
// Higher damping prevents spring overshoot on fast hover
const SPRING_HOVER = { type: 'spring', stiffness: 300, damping: 30 } as const

interface BentoCardProps {
  children: React.ReactNode
  className?: string
  index?: number
  accentColor?: string
  /** Pass CSS variable string like "var(--plan-c)" for hover border tint */
  hoverAccent?: string
}

export function BentoCard({
  children,
  className,
  index = 0,
  accentColor,
  hoverAccent,
}: BentoCardProps) {
  const shouldReduceMotion = useReducedMotion()

  const staggerDelay = index * 0.08

  const variants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        delay: staggerDelay,
        ease: EASING,
      },
    },
  }

  // ANIMATE: y -3 is subtler and more appropriate for a caring/warm brand
  const hoverAnimation = shouldReduceMotion
    ? {}
    : { y: -3, transition: SPRING_HOVER }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      whileHover={hoverAnimation}
      viewport={{ once: true, amount: 0.08 }}
      className={cn(
        'relative flex flex-col overflow-hidden rounded-2xl p-6',
        // Shadow system — richer than shadow-sm
        'shadow-card transition-shadow duration-300',
        'hover:shadow-card-hover',
        className
      )}
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        ...(accentColor
          ? { borderTop: `2.5px solid ${accentColor}` }
          : undefined),
      }}
      onMouseEnter={(e) => {
        if (!hoverAccent) return
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = `color-mix(in oklch, ${hoverAccent} 40%, var(--border))`
      }}
      onMouseLeave={(e) => {
        if (!hoverAccent) return
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = 'var(--border)'
      }}
    >
      {/* Subtle inner gradient — DISTILL: lowered opacity to not compete with content */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-25"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, color-mix(in oklch, var(--muted) 60%, transparent), transparent)',
        }}
        aria-hidden="true"
      />

      {/* Content — above the gradient overlay */}
      <div className="relative z-10 flex flex-col flex-1">
        {children}
      </div>
    </motion.div>
  )
}
