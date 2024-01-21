'use client'

import { PostHeading as Heading } from 'contentlayer.config'
import './toc.css'
import { cn } from '@/utils'

type Slug = Heading['slug']

type Props = {
  headings: Heading[]
  activeId?: Slug | null
}

const Toc = ({ headings, activeId }: Props) => {
  const handleClick = (e: React.MouseEvent, slug: Slug) => {
    e.preventDefault()

    const hElement = document.getElementById(slug)
    if (hElement) {
      hElement.scrollIntoView({ block: 'start' })
      window.scrollTo({
        // 5 만큼을 더 이동
        top: window.scrollY + 5,
      })
    }
  }

  return (
    <div className="post-toc">
      <div className="post-toc-inner">
        <h3 className={`sr-only`}>목차</h3>
        <div>
          {headings.map(({ level, slug, text }) => (
            <div
              key={`#${slug}`}
              className={cn(`post-toc-item`, activeId === slug ? 'active' : '')}
            >
              <a
                data-level={level.toString()}
                href={`#${slug}`}
                onClick={(e) => handleClick(e, slug)}
              >
                {text}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Toc
