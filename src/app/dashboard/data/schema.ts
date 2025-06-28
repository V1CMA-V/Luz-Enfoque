import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  user_id: z.object({
    name: z.string(),
    avatar_url: z.string(),
  }),
  service_id: z.object({
    title: z.string(),
    body: z.string(),
    slug: z.string(),
  }),
  nota: z.string(),
  estatus: z.string(),
  reserv_date: z.date(),
  created_at: z.date(),
  prioridad: z.string().optional(),
  etiqueta: z.string().optional(),
})

export type Task = z.infer<typeof taskSchema>
