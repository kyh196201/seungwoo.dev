import { Metadata } from 'next'
import { DEFAULT_METADATA } from '@/utils/metadata'
import postsService from '@/api/posts'
import PageLayout from '@/components/page-layout'
import PostCard from '@/components/post-card'

export const metadata: Metadata = {
  ...DEFAULT_METADATA,
  description: '',
}

export default function Posts() {
  const posts = postsService.getAllPostByDateDesc()

  return (
    <PageLayout
      title="노트"
      description="배운 내용을 정리합니다."
    >
      <div className={`mt-8`}>
        <ul className={`flex flex-col gap-8`}>
          {posts.map((post) => (
            <li
              key={post._id}
              className={`animate-fadeInUp`}
            >
              <PostCard
                post={post}
                showTags
              />
            </li>
          ))}
        </ul>
      </div>
    </PageLayout>
  )
}
