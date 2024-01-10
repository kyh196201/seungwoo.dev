import Nav from '@/components/nav'
import Link from 'next/link'

type Props = {}

const Header = ({}: Props) => {
  return (
    <header className={`flex items-center justify-between mb-16`}>
      {/* 로고 */}
      <h1>
        <Link
          href={`/`}
          className={`flex items-center gap-1 text-2xl font-bold text-link`}
        >
          <span>seungwoo.dev</span>
        </Link>
      </h1>

      <Nav />
    </header>
  )
}

export default Header
