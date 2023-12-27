import Pre from './components/pre'
import '@/app/styles/prose.css'
import { formatDate } from '@/utils/days'
import createMetadata from '@/utils/metadata'
import { getTimeAgo } from '@/utils/time-ago'
import { Post, allPosts } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    slug: string
  }
}

const BlogPost = ({ post }: { post: Post }) => {
  const { title, tags = [] } = post
  const date = new Date(post.date)
  const MDXComponent = useMDXComponent(post.body.code)

  const mdxComponents = {
    pre: Pre,
  }

  return (
    <article>
      <div className={`mb-8`}>
        <h2 className={`text-3xl font-medium`}>{title}</h2>

        {/* date & time */}
        <span className={`block mt-2 text-gray-600 font-medium`}>
          {formatDate(date, 'MMMM DD, YYYY')} ({getTimeAgo(date)})
        </span>

        {/* tags */}
        {tags.length && (
          <ul className={`mt-4 flex`}>
            {tags.map((tag, index) => (
              <li
                key={`${tag}${index}`}
                className={`mr-2`}
              >
                <Link href={`/tags/${tag}`}>{tag}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* mdx */}
      <div className={`prose`}>
        <MDXComponent components={mdxComponents} />
      </div>
    </article>
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
    notFound()
  }

  return <BlogPost post={post} />
}
