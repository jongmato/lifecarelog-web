const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://lifecarelog.co.kr'

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'LifeCareLog',
  url: SITE_URL,
  description: '한 명이라도 필요로 하는 서비스를 만드는 1인 개발자 브랜드',
  jobTitle: 'Full-Stack Developer',
  sameAs: [
    'https://github.com/jongmato',
    'https://x.com/lifecarelog',
    'https://www.threads.com/@lifecarelog_official',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'LifeCareLog',
  url: SITE_URL,
  description: '삶을 돌보는 기록 — 삶에 필요한 서비스를 하나씩 만들어가요',
  inLanguage: ['ko', 'en'],
  creator: { '@id': `${SITE_URL}/#person` },
}

export function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}
