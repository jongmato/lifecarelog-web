import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { BLOG_PROMPTS_10 } from '@/content/library/blog-prompts-10'
import { CopyPromptBlock } from './copy-prompt-block'
import { SubscribeForm } from './subscribe-form'

export function BlogPrompts10Page() {
  return (
    <main className="flex flex-1 flex-col px-4 sm:px-6 py-12 sm:py-16">
      <div className="w-full max-w-[720px] mx-auto">
        <Link
          href="/library"
          className="mb-6 inline-flex items-center gap-1.5 font-sans text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          자료실로 돌아가기
        </Link>

        <h1 className="font-sans text-3xl sm:text-4xl font-bold text-foreground mb-3">
          Claude 블로그 초안 프롬프트 10개
        </h1>
        <p className="font-sans text-base sm:text-lg text-muted-foreground leading-relaxed mb-10">
          목적별 전문 10개예요. 그대로 복사해서 Claude에게 붙여넣으면 돼요.
        </p>

        <div className="mb-12 flex flex-col gap-4">
          {BLOG_PROMPTS_10.map((item) => (
            <CopyPromptBlock key={item.title} {...item} />
          ))}
        </div>

        <div
          className="rounded-2xl p-6 shadow-card sm:p-8"
          style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
        >
          <h2 className="font-sans text-lg font-semibold text-foreground mb-1.5">
            다음 자료 소식 받기
          </h2>
          <p className="font-sans text-sm text-muted-foreground mb-5">
            새 리드마그넷이 나오면 이메일로 가장 먼저 알려드려요.
          </p>
          <SubscribeForm source="blog-prompts-10" />
        </div>
      </div>
    </main>
  )
}
