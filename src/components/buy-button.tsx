import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { DatePickerForm } from './buy-form'
import { Button } from './ui/button'

export default async function BuyButton({
  service_id,
  slug,
}: {
  service_id?: string
  slug?: string
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={'outline'} className="cursor-pointer">
          Comprar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            <DatePickerForm service_id={service_id} slug={slug} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
