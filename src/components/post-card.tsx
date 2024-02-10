import Tag from '@/components/tag'
import { formatDate } from '@/utils/days'
import { getPostPath } from '@/utils/paths'
import { Post } from 'contentlayer/generated'
import Link from 'next/link'

type Props = {
  post: Post
  showTags?: boolean
}

const PostCard = ({ post, showTags = false }: Props) => {
  const { title, description, tags } = post
  const date = new Date(post.date)

  return (
    <>
      <Link
        href={getPostPath(post)}
        passHref
        className={`flex flex-col transition opacity-100 hover:opacity-80 focus:opacity-80`}
      >
        <h3 className={`text-2xl font-semibold mb-1 line-clamp-2 break-keep`}>{title}</h3>
        {!!description && <p className={`font-medium mb-2 line-clamp-2 break-keep`}>{description}</p>}
        <time className={`text-sm text-date`}>{formatDate(date, 'MMMM DD, YYYY')}</time>
      </Link>

      {/* tags */}
      {showTags && (
        <ul className={`flex flex-wrap gap-2 mt-2`}>
          {tags.map((tag) => (
            <li key={tag}>
              <Tag
                tag={tag}
                size={'xs'}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default PostCard
