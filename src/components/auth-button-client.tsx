'use client'

import { createClient } from '@/utils/supabase/client'
import { Session } from '@supabase/supabase-js'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'

export function AuthButton({ session }: { session: Session | null }) {
  const supabase = createClient()
  const router = useRouter()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback',
      },
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <>
      {session ? (
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button className="cursor-pointer" variant={'secondary'}>
              Ir al panel
            </Button>
          </Link>
          <Button
            className="cursor-pointer"
            variant={'secondary'}
            onClick={handleSignOut}
          >
            Cerrar sesión
          </Button>
        </div>
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
