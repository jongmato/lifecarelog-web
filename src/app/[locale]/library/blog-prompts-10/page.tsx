import type { Metadata } from 'next'
import { BlogPrompts10Page } from '@/features/library'

export const metadata: Metadata = {
  title: 'Claude 블로그 초안 프롬프트 10개 — LifeCareLog 자료실',
  description: 'Claude로 블로그 초안을 빠르게 뽑는 프롬프트 10개를 목적별로 정리했어요. 그대로 복사해서 쓸 수 있어요.',
}

export default function BlogPrompts10Route() {
  return <BlogPrompts10Page />
}
