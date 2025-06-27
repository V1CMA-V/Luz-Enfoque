import Hero from './sections/hero'
import Services from './sections/servies'
import Testimonies from './sections/testimonies'

export default async function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen ">
      <Hero />

      <Services />
      <Testimonies />
    </section>
  )
}
