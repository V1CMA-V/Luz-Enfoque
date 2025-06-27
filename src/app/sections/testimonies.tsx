import { createClient } from '@/utils/supabase/server'
import HeaderSection from '../components/header-sections'

export default async function Testimonies() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from('opinions')
    .select('*, users(name)')

  return (
    <section className="w-full max-w-7xl m-auto px-4 py-8 flex flex-col items-center justify-center gap-8">
      <HeaderSection title="Un Vistazo a Nuestros Clientes">
        En <strong>Luz & Enfoque</strong>, valoramos la confianza que nuestros
        clientes depositan en nosotros. Aquí compartimos algunas de las
        experiencias y testimonios de quienes han trabajado con nosotros. Cada
        proyecto es una oportunidad para crear recuerdos únicos y duraderos.
      </HeaderSection>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts?.map((post) => (
          <blockquote
            key={post.id}
            className="border-l-4 border-[color:var(---color-primary)] pl-4 italic"
          >
            &quot;{post.content}&quot;
            <cite className="block mt-2 text-right">
              - {post.users?.name || 'Cliente Anónimo'}
            </cite>
          </blockquote>
        ))}
      </div>
    </section>
  )
}
