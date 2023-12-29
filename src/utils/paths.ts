import { Post } from 'contentlayer/generated'

export function getPostPath(post: Post): string {
  return `/posts/${post.slug}`
}
