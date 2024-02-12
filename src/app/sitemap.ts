import postsService from '@/api/posts'
import navLinks from '@/constants/navLinks'
import { MetadataRoute } from 'next'
import { CONFIG } from 'site.config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPosts = postsService.getAllPostByDateDesc('post')
  const { siteUrl } = CONFIG

  const posts: MetadataRoute.Sitemap =
    allPosts?.map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: new Date(post.date).toISOString(),
    })) ?? []

  // notes 페이지는 사이트맵에 포함되지 않음
  const navRoutes = navLinks.filter((nav) => nav.link !== '/notes').map((nav) => nav.link)
  const routes: MetadataRoute.Sitemap = ['', ...navRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString(),
    priority: 0.7,
  }))

  return [...posts, ...routes]
}
