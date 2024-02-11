import '@/app/styles/prose.css'
import createMetadata from '@/utils/metadata'
import { notFound } from 'next/navigation'
import postsService from '@/api/posts'
import PageLayout from '@/components/page-layout'
import TopButton from '@/app/posts/[slug]/components/top-button'
import { fetchNoteBySlug, notion } from '@/api/notion'
import { NotionToMarkdown } from 'notion-to-md'
import { mdToHtml } from '@/lib/markdown'

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

  // const blocks = await fetchNoteBlocks(note.id)
  const n2md = new NotionToMarkdown({ notionClient: notion })
  const mdBlocks = await n2md.pageToMarkdown(note.id)
  const mdString = n2md.toMarkdownString(mdBlocks)
  console.log(mdString.parent)
  const htmlString = await mdToHtml(mdString.parent as string)
  console.log('htmlString', htmlString)

  return (
    <PageLayout>
      <div className={`prose border-b py-12`}>
        <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
      </div>

      <TopButton />
    </PageLayout>
  )
}
