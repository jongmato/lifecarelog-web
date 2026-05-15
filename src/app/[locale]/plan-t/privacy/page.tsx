import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PRIVACY_POLICY_KO_MARKDOWN } from '@/content/legal/plan-t/ko/privacy-policy'
import { LegalDocument } from '@/features/legal/components/legal-document'
import { PLAN_T_LEGAL_META, getCanonicalUrl } from '@/features/legal/lib/plan-t-metadata'

type PageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  if (locale !== 'ko') return {}

  const canonical = getCanonicalUrl('privacy')

  return {
    title: `${PLAN_T_LEGAL_META.privacy.title} | LifeCareLog`,
    description: PLAN_T_LEGAL_META.privacy.description,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      url: canonical,
      title: PLAN_T_LEGAL_META.privacy.title,
      description: PLAN_T_LEGAL_META.privacy.description,
      siteName: 'LifeCareLog',
    },
    robots: { index: true, follow: true },
  }
}

export default async function PlanTPrivacyPage({ params }: PageProps) {
  const { locale } = await params
  // 현재는 한국어 본문만 제공. 영어는 번역 완료 후 추가.
  if (locale !== 'ko') notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: PLAN_T_LEGAL_META.privacy.title,
    description: PLAN_T_LEGAL_META.privacy.description,
    url: getCanonicalUrl('privacy'),
    inLanguage: 'ko-KR',
    datePublished: PLAN_T_LEGAL_META.effectiveDateIso,
    dateModified: PLAN_T_LEGAL_META.effectiveDateIso,
    isPartOf: {
      '@type': 'WebSite',
      name: 'LifeCareLog',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://lifecarelog.co.kr',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LegalDocument
        content={PRIVACY_POLICY_KO_MARKDOWN}
        title={PLAN_T_LEGAL_META.privacy.title}
        effectiveDate={PLAN_T_LEGAL_META.effectiveDate}
        version={PLAN_T_LEGAL_META.version}
      />
    </>
  )
}
