import { PostTag } from '@/api/posts'
import Tag from '@/components/tag'

type Props = {
  tags: PostTag[]
}

const TagList = ({ tags }: Props) => {
  return (
    <ul className={`flex flex-wrap gap-2 sm:gap-4`}>
      {tags.map((tag, index) => (
        <li key={tag.title}>
          <Tag
            tag={tag.title}
            count={tag.count}
            size={'lg'}
            showCount
          />
        </li>
      ))}
    </ul>
  )
}

export default TagList
