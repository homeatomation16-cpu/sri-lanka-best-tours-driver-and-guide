import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware({
  ...routing,

  // ✅ Auto language detection (browser language)
  localeDetection: true,
});

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - /api
     * - /_next (Next.js internals)
     * - /_vercel
     * - static files (e.g. .png, .jpg, .css, .js)
     */
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};