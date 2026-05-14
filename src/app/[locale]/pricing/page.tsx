import type { Metadata } from 'next'
import Link from 'next/link'

// Internal link component for hash navigation (/#contact)
function ContactLink({ className, children }: { className: string; children: React.ReactNode }) {
  return <Link href="/#contact" className={className}>{children}</Link>
}

export const metadata: Metadata = {
  title: '서비스 이용·제작 요금 안내 — LifeCareLog',
  description: 'LifeCareLog 서비스 이용 정보와 웹앱 제작 의뢰 기준',
}

const SAAS_PLANS = [
  {
    name: 'Plan-L',
    tagline: '법령·판례 정보 검색 도구',
    items: [
      { label: '무료 체험', price: '₩0', note: '계정당 3건 무료 검색' },
      { label: '유료 후보 기능', price: '관심 등록', note: '결제 기능은 아직 제공하지 않음' },
    ],
    href: 'https://plan-l.lifecarelog.co.kr',
    cta: '서비스 바로가기',
  },
  {
    name: 'Plan-C',
    tagline: '금융 계산기 & 플래너',
    items: [{ label: '무료', price: '₩0', note: '모든 기능 무료' }],
    href: 'https://plan-c.lifecarelog.co.kr',
    cta: '서비스 바로가기',
  },
  {
    name: 'Plan-T',
    tagline: '마음 건강 기록',
    items: [{ label: '준비 중', price: '-', note: '출시 예정' }],
    href: '#',
    cta: '출시 예정',
    disabled: true,
  },
]

const DEV_TIERS = [
  {
    name: 'Starter',
    price: '₩300만',
    description: '랜딩페이지',
    features: [
      '1페이지 반응형 랜딩',
      '기본 SEO 최적화',
      'Cloudflare Pages 배포',
      '소스코드 전체 인도',
      '납품 후 1개월 수정 지원',
    ],
    period: '약 2주',
    highlight: false,
  },
  {
    name: 'Standard',
    price: '₩800만',
    description: '웹사이트',
    features: [
      '5페이지 이내 반응형',
      '관리자 페이지 포함',
      '문의 폼 / 이메일 연동',
      'SEO + 애널리틱스 설정',
      '납품 후 2개월 수정 지원',
    ],
    period: '약 4주',
    highlight: true,
  },
  {
    name: 'Premium',
    price: '₩1,500만',
    description: '풀스택 웹 앱',
    features: [
      '회원 인증 / DB / API',
      '대시보드 + 관리자',
      '결제 연동',
      'CI/CD + 모니터링 설정',
      '납품 후 3개월 수정 지원',
    ],
    period: '약 8주',
    highlight: false,
  },
]

