import { MetadataRoute } from 'next'
import { CONFIG } from 'site.config'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: CONFIG.blog.title,
    short_name: CONFIG.blog.title,
    description: CONFIG.blog.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/images/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
