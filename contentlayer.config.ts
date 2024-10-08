/* eslint-disable no-underscore-dangle */
import readingTime from 'reading-time'
import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode, { type Options as RehypePrettyCodeOptions } from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings, { Options as RehypeAutolinkHeadingsOptions } from 'rehype-autolink-headings'
import rehypeExternalLinks, { Options as RehypeExternalLinksOptions } from 'rehype-external-links'
import { readFileSync } from 'fs'
import GithubSlugger from 'github-slugger'
import { preProcess, postProcess } from './src/utils/rehype-pre-raw'

export type PostHeading = {
  level: number
  text: string
  slug: string
}

export const Post = defineDocumentType(() => ({
  name: 'Post',
  contentType: 'mdx',
  filePathPattern: `**/*.mdx`,
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'string', required: true },
    description: { type: 'string', default: '', required: false },
    tag: { type: 'string', default: '', required: false },
    tags: { type: 'list', default: [], of: { type: 'string' }, required: false },
    toc: { type: 'boolean', required: false, default: true },
  },
  computedFields: {
    path: {
      type: 'string',
      resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },

    postType: {
      type: 'enum',
      options: ['note', 'post'],
      resolve: (doc) => {
        const dir = doc._raw.flattenedPath.split('/')[0]
        return dir === 'notes' ? 'note' : 'post'
      },
    },

    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace('.mdx', ''),
    },

    headings: {
      // https://contentlayer.dev/docs/reference/source-files/field-types-defe41e9#list
      type: 'list',
      resolve: async (doc) => {
        const slugger = new GithubSlugger()
        const regXHeader = /\n(?<flag>#{1,3})\s+(?<content>.+)/g
        const headings = Array.from(doc.body.raw.matchAll(regXHeader)).map(({ groups }) => {
          const flag = groups?.flag
          const content = groups?.content
          return {
            level: flag?.length ?? 0,
            text: content,
            slug: content ? slugger.slug(content) : undefined,
          }
        })
        return headings as PostHeading[]
      },
    },

    readTimeMinutes: {
      type: 'string',
      resolve: (doc) => {
        return readingTime(doc.body.raw).text
      },
    },
  },
}))

const rehypePrettyCodeOptions: RehypePrettyCodeOptions = {
  theme: {
    light: JSON.parse(readFileSync('./code_themes/atom-one-light.json', 'utf-8')),
    dark: 'one-dark-pro',
  },
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
  contentDirPath: 'content',
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
