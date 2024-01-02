import Pre from './components/pre'
import '@/app/styles/prose.css'
import { formatDate } from '@/utils/days'
import createMetadata from '@/utils/metadata'
import { getTimeAgo } from '@/utils/time-ago'
import { Post } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { notFound } from 'next/navigation'
import PostLink from './components/post-link'
import postsService from '@/api/posts'
import Tag from '@/components/tag'

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
      <header className={`mb-4`}>
        <h2 className={`text-3xl sm:text-4xl font-medium mb-2 break-keep`}>{title}</h2>

        {/* date & time */}
        <p className={`text-sm sm:text-base text-gray-600 font-medium`}>
          <time>
            {formatDate(date, 'MMMM DD, YYYY')} ({getTimeAgo(date)})
          </time>
        </p>

        {/* tags */}
        {tags.length > 0 && (
          <ul className={`mt-4 flex`}>
            {tags.map((tag, index) => (
              <li
                key={`${tag}${index}`}
                className={`mr-2`}
              >
                <Tag tag={tag} />
              </li>
            ))}
          </ul>
        )}
      </header>

      {/* mdx */}
      <div className={`prose border-b border-t py-12`}>
        <MDXComponent components={mdxComponents} />
      </div>

      <footer className={`flex items-center justify-between gap-2 mt-4 px-2 text-sm `}>
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
