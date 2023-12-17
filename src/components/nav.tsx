'use client'

import { usePathname } from 'next/navigation'
import navLinks from '../constants/navLinks'
import Link from 'next/link'

const NavItem = ({ title, link }: { title: string; link: string }) => {
  const pathname = usePathname()
  return (
    <Link
      href={link}
      key={title}
      className={`mx-1 transition-colors font-medium ${
        pathname.startsWith(link) ? 'text-gray-900' : 'text-gray-900/60'
      } hover:text-gray-900/80`}
    >
      <span className={`px-1 py-2`}>{title}</span>
    </Link>
  )
}

const Nav = () => {
  const isDark = false

  return (
    <nav className={`flex items-center`}>
      {navLinks.map((nav) => (
        <NavItem
          {...nav}
          key={nav.title}
        />
      ))}

      {isDark && <button type="button">다크모드</button>}
    </nav>
  )
}

export default Nav
