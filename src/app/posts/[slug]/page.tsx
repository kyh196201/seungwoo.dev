import { notFound } from 'next/navigation'
import { Redis } from '@upstash/redis'
import { createPostPageMetadata } from '@/utils/metadata'
import postsService from '@/api/posts'
import PageLayout from '@/components/page-layout'
import PostDetail from '@/components/post-detail/post-detail'
import ViewReporter from '@/components/ViewReporter'

type Props = {
  params: {
    slug: string
  }
}

const redis = Redis.fromEnv()

export const revalidate = 60

export async function generateMetadata({ params }: Props) {
  const { slug } = params
  return createPostPageMetadata(slug)
}

export default async function PostPage({ params }: Props) {
  const { slug } = params
  const post = postsService.findPost(slug, 'post')
  if (!post) {
    notFound()
  }

  const views = (await redis.get<number>(['pageviews', 'blogs', slug].join(':'))) ?? 0

  return (
    <PageLayout>
      <ViewReporter slug={slug} />
      <PostDetail
        post={post}
        views={views}
      />
    </PageLayout>
  )
}
