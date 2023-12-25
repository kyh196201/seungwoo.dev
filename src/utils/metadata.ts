import { Metadata } from 'next'

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
  title: 'sam.dev',
  description: '승우의 개발 블로그, sam.dev',
  authors: [
    {
      name: 'sam',
      url: 'https://github.com/kyh196201',
    },
  ],
}

const isProd = process.env.NODE_ENV === 'production'
const WEB_URL = isProd ? 'https://sam-dev-eight.vercel.app' : `http://localhost:${process.env.PORT || 3000}`

const DEFAULT_IMAGE = `/main.png`

export default function createMetadata(props: MetadataProps): Metadata {
  const { title, description: desc, path, image, label1, label2 } = props
  const description = desc + ' | 승우의 개발 블로그, sam.dev'

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
      siteName: 'sam.dev',
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
