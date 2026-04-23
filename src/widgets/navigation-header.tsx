'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/features/landing/components/theme-toggle'
import { LocaleSwitcher } from '@/shared/ui/locale-switcher'

interface NavigationHeaderProps {
  onContact?: () => void
}

export function NavigationHeader({ onContact }: NavigationHeaderProps) {
  const t = useTranslations('nav')
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const menuRef = useRef<HTMLElement>(null)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on outside click
  useEffect(() => {
    if (!mobileOpen) return
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [mobileOpen])

  // Close menu on Escape
  useEffect(() => {
    if (!mobileOpen) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [mobileOpen])

  function closeMobile() {
    setMobileOpen(false)
  }

  return (
    <header
      ref={menuRef}
      className="sticky top-0 z-50 w-full transition-[border-color,background-color] duration-300"
      style={{
        background: 'color-mix(in oklch, var(--background) 85%, transparent)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: scrolled
          ? '1px solid color-mix(in oklch, var(--border) 60%, transparent)'
          : '1px solid transparent',
      }}
    >
      <nav
        className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4"
        aria-label={t('ariaLabel')}
      >
        {/* Brand — logo icon only */}
        <Link
          href="/"
          className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
        >
          <Image
            src="/logo-icon.png"
            alt="LifeCareLog"
            width={32}
            height={32}
            priority
            sizes="32px"
            className="w-8 h-8 rounded-[10px]"
          />
        </Link>

        {/* Nav links — hidden on mobile */}
        <div className="hidden sm:flex items-center gap-6 flex-1 justify-center">
          <Link
            href="/services"
            className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            {t('services')}
          </Link>
          <Link
            href="/pricing"
            className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            {t('pricing')}
          </Link>
          <Link
            href="/#philosophy"
            className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            {t('about')}
          </Link>
          {onContact && (
            <button
              onClick={onContact}
              type="button"
              className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
            >
              {t('contact')}
            </button>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <ThemeToggle />
          <LocaleSwitcher />

          {/* Hamburger — mobile only */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="sm:hidden w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
          >
            {mobileOpen ? (
              <X size={18} strokeWidth={2} aria-hidden="true" />
            ) : (
              <Menu size={18} strokeWidth={2} aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div
          id="mobile-nav-menu"
          role="menu"
          className="sm:hidden absolute top-full left-0 right-0 z-40 py-2"
          style={{
            background: 'color-mix(in oklch, var(--background) 95%, transparent)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderBottom: '1px solid color-mix(in oklch, var(--border) 60%, transparent)',
            boxShadow: '0 8px 24px color-mix(in oklch, var(--foreground) 6%, transparent)',
          }}
        >
          <Link
            href="/services"
            role="menuitem"
            onClick={closeMobile}
            className="flex px-5 py-3 font-sans text-sm text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors duration-200"
          >
            {t('services')}
          </Link>
          <Link
            href="/pricing"
            role="menuitem"
            onClick={closeMobile}
            className="flex px-5 py-3 font-sans text-sm text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors duration-200"
          >
            {t('pricing')}
          </Link>
          <Link
            href="/#philosophy"
            role="menuitem"
            onClick={closeMobile}
            className="flex px-5 py-3 font-sans text-sm text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors duration-200"
          >
            {t('about')}
          </Link>
          {onContact && (
            <button
              type="button"
              role="menuitem"
              onClick={() => { closeMobile(); onContact() }}
              className="w-full text-left flex px-5 py-3 font-sans text-sm text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors duration-200 cursor-pointer"
            >
              {t('contact')}
            </button>
          )}
        </div>
      )}
    </header>
  )
}
