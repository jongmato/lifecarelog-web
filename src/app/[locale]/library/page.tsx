import type { Metadata } from 'next'
import { LibraryIndexPage } from '@/features/library'

export const metadata: Metadata = {
  title: '자료실 — LifeCareLog',
  description: '라이프케어로그가 직접 써보고 효과가 있었던 프롬프트와 노하우를 무료로 정리한 자료실이에요.',
}

export default function LibraryPage() {
  return <LibraryIndexPage />
}
