'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const EASING = [0.22, 1, 0.36, 1] as const

interface ChapterProps {
  number: string
  title: string
  body: string
  index: number
  isLast?: boolean
  shouldReduceMotion: boolean | null
}

function Chapter({ number, title, body, index, isLast = false, shouldReduceMotion }: ChapterProps) {
  const delay = index * 0.15

  const chapterVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASING, delay },
    },
  }

  return (
    <div className="flex gap-6 sm:gap-8">
      {/* Left: timeline line + number */}
      <div className="flex flex-col items-center shrink-0" aria-hidden="true">
        {/* Chapter number — large decorative */}
        <motion.span
          className="font-display text-5xl sm:text-6xl font-bold leading-none select-none"
          style={{ color: 'color-mix(in oklch, var(--foreground) 8%, transparent)' }}
          variants={chapterVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {number}
        </motion.span>

        {/* Vertical gradient line between chapters */}
        {!isLast && (
          <div
            className="flex-1 w-px mt-4 min-h-[48px]"
            style={{
              background:
                'linear-gradient(to bottom, color-mix(in oklch, var(--primary) 20%, transparent), transparent)',
            }}
          />
        )}
      </div>

      {/* Right: content */}
      <motion.div
        className="flex-1 pb-14"
        variants={chapterVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h3
          className="font-sans font-semibold text-lg sm:text-xl mb-3 leading-snug"
          style={{ color: 'var(--foreground)' }}
        >
          {title}
        </h3>
        <p
          className="font-sans text-sm sm:text-base leading-[1.9] whitespace-pre-line"
          style={{ color: 'var(--muted-foreground)' }}
        >
          {body}
        </p>
      </motion.div>
    </div>
  )
}

export function StorySection() {
  const t = useTranslations('story')
  const shouldReduceMotion = useReducedMotion()

  const chapters = [
    { number: '01', titleKey: 'chapter1Title', bodyKey: 'chapter1' },
    { number: '02', titleKey: 'chapter2Title', bodyKey: 'chapter2' },
    { number: '03', titleKey: 'chapter3Title', bodyKey: 'chapter3' },
    { number: '04', titleKey: 'chapter4Title', bodyKey: 'chapter4' },
  ] as const

  // Section label entrance
  const labelVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: EASING },
    },
  }

  return (
    <section
      className="w-full py-24 sm:py-32"
      style={{ background: 'var(--background)' }}
      aria-labelledby="story-label"
    >
      <div className="max-w-2xl mx-auto px-6 sm:px-8">
        {/* Section label — h2 for semantic structure, visually styled as overline */}
        {/* sr-only h2 links aria-labelledby; visible p is purely decorative */}
        <h2 id="story-label" className="sr-only">
          {t('sectionLabel')}
        </h2>
        <motion.p
          aria-hidden="true"
          className="font-sans text-xs font-semibold uppercase tracking-widest mb-14"
          style={{ color: 'var(--primary)' }}
          variants={labelVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {t('sectionLabel')}
        </motion.p>

        {/* Chapters */}
        <div role="list" aria-label={t('sectionLabel')}>
          {chapters.map(({ number, titleKey, bodyKey }, index) => (
            <div key={number} role="listitem">
              <Chapter
                number={number}
                title={t(titleKey)}
                body={t(bodyKey)}
                index={index}
                isLast={index === chapters.length - 1}
                shouldReduceMotion={shouldReduceMotion}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
