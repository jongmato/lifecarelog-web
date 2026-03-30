'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

export function LocaleSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  function handleSwitch(nextLocale: string) {
    router.replace(pathname, { locale: nextLocale })
  }

  return (
    <div
      className="flex items-center gap-0.5 rounded-lg border border-border p-0.5"
      role="group"
      aria-label="언어 선택"
    >
      {(['ko', 'en'] as const).map((loc) => (
        <button
          key={loc}
          onClick={() => handleSwitch(loc)}
          className={cn(
            'min-h-[36px] min-w-[36px] px-2.5 py-1 rounded-md',
            'font-sans text-xs font-medium transition-colors duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            locale === loc
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          )}
          aria-pressed={locale === loc}
          aria-label={loc === 'ko' ? '한국어' : 'English'}
          type="button"
        >
          {loc === 'ko' ? '한' : 'EN'}
        </button>
      ))}
    </div>
  )
}
