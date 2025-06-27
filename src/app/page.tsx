import { createClient } from '@/utils/supabase/server'
import AuthButtonServer from './components/auth-button-server'
import Testimonies from './sections/testimonies'

export default async function Home() {
  const supabase = await createClient()
  const { data: posts } = await supabase.from('opinions').select('*, users(*)')

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-2xl font-bold tracking-wider">
        Bienvenido a Luz y Enfoque
      </h1>

      <pre>{JSON.stringify(posts, null, 2)}</pre>

      <AuthButtonServer />

      <Testimonies />
    </section>
  )
}
