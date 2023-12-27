import Pre from './components/pre'
import '@/app/styles/prose.css'
import createMetadata from '@/utils/metadata'
import { Post, allPosts } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    slug: string
  }
}

const Markdown = ({ body }: { body: string }) => {
  const MDXComponent = useMDXComponent(body)

  const mdxComponents = {
    pre: Pre,
  }

  return (
    <article className={`prose`}>
      <MDXComponent components={mdxComponents} />
    </article>
  )
}

const BlogPost = ({ post }: { post: Post }) => {
  const { title, date, tags = [] } = post

  return (
    <div>
      <h2>{title}</h2>
      <span>{date}</span>
      {tags.length && (
        <ul>
          {tags.map((tag, index) => (
            <li key={`${tag}${index}`}>
              <Link href={`/tags/${tag}`}>{tag}</Link>
            </li>
          ))}
        </ul>
      )}

      {/* mdx */}
      <Markdown body={post.body.code} />
    </div>
  )
}

const findPost = (slug: string): Post | undefined => allPosts.find((p) => p.slug === slug)

export async function generateMetadata({ params }: Props) {
  const { slug } = params
  const post = findPost(slug)

  if (!post) {
    return {}
  }

  const { title, description } = post

  return createMetadata({
    title,
    description,
    path: `/posts/${slug}`,
  })
}

export default function Page({ params: { slug } }: Props) {
  const post = findPost(slug)

  if (!post) {
    return notFound()
  }

  return <BlogPost post={post} />
}
