import Hero from './sections/hero'
import Testimonies from './sections/testimonies'

export default async function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen ">
      <Hero />

      <Testimonies />
    </section>
  )
}
