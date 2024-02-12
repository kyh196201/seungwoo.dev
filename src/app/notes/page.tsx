import createMetadata from '@/utils/metadata'
import postsService from '@/api/posts'
import PageLayout from '@/components/page-layout'
import PostCard from '@/components/post-card'

export async function generateMetadata() {
  return createMetadata({
    title: '노트',
    description: '배운 내용을 정리하고, 기록하는 공간입니다.',
    path: '/notes',
  })
}

export default function NotesPage() {
  const posts = postsService.getAllPostByDateDesc('note')

  return (
    <PageLayout
      title="노트"
      description="배운 내용을 정리하고, 기록하는 공간입니다."
    >
      <div className={`mt-8`}>
        <ul className={`flex flex-col gap-8`}>
          {posts.map((post) => (
            <li
              key={post._id}
              className={`animate-fadeInUp`}
            >
              <PostCard
                post={post}
                showTags
              />
            </li>
          ))}
        </ul>
      </div>
    </PageLayout>
  )
}
