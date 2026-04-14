import { useTranslations } from 'next-intl'
import { BentoCard } from '../bento-card'
import { Badge } from '@/shared/ui/badge'

interface PlanTCardProps {
  index?: number
}

// Phone mockup outline — pure SVG/CSS, no images
function PhoneMockup() {
  return (
    <div
      className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.12] dark:opacity-[0.07]"
      aria-hidden="true"
    >
      <svg
        width="80"
        height="140"
        viewBox="0 0 80 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Phone body */}
        <rect
          x="4"
          y="4"
          width="72"
          height="132"
          rx="14"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
        />
        {/* Screen area */}
        <rect x="10" y="18" width="60" height="104" rx="4" fill="currentColor" opacity="0.3" />
        {/* Notch */}
        <rect x="28" y="8" width="24" height="6" rx="3" fill="currentColor" />
        {/* Home indicator */}
        <rect x="28" y="126" width="24" height="4" rx="2" fill="currentColor" opacity="0.6" />
        {/* Screen content lines */}
        <rect x="18" y="30" width="44" height="4" rx="2" fill="currentColor" opacity="0.4" />
        <rect x="18" y="40" width="32" height="3" rx="1.5" fill="currentColor" opacity="0.25" />
        <rect x="18" y="54" width="44" height="20" rx="4" fill="currentColor" opacity="0.15" />
        <rect x="18" y="82" width="20" height="20" rx="4" fill="currentColor" opacity="0.12" />
        <rect x="44" y="82" width="18" height="20" rx="4" fill="currentColor" opacity="0.12" />
        <rect x="18" y="110" width="44" height="6" rx="3" fill="currentColor" opacity="0.2" />
      </svg>
    </div>
  )
}

export function PlanTCard({ index = 0 }: PlanTCardProps) {
  const t = useTranslations('services.planT')

  return (
    <BentoCard
      index={index}
      accentColor="var(--plan-t)"
      hoverAccent="var(--plan-t)"
      className="lg:col-span-8 col-span-1 sm:col-span-2 relative"
    >
      {/* Sage ambient glow */}
      <div
        className="absolute bottom-0 right-0 w-48 h-48 pointer-events-none opacity-[0.05]"
        style={{
          background: 'radial-gradient(circle, var(--plan-t), transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Phone mockup — decorative */}
      <div style={{ color: 'var(--plan-t)' }}>
        <PhoneMockup />
      </div>

      <div className="flex flex-col gap-4 flex-1">
        {/* Platform pill */}
        <div className="inline-flex">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg"
            style={{
              color: 'var(--plan-t)',
              background:
                'color-mix(in oklch, var(--plan-t) 10%, transparent)',
              border:
                '1px solid color-mix(in oklch, var(--plan-t) 25%, transparent)',
            }}
          >
            {/* iOS icon shape */}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            iOS &amp; Android
          </span>
        </div>

        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <h2 className="font-sans text-lg font-semibold text-foreground">
              {t('title')}
            </h2>
            <Badge variant="in-development">{t('badge')}</Badge>
          </div>
          <p
            className="font-sans text-sm font-medium"
            style={{ color: 'var(--plan-t)' }}
          >
            {t('subtitle')}
          </p>
        </div>

        {/* Description */}
        <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1">
          {t('description')}
        </p>

        {/* Platform label */}
        <p className="font-sans text-xs text-muted-foreground/60">
          {t('platforms')}
        </p>
      </div>
    </BentoCard>
  )
}
