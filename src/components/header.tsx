import Link from 'next/link'
import Nav from '@/components/nav'

function Header() {
  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between bg-background py-8"
      style={{ background: 'linear-gradient(to bottom, hsl(var(--background)), transparent)' }}
    >
      {/* 로고 */}
      <h1>
        <Link
          href="/"
          className="flex items-center gap-1 text-2xl font-bold text-link"
        >
          <span>seungwoo.dev</span>
        </Link>
      </h1>

      <Nav />
    </header>
  )
}

export default Header
