'use client'

import { createClient } from '@/utils/supabase/client'
import { Session } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

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
    <header className="w-full max-w-xl flex items-center justify-between mt-10">
      {session ? (
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Cerrar sesión
        </button>
      ) : (
        <button
          onClick={handleSignIn}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Iniciar sesión
        </button>
      )}
    </header>
  )
}
