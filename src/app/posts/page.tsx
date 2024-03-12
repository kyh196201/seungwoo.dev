import postsService from '@/api/posts'
import PageLayout from '@/components/page-layout'
import PostCardList from '@/components/post-card-list'
import createMetadata from '@/utils/metadata'

export async function generateMetadata() {
  return createMetadata({
    title: '글 목록',
    description: '공유하고 싶고, 기록하고 싶은 내용을 위한 공간입니다.',
    path: '/posts',
  })
}

export default function PostsPage() {
  const posts = postsService.getAllPostByDateDesc('post')

  return (
    <PageLayout
      title="글 목록"
      description="공유하고 싶고, 기록하고 싶은 내용을 위한 공간입니다."
    >
      <div className="mt-12">
        <PostCardList posts={posts} />
      </div>
    </PageLayout>
  )
}
