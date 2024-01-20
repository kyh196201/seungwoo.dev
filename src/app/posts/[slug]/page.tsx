import '@/app/styles/prose.css'
import createMetadata from '@/utils/metadata'
import { notFound } from 'next/navigation'
import postsService from '@/api/posts'
import PageLayout from '@/components/page-layout'
import TopButton from '@/app/posts/[slug]/components/top-button'
import BlogPost from './components/blog-post'

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

  const { title, description } = post

  return createMetadata({
    title,
    description,
    path: `/posts/${slug}`,
  })
}

export default function Page({ params: { slug } }: Props) {
  const post = postsService.findPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <PageLayout>
      <BlogPost post={post} />

      <TopButton />
    </PageLayout>
  )
}
