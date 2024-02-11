import { Note } from '@/api/notion'
import Tag from '@/components/tag'
import { formatDate } from '@/utils/days'
import { getNotePath } from '@/utils/paths'
import Link from 'next/link'

type Props = {
  note: Note
  showTags?: boolean
}

// TODO: PostCard랑 동일한 부분 리팩토링 필요
const NoteCard = ({ note, showTags = false }: Props) => {
  const { title, description, tags } = note
  const date = new Date(note.date)

  return (
    <>
      <Link
        href={getNotePath(note)}
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

export default NoteCard
