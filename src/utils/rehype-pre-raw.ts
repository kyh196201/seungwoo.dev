import { visit } from 'unist-util-visit'

export const preProcess = () => (tree: any) => {
  visit(tree, (node) => {
    if (node?.type === 'element' && node?.tagName === 'pre') {
      const [codeEl] = node.children

      if (codeEl.tagName !== 'code') return

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

      for (const child of node.children) {
        if (child.tagName === 'pre') {
          child.properties['raw'] = node.raw
        }
      }
    }
  })
}
