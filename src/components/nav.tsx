'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import navLinks, { type NavLink } from '@/constants/navLinks'
import Link from 'next/link'
import { cn } from '@/utils'
import { ThemeToggle } from '@/components/theme-toggle'
import NavMenu from '@/components/nav-menu'

const NavItem = ({ title, link }: NavLink) => {
  const pathname = usePathname()
  const isActive = pathname.startsWith(link)

  return (
    <li className="mr-1.5 last-of-type:mr-1">
      <Link
        href={link}
        className={cn(
          `block relative transition-colors font-medium px-1 py-2 hover:text-link/80 focus:text-link/80`,
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
            className="absolute h-[1px] w-full bg-link inset-x-0"
          />
        )}
      </Link>
    </li>
  )
}

const Nav = () => {
  return (
    <nav className={`flex items-center`}>
      <ul className={`items-center hidden md:flex`}>
        {navLinks.map((nav) => (
          <NavItem
            {...nav}
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
