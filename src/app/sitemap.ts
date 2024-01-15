import postsService from '@/api/posts'
import navLinks from '@/constants/navLinks'
import { MetadataRoute } from 'next'
import { CONFIG } from 'site.config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = postsService.getAllPostByDateDesc()
  const { siteUrl } = CONFIG

  const blogPosts: MetadataRoute.Sitemap =
    posts?.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date).toISOString(),
    })) ?? []

  const navRoutes = navLinks.map((nav) => nav.link)
  const routes: MetadataRoute.Sitemap = ['', ...navRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString(),
    priority: 0.7,
  }))

  return [...blogPosts, ...routes]
}
