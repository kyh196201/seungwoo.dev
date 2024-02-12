import createMetadata from '@/utils/metadata'
import { notFound } from 'next/navigation'
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
  const post = postsService.findPost(slug)

  if (!post) {
    return {}
  }

  const { title, description, path } = post
  return createMetadata({
    title,
    description,
    path,
  })
}

export default function NotePage({ params }: Props) {
  const { slug } = params
  const post = postsService.findPost(slug, 'note')
  if (!post) {
    notFound()
  }

  return (
    <PageLayout>
      <PostDetail post={post} />
    </PageLayout>
  )
}