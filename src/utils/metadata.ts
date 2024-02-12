import { Metadata } from 'next'
import { CONFIG } from '../../site.config'
import postsService from '@/api/posts'

interface MetadataProps {
  title: string
  description: string
  path: string
  image?: string
  label1?: {
    name: string
    data: string | number
  }
  label2?: {
    name: string
    data: string | number
  }
}

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#basic-fields
export const DEFAULT_METADATA: Metadata = {
  generator: 'Next.js',
  title: CONFIG.blog.title,
  description: CONFIG.blog.description,
  authors: [
    {
      name: CONFIG.profile.name,
      url: `https://github.com/${CONFIG.profile.github}`,
    },
  ],
  verification: {
    google: CONFIG.googleSearchConsole.config.siteVerification,
  },
}

const isProd = process.env.NODE_ENV === 'production'
const WEB_URL = isProd ? CONFIG.siteUrl : `http://localhost:${process.env.PORT || 3000}`

const DEFAULT_IMAGE = `/main.png`

export default function createMetadata(props: MetadataProps): Metadata {
  const { title, description: desc, path, image, label1, label2 } = props
  const description = desc + ` | ${CONFIG.blog.description}`

  const images = `${WEB_URL}${image ?? DEFAULT_IMAGE}`

  return {
    ...DEFAULT_METADATA,
    metadataBase: new URL(WEB_URL),
    title,
    description,
    openGraph: {
      title,
      description,
      url: path,
      siteName: CONFIG.blog.title,
      images,
      locale: 'ko_KR',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
    other: {
      ['twitter:label1']: label1?.name ?? '',
      ['twitter:data1']: label1?.data ?? '',
      ['twitter:label2']: label2?.name ?? '',
      ['twitter:data2']: label2?.data ?? '',
    },
  }
}

export function createPostPageMetadata(slug: string) {
  const post = postsService.findPost(slug)
  if (!post) {
    return {}
  }

  const { title, description, path } = post

  return createMetadata({
    title,
    description,
    path,
  })
}
