import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import localFont from 'next/font/local'
import { DM_Serif_Display } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Providers } from '@/app/providers'
import { JsonLd } from '@/shared/components/json-ld'
import { routing } from '@/i18n/routing'
import '@/app/globals.css'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://lifecarelog.co.kr'

const pretendard = localFont({
  src: '../../fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  weight: '100 900',
})

const dmSerifDisplay = DM_Serif_Display({
  variable: '--font-dm-serif',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

// Gmarket Sans — CDN으로 로드 (Google Fonts에 없음)
// globals.css에서 @font-face로 로드

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })

  return {
    metadataBase: new URL(SITE_URL),
    title: t('title'),
    description: t('description'),
    keywords: ['LifeCareLog', '라이프케어로그', '1인 개발', '솔로 개발자', 'Plan-C', 'Plan-L', 'Plan-T', '플랜씨', '플랜엘', '플랜티', '계산기', '법률 검색', '마음 건강'],
    authors: [{ name: 'LifeCareLog' }],
    creator: 'LifeCareLog',
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: SITE_URL,
      siteName: 'LifeCareLog',
      type: 'website',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'LifeCareLog — 삶을 돌보는 기록',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/og-image.png'],
      creator: '@lifecarelog',
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: SITE_URL,
      languages: {
        'ko-KR': `${SITE_URL}/ko`,
        'en-US': `${SITE_URL}/en`,
      },
    },
    verification: {
      google: 'jecVvBAGE3LJ4rFZEty0Tc0HZ93BFUxlGJ2-QIZBvPw',
      other: {
        'naver-site-verification': '73f2a7bcbeac4e4c8bd9142f6b65988b396288e8',
      },
    },
    other: {
      'content-language': locale,
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params

  // Validate locale
  if (!routing.locales.includes(locale as 'ko' | 'en')) {
    notFound()
  }

  // Provide all messages to the client
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={`${pretendard.variable} ${dmSerifDisplay.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased" suppressHydrationWarning>
        {/* Skip navigation for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none"
        >
          {locale === 'ko' ? '본문으로 바로가기' : 'Skip to main content'}
        </a>
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
        <JsonLd />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  )
}
