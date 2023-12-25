// import { Metadata } from 'next'
import Pre from '@/app/post/[slug]/components/pre'
import '@/app/styles/prose.css'
import { Post, allPosts } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Link from 'next/link'
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

const BlogPost: React.FC<{ post: Post }> = ({ post }) => {
  const { title, date, tags = [] } = post

  return (
    <div>
      <h2>{title}</h2>
      <span>{date}</span>
      {tags.length && (
        <ul>
          {tags.map((tag, index) => (
            <li key={`${tag}${index}`}>
              <Link href={`/tags/${tag}`}>{tag}</Link>
            </li>
          ))}
        </ul>
      )}

      {/* mdx */}
      <Markdown body={post.body.code} />
    </div>
  )
}

const Page: React.FC<Params> = ({ params: { slug } }) => {
  const post = allPosts.find((p) => p.slug === slug)

  if (!post) {
    return notFound()
  }

  return <BlogPost post={post} />
}

export default Page
