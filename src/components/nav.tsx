'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import navLinks, { type NavLink } from '@/constants/navLinks'
import { cn } from '@/utils'
import ThemeToggle from '@/components/theme-toggle'
import NavMenu from '@/components/nav-menu'

function NavItem({ title, link }: NavLink) {
  const pathname = usePathname()
  const isActive = pathname.startsWith(link)

  return (
    <li className="mr-1.5 last-of-type:mr-1">
      <Link
        href={link}
        className={cn(
          `relative block px-1 py-2 font-medium transition-colors hover:text-link/80 focus:text-link/80`,
          isActive ? 'text-link hover:text-link focus:text-link' : 'text-link/60'
        )}
      >
        <span>{title}</span>
        {isActive && (
          <motion.div
            layoutId="active-link"
            transition={{
              type: 'spring',
              duration: 0.5,
            }}
            // https://github.com/framer/motion/issues/1972#issuecomment-1483452870
            style={{ originY: '0px' }}
            className="absolute inset-x-0 h-[1px] w-full bg-link"
          />
        )}
      </Link>
    </li>
  )
}

function Nav() {
  return (
    <nav className="flex items-center">
      <ul className="hidden items-center md:flex">
        {navLinks.map((nav) => (
          <NavItem
            link={nav.link}
            title={nav.title}
            key={nav.title}
          />
        ))}
      </ul>

      <NavMenu />

      <ThemeToggle />
    </nav>
  )
}

export default Nav
