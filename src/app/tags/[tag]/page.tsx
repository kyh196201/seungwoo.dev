import postsService, { PostTag } from '@/api/posts'
import PageLayout from '@/components/page-layout'
import PostCardList from '@/components/post-card-list'
import createMetadata from '@/utils/metadata'

type Props = {
  params: { tag: PostTag['title'] }
}

export async function generateMetadata({ params }: Props) {
  const { tag } = params

  return createMetadata({
    title: tag,
    description: `${tag}가 태그된 포스트 목록을 보여줍니다.`,
    path: `/tags/${tag}`,
  })
}

export default function Page({ params: { tag } }: Props) {
  const posts = postsService.findPostsByTag(tag)
  const title = `# ${tag.charAt(0).toUpperCase() + tag.slice(1)}`

  return (
    <PageLayout title={title}>
      <div className={`mt-12`}>
        <PostCardList posts={posts} />
      </div>
    </PageLayout>
  )
}
