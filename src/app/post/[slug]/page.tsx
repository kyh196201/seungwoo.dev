// import { Metadata } from 'next'
import '@/app/styles/prose.css'
import { allPosts } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
interface Params {
  params: {
    slug: string
  }
}

const Page: React.FC<Params> = ({ params: { slug } }) => {
  const post = allPosts.find((p) => p.slug === slug)
  const MDXComponent = useMDXComponent(post.body.code)

  return (
    <div>
      <h1>{post?.title}</h1>
      <p>{post?.description}</p>

      {/* mdx */}
      <article className={`prose`}>
        <MDXComponent />
      </article>
    </div>
  )
}

export default Page
