'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { BentoCard } from '../bento-card'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'

interface PlanCCardProps {
  index?: number
}

export function PlanCCard({ index = 0 }: PlanCCardProps) {
  const t = useTranslations('services.planC')

  return (
    <BentoCard
      index={index}
      accentColor="var(--plan-c)"
      className="lg:col-span-4 col-span-1 sm:col-span-2"
    >
      <div className="flex flex-col gap-4 flex-1">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <h2 className="font-sans text-lg font-semibold text-foreground">
              {t('title')}
            </h2>
            {/* Live pulse badge */}
            <Badge variant="live" className="flex items-center gap-1.5">
              <motion.span
                className="w-2 h-2 rounded-full bg-success"
                animate={{ scale: [1, 1.08, 1], opacity: [1, 0.85, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true"
              />
              {t('badge')}
            </Badge>
          </div>
          <p className="font-sans text-sm text-muted-foreground font-medium">
            {t('subtitle')}
          </p>
        </div>

        {/* Description */}
        <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1">
          {t('description')}
        </p>

        {/* CTA */}
        <a
          href="https://plan-c.lifecarelog.co.kr"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto"
        >
          <Button variant="secondary" size="sm" className="w-full">
            {t('cta')}
          </Button>
        </a>
      </div>
    </BentoCard>
  )
}
