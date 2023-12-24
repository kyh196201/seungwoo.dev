// import { Metadata } from 'next'
import Pre from '@/app/post/[slug]/components/pre'
import '@/app/styles/prose.css'
import { allPosts } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { notFound } from 'next/navigation'
interface Params {
  params: {
    slug: string
  }
}

const Markdown: React.FC<{ body: string }> = ({ body }) => {
  const MDXComponent = useMDXComponent(body)

  const mdxComponents = {
    pre: Pre,
  }

  return (
    <article className={`prose`}>
      <MDXComponent components={mdxComponents} />
    </article>
  )
}

const Page: React.FC<Params> = ({ params: { slug } }) => {
  const post = allPosts.find((p) => p.slug === slug)

  if (!post) {
    return notFound()
  }

  return (
    <div>
      <h1>{post?.title}</h1>
      <p>{post?.description}</p>

      {/* mdx */}
      <Markdown body={post.body.code} />
    </div>
  )
}

export default Page
