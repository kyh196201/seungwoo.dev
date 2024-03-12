import { Post } from 'contentlayer/generated'
import Link from 'next/link'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import { cn } from '@/utils'
import { getPostPath } from '@/utils/paths'

type Props = {
  isNext?: boolean
  post: Post
}

function PostLink({ isNext = false, post }: Props) {
  const { title } = post
  const path = getPostPath(post)

  return (
    <Link
      href={path}
      className={cn(
        `flex max-w-1/2 flex-col opacity-80 transition hover:opacity-100 focus:opacity-100`,
        isNext ? 'ml-auto items-end' : ''
      )}
    >
      <div className="mb-1 flex items-center">
        {isNext ? (
          <>
            <span className="mr-1">다음 글</span>
            <ArrowRightIcon />
          </>
        ) : (
          <>
            <ArrowLeftIcon />
            <span className="ml-1">이전 글</span>
          </>
        )}
      </div>

      <strong className={cn(`keep-all line-clamp-2 text-sm font-medium sm:text-base`, isNext ? 'text-right' : '')}>
        {title}
      </strong>
    </Link>
  )
}

export default PostLink
