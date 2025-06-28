'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createClient } from '@/utils/supabase/client'
import { priorities, statuses } from '../data/data'

const FormSchema = z.object({
  priority: z.string({
    required_error: 'Por favor, selecciona algun cambio',
  }),
  status: z.string({
    required_error: 'Por favor, selecciona un estado',
  }),
})

export default function SelectForm({ contractId }: { contractId: string }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(dataforms: z.infer<typeof FormSchema>) {
    const supabase = createClient()

    const { error } = await supabase
      .from('contracts')
      .update({ prioridad: dataforms.priority, estatus: dataforms.status })
      .eq('id', contractId)
      .select()

    if (error) {
      toast.error('Error al actualizar el servicio')
    }

    toast('Servicio actualizado con éxito')

    // Reload the page or perform any other action
    window.location.reload()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prioridad</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Selecciona una prioridad" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority.value} value={priority.value}>
                        {priority.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Selecciona un estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="cursor-pointer">
          Submit
        </Button>
      </form>
    </Form>
  )
}
