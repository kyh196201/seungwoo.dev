import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Props = {
  tag: string
  count?: number
}

const Tag = ({ tag, count }: Props) => {
  const hasCount = count !== undefined

  return (
    <Button
      asChild
      variant={'outline'}
      size={'sm'}
      className={`before:content-['#'] text-sm`}
    >
      <Link href={`/tags/${tag}`}>
        <span className={`ml-1`}>{tag}</span>
        {hasCount && <span className={`ml-1`}>({count})</span>}
      </Link>
    </Button>
  )
}

export default Tag
