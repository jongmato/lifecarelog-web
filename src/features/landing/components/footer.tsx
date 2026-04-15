'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { GithubIcon, XIcon, ThreadsIcon } from './social-icons'

// DELIGHT: each icon has its own brand color revealed on hover
// Colors stored as CSS-compatible strings; injected via --social-hover custom property
const SOCIAL_LINKS = [
  {
    icon: GithubIcon,
    href: 'https://github.com/jongmato',
    label: 'GitHub',
    // Use foreground CSS variable so it adapts to both light and dark mode
    hoverColor: 'var(--foreground)',
  },
  {
    icon: XIcon,
    href: 'https://x.com/lifecarelog',
    label: 'X (Twitter)',
    hoverColor: 'var(--foreground)',
  },
  {
    icon: ThreadsIcon,
    href: 'https://www.threads.com/@lifecarelog_official',
    label: 'Threads',
    hoverColor: 'var(--foreground)',
  },
] as const

interface FooterProps {
  onContact?: () => void
}

export function Footer({ onContact }: FooterProps) {
  const tFooter = useTranslations('footer')
  const tNav = useTranslations('nav')

  return (
    <footer className="w-full mt-16" role="contentinfo">
      {/* Gradient divider — replaces plain border-t */}
      <div
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, var(--border) 15%, color-mix(in oklch, var(--primary) 20%, var(--border)) 50%, var(--border) 85%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div
        className="w-full"
        style={{ background: 'var(--surface-low)' }}
      >
        {/* ADAPT: improved mobile layout — stacked on mobile, row on sm+ */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6">
            {/* Brand mark */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo-icon.png"
                  alt="LifeCareLog"
                  width={32}
                  height={32}
                  sizes="32px"
                  className="w-8 h-8 rounded-[10px]"
                />
              </div>
              <span className="font-sans text-xs text-muted-foreground pl-0.5">
                {tFooter('brand')}
              </span>
              <span className="font-sans text-[11px] text-muted-foreground/60 pl-0.5">
                lifecarelog.co.kr
              </span>
            </div>

            {/* Nav links */}
            <nav aria-label="Footer navigation">
              <ul className="flex gap-5 flex-wrap">
                <li>
                  <Link
                    href="/services"
                    className="font-sans text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-4 decoration-primary/40 transition-colors duration-200"
                  >
                    {tNav('services')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#philosophy"
                    className="font-sans text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-4 decoration-primary/40 transition-colors duration-200"
                  >
                    {tNav('about')}
                  </Link>
                </li>
                <li>
                  <button
                    onClick={onContact}
                    type="button"
                    className="font-sans text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-4 decoration-primary/40 transition-colors duration-200 cursor-pointer"
                  >
                    {tNav('contact')}
                  </button>
                </li>
              </ul>
            </nav>

            {/* Social links */}
            {/* DELIGHT: brand color injected via --social-hover CSS variable, no JS hover handlers */}
            <div className="flex gap-1.5" role="list" aria-label="Social links">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label, hoverColor }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  role="listitem"
                  // ADAPT: 44px touch target
                  className="social-icon-link w-11 h-11 flex items-center justify-center rounded-xl border border-border transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  style={
                    {
                      color: 'var(--muted-foreground)',
                      '--social-hover': hoverColor,
                    } as React.CSSProperties
                  }
                >
                  <Icon size={15} aria-hidden={true} />
                </a>
              ))}
            </div>
          </div>

          {/* Copyright bar */}
          <div
            className="mt-8 pt-6"
            style={{
              borderTop:
                '1px solid color-mix(in oklch, var(--border) 60%, transparent)',
            }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <p className="font-sans text-xs text-muted-foreground">
                {tFooter('copyright', { year: new Date().getFullYear() })}
              </p>
              {/* Service badges — primary tone for visual cohesion */}
              <div className="flex items-center gap-2">
                {(['Plan-C', 'Plan-L', 'Plan-T'] as const).map((badge) => (
                  <span
                    key={badge}
                    className="font-sans text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-md"
                    style={{
                      color: 'var(--primary)',
                      background: 'color-mix(in oklch, var(--primary) 8%, transparent)',
                      border: '1px solid color-mix(in oklch, var(--primary) 15%, transparent)',
                    }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
