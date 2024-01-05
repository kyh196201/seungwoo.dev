'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import navLinks from '../constants/navLinks'
import Link from 'next/link'
import { cn } from '@/utils'

const NavItem = ({ title, link }: { title: string; link: string }) => {
  const pathname = usePathname()
  const isActive = pathname.startsWith(link)

  return (
    <Link
      href={link}
      key={title}
      className={cn(`relative mx-1 transition-colors font-medium`, isActive ? 'text-link' : 'text-link/60')}
    >
      <span className={`px-1 py-2`}>{title}</span>
      {isActive && (
        <motion.div
          layoutId="active-link"
          transition={{
            type: 'spring',
            duration: 0.5,
          }}
          className="absolute h-[1px] w-full bg-link dark:bg-white"
        />
      )}
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
