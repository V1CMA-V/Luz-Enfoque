import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Menu } from 'lucide-react'
import Link from 'next/link'

export const ItemsMenuMobile = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Menu />
      </PopoverTrigger>
      <PopoverContent>
        <Link href="/" className="block p-2">
          Inicio
        </Link>
        <Link href="/blog" className="block p-2">
          Blog
        </Link>
        <Link href="/portfolio" className="block p-2">
          Portafolio
        </Link>
      </PopoverContent>
    </Popover>
  )
}
