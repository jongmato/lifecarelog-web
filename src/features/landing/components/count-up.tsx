'use client'

import { useEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from 'framer-motion'

interface CountUpProps {
  target: number
  duration?: number
  format?: 'number' | 'plain'
}

export function CountUp({ target, duration = 1.5, format = 'number' }: CountUpProps) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => {
    const value = Math.round(v)
    return format === 'plain' ? String(value) : value.toLocaleString()
  })
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, {
    once: true,
    amount: 0.5,
  })

  useEffect(() => {
    if (!isInView) return
    const controls = animate(count, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    })
    return controls.stop
  }, [isInView, count, target, duration])

  return <motion.span ref={ref}>{rounded}</motion.span>
}
