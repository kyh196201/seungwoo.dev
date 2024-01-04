import PostCard from '@/components/post-card'
import { cn } from '@/utils'
import { Post } from 'contentlayer/generated'

type Props = {
  posts: Post[]
  className?: string
}

const PostCardList = ({ posts, className }: Props) => {
  return (
    <ul className={cn(`grid sm:grid-cols-2 gap-10 sm:gap-8`, className)}>
      {posts.map((post) => (
        <li
          key={post._id}
          className={`animate-fadeInUp`}
        >
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  )
}

export default PostCardList
