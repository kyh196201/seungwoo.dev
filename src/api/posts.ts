import { allPosts, Post } from 'contentlayer/generated'

type Tag = {
  title: string
  count: number
}

class PostsService {
  private static instance: PostsService

  static getInstance(): PostsService {
    if (!PostsService.instance) {
      PostsService.instance = new PostsService()
    }
    return PostsService.instance
  }

  getAllPosts(): Post[] {
    return allPosts
  }

  getAllPostByDateDesc(): Post[] {
    const posts = this.getAllPosts()
    return posts.sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
  }

  findPost(slug: Post['slug']): Post | null {
    return this.getAllPosts().find((p) => p.slug === slug) ?? null
  }

  findPostIndex(post: Post): number {
    const posts = this.getAllPostByDateDesc()

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

    const posts = this.getAllPosts()
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
      const tags = post.tags || []
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
}

const postsService = PostsService.getInstance()

export default postsService

export type { Tag as PostTag }