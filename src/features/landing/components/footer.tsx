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

export function Footer() {
  const tFooter = useTranslations('footer')
  const tNav = useTranslations('nav')

  return (
    <footer className="w-full border-t border-border bg-muted/30 mt-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col gap-1">
            <span className="font-sans text-base font-semibold text-foreground">
              LifeCareLog
            </span>
            <span className="font-sans text-xs text-muted-foreground">
              {tFooter('brand')}
            </span>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex gap-4 flex-wrap">
              {[
                { href: '#', label: tNav('services') },
                { href: '#', label: tNav('about') },
                { href: '#contact', label: tNav('contact') },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social links */}
          <div className="flex gap-2" role="list" aria-label="Social links">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                role="listitem"
                className="w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
              >
                <Icon size={16} aria-hidden={true} />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="font-sans text-xs text-muted-foreground text-center sm:text-left">
            {tFooter('copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
