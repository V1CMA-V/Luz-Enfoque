'use client'

import { createClient } from '@/utils/supabase/client'
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
  const supabase = createClient()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback',
      },
    })
  }

  const url = role === 'admin' ? '/dashboard' : '/user'

  return (
    <>
      {session ? (
        <Link href={url}>
          <Button className="cursor-pointer" variant={'secondary'}>
            Ir al panel
          </Button>
        </Link>
      ) : (
        <Button
          className="cursor-pointer"
          variant={'secondary'}
          onClick={handleSignIn}
        >
          Iniciar sesión
        </Button>
      )}
    </>
  )
}
