import { PostTag } from '@/api/posts'
import { Button, type ButtonProps } from '@/components/ui/button'
import Link from 'next/link'

type TagSize = Exclude<Required<ButtonProps>['size'], 'icon' | null>

type Props = {
  tag: PostTag['title']
  count?: PostTag['count']
  showCount?: boolean
  size?: TagSize
}

const Tag = ({ tag, count, showCount = false, size = 'sm' }: Props) => {
  const hasCount = count !== undefined

  return (
    <Button
      asChild
      variant={'outline'}
      size={size}
      className={`before:content-['#']`}
    >
      <Link href={`/tags/${tag}`}>
        <span>{tag}</span>
        {showCount && hasCount && <span className={`ml-1`}>({count})</span>}
      </Link>
    </Button>
  )
}

export default Tag
