'use client'

import { useTranslations } from 'next-intl'
import { BentoCard } from '../bento-card'
import { Button } from '@/shared/ui/button'
import { GithubIcon, XIcon, LinkedinIcon } from '../social-icons'

const SOCIAL_LINKS = [
  {
    key: 'github' as const,
    icon: GithubIcon,
    href: 'https://github.com',
    ariaLabel: 'GitHub',
    color: 'oklch(0.20 0.01 250)',
  },
  {
    key: 'twitter' as const,
    icon: XIcon,
    href: 'https://twitter.com',
    ariaLabel: 'X (Twitter)',
    color: 'oklch(0.25 0.01 250)',
  },
  {
    key: 'linkedin' as const,
    icon: LinkedinIcon,
    href: 'https://linkedin.com',
    ariaLabel: 'LinkedIn',
    color: 'oklch(0.47 0.12 237)',
  },
] as const

// Coffee cup SVG — pure inline, no icon library needed
function CoffeeCupIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" x2="6" y1="2" y2="4" />
      <line x1="10" x2="10" y1="2" y2="4" />
      <line x1="14" x2="14" y1="2" y2="4" />
    </svg>
  )
}

interface SocialCoffeeCardProps {
  index?: number
}

export function SocialCoffeeCard({ index = 0 }: SocialCoffeeCardProps) {
  const tSocial = useTranslations('social')
  const tCoffee = useTranslations('coffeeChat')

  return (
    <BentoCard
      index={index}
      accentColor="var(--accent)"
      hoverAccent="var(--accent)"
      className="lg:col-span-6 col-span-1 sm:col-span-4"
    >
      {/* Warm amber ambient wash */}
      <div
        className="absolute top-0 right-0 w-40 h-40 pointer-events-none opacity-[0.05] dark:opacity-[0.04]"
        style={{
          background:
            'radial-gradient(circle, var(--accent), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="flex flex-col gap-6 flex-1">
        {/* Social section */}
        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            {tSocial('label')}
          </p>
          <div className="flex gap-2 flex-wrap">
            {SOCIAL_LINKS.map(({ key, icon: Icon, href, ariaLabel, color }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${ariaLabel} — ${tSocial(key)}`}
                className="inline-flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-xl border transition-all duration-200 hover:scale-[1.03] hover:-translate-y-0.5"
                style={{
                  color,
                  background: `color-mix(in oklch, ${color} 6%, var(--muted))`,
                  borderColor: `color-mix(in oklch, ${color} 18%, var(--border))`,
                }}
              >
                <Icon size={14} aria-hidden={true} />
                <span className="hidden sm:inline text-xs">{tSocial(key)}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Gradient divider */}
        <div
          className="h-px w-full"
          style={{
            background:
              'linear-gradient(90deg, transparent, var(--border) 20%, var(--border) 80%, transparent)',
          }}
          aria-hidden="true"
        />

        {/* Coffee chat section */}
        <div className="flex flex-col gap-3 flex-1">
          {/* Coffee icon + headline */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{
                color: 'var(--accent)',
                background:
                  'color-mix(in oklch, var(--accent) 12%, var(--muted))',
                border:
                  '1px solid color-mix(in oklch, var(--accent) 25%, var(--border))',
              }}
            >
              <CoffeeCupIcon />
            </div>
            <h3 className="font-sans text-base font-semibold text-foreground leading-snug">
              {tCoffee('headline')}
            </h3>
          </div>

          <p className="font-sans text-sm text-muted-foreground whitespace-pre-line leading-relaxed flex-1">
            {tCoffee('description')}
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <a
              href="https://cal.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="primary"
                size="sm"
                className="transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background:
                    'linear-gradient(135deg, var(--accent), oklch(0.68 0.12 50))',
                  color: 'var(--foreground)',
                  boxShadow:
                    '0 3px 10px color-mix(in oklch, var(--accent) 30%, transparent)',
                }}
              >
                {tCoffee('cta')}
              </Button>
            </a>
            <span className="font-sans text-xs text-muted-foreground/60">
              {tCoffee('via')}
            </span>
          </div>
        </div>
      </div>
    </BentoCard>
  )
}
