import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import { statuses } from '../dashboard/data/data'

export default async function UsersPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const userData = user?.user_metadata

  // Data Sessions
  const { data: sessions } = await supabase
    .from('contracts')
    .select('*, service_id(title, body, slug)')
    .eq('user_id', user?.id)
    .order('id', { ascending: true })

  console.log('sessions', sessions)

  return (
    <div className="w-full flex flex-col gap-8 items-center justify-center">
      <section className="w-full h-[50dvh] grid place-content-center items-center gap-4 text-center">
        <Avatar className="h-16 w-16 md:h-20 md:w-20 m-auto">
          <AvatarImage src={userData?.avatar_url} alt={userData?.full_name} />
          <AvatarFallback>
            <span>{userData?.full_name?.charAt(0)}</span>
          </AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-semibold">Hola {userData?.full_name}</h1>
        <p className="mt-4">
          Aquí puedes ver todas las sesiones que has comprado.
        </p>
      </section>

      {!user ? (
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
          {(sessions ?? []).length > 0 ? (
            (sessions ?? []).map((session) => {
              const status = statuses.find(
                (status) => status.value === session.estatus
              )

              return (
                <Card key={session.id}>
                  <CardHeader>
                    <CardTitle>{session.service_id.title}</CardTitle>
                    <CardDescription>{session.service_id.body}</CardDescription>
                    <CardAction>
                      <Link
                        href={`/users/${session.id}`}
                        className="text-blue-500 hover:underline"
                      >
                        <Button variant="link" className="cursor-pointer">
                          Ver detalles
                        </Button>
                      </Link>
                    </CardAction>
                  </CardHeader>
                  <CardContent>
                    <p>Fecha de la sesión: {session.reserv_date}</p>
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
