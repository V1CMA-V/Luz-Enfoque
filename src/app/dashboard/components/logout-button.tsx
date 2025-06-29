'use client'

import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export function OutButton() {
  const supabase = createClient()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }
  return (
    <>
      <Button
        className="cursor-pointer"
        variant={'secondary'}
        onClick={handleSignOut}
      >
        Cerrar sesión
      </Button>
    </>
  )
}
