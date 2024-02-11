import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remark2rehype from 'remark-rehype'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeStringify from 'rehype-stringify'
import rehypeExternalLinks from 'rehype-external-links'
import { readFileSync } from 'fs'
import path from 'path'

export const parseMarkdown = unified()
  .use(remarkParse) // parse into markdown syntax tree
  .use(remarkGfm) // (autolink literals, footnotes, strikethrough, tables, tasklists).

export const mdTreeToHtml = unified()
  .use(remark2rehype) // convert to html syntax tree
  .use(rehypeSlug) // add ids to each head with the header name
  .use(rehypeAutolinkHeadings, {
    behavior: 'wrap',
    properties: {
      className: ['anchor'],
      ariaLabel: 'anchor',
    },
  }) // create a link on each header
  .use(rehypeExternalLinks, {
    rel: ['noopener', 'noreferrer'],
    target: '_blank',
    properties: {
      className: ['external-link'],
    },
  })
  .use(rehypePrettyCode, {
    theme: {
      light: JSON.parse(readFileSync(path.resolve(process.cwd(), 'code_themes/atom-one-light.json'), 'utf-8')),
      dark: 'one-dark-pro',
    },
    grid: true,
    keepBackground: true,
  }) // apply syntax highlighting to code
  .use(rehypeStringify) // turn html syntax tree to html

export const mdToHtml = async (markdown: string) => {
  const mdTree = parseMarkdown.parse(markdown)
  return mdTreeToHtml.stringify(await mdTreeToHtml.run(mdTree))
}
