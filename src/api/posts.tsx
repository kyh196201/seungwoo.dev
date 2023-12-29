import { allPosts, type Post } from 'contentlayer/generated'

const postsService = {
  getAllPosts(): Post[] {
    return allPosts
  },

  getAllPostByDateDesc(): Post[] {
    const posts = this.getAllPosts()
    return posts.sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
  },

  findPost(slug: Post['slug']): Post | null {
    return this.getAllPosts().find((p) => p.slug === slug) ?? null
  },

  findPostIndex(post: Post): number {
    const posts = this.getAllPostByDateDesc()

    if (!posts.length) {
      return -1
    }

    return posts.findIndex(({ slug }) => slug === post.slug)
  },

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
  },
}

export default postsService
