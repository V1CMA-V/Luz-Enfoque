'use client'

import { createClient } from '@/utils/supabase/client'
import { Github } from 'lucide-react'
import { Button } from './ui/button'

export default function AuthGithub() {
  const supabase = createClient()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback',
      },
    })
  }

  return (
    <Button
      variant="outline"
      type="button"
      className="w-full cursor-pointer  "
      onClick={handleSignIn}
    >
      <Github className="size-4" />
      Continuar con GitHub
    </Button>
  )
}
