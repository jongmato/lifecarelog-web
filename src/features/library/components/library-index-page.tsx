import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BentoCard } from '@/features/landing/components/bento-card'

// ponytail: 자료 1건뿐이라 인라인 렌더. 2건+ 되면 목록 데이터를 배열로 뽑아 map.
export function LibraryIndexPage() {
  return (
    <main className="flex flex-1 flex-col px-4 sm:px-6 py-12 sm:py-16">
      <div className="w-full max-w-[880px] mx-auto">
        <div className="mb-10">
          <h1 className="font-sans text-3xl sm:text-4xl font-bold text-foreground mb-3">
            라이프케어로그 자료실
          </h1>
          <p className="font-sans text-base sm:text-lg text-muted-foreground max-w-xl">
            직접 써보고 효과가 있었던 프롬프트와 노하우를 정리해 무료로 나눠요. 필요한 자료를 받아가세요.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Link href="/library/blog-prompts-10" className="block group">
            <BentoCard hoverAccent="var(--primary)">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-sans text-lg font-semibold text-foreground mb-1.5 transition-colors group-hover:text-primary">
                    Claude 블로그 초안 프롬프트 10개 — 목적별 전문
                  </h2>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                    뼈대 잡기, 본문 채우기, 다듬기까지 목적별로 정리한 프롬프트 10개를 그대로 복사해서 쓸 수 있어요.
                  </p>
                </div>
                <ArrowRight
                  size={20}
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary"
                />
              </div>
            </BentoCard>
          </Link>
        </div>
      </div>
    </main>
  )
}
