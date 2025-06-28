import Hero from './components/mios/hero'
import TaskPage from './section/task-page'

export default async function Dashboard() {
  return (
    <section className="flex flex-col items-center justify-center gap-16">
      <Hero />

      <TaskPage />

      {/* <Contracts /> */}
    </section>
  )
}
