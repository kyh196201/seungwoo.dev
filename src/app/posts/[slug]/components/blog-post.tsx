'use client'

import postsService from '@/api/posts'
import Pre from './pre'
import { PostHeading as Heading } from 'contentlayer.config'
import { Post } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Toc from './toc'
import Avatar from './avatar'
import { formatDate } from '@/utils/days'
import Tag from '@/components/tag'
import PostLink from './post-link'
import { CONFIG } from 'site.config'
import { getTimeAgo } from '@/utils/time-ago'
import { useEffect, useState } from 'react'

type Props = {
  post: Post
}

const BlogPost = ({ post }: Props) => {
  const { title, tags = [] } = post
  const headings = post.headings as Heading[]
  // TODO: publishedDate
  const date = new Date(post.date)

  const { nextPost, prevPost } = postsService.findNextAndPrevPost(post)

  const MDXComponent = useMDXComponent(post.body.code)

  const mdxComponents = {
    pre: Pre,
  }

  const [activeToc, setActiveToc] = useState<Heading['slug'] | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const hElements = document.querySelectorAll('.prose h2, .prose h3')

      const activeHElements = Array.from(hElements).filter((el) => {
        // viewport 상단으로부터의 위치
        const top = el.getBoundingClientRect().top
        return top <= 0
      })

      if (activeHElements.length) {
        const id = activeHElements[activeHElements.length - 1].id
        setActiveToc(id)
      } else {
        setActiveToc(null)
      }
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <article className="post">
      {/* TODO: 컴포넌트 */}
      {post.toc && (
        <div className="relative">
          <Toc
            headings={headings}
            activeId={activeToc}
          />
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

export default BlogPost
