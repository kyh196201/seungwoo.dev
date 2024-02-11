import { Note } from '@/api/notion'
import { Post } from 'contentlayer/generated'

export function getPostPath(post: Post): string {
  return `/posts/${post.slug}`
}

export function getNotePath(note: Note): string {
  return `/note/${note.slug}`
}
