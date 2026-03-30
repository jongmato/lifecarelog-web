import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Globe, Cpu, Database, Smartphone, Cloud } from 'lucide-react'
import { BentoCard } from '../bento-card'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'

const TECH_STACK = [
  { icon: Globe, label: 'Next.js' },
  { icon: Cpu, label: 'FastAPI' },
  { icon: Database, label: 'Supabase' },
  { icon: Smartphone, label: 'Expo' },
  { icon: Cloud, label: 'Cloudflare' },
] as const

interface AboutCardProps {
  index?: number
}

export function AboutCard({ index = 0 }: AboutCardProps) {
  const t = useTranslations('about')

  return (
    <BentoCard index={index} className="lg:col-span-8 col-span-1 sm:col-span-4">
      <div className="flex flex-col gap-5 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <h2 className="font-sans text-xl font-semibold text-foreground">
            {t('title')}
          </h2>
          <Badge variant="live" className="shrink-0">
            {t('available')}
          </Badge>
        </div>

        {/* Description */}
        <p className="font-sans text-sm text-muted-foreground whitespace-pre-line leading-relaxed flex-1">
          {t('description')}
        </p>

        {/* Tech stack */}
        <div>
          <p className="font-sans text-xs font-medium text-muted-foreground mb-2.5">
            {t('techLabel')} — {t('techCaption')}
          </p>
          <div className="flex flex-wrap gap-2">
            {TECH_STACK.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-lg"
              >
                <Icon size={13} strokeWidth={1.75} aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="pt-1">
          <Link href="#contact">
            <Button variant="primary" size="sm">
              {t('cta')}
            </Button>
          </Link>
        </div>
      </div>
    </BentoCard>
  )
}
