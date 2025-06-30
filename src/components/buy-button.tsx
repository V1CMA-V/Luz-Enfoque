import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { createClient } from '@/utils/supabase/server'
import { DatePickerForm } from './buy-form'
import { Button } from './ui/button'

export default async function BuyButton({
  service_id,
  service_name,
  slug,
}: {
  service_id?: string
  service_name?: string
  slug?: string
}) {
  const supabase = await createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={'outline'} className="cursor-pointer">
          Comprar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Usted está a punto de comprar {service_name}
          </DialogTitle>
          <DialogDescription>
            {session ? (
              <DatePickerForm
                service_id={service_id}
                slug={slug}
                user_id={session.user.id}
              />
            ) : (
              <p className="text-sm text-muted-foreground">
                Debe iniciar sesión para comprar este servicio.
              </p>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
