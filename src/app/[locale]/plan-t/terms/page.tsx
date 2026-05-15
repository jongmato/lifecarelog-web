import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { TERMS_OF_SERVICE_KO_MARKDOWN } from '@/content/legal/plan-t/ko/terms-of-service'
import { LegalDocument } from '@/features/legal/components/legal-document'
import { PLAN_T_LEGAL_META, getCanonicalUrl } from '@/features/legal/lib/plan-t-metadata'

type PageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  if (locale !== 'ko') return {}

  const canonical = getCanonicalUrl('terms')

  return {
    title: `${PLAN_T_LEGAL_META.terms.title} | LifeCareLog`,
    description: PLAN_T_LEGAL_META.terms.description,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      url: canonical,
      title: PLAN_T_LEGAL_META.terms.title,
      description: PLAN_T_LEGAL_META.terms.description,
      siteName: 'LifeCareLog',
    },
    robots: { index: true, follow: true },
  }
}

export default async function PlanTTermsPage({ params }: PageProps) {
  const { locale } = await params
  if (locale !== 'ko') notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: PLAN_T_LEGAL_META.terms.title,
    description: PLAN_T_LEGAL_META.terms.description,
    url: getCanonicalUrl('terms'),
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
        content={TERMS_OF_SERVICE_KO_MARKDOWN}
        title={PLAN_T_LEGAL_META.terms.title}
        effectiveDate={PLAN_T_LEGAL_META.effectiveDate}
        version={PLAN_T_LEGAL_META.version}
      />
    </>
  )
}
