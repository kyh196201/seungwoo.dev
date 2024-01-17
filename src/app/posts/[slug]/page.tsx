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
import PageLayout from '@/components/page-layout'
import TopButton from '@/app/posts/[slug]/components/top-button'
import Avatar from '@/app/posts/[slug]/components/avatar'
import { CONFIG } from 'site.config'
import './style.css'

type Heading = {
  level: number
  text: string
  slug: string
}

type Props = {
  params: {
    slug: string
  }
}

const BlogPost = ({ post }: { post: Post }) => {
  const { title, tags = [] } = post
  const headings = post.headings as Heading[]
  const date = new Date(post.date)

  const { nextPost, prevPost } = postsService.findNextAndPrevPost(post)

  const MDXComponent = useMDXComponent(post.body.code)

  const mdxComponents = {
    pre: Pre,
  }

  return (
    <article className="post">
      {/* TODO: 컴포넌트 */}
      {post.toc && (
        <div className="post-toc-wrapper">
          <div className="post-toc">
            <div className="post-toc-inner">
              <h3 className={`sr-only`}>목차</h3>
              <div>
                {headings.map((heading) => (
                  <div
                    key={`#${heading.slug}`}
                    className="post-toc-item"
                  >
                    <a
                      data-level={heading.level.toString()}
                      href={`#${heading.slug}`}
                    >
                      {heading.text}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <header className={`mb-4`}>
        <h2 className={`text-3xl md:text-4xl font-medium mb-2 break-keep`}>{title}</h2>

        {/* date & time */}
        <div className={`flex flex-col xs:flex-row xs:items-center`}>
          <div className={`flex items-center xs:after:content-['/'] xs:after:mx-1`}>
            <Avatar />
            <span className={`text-gray-600 text-sm font-medium`}>{CONFIG.profile.name}</span>
          </div>
          <p className={`text-sm text-gray-600 font-medium`}>
            <time>
              {formatDate(date, 'MMMM DD, YYYY')} ({getTimeAgo(date)})
            </time>
          </p>
        </div>

        {/* tags */}
        {tags.length > 0 && (
          <ul className={`mt-4 flex flex-wrap gap-2`}>
            {tags.map((tag, index) => (
              <li key={`${tag}${index}`}>
                <Tag tag={tag} />
              </li>
            ))}
          </ul>
        )}
      </header>

      {/* mdx */}
      <div className={`prose border-b py-12`}>
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

  return (
    <PageLayout>
      <BlogPost post={post} />

      <TopButton />
    </PageLayout>
  )
}
