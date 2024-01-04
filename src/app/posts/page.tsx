import { Metadata } from 'next'
import { DEFAULT_METADATA } from '@/utils/metadata'
import postsService from '@/api/posts'
import PostCard from '@/components/post-card'
import PageLayout from '@/components/page-layout'

export const metadata: Metadata = {
  ...DEFAULT_METADATA,
  description: '',
}

export default function Posts() {
  const posts = postsService.getAllPostByDateDesc()

  return (
    <PageLayout
      title="글 목록"
      description="공유하고 싶고, 기록하고 싶은 내용을 위한 공간입니다."
    >
      <div className={`mt-12`}>
        <ul className={`grid sm:grid-cols-2 gap-10 sm:gap-8`}>
          {posts.map((post) => (
            <li
              key={post._id}
              className={`animate-fadeInUp`}
            >
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </div>
    </PageLayout>
  )
}
