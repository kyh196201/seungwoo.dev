import createMetadata from '@/utils/metadata'

type Props = {
  params: { tag: string }
}

export async function generateMetadata({ params }: Props) {
  const { tag } = params

  return createMetadata({
    title: tag,
    description: `${tag}가 태그된 포스트 목록을 보여줍니다.`,
    path: `/tags/${tag}`,
  })
}

export default function Page({ params: { tag } }: Props) {
  return <div>{tag} page</div>
}
