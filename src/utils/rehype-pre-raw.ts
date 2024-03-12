import { visit } from 'unist-util-visit'

// https://claritydev.net/blog/copy-to-clipboard-button-nextjs-mdx-rehype
export const preProcess = () => (tree: any) => {
  visit(tree, (node) => {
    if (node?.type === 'element' && node?.tagName === 'pre') {
      const [codeEl] = node.children

      if (codeEl.tagName !== 'code') return

      // eslint-disable-next-line no-param-reassign
      node.raw = codeEl.children?.[0].value
    }
  })
}

export const postProcess = () => (tree: any) => {
  visit(tree, (node) => {
    if (node?.type === 'element' && node?.tagName === 'div') {
      if (!('data-rehype-pretty-code-fragment' in node.properties)) {
        return
      }

      node.children.forEach((child: any) => {
        if (child.tagName === 'pre') {
          // eslint-disable-next-line no-param-reassign
          child.properties.raw = node.raw
        }
      })
    }
  })
}
