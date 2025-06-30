'use client'

import { Session } from '@supabase/supabase-js'
import Link from 'next/link'
import { Button } from './ui/button'

export function AuthButton({
  session,
  role,
}: {
  session: Session | null
  role: string | null
}) {
  const url = role === 'admin' ? '/dashboard' : '/users'

  return (
    <>
      {session ? (
        <Link href={url}>
          <Button className="cursor-pointer" variant={'secondary'}>
            Ir al panel
          </Button>
        </Link>
      ) : (
        <Link href="/login">
          <Button className="cursor-pointer" variant={'secondary'}>
            Iniciar sesión
          </Button>
        </Link>
      )}
    </>
  )
}
