import { useTranslations } from 'next-intl'
import { BentoCard } from '../bento-card'
import { Badge } from '@/shared/ui/badge'

interface PlanLCardProps {
  index?: number
}

export function PlanLCard({ index = 0 }: PlanLCardProps) {
  const t = useTranslations('services.planL')

  return (
    <BentoCard
      index={index}
      accentColor="var(--plan-l)"
      className="lg:col-span-4 col-span-1 sm:col-span-2"
    >
      <div className="flex flex-col gap-4 flex-1">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <h2 className="font-sans text-lg font-semibold text-foreground">
              {t('title')}
            </h2>
            <Badge variant="coming-soon">{t('badge')}</Badge>
          </div>
          <p className="font-sans text-sm text-muted-foreground font-medium">
            {t('subtitle')}
          </p>
        </div>

        {/* Description */}
        <p className="font-sans text-sm text-muted-foreground leading-relaxed">
          {t('description')}
        </p>

        {/* Teaser */}
        <p className="font-sans text-xs text-muted-foreground/70 leading-relaxed flex-1 italic">
          {t('teaser')}
        </p>
      </div>
    </BentoCard>
  )
}
