import { Post } from 'contentlayer/generated'
import Link from 'next/link'
import { cn } from '@/utils'
import { getPostPath } from '@/utils/paths'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'

type Props = {
  isNext?: boolean
  post: Post
}

const PostLink = ({ isNext = false, post }: Props) => {
  const { title, slug } = post
  const path = getPostPath(post)

  return (
    <Link
      href={path}
      className={cn(
        `flex flex-col max-w-1/2 transition opacity-70 hover:opacity-100`,
        isNext ? 'ml-auto items-end' : ''
      )}
    >
      <div className={`flex items-center mb-1`}>
        {isNext ? (
          <>
            <span className={`mr-1`}>다음 글</span>
            <ArrowRightIcon />
          </>
        ) : (
          <>
            <ArrowLeftIcon />
            <span className={`ml-1`}>이전 글</span>
          </>
        )}
      </div>

      <strong className={cn(`font-medium break-all`, isNext ? 'text-right' : '')}>{title}</strong>
    </Link>
  )
}

export default PostLink
