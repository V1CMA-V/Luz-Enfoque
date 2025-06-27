import { ItemsMenuMobile } from '@/components/items-menu-mobile'
import { MenuList } from '@/components/menu-list'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const Navbar = () => {
  return (
    <div
      id="navbar"
      className="fixed top-0 left-0 right-0 z-50  w-full py-5 bg-black/80 backdrop-blur-md border-b border-gray-800"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo and title */}
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-xl md:text-3xl text-white">
            Luz
            <strong>&</strong>
            Enfoque
          </h1>
        </Link>

        {/* Menu for larger screens */}

        <div className="items-center justify-between hidden sm:flex">
          <MenuList />
        </div>

        <Button>Iniciar sesión</Button>

        <div className="flex sm:hidden">
          <ItemsMenuMobile />
        </div>
      </div>
    </div>
  )
}
