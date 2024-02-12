import React from 'react'
import { Post } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Pre from './pre'

type Props = {
  code: Post['body']['code']
}

const Mdx = ({ code }: Props) => {
  const MDXComponent = useMDXComponent(code)

  const components = {
    pre: Pre,
  }

  return (
    <div className={`prose border-b py-12`}>
      <MDXComponent components={components} />
    </div>
  )
}

export default React.memo(Mdx)
