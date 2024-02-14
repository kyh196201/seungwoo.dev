import React, { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import navLinks from '@/constants/navLinks'

const NavMenuTrigger = React.forwardRef<HTMLButtonElement>((props, ref) => {
  return (
    <Button
      variant="outline"
      size="icon"
      className="border-none shadow-none mr-1 md:hidden"
      {...props}
      ref={ref}
    >
      <Menu className="h-5 w-5" />
      <span className="sr-only">open nav menu</span>
    </Button>
  )
})
NavMenuTrigger.displayName = 'NavMenuTrigger'

const NavMenuItem = ({ title, link, onClick }: { title: string; link: string; onClick: () => void }) => {
  return (
    <li className="mb-4 last-of-type:mb-0">
      <Link
        href={link}
        className={`block px-1 py-2 transition-colors font-semibold text-link hover:text-link/80 focus:text-link/80`}
        onClick={() => onClick()}
      >
        <span>{title}</span>
      </Link>
    </li>
  )
}

const NavMenu = () => {
  // https://github.com/shadcn-ui/ui/issues/88#issuecomment-1577482090
  const [open, setOpen] = useState(false)

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
    >
      <SheetTrigger asChild>
        <NavMenuTrigger />
      </SheetTrigger>

      <SheetContent side={'left'}>
        <ul className="mt-4">
          {navLinks.map((nav) => (
            <NavMenuItem
              {...nav}
              onClick={() => setOpen(false)}
              key={nav.title}
            />
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  )
}

export default NavMenu
