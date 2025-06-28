import { Metadata } from 'next'

import { createClient } from '@/utils/supabase/server'
import { columns } from '../components/columns'
import { DataTable } from '../components/data-table'
import { UserNav } from '../components/user-nav'

export const metadata: Metadata = {
  title: 'Tasks',
  description: 'A task and issue tracker build using Tanstack Table.',
}

// Simulate a database read for tasks.

export default async function TaskPage() {
  const supabase = await createClient()
  const { data: contracts } = await supabase
    .from('contracts')
    .select('*, user_id(name, avatar_url), service_id(title, body, slug)')

  return (
    <>
      <div className="w-full flex-1 flex-col gap-8 p-8 flex">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Bienvenido de nuevo!
            </h2>
            <p className="text-muted-foreground">
              Aquí tienes las sesiones pendientes.
            </p>
          </div>
          <div className="flex items-center gap-2 ">
            <UserNav />
          </div>
        </div>
        <DataTable data={contracts || []} columns={columns} />
      </div>
    </>
  )
}
