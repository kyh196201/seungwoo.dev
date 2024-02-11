import ReactMarkdown from 'react-markdown'
import rehypeAutolinkHeadings, { Options as RehypeAutolinkHeadingsOptions } from 'rehype-autolink-headings'
import rehypeExternalLinks, { Options as RehypeExternalLinksOptions } from 'rehype-external-links'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

type Props = {
  markdown: string
}

const rehypeAutolinkHeadingsOptions: RehypeAutolinkHeadingsOptions = {
  behavior: 'wrap', // https://github.com/rehypejs/rehype-autolink-headings?tab=readme-ov-file#behavior
  properties: {
    className: ['anchor'],
    ariaLabel: 'anchor',
  },
}

const rehypeExternalLinksOptions: RehypeExternalLinksOptions = {
  rel: ['noopener', 'noreferrer'],
  target: '_blank',
  properties: {
    className: ['external-link'],
  },
}

const Markdown = ({ markdown }: Props) => {
  return (
    <>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
          [rehypeExternalLinks, rehypeExternalLinksOptions],
        ]}
        components={{}}
      >
        {markdown}
      </ReactMarkdown>
    </>
  )
}

export default Markdown
