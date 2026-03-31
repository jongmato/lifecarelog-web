import { useTranslations } from 'next-intl'
import { BentoCard } from '../bento-card'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { TECH_STACK } from '../tech-stack-data'

interface AboutCardProps {
  index?: number
  onContact?: () => void
}

export function AboutCard({ index = 0, onContact }: AboutCardProps) {
  const t = useTranslations('about')

  return (
    <BentoCard
      index={index}
      className="lg:col-span-8 col-span-1 sm:col-span-4"
      hoverAccent="var(--primary)"
      accentColor="var(--primary)"
    >
      {/* Decorative warm wash in top-right corner */}
      <div
        className="absolute top-0 right-0 w-40 h-40 pointer-events-none opacity-[0.04]"
        style={{
          background:
            'radial-gradient(circle, var(--accent), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="flex flex-col gap-5 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h2 className="font-sans text-xl font-semibold text-foreground leading-snug">
              {t('title')}
            </h2>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge variant="live" className="shrink-0 glow-success">
              {t('available')}
            </Badge>
          </div>
        </div>

        {/* Available detail — human-readable sentence below the badge area */}
        <p className="font-sans text-xs text-muted-foreground -mt-3">
          {t('availableDetail')}
        </p>

        {/* Description */}
        <p className="font-sans text-sm text-muted-foreground whitespace-pre-line leading-relaxed flex-1">
          {t('description')}
        </p>

        {/* Tech stack — colored pills */}
        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            {t('techLabel')}
            <span className="normal-case font-normal tracking-normal ml-2 text-muted-foreground/60">
              — {t('techCaption')}
            </span>
          </p>
          <div className="flex flex-wrap gap-2">
            {TECH_STACK.map(({ icon: Icon, label, color }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all duration-200 hover:scale-[1.03]"
                style={{
                  color,
                  backgroundColor: `color-mix(in oklch, ${color} 8%, transparent)`,
                  borderColor: `color-mix(in oklch, ${color} 20%, var(--border))`,
                }}
              >
                <Icon size={12} strokeWidth={2} aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="pt-1">
          <a
            href="https://cal.com/lifecarelog/project-consultation"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="primary" size="sm">
              {t('cta')}
            </Button>
          </a>
        </div>
      </div>
    </BentoCard>
  )
}
