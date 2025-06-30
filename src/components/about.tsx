import Bento from './bento'
import HeaderSection from './header-sections'

export default function About() {
  return (
    <section className="w-full max-w-7xl m-auto px-4 py-8 flex flex-col items-center justify-center gap-8">
      <HeaderSection title="Sobre Nosotros">
        Somos un equipo <strong>apasionado por la tecnología</strong> y el
        desarrollo web. Nuestro objetivo es{' '}
        <strong>crear experiencias digitales excepcionales</strong> utilizando
        las últimas herramientas y tecnologías. Nos especializamos en
        <strong>Astro</strong>, un generador de sitios estáticos que nos permite
        construir sitios <strong>rápidos y eficientes</strong>.
      </HeaderSection>

      <Bento />
    </section>
  )
}
