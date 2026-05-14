import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

// OpenNext Cloudflare 1.19 requires edge middleware for Workers output.
// Next.js 16 proxy.ts currently runs as Node.js middleware and fails cf:build.
export default createMiddleware(routing)

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|llms.txt|.*\\.png$|.*\\.svg$|.*\\.ico$|.*\\.jpg$|.*\\.webp$).*)',
  ],
}
