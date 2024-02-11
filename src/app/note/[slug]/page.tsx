import '@/app/styles/prose.css'
import createMetadata from '@/utils/metadata'
import { notFound } from 'next/navigation'
import postsService from '@/api/posts'
import PageLayout from '@/components/page-layout'
import TopButton from '@/app/posts/[slug]/components/top-button'
import { fetchNoteBySlug, notion } from '@/api/notion'
import { NotionToMarkdown } from 'notion-to-md'
import Markdown from '@/app/note/[slug]/components/Markdown'

type Props = {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = params
  const post = postsService.findPost(slug)

  if (!post) {
    return {}
  }

  const { title, description } = post

  return createMetadata({
    title,
    description,
    path: `/note/${slug}`,
  })
}

export default async function Page({ params: { slug } }: Props) {
  const note = await fetchNoteBySlug(slug)
  if (!note) {
    notFound()
  }

  const n2md = new NotionToMarkdown({ notionClient: notion })
  const mdBlocks = await n2md.pageToMarkdown(note.id)
  const mdString = n2md.toMarkdownString(mdBlocks)
  const markdownContents = mdString.parent as string

  return (
    <PageLayout>
      <div className={`prose border-b py-12`}>
        <Markdown markdown={markdownContents} />
      </div>

      <TopButton />
    </PageLayout>
  )
}
