'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

import Link from 'next/link'
import { labels, priorities, statuses } from '../data/data'
import { Task } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<Task>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha de Reservada" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.reserv_date)

      return <div className="w-[80px]">{date.toLocaleDateString()}</div>
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'etiqueta',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Etiqueta" />
    ),
    cell: ({ row }) => {
      const label = labels.find(
        (label) => label.value === row.original.etiqueta
      )

      return <>{label && <Badge variant="outline">{label.label}</Badge>}</>
    },
  },
  {
    accessorKey: 'nota',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mensaje" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate font-medium">
          {row.original.nota}
        </span>
      )
    },
  },
  {
    accessorKey: 'para',
    header: () => 'Para:',
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <Link href={`/users/${row.original.id}`}>
            <span className="max-w-[500px] truncate font-medium">
              {row.original.user_id.name}
            </span>
          </Link>
        </div>
      )
    },
  },
  {
    accessorKey: 'estatus',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estatus" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.original.estatus
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center gap-2">
          {status.icon && (
            <status.icon className="text-muted-foreground size-4" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'prioridad',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Prioridad" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.original.prioridad
      )

      if (!priority) {
        return null
      }

      return (
        <div className="flex items-center gap-2">
          {priority.icon && (
            <priority.icon className="text-muted-foreground size-4" />
          )}
          <span>{priority.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
