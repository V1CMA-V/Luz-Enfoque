import Cards from '@/components/card'
import HeaderSection from '@/components/header-sections'

export default function Services() {
  return (
    <section
      id="servicio"
      className="w-full max-w-7xl m-auto px-4 py-8 flex flex-col items-center justify-center gap-8"
    >
      <HeaderSection title="Nuestros Servicios">
        En <strong>Luz & Enfoque</strong>, ofrecemos una amplia gama de
        servicios fotográficos para capturar cada momento especial. Desde bodas
        y eventos corporativos hasta sesiones de retratos y fotografía de
        productos, nuestro equipo está listo para crear recuerdos que durarán
        toda la vida.
      </HeaderSection>

      <Cards />
    </section>
  )
}
