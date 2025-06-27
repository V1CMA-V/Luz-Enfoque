import { promises as fs } from 'fs'
import { Metadata } from 'next'
import path from 'path'
import { z } from 'zod'

import { columns } from '../components/columns'
import { DataTable } from '../components/data-table'
import { UserNav } from '../components/user-nav'
import { taskSchema } from '../data/schema'

export const metadata: Metadata = {
  title: 'Tasks',
  description: 'A task and issue tracker build using Tanstack Table.',
}

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), 'src/app/dashboard/data/task.json')
  )

  const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(tasks)
}

export default async function TaskPage() {
  const tasks = await getTasks()

  return (
    <>
      <div className="hidden h-full flex-1 flex-col gap-8 p-8 md:flex">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Bienvenido de nuevo!
            </h2>
            <p className="text-muted-foreground">
              Aquí tienes las sesiones pendientes.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <UserNav />
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  )
}
