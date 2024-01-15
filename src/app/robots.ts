import { MetadataRoute } from 'next'
import { CONFIG } from 'site.config'

export default function robots(): MetadataRoute.Robots {
  const { siteUrl } = CONFIG

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },

    host: siteUrl,

    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
