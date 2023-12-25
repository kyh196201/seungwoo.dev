import { Metadata } from 'next'
import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'
import { DEFAULT_METADATA } from '@/utils/metadata'

export const metadata: Metadata = {
  ...DEFAULT_METADATA,
  description: '',
}

export default function Posts() {
  return (
    <div>
      <ul>
        {allPosts.map((post) => (
          <li key={post._id}>
            <Link
              href={`/post/${post.slug}`}
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