export default function PricingPage() {
  return (
    <main className="max-w-[960px] mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
        서비스 이용·제작 요금 안내
      </h1>
      <p className="text-muted-foreground mb-12">
        직접 운영하는 서비스 이용 정보와 웹앱 제작 의뢰 기준을 함께 정리했어요.
      </p>

      {/* SaaS Plans */}
      <h2 className="text-lg font-semibold text-foreground mb-5">
        만들고 있는 서비스
      </h2>
      <div className="grid gap-6 sm:grid-cols-3 mb-16">
        {SAAS_PLANS.map((plan) => (
          <div
            key={plan.name}
            className="rounded-xl border border-border p-6 flex flex-col"
          >
            <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-5">{plan.tagline}</p>

            <div className="space-y-3 flex-1">
              {plan.items.map((item) => (
                <div key={item.label} className="flex items-baseline justify-between">
                  <span className="text-sm text-foreground">{item.label}</span>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-foreground">{item.price}</span>
                    {item.note && (
                      <span className="block text-xs text-muted-foreground">{item.note}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <a
              href={plan.disabled ? undefined : plan.href}
              className={`mt-6 block text-center text-sm font-medium py-2.5 rounded-lg transition-colors ${
                plan.disabled
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'bg-foreground text-background hover:opacity-90'
              }`}
              aria-disabled={plan.disabled}
            >
              {plan.cta}
            </a>
          </div>
        ))}
      </div>

      {/* Web Development Service */}
      <h2 className="text-lg font-semibold text-foreground mb-2">
        웹 서비스 제작 의뢰
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        기획부터 배포까지, 원하는 서비스를 직접 만들어 드려요.
      </p>

      <div className="grid gap-6 sm:grid-cols-3 mb-8">
        {DEV_TIERS.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-xl p-6 flex flex-col ${
              tier.highlight
                ? 'border border-border shadow-md'
                : 'border border-border'
            }`}
          >
            {tier.highlight && (
              <span className="inline-block self-start text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-foreground text-background mb-3">
                추천
              </span>
            )}
            <h3 className="text-lg font-bold text-foreground">{tier.name}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{tier.description}</p>
            <p className="text-2xl font-bold text-foreground mt-4 mb-1">{tier.price}</p>
            <p className="text-xs text-muted-foreground mb-5">제작 기간 {tier.period}</p>

            <ul className="space-y-2 flex-1">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                  <span className="text-foreground/40 mt-0.5 shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <ContactLink
              className={`mt-6 block text-center text-sm font-medium py-2.5 rounded-lg transition-colors ${
                tier.highlight
                  ? 'bg-foreground text-background hover:opacity-90'
                  : 'border border-border text-foreground hover:bg-foreground/5'
              }`}
            >
              문의하기
            </ContactLink>
          </div>
        ))}
      </div>

      {/* Maintenance Add-on */}
      <div
        className="rounded-xl p-6 mb-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        style={{ background: 'var(--surface-low)' }}
      >
        <div>
          <h3 className="text-base font-semibold text-foreground">유지보수 구독</h3>
          <p className="text-sm text-muted-foreground mt-1">
            납품 후 지속적인 수정·개선이 필요하면 월 구독으로 이어갈 수 있어요.
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
            <li>✓ 월 8시간 작업</li>
            <li>✓ 긴급 핫픽스 월 4회</li>
            <li>✓ 초과 시 시간당 ₩6만</li>
          </ul>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xl font-bold text-foreground">₩50만<span className="text-sm font-normal text-muted-foreground">/월</span></p>
          <ContactLink
            className="inline-block mt-2 text-sm text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground transition-colors"
          >
            문의하기
          </ContactLink>
        </div>
      </div>

      {/* Process */}
      <div className="mb-16">
        <h2 className="text-lg font-semibold text-foreground mb-5">진행 절차</h2>
        <div className="grid gap-4 sm:grid-cols-5">
          {[
            { step: '01', label: '문의', desc: '요구사항 공유' },
            { step: '02', label: '미팅', desc: '범위·일정 협의' },
            { step: '03', label: '착수금', desc: '50% 선결제' },
            { step: '04', label: '제작', desc: '중간 리뷰 포함' },
            { step: '05', label: '납품', desc: '잔금 + 소스 인도' },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <span className="text-xs font-bold text-muted-foreground">{item.step}</span>
              <p className="text-sm font-semibold text-foreground mt-1">{item.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mb-16">
        <h2 className="text-lg font-semibold text-foreground mb-3">기술 스택</h2>
        <div className="flex flex-wrap gap-2">
          {['Next.js', 'React', 'React Native', 'Expo', 'TypeScript', 'TailwindCSS', 'NestJS', 'FastAPI', 'Supabase', 'Cloudflare'].map((tech) => (
            <span
              key={tech}
              className="text-xs font-medium px-2.5 py-1 rounded-md"
              style={{
                background: 'color-mix(in oklch, var(--foreground) 5%, transparent)',
                color: 'var(--foreground)',
                border: '1px solid color-mix(in oklch, var(--foreground) 10%, transparent)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Policy */}
      <div className="pt-8 border-t border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">이용 및 계약 안내</h2>
        <div className="space-y-2 text-sm text-foreground/80">
          <p>• <strong>Plan-L:</strong> 현재 무료 체험과 유료 기능 관심 등록만 제공하며, 결제 기능은 운영하지 않습니다.</p>
          <p>• <strong>웹 개발 프로젝트:</strong> 착수 전 100% 환불. 착수 후 진행 비율에 따라 부분 환불.</p>
          <p>• <strong>유지보수 구독:</strong> 해지 시 현재 결제 기간까지 서비스 제공. 미사용 시간 환불 불가.</p>
          <p>• 제작/유지보수 계약 문의: support@lifecarelog.co.kr</p>
        </div>
      </div>
    </main>
  )
}
