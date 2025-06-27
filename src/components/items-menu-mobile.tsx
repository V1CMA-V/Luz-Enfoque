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
        <Link href="/category/molido" className="block p-2">
          Café molido
        </Link>
        <Link href="/category/grano" className="block p-2">
          Café en grano
        </Link>
        <Link href="/category/capsulas" className="block p-2">
          Café en capsulas
        </Link>
      </PopoverContent>
    </Popover>
  )
}
