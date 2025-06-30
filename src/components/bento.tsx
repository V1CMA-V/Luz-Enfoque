import BentoItem from './BentoItem'

export default function Bento() {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 grid-rows-none md:grid-rows-[repeat(4,minmax(200px,1fr))] gap-6">
      <BentoItem
        title="Boda en la Playa: Ana & Luis"
        description="Sesión fotográfica de boda al atardecer en la costa de Marbella. Capturamos momentos únicos y naturales en un entorno paradisíaco."
        className="col-span-1 md:col-span-2 lg:col-span-3 row-span-1 md:row-span-2 items-center text-center text-white"
        img="https://images.unsplash.com/photo-1558979589-b1befca72d8f?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <BentoItem
        title="Retrato Corporativo: Estudio Creativo XYZ"
        description="Fotografía profesional para el equipo de una agencia de diseño. Imágenes frescas y modernas para su web y redes sociales."
        className="col-span-1 md:col-span-1 lg:col-span-2 justify-end relative text-white overflow-hidden rounded"
        img="https://images.unsplash.com/photo-1538688423619-a81d3f23454b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      >
        <div className="absolute inset-0 bg-black/40 z-0"></div>
      </BentoItem>
      <BentoItem
        title="Sesión Familiar: Los Ramírez"
        description="Sesión en exteriores con la familia Ramírez. Fotografías espontáneas y llenas de emoción en el parque central."
        className="col-span-1 md:col-span-1 lg:col-span-2 text-white relative overflow-hidden"
        img="https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=1054&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      >
        <div className="absolute inset-0 bg-black/20 z-0"></div>
      </BentoItem>
      <BentoItem
        title="Editorial de Moda: Colección Primavera 2025"
        description="Producción y fotografía para la campaña de moda de la marca local Lirio. Imágenes vibrantes y estilizadas para catálogo y redes."
        className="col-span-1 md:col-span-2 lg:col-span-5 row-span-1 md:row-span-2 text-white relative overflow-hidden"
        img="https://images.unsplash.com/flagged/photo-1570733117311-d990c3816c47?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      >
        <div className="absolute inset-0 bg-black/10 z-0"></div>
      </BentoItem>
    </section>
  )
}
