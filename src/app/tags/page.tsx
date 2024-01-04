import { Metadata } from 'next'
import { DEFAULT_METADATA } from '@/utils/metadata'
import Tag from '@/components/tag'
import postsService from '@/api/posts'
import TagList from '@/app/tags/components/tag-list'
import PageLayout from '@/components/page-layout'

export const metadata: Metadata = {
  ...DEFAULT_METADATA,
  description: '',
}

export default function Tags() {
  const tags = postsService.getAllTags()

  return (
    <PageLayout
      title="태그 목록"
      description="게시글에 사용된 태그를 모아서 보여줍니다."
    >
      <div className={``}>
        <TagList tags={tags} />
      </div>
    </PageLayout>
  )
}
