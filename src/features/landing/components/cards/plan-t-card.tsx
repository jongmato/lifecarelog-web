import { useTranslations } from 'next-intl'
import { Smartphone } from 'lucide-react'
import { BentoCard } from '../bento-card'
import { Badge } from '@/shared/ui/badge'

interface PlanTCardProps {
  index?: number
}

export function PlanTCard({ index = 0 }: PlanTCardProps) {
  const t = useTranslations('services.planT')

  return (
    <BentoCard
      index={index}
      accentColor="var(--plan-t)"
      className="lg:col-span-8 col-span-1 sm:col-span-2"
    >
      <div className="flex flex-col gap-4 flex-1">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <h2 className="font-sans text-lg font-semibold text-foreground">
              {t('title')}
            </h2>
            <Badge variant="in-development">{t('badge')}</Badge>
          </div>
          <p className="font-sans text-sm text-muted-foreground font-medium">
            {t('subtitle')}
          </p>
        </div>

        {/* Description */}
        <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1">
          {t('description')}
        </p>

        {/* Platform label */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Smartphone size={13} strokeWidth={1.75} aria-hidden="true" />
          <span>{t('platforms')}</span>
        </div>
      </div>
    </BentoCard>
  )
}
