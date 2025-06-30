import ContactForm from './contact-fomr'
import HeaderSection from './header-sections'

export default function Contact() {
  return (
    <section className="w-full max-w-7xl m-auto px-4 py-8 flex flex-col items-center justify-center gap-8">
      <HeaderSection title="Contáctanos">
        Estamos aquí para ayudarte a capturar tus momentos más especiales. Si
        tienes alguna pregunta o deseas agendar una sesión, no dudes en ponerte
        en contacto con nosotros.
      </HeaderSection>

      <ContactForm />
    </section>
  )
}
