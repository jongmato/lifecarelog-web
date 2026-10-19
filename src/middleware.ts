import createMiddleware from 'next-intl/middleware'
import { NextResponse, type NextRequest } from 'next/server'
import { routing } from './i18n/routing'
import { wwwRedirectTarget } from './lib/www-redirect'

// OpenNext Cloudflare 1.19 requires edge middleware for Workers output.
// Next.js 16 proxy.ts currently runs as Node.js middleware and fails cf:build.
const intlMiddleware = createMiddleware(routing)

// ponytail: only paths in the matcher below redirect on www; static assets, api,
// robots/sitemap still answer on www. Move to a CF redirect rule if that matters.
export default function middleware(request: NextRequest) {
  const target = wwwRedirectTarget(new URL(request.url))
  if (target) return NextResponse.redirect(target, 308)
  return intlMiddleware(request)
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|llms.txt|.*\\.png$|.*\\.svg$|.*\\.ico$|.*\\.jpg$|.*\\.webp$).*)',
  ],
}
