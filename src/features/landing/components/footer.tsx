import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { GithubIcon, XIcon, LinkedinIcon } from './social-icons'

const SOCIAL_LINKS = [
  {
    icon: GithubIcon,
    href: 'https://github.com',
    label: 'GitHub',
  },
  {
    icon: XIcon,
    href: 'https://twitter.com',
    label: 'X (Twitter)',
  },
  {
    icon: LinkedinIcon,
    href: 'https://linkedin.com',
    label: 'LinkedIn',
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
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
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
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  role="listitem"
                  className="w-9 h-9 flex items-center justify-center rounded-xl border text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110 hover:-translate-y-0.5"
                  style={{
                    borderColor: 'var(--border)',
                    background: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.background =
                      'color-mix(in oklch, var(--primary) 8%, var(--muted))'
                    el.style.borderColor =
                      'color-mix(in oklch, var(--primary) 30%, var(--border))'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
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
