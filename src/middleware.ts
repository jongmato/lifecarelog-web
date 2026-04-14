import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

// Cloudflare Workers 배포 호환을 위해 middleware.ts 유지
// OpenNext Issue #962: proxy.ts 아직 미지원 (2026-04 기준)
// proxy.ts가 지원되면 전환 예정
export default createMiddleware(routing)

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|llms.txt|.*\\.png$|.*\\.svg$|.*\\.ico$|.*\\.jpg$|.*\\.webp$).*)',
  ],
}
