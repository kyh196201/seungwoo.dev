import { Metadata } from 'next'
import Link from 'next/link'
import { DEFAULT_METADATA } from '@/utils/metadata'
import postsService from '@/api/posts'
import { getPostPath } from '@/utils/paths'
import PostCard from '@/components/post-card'

export const metadata: Metadata = {
  ...DEFAULT_METADATA,
  description: '',
}

export default function Posts() {
  const posts = postsService.getAllPostByDateDesc()

  return (
    <>
      <div className={`mb-4`}>
        <h2 className={`text-3xl sm:text-4xl font-medium mb-2`}>글 목록</h2>
        <p className={`text-gray-600 font-medium`}>공유하고 싶고, 기록하고 싶은 내용을 위한 공간입니다.</p>
      </div>

      <div className={`border-b border-t py-12`}>
        <ul className={`grid sm:grid-cols-2 gap-10 sm:gap-8`}>
          {posts.map((post) => (
            <li key={post._id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
