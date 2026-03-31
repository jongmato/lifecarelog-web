import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { GithubIcon, XIcon, LinkedinIcon } from './social-icons'

// DELIGHT: each icon has its own brand color revealed on hover
const SOCIAL_LINKS = [
  {
    icon: GithubIcon,
    href: 'https://github.com',
    label: 'GitHub',
    hoverColor: 'oklch(0.20 0.01 250)',
    hoverBg: 'color-mix(in oklch, oklch(0.20 0.01 250) 8%, var(--muted))',
  },
  {
    icon: XIcon,
    href: 'https://twitter.com',
    label: 'X (Twitter)',
    hoverColor: 'oklch(0.20 0 0)',
    hoverBg: 'color-mix(in oklch, oklch(0.20 0 0) 6%, var(--muted))',
  },
  {
    icon: LinkedinIcon,
    href: 'https://linkedin.com',
    label: 'LinkedIn',
    hoverColor: 'oklch(0.47 0.12 237)',
    hoverBg: 'color-mix(in oklch, oklch(0.47 0.12 237) 10%, var(--muted))',
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
        style={{
          background:
            'linear-gradient(180deg, color-mix(in oklch, var(--muted) 60%, transparent) 0%, transparent 100%)',
        }}
      >
        {/* ADAPT: improved mobile layout — stacked on mobile, row on sm+ */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6">
            {/* Brand mark */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                {/* Logotype — pill with gradient */}
                <span
                  className="font-sans text-sm font-bold px-2.5 py-1 rounded-lg"
                  style={{
                    background:
                      'linear-gradient(135deg, color-mix(in oklch, var(--primary) 15%, var(--muted)), color-mix(in oklch, var(--accent) 10%, var(--muted)))',
                    color: 'var(--foreground)',
                    border: '1px solid color-mix(in oklch, var(--primary) 20%, var(--border))',
                  }}
                >
                  LifeCareLog
                </span>
              </div>
              <span className="font-sans text-xs text-muted-foreground pl-0.5">
                {tFooter('brand')}
              </span>
            </div>

            {/* Nav links */}
            <nav aria-label="Footer navigation">
              <ul className="flex gap-5 flex-wrap">
                <li>
                  <Link
                    href="#"
                    className="font-sans text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-4 decoration-primary/40 transition-colors duration-200"
                  >
                    {tNav('services')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
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
            <div className="flex gap-1.5" role="list" aria-label="Social links">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label, hoverColor, hoverBg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  role="listitem"
                  // ADAPT: 44px touch target
                  // DELIGHT: each icon reveals its own brand color
                  className="w-11 h-11 flex items-center justify-center rounded-xl border transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  style={{
                    borderColor: 'var(--border)',
                    background: 'transparent',
                    color: 'var(--muted-foreground)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.color = hoverColor
                    el.style.background = hoverBg
                    el.style.borderColor = `color-mix(in oklch, ${hoverColor} 30%, var(--border))`
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.color = 'var(--muted-foreground)'
                    el.style.background = 'transparent'
                    el.style.borderColor = 'var(--border)'
                  }}
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
                {tFooter('copyright')}
              </p>
              {/* Service badges */}
              <div className="flex items-center gap-3">
                {(['plan-c', 'plan-l', 'plan-t'] as const).map((plan) => (
                  <span
                    key={plan}
                    className="font-sans text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-md"
                    style={{
                      color: `var(--${plan})`,
                      background: `color-mix(in oklch, var(--${plan}) 8%, transparent)`,
                    }}
                  >
                    {plan === 'plan-c' ? 'Plan-C' : plan === 'plan-l' ? 'Plan-L' : 'Plan-T'}
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
