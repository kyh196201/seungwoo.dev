import createMetadata from '@/utils/metadata'
import postsService from '@/api/posts'
import TagList from '@/app/tags/components/tag-list'
import PageLayout from '@/components/page-layout'

export async function generateMetadata() {
  return createMetadata({
    title: '태그 목록',
    description: '게시글에 사용된 태그를 모아서 보여줍니다.',
    path: '/tags',
  })
}

export default function TagsPage() {
  const tags = postsService.getAllTags()

  return (
    <PageLayout
      title="태그 목록"
      description="게시글에 사용된 태그를 모아서 보여줍니다."
    >
      <TagList tags={tags} />
    </PageLayout>
  )
}
