import { allPosts, Post } from 'contentlayer/generated'
import { removeLineBreaks } from '@/utils/string'

type Tag = {
  title: string
  count: number
}

export const POST_TYPE = {
  NOTE: 'note',
  POST: 'post',
} as const

export type PostType = (typeof POST_TYPE)[keyof typeof POST_TYPE]

function getPostTags(post: Post) {
  // 파싱 결과에 포함된 캐리지 리턴 제거 'slot\r' -> 'slot'
  return post.tags.map((tag) => removeLineBreaks(tag))
}

class PostsService {
  private static instance: PostsService

  static getInstance(): PostsService {
    if (!PostsService.instance) {
      PostsService.instance = new PostsService()
    }
    return PostsService.instance
  }

  // eslint-disable-next-line class-methods-use-this
  private filterPosts(posts: Post[], type: PostType) {
    return posts.filter((post) => post.postType === type)
  }

  getAllPosts(type?: PostType): Post[] {
    if (!type) {
      return allPosts
    }

    return this.filterPosts(allPosts, type)
  }

  getAllPostByDateDesc(type?: PostType): Post[] {
    const posts = this.getAllPosts(type)
    return posts.sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
  }

  findPost(slug: Post['slug'], type?: PostType): Post | null {
    return this.getAllPosts(type).find((p) => p.slug === slug) ?? null
  }

  findPostIndex(post: Post): number {
    const posts = this.getAllPostByDateDesc(post.postType as PostType)

    if (!posts.length) {
      return -1
    }

    return posts.findIndex(({ slug }) => slug === post.slug)
  }

  findNextAndPrevPost(post: Post): { nextPost: Post | null; prevPost: Post | null } {
    const index = this.findPostIndex(post)
    if (index === -1) {
      throw new Error('No post')
    }

    const posts = this.getAllPostByDateDesc(post.postType as PostType)
    const nextPost = index + 1 <= posts.length - 1 ? posts[index + 1] : null
    const prevPost = index - 1 >= 0 ? posts[index - 1] : null

    return {
      nextPost,
      prevPost,
    }
  }

  /**
   * 포스트에서 모든 태그를 가져와서 태그 객체의 배열로 반환합니다.
   *
   * @return {Tag[]} 각 태그의 제목과 개수를 포함하는 Tag 객체의 배열입니다.
   */
  getAllTags(): Tag[] {
    const posts = this.getAllPosts()

    const map = new Map<Tag['title'], Tag['count']>()

    posts.forEach((post) => {
      const tags = getPostTags(post)
      tags.forEach((tag) => {
        if (!map.has(tag)) {
          map.set(tag, 0)
        }

        map.set(tag, (map.get(tag) as number) + 1)
      })
    })

    const tags: Tag[] = Array.from(map.entries()).map(([title, count]) => ({
      title,
      count,
    }))

    return tags
  }

  /**
   * 태그로 게시물을 찾습니다.
   *
   * @param {Tag['title']} tag - 검색할 태그입니다.
   * @return {Post[]} 주어진 태그와 일치하는 게시물의 배열입니다.
   */
  findPostsByTag(tag: Tag['title']): Post[] {
    const posts = this.getAllPosts()

    return posts.filter((post) => {
      const tags = new Set(getPostTags(post))
      return tags.has(tag)
    })
  }
}

const postsService = PostsService.getInstance()

export default postsService

export type { Tag as PostTag }
