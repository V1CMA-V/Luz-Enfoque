import { createClient } from '@/utils/supabase/server'
import { AuthButton } from './auth-button-client'

export default async function AuthButtonServer() {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { data: user } = await supabase
    .from('users')
    .select('role')
    .eq('id', session?.user.id)

  return (
    <AuthButton
      session={session}
      role={user && user[0] ? user[0].role : undefined}
    />
  )
}
