import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { createClient } from '@/utils/supabase/server'
import { OutButton } from './logout-button'

export async function UserNav() {
  const supabase = await createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const userData = session?.user

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-full w-full rounded-full md:h-10 md:w-10"
        >
          <Avatar className="h-14 w-14">
            <AvatarImage src="sdfasdf" alt="@shadcn" />
            <AvatarFallback>V</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 md:w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-xs md:text-sm leading-none font-medium">
              {userData?.user_metadata?.name}
            </p>
            <p className="text-muted-foreground text-xs leading-none">
              {userData?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Perfil</DropdownMenuItem>
          <DropdownMenuItem>Facturación</DropdownMenuItem>
          <DropdownMenuItem>Configuraciones</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <OutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
