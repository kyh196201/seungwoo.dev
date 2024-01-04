import { Metadata } from 'next'
import { DEFAULT_METADATA } from '@/utils/metadata'
import Tag from '@/components/tag'
import postsService from '@/api/posts'
import TagList from '@/app/tags/components/tag-list'

export const metadata: Metadata = {
  ...DEFAULT_METADATA,
  description: '',
}

export default function Tags() {
  const tags = postsService.getAllTags()

  return (
    <>
      <div className={`mb-4`}>
        <h2 className={`text-3xl sm:text-4xl font-medium mb-2`}>태그 목록</h2>
        <p className={`text-gray-600 font-medium`}>게시글에 사용된 태그를 모아서 보여줍니다.</p>
      </div>

      <div className={`border-t py-12`}>
        <TagList tags={tags} />
      </div>
    </>
  )
}
