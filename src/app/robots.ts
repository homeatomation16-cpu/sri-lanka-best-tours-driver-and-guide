import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.srilankabesttourdriverandguide.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'], // Admin සහ API routes index වීම වැලැක්වීම
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}