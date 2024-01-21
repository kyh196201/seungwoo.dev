'use client'

import { PostHeading as Heading } from 'contentlayer.config'
import './toc.css'
import { cn } from '@/utils'
import { useRouter } from 'next/navigation'

type Slug = Heading['slug']

type Props = {
  headings: Heading[]
  activeId?: Slug | null
}

const Toc = ({ headings, activeId }: Props) => {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent, slug: Slug) => {
    e.preventDefault()

    router.push(`#${slug}`, { scroll: true })

    const hElement = document.getElementById(slug)
    if (hElement) {
      hElement.scrollIntoView({ block: 'start' })
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
