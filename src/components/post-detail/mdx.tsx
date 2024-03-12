import React from 'react'
import { Post } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Pre from './pre'
import CodePen from './code-pen'

type Props = {
  code: Post['body']['code']
}

function Mdx({ code }: Props) {
  const MDXComponent = useMDXComponent(code)

  const components = {
    CodePen,
    pre: Pre,
  }

  return (
    <div className="prose border-b py-12">
      <MDXComponent components={components} />
    </div>
  )
}

export default React.memo(Mdx)
