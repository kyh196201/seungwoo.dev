import { Metadata } from 'next'
import { DEFAULT_METADATA } from '@/utils/metadata'
import postsService from '@/api/posts'
import PageLayout from '@/components/page-layout'
import PostCardList from '@/components/post-card-list'

export const metadata: Metadata = {
  ...DEFAULT_METADATA,
  description: '',
}

export default function PostsPage() {
  const posts = postsService.getAllPostByDateDesc('post')

  return (
    <PageLayout
      title="글 목록"
      description="공유하고 싶고, 기록하고 싶은 내용을 위한 공간입니다."
    >
      <div className={`mt-12`}>
        <PostCardList posts={posts} />
      </div>
    </PageLayout>
  )
}
