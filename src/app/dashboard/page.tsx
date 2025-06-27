import { createClient } from '@/utils/supabase/server'
import Hero from './components/mios/hero'
import TaskPage from './section/task-page'

export default async function Dashboard() {
  const supabase = await createClient()

  const { data: contracts } = await supabase.from('contracts').select('*')

  console.log('Contracts:', contracts)

  return (
    <section className="flex flex-col items-center justify-center gap-16">
      <Hero />

      <TaskPage />

      {/* <Contracts /> */}
    </section>
  )
}
