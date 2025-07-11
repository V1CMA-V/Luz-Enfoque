import AuthButtonServer from '@/components/auth-button-server'
import { ItemsMenuMobile } from '@/components/items-menu-mobile'
import { MenuList } from '@/components/menu-list'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export const Navbar = async () => {
  const supabase = await createClient()
  const { data: services } = await supabase
    .from('services')
    .select('title, body')
    .eq('best_seller', true)

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
          <MenuList best_sellers={services || []} />
        </div>

        <AuthButtonServer />

        <div className="flex sm:hidden text-white">
          <ItemsMenuMobile />
        </div>
      </div>
    </div>
  )
}
