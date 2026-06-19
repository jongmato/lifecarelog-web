import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Providers } from '@/app/providers'
import { PageShell } from '@/widgets/page-shell'
import { AnalyticsConsent } from '@/shared/components/analytics-consent'
import { JsonLd } from '@/shared/components/json-ld'
import { routing } from '@/i18n/routing'
import '@/app/globals.css'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://lifecarelog.co.kr'

// Bing 소유권 인증 코드. Bing Webmaster Tools에서 발급받은 값을 채우면 자동으로
// msvalidate.01 메타태그가 출력된다. GSC import 시 메타 불필요(비워둠 가능).
// (google/naver 값은 아래 generateMetadata verification 에 이미 배선됨)
const BING_SITE_VERIFICATION = ''

// naver/bing 메타 — 값이 있는 항목만 포함 (Record 타입으로 우회: inline 객체에
// 조건부 spread 시 Next 인덱스 시그니처가 undefined를 거부함)
const verificationOther: Record<string, string> = {
  'naver-site-verification': '73f2a7bcbeac4e4c8bd9142f6b65988b396288e8',
}
if (BING_SITE_VERIFICATION) {
  verificationOther['msvalidate.01'] = BING_SITE_VERIFICATION
}

// Pretendard — CDN dynamic subset로 로드 (2.1MB → ~200KB)
// globals.css에서 @import로 로드, CSS variable은 @theme에서 fallback 처리

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
    keywords: ['LifeCareLog', '라이프케어로그', '1인 개발', '솔로 개발자', 'Plan-C', 'Plan-L', 'Plan-T', '플랜씨', '플랜엘', '플랜티', '계산기', '법령 판례 검색', '마음 기록'],
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
    // 구글 소유권은 GSC 도메인 속성(sc-domain:lifecarelog.co.kr, CF 공급업체 자동확인)이
    // 커버 → 구글 메타 불필요. 네이버는 사이트별이라 other에 유지.
    verification: {
      other: verificationOther,
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
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to Pretendard CDN to reduce font load latency */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        {/* Speculation Rules — prerender /services and /pricing for instant navigation */}
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prerender: [{ where: { href_matches: '/*/services|/*/pricing' } }],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased" suppressHydrationWarning>
        {/* Skip navigation for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none"
        >
          {locale === 'ko' ? '본문으로 바로가기' : 'Skip to main content'}
        </a>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <PageShell>{children}</PageShell>
          </Providers>
        </NextIntlClientProvider>
        <JsonLd />
        <AnalyticsConsent
          gaId={process.env.NEXT_PUBLIC_GA_ID}
          clarityId={process.env.NEXT_PUBLIC_CLARITY_ID}
          locale={locale}
        />
      </body>
    </html>
  )
}
