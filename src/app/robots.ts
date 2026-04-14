import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://lifecarelog.co.kr'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      // AI search bots — allow (drives traffic)
      {
        userAgent: ['PerplexityBot', 'OAI-SearchBot', 'ChatGPT-User', 'Google-Extended', 'YouBot', 'DuckAssistBot'],
        allow: '/',
        disallow: ['/api/'],
      },
      // Naver crawler
      {
        userAgent: ['Yeti', 'NaverBot'],
        allow: '/',
        disallow: ['/api/'],
      },
      // AI training bots — block (no traffic benefit)
      {
        userAgent: ['GPTBot', 'CCBot', 'anthropic-ai', 'Bytespider', 'cohere-ai'],
        disallow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
