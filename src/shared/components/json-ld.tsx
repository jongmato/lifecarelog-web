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

// 운영 중 서비스 — Organization 이 owns 로 연결하고 각 서비스가 publisher 로 역참조.
// AI 가 '라이프케어로그 = 이 서비스들의 운영 주체'로 인식하도록 구조화(AEO).
// 개발 중인 플랜티는 배포 전이라 제외(운영 중 서비스만 사실대로 포함).
const SERVICES = [
  {
    name: '플랜씨(Plan-C)',
    url: 'https://plan-c.lifecarelog.co.kr',
    description:
      '대출 이자·퇴직금·연봉 실수령액 등 자주 쓰는 금융 계산을 광고 없이 제공하는 무료 계산기',
    category: 'FinanceApplication',
  },
  {
    name: '플랜엘(Plan-L)',
    url: 'https://plan-l.lifecarelog.co.kr',
    description:
      '국가법령정보센터·대법원 판례 등 공개 자료를 검색해 원문 출처와 함께 정리하는 법령·판례 검색 도구',
    category: 'ReferenceApplication',
  },
  {
    name: '플랜비(Plan-B)',
    url: 'https://plan-b.lifecarelog.co.kr',
    description: '농구 동호회의 경기 기록·멤버·회비·전술보드를 한 곳에서 관리하는 무료 운영 도구',
    category: 'SportsApplication',
  },
]

// 우산 브랜드 엔티티 — plan-c/l/b 가 publisher 로 참조하는 Organization.
// AI 검색엔진의 브랜드 entity 인식(AEO) 강화.
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'LifeCareLog',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  description: '삶에 필요한 서비스를 하나씩 만들어가는 1인 개발 브랜드',
  founder: { '@id': `${SITE_URL}/#person` },
  owns: SERVICES.map((service) => ({ '@id': `${service.url}/#app` })),
  sameAs: [
    'https://github.com/jongmato',
    'https://x.com/lifecarelog',
    'https://www.threads.com/@lifecarelog_official',
  ],
}

// 각 운영 서비스 WebApplication 노드 — publisher 로 Organization 역참조.
const serviceSchemas = SERVICES.map((service) => ({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  '@id': `${service.url}/#app`,
  name: service.name,
  url: service.url,
  description: service.description,
  applicationCategory: service.category,
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  publisher: { '@id': `${SITE_URL}/#organization` },
}))

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {serviceSchemas.map((schema) => (
        <script
          key={schema['@id']}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
