import { Post } from 'contentlayer/generated'
import PostCard from '@/components/post-card'
import { cn } from '@/utils'

type Props = {
  posts: Post[]
  className?: string
}

function PostCardList({ posts, className }: Props) {
  return (
    <ul className={cn(`grid gap-10 sm:grid-cols-2 sm:gap-8`, className)}>
      {posts.map((post) => (
        <li
          key={post._id}
          className="animate-fadeInUp"
        >
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  )
}

export default PostCardList
