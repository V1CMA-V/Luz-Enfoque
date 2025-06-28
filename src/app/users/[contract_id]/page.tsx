/* eslint-disable @next/next/no-img-element */
import { createClient } from '@/utils/supabase/server'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Link2Icon } from 'lucide-react'
import Link from 'next/link'
import DownloadIndividual from './components/download'
import DownloadAll from './components/download-all'

export default async function UserPage({
  params,
}: {
  params: { contract_id: string }
}) {
  const supabase = await createClient()

  const { contract_id } = params

  const { data: images } = await supabase
    .from('contracts_images')
    .select('*')
    .eq('contract_id', contract_id)

  const { data: contract } = await supabase
    .from('contracts')
    .select('*, user_id(name, avatar_url), service_id(title, body, slug)')
    .eq('id', contract_id)
    .single()

  const orientation =
    images?.[0]?.orientation === 'horizontal'
      ? 'w-full h-[100px] md:h-[300px]'
      : 'w-auto h-[400px] md:h-[600px]'

  return (
    <div className="w-full pt-20 ">
      <div className="flex flex-col items-center justify-center gap-10 p-4">
        <div className="flex flex-col gap-2 md:gap-5 ">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
            Sesion del {contract?.reserv_date} - {contract?.service_id?.title}
          </h2>
          <DownloadAll
            urlsArray={images?.[0]?.url ?? []}
            contract_id={contract_id}
          />
        </div>

        <Carousel className="w-full max-w-xs md:max-w-3xl lg:max-w-7xl ">
          <CarouselContent>
            {images &&
              images[0]?.url?.map(
                (url: string | Blob | undefined, index: number) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6 ">
                          <img
                            src={url}
                            alt={`Imagen ${index + 1}`}
                            className={`${orientation} object-cover rounded-md`}
                          />
                        </CardContent>

                        <CardFooter className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">
                            Imagen {index + 1} de {images[0].url.length}
                          </p>
                          {typeof url === 'string' && (
                            <DownloadIndividual image_url={url} index={index} />
                          )}
                        </CardFooter>
                      </Card>
                    </div>
                  </CarouselItem>
                )
              )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      {/* Aquí puedes agregar el contenido específico del usuario */}
      <div className="flex items-center justify-center flex-col gap-2 mt-4">
        <Link
          href={`/users/contracts/${contract_id}`}
          className="text-sm text-muted-foreground "
        >
          <Link2Icon className="inline mr-1" />
          Ver detalles del contrato
        </Link>
        <p className="text-sm text-muted-foreground">
          Detalles del contrato ID: {contract_id}
        </p>
      </div>
    </div>
  )
}
