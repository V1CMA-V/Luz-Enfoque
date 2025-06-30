import { createClient } from '@/utils/supabase/server'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import BuyButton from './buy-button'
import { Button } from './ui/button'

export default async function Cards() {
  const supabase = await createClient()
  const { data: services } = await supabase.from('services').select('*')

  return (
    <section className="w-full px-4 py-8 grid md:grid-cols-3 items-center justify-center gap-8">
      {services?.map((service) => (
        <article
          key={service.id}
          className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto flex flex-col items-center justify-between gap-4 border border-gray-100 h-full hover:scale-105 transition-transform duration-300 relative"
        >
          {service.best_seller && (
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg z-20 animate-bounce">
              ¡Más vendido!
            </span>
          )}
          <header className="mb-2">
            <h3 className="text-2xl font-bold text-[color:var(---color-primary)] mb-1">
              {service.title}
            </h3>
            <p className="text-gray-700">{service.body}</p>
          </header>

          <main>
            <p className="font-semibold text-gray-800 mb-2">
              Beneficios de la fotografía de retrato
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {service.benefits.map((benefit: string) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </main>

          <footer className="flex w-full items-center justify-between mt-4">
            <p className="text-lg text-gray-900">
              Precio:{' '}
              <strong className="text-[color:var(---color-accent)]">
                ${service.price}
              </strong>{' '}
              mxn
            </p>
            <BuyButton service_id={service.id} slug={service.slug} />
          </footer>
        </article>
      ))}

      <article className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto flex flex-col gap-4 border border-gray-100 h-full hover:scale-105 transition-transform duration-300 relative items-center text-center justify-between group">
        <header className="mb-2">
          <h3 className="text-2xl font-bold  mb-1">Mas informacion</h3>
          <p className="text-gray-700">
            Si necesitas más información sobre nuestros servicios, no dudes en
            contactarnos.
          </p>
        </header>

        <main>
          <Plus className="w-24 h-24 text-gray-500 group-hover:animate-bounce" />
        </main>

        <footer className="flex items-center justify-between mt-4">
          <Link href="/#contactar">
            <Button variant={'outline'} className="cursor-pointer">
              Comprar
            </Button>
          </Link>
        </footer>
      </article>
    </section>
  )
}
