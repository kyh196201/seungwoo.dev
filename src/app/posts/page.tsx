import { Metadata } from 'next'
import Link from 'next/link'
import { DEFAULT_METADATA } from '@/utils/metadata'
import postsService from '@/api/posts'
import { getPostPath } from '@/utils/paths'

export const metadata: Metadata = {
  ...DEFAULT_METADATA,
  description: '',
}

export default function Posts() {
  const posts = postsService.getAllPostByDateDesc()

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <Link
              href={getPostPath(post)}
              passHref
              className={`flex flex-col`}
            >
              <strong>{post.title}</strong>
              <span>slug: {post.slug}</span>
              <span>path: {post._raw.flattenedPath}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
