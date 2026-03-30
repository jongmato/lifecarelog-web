import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

// next-intl locale routing handler (Next.js 16: proxy.ts replaces middleware.ts)
const intlMiddleware = createMiddleware(routing)

export function proxy(request: Parameters<typeof intlMiddleware>[0]) {
  return intlMiddleware(request)
}

export const config = {
  matcher: [
    // Match all paths except static files, images, api routes
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
