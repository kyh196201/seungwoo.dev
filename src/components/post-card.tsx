import { Post } from 'contentlayer/generated'
import Link from 'next/link'
import Tag from '@/components/tag'
import { formatDate } from '@/utils/days'
import { getPostPath } from '@/utils/paths'

type Props = {
  post: Post
  showTags?: boolean
}

function PostCard({ post, showTags = false }: Props) {
  const { title, description, tags } = post
  const date = new Date(post.date)

  return (
    <>
      <Link
        href={post.path}
        passHref
        className="flex flex-col opacity-100 transition hover:opacity-80 focus:opacity-80"
      >
        <h3 className="mb-1 line-clamp-2 break-keep text-2xl font-semibold">{title}</h3>
        {!!description && <p className="mb-2 line-clamp-2 break-keep font-medium">{description}</p>}
        <time className="text-sm text-date">{formatDate(date, 'MMMM DD, YYYY')}</time>
      </Link>

      {/* tags */}
      {showTags && (
        <ul className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag}>
              <Tag
                tag={tag}
                size="xs"
              />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default PostCard
