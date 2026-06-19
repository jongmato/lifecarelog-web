import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://lifecarelog.co.kr'

// 4계층 크롤러 정책 (plan-b 표준으로 통일):
//   1. AI 검색봇 — 공개 영역 allow + 가벼운 throttle (AI 발견·인용 채널)
//   2. AI 학습봇 — 공개 영역 allow + 비공개 차단 (브랜드 콘텐츠 LLM 인용 목적, SSOT §5)
//   3. 표준 검색엔진 — 공개 영역 allow
//   4. 그 외 봇 — 전면 deny

export default function robots(): MetadataRoute.Robots {
  const privateDisallow = ['/api/']

  return {
    rules: [
      // 1) AI 검색 응답봇 — allow + throttle
      {
        userAgent: [
          'OAI-SearchBot',
          'ChatGPT-User',
          'Claude-SearchBot',
          'Claude-User',
          'PerplexityBot',
          'Perplexity-User',
          'YouBot',
          'DuckAssistBot',
        ],
        allow: '/',
        disallow: privateDisallow,
        crawlDelay: 3,
      },
      // 2) AI 학습봇 — 공개만 allow, 비공개 차단
      {
        userAgent: [
          'GPTBot',
          'ClaudeBot',
          'Google-Extended',
          'Gemini-Deep-Research',
          'CCBot',
          'anthropic-ai',
          'Bytespider',
          'cohere-ai',
        ],
        allow: '/',
        disallow: privateDisallow,
        crawlDelay: 5,
      },
      // 3) 표준 검색엔진
      {
        userAgent: ['Googlebot', 'Bingbot', 'Yeti', 'NaverBot'],
        allow: '/',
        disallow: privateDisallow,
      },
      // 4) 그 외 — deny
      {
        userAgent: '*',
        disallow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
