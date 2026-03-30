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
  },
  {
    key: 'twitter' as const,
    icon: XIcon,
    href: 'https://twitter.com',
    ariaLabel: 'X (Twitter)',
  },
  {
    key: 'linkedin' as const,
    icon: LinkedinIcon,
    href: 'https://linkedin.com',
    ariaLabel: 'LinkedIn',
  },
] as const

interface SocialCoffeeCardProps {
  index?: number
}

export function SocialCoffeeCard({ index = 0 }: SocialCoffeeCardProps) {
  const tSocial = useTranslations('social')
  const tCoffee = useTranslations('coffeeChat')

  return (
    <BentoCard index={index} className="lg:col-span-6 col-span-1 sm:col-span-4">
      <div className="flex flex-col gap-6 flex-1">
        {/* Social section */}
        <div>
          <p className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
            {tSocial('label')}
          </p>
          <div className="flex gap-2">
            {SOCIAL_LINKS.map(({ key, icon: Icon, href, ariaLabel }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${ariaLabel} — ${tSocial(key)}`}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted hover:bg-muted/70 hover:text-foreground px-3 py-2 rounded-lg transition-colors duration-200"
              >
                <Icon size={15} aria-hidden={true} />
                <span className="hidden sm:inline">{tSocial(key)}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Coffee chat section */}
        <div className="flex flex-col gap-3 flex-1">
          <h3 className="font-sans text-base font-semibold text-foreground">
            {tCoffee('headline')}
          </h3>
          <p className="font-sans text-sm text-muted-foreground whitespace-pre-line leading-relaxed flex-1">
            {tCoffee('description')}
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <a
              href="https://cal.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" size="sm">
                {tCoffee('cta')}
              </Button>
            </a>
            <span className="font-sans text-xs text-muted-foreground/70">
              {tCoffee('via')}
            </span>
          </div>
        </div>
      </div>
    </BentoCard>
  )
}
