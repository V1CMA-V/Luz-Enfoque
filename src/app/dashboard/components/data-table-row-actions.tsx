import { Row } from '@tanstack/react-table'

import { Task } from '@/app/dashboard/data/schema'
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
import ImagesForm from './images-form'

interface DataTableRowActionsProps {
  row: Row<Task>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
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
              Recuerda que la fecha de reservacion es{' '}
              {new Date(row.original.reserv_date).toLocaleDateString()}
            </p>
            <SelectForm contractId={row.original?.id} />

            <ImagesForm contractId={row.original?.id} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
