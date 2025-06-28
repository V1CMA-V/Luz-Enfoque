'use client'

import { Table } from '@tanstack/react-table'
import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from './data-table-view-options'

import { priorities, slugs, statuses } from '../data/data'
import { DataTableFacetedFilter } from './data-table-faceted-filter'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  console.log(table.getColumn('status'))

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="Filtrar por mensaje..."
          value={(table.getColumn('nota')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('nota')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('etiqueta') && (
          <DataTableFacetedFilter
            column={table.getColumn('etiqueta')}
            title="Etiqueta"
            options={slugs}
          />
        )}
        {table.getColumn('estatus') && (
          <DataTableFacetedFilter
            column={table.getColumn('estatus')}
            title="Estatus"
            options={statuses}
          />
        )}
        {table.getColumn('prioridad') && (
          <DataTableFacetedFilter
            column={table.getColumn('prioridad')}
            title="Prioridad"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.resetColumnFilters()}
          >
            Reiniciar filtros
            <X />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
