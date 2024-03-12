import { PostTag } from '@/api/posts'
import Tag from '@/components/tag'

type Props = {
  tags: PostTag[]
}

function TagList({ tags }: Props) {
  return (
    <ul className="flex flex-wrap gap-2 sm:gap-4">
      {tags.map((tag) => (
        <li key={tag.title}>
          <Tag
            tag={tag.title}
            count={tag.count}
            size="sm"
            showCount
          />
        </li>
      ))}
    </ul>
  )
}

export default TagList
