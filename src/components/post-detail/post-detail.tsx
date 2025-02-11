'use client'

import '@/app/styles/prose.css'
import { PostHeading as Heading } from 'contentlayer.config'
import { Post } from 'contentlayer/generated'
import { CONFIG } from 'site.config'
import { useEffect, useState } from 'react'
import postsService from '@/api/posts'
import Toc from './toc'
import Avatar from './avatar'
import { formatDate } from '@/utils/days'
import Tag from '@/components/tag'
import PostLink from './post-link'
import TopButton from './top-button'
import { getTimeAgo } from '@/utils/time-ago'
import Mdx from './mdx'
import Giscus from '@/components/giscus'

type Props = {
  post: Post
  views?: number
}

const addComma = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function PostDetail({ post, views }: Props) {
  const { title, tags = [], readTimeMinutes } = post
  const isBlogPost = post.postType !== 'note'
  const headings = post.headings as Heading[]
  // TODO: publishedDate
  const date = new Date(post.date)

  const { nextPost, prevPost } = postsService.findNextAndPrevPost(post)

  const [activeToc, setActiveToc] = useState<Heading['slug'] | null>(null)

  useEffect(() => {
    const updateActiveToc = () => {
      const hElements = document.querySelectorAll('.prose h2, .prose h3')

      const activeHElements = Array.from(hElements).filter((el) => {
        // viewport 상단으로부터의 위치
        const { top } = el.getBoundingClientRect()
        return top <= 0
      })

      if (activeHElements.length) {
        const { id } = activeHElements[activeHElements.length - 1]
        setActiveToc(id)
      } else {
        setActiveToc(null)
      }
    }

    updateActiveToc()

    window.addEventListener('scroll', updateActiveToc)

    return () => {
      window.removeEventListener('scroll', updateActiveToc)
    }
  }, [])

  return (
    <>
      <article className="post">
        {post.toc && (
          <div className="relative">
            <Toc
              headings={headings}
              activeId={activeToc}
            />
          </div>
        )}

        <header className="mb-4">
          <h2 className="mb-2 break-keep text-3xl font-medium md:text-4xl">{title}</h2>

          {/* date & time */}
          <div className="flex flex-col text-date xs:flex-row xs:items-center">
            <a
              href={CONFIG.profile.github}
              target="_blank"
              className={`flex items-center xs:after:mx-1 xs:after:content-['/']`}
            >
              <Avatar />
              <span className="text-sm font-medium">{CONFIG.profile.name}</span>
            </a>
            <p className="text-sm font-medium">
              <time>
                {formatDate(date, 'MMMM DD, YYYY')} ({getTimeAgo(date)})
              </time>
            </p>
          </div>

          {/* reading-time */}
          {isBlogPost && <div className="text-sm font-medium text-date">{readTimeMinutes}</div>}
          <div className="text-sm font-medium text-date">{addComma(views ?? 0)} views</div>

          {/* tags */}
          {tags.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li key={tag}>
                  <Tag tag={tag} />
                </li>
              ))}
            </ul>
          )}
        </header>

        {/* mdx */}
        <Mdx code={post.body.code} />

        {(prevPost || nextPost) && (
          <footer className="mb-8 flex items-center justify-between gap-2 border-b px-2 pb-8 text-sm">
            {prevPost && <PostLink post={prevPost} />}

            {nextPost && (
              <PostLink
                isNext
                post={nextPost}
              />
            )}
          </footer>
        )}

        {/* giscus */}
        <Giscus />
      </article>

      <TopButton />
    </>
  )
}

export default PostDetail
