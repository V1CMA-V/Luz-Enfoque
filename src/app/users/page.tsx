import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { UserNav } from '../dashboard/components/user-nav'
import { statuses } from '../dashboard/data/data'

export default async function UsersPage() {
  const supabase = await createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const userData = session?.user

  // Data Sessions
  const { data: contracts } = await supabase
    .from('contracts')
    .select('*, service_id(title, body, slug)')
    .eq('user_id', userData?.id)
    .order('id', { ascending: true })

  return (
    <div className="w-full flex flex-col gap-8 items-center justify-center">
      <section className="w-full h-[50dvh] flex flex-col items-center justify-center gap-4 text-center">
        <UserNav />
        <p className="mt-4">
          Aquí puedes ver todas las sesiones que has comprado.
        </p>
      </section>

      {!contracts ? (
        <>
          <p className="mt-4">Parece ser que no tienes sesiones compradas.</p>

          <Link href="/#services" className="mt-4">
            <Button className="cursor-pointer" variant={'outline'}>
              Comprar sesión
            </Button>
          </Link>
        </>
      ) : (
        <div className="w-full max-w-7xl m-auto grid md:grid-cols-3 gap-4 p-4">
          {(contracts ?? []).length > 0 ? (
            (contracts ?? []).map((contract) => {
              const status = statuses.find(
                (status) => status.value === contract.status
              )

              return (
                <Card key={contract.id}>
                  <CardHeader>
                    <CardTitle>{contract.service_id.title}</CardTitle>
                    <CardDescription>
                      {contract.service_id.body}
                    </CardDescription>
                    <CardAction>
                      <Link
                        href={`/users/${contract.id}`}
                        className="text-blue-500 hover:underline"
                      >
                        <Button variant="link" className="cursor-pointer">
                          Ver detalles
                        </Button>
                      </Link>
                    </CardAction>
                  </CardHeader>
                  <CardContent>
                    <p>Fecha de la sesión: {contract.reserv_date}</p>
                  </CardContent>
                  <CardFooter>
                    {status ? (
                      <div className="flex w-[100px] items-center gap-2">
                        {status.icon && (
                          <status.icon className="text-muted-foreground size-4" />
                        )}
                        <span>{status.label}</span>
                      </div>
                    ) : (
                      <p>Estado: No disponible</p>
                    )}
                  </CardFooter>
                </Card>
              )
            })
          ) : (
            <p>No tienes sesiones compradas.</p>
          )}
        </div>
      )}
    </div>
  )
}
