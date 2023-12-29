import Pre from './components/pre'
import '@/app/styles/prose.css'
import { formatDate } from '@/utils/days'
import createMetadata from '@/utils/metadata'
import { getTimeAgo } from '@/utils/time-ago'
import { Post } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PostLink from './components/post-link'
import postsService from '@/api/posts'

type Props = {
  params: {
    slug: string
  }
}

const BlogPost = ({ post }: { post: Post }) => {
  const { title, tags = [] } = post
  const date = new Date(post.date)

  const { nextPost, prevPost } = postsService.findNextAndPrevPost(post)

  const MDXComponent = useMDXComponent(post.body.code)

  const mdxComponents = {
    pre: Pre,
  }

  return (
    <article>
      <header className={`mb-8`}>
        <h2 className={`text-3xl font-medium`}>{title}</h2>

        {/* date & time */}
        <span className={`block mt-2 text-gray-600 font-medium`}>
          {formatDate(date, 'MMMM DD, YYYY')} ({getTimeAgo(date)})
        </span>

        {/* tags */}
        {tags.length > 0 && (
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
      </header>

      {/* mdx */}
      <div className={`prose`}>
        <MDXComponent components={mdxComponents} />
      </div>

      <footer className={`flex items-center justify-between gap-2 mt-12 py-4 px-2 border-t text-sm border-primary`}>
        {prevPost && <PostLink post={prevPost} />}

        {nextPost && (
          <PostLink
            isNext={true}
            post={nextPost}
          />
        )}
      </footer>
    </article>
  )
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
    path: `/posts/${slug}`,
  })
}

export default function Page({ params: { slug } }: Props) {
  const post = postsService.findPost(slug)

  if (!post) {
    notFound()
  }

  return <BlogPost post={post} />
}
