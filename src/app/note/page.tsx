import { Metadata } from 'next'
import { DEFAULT_METADATA } from '@/utils/metadata'
import PageLayout from '@/components/page-layout'
import { fetchNotes } from '@/api/notion'
import NoteCard from '@/app/note/components/note-card'

export const metadata: Metadata = {
  ...DEFAULT_METADATA,
  description: '',
}

export default async function NotePage() {
  const { notes } = await fetchNotes()

  return (
    <PageLayout
      title="노트"
      description="배운 내용을 기록합니다."
    >
      <div className={`mt-8`}>
        <ul className={`flex flex-col gap-8`}>
          {notes.map((note) => (
            <li
              key={note.id}
              className={`animate-fadeInUp`}
            >
              <NoteCard
                note={note}
                showTags
              />
            </li>
          ))}
        </ul>
      </div>
    </PageLayout>
  )
}
