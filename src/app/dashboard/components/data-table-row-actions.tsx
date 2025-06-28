import { Row } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import SelectForm from './forms'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edita el servicio</DialogTitle>
          <DialogDescription className="flex flex-col gap-4">
            <p>
              Recuerda que la fecha de reservacion es {row.original.reserv_date}
            </p>
            <SelectForm contractId={row.original.id} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
