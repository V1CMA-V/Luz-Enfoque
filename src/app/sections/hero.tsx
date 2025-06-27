import ButtonLink from '../../components/button-link'

export default function Hero() {
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center text-center bg-cover bg-center relative overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1610071780881-59bdd0183713?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Estudio Fotográfico"
        className="absolute inset-0 w-full h-full object-cover scale-100"
      />
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="z-10 p-6 text-white w-full max-w-4xl m-auto flex flex-col items-center gap-8">
        <h1 className="text-xl md:text-4xl font-bold">
          <strong>Luz & Enfoque</strong>
          <br /> Creamos recuerdos que perduran
        </h1>
        <p className="text-lg md:text-xl text-balance leading-relaxed">
          En nuestro estudio fotográfico, nos{' '}
          <strong>especializamos en capturar la esencia</strong> de cada momento
          especial. Ya sea <strong>una boda</strong>,{' '}
          <strong>un cumpleaños</strong> o{' '}
          <strong>una sesión de retratos</strong>, estamos aquí para crear
          recuerdos que durarán toda la vida.
        </p>

        <div className="flex flex-col md:flex-row gap-4 w-1/2 justify-between items-center">
          <ButtonLink href="/portafolio">Ver portafolio</ButtonLink>
          <ButtonLink href="#servicio">Ver servicios</ButtonLink>
        </div>
      </div>
    </section>
  )
}
