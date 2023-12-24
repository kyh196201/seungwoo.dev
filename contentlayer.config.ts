import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode, { type Options as RehypePrettyCodeOptions } from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings, { Options as RehypeAutolinkHeadingsOptions } from 'rehype-autolink-headings'
import rehypeExternalLinks, { Options as RehypeExternalLinksOptions } from 'rehype-external-links'
import { readFileSync } from 'fs'
import { preProcess, postProcess } from './src/utils/rehype-pre-raw'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  contentType: 'mdx',
  filePathPattern: `**/*.mdx`,
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'string', required: true },
    description: { type: 'string', required: true },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace('.mdx', ''),
    },
  },
}))

const rehypePrettyCodeOptions: RehypePrettyCodeOptions = {
  theme: JSON.parse(readFileSync('./code_themes/atom-one-light.json', 'utf-8')),
  grid: true,
  keepBackground: true,
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

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [
      preProcess,
      rehypeSlug,
      [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
      [rehypeExternalLinks, rehypeExternalLinksOptions],
      [rehypePrettyCode, rehypePrettyCodeOptions],
      postProcess,
    ],
    remarkPlugins: [remarkGfm],
  },
})
