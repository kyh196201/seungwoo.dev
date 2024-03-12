import { notFound } from 'next/navigation'
import { createPostPageMetadata } from '@/utils/metadata'
import postsService from '@/api/posts'
import PageLayout from '@/components/page-layout'
import PostDetail from '@/components/post-detail/post-detail'

type Props = {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = params
  return createPostPageMetadata(slug)
}

export default function PostPage({ params }: Props) {
  const { slug } = params
  const post = postsService.findPost(slug, 'post')
  if (!post) {
    notFound()
  }

  return (
    <PageLayout>
      <PostDetail post={post} />
    </PageLayout>
  )
}
