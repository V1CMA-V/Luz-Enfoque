'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { createClient } from '@/utils/supabase/client'
import { Input } from './ui/input'

const FormSchema = z.object({
  dob: z.date({
    required_error: 'A date of birth is required.',
  }),
  notes: z.string().optional(),
})

export function DatePickerForm({
  service_id,
  user_id,
  slug,
}: {
  service_id?: string
  user_id?: string
  slug?: string
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const supabase = await createClient()

    const { data: services } = await supabase
      .from('services')
      .select('*')
      .eq('id', service_id)
      .single()

    console.log('services', services)
    const contractData = {
      title: services?.title,
      description: services?.body,
      image: services?.image,
      price: services?.price,
      user_id: user_id,
      // para el contrato
      service_id: service_id,
      nota: data.notes,
      slug: slug,
      reserv_date: data.dob.toISOString().split('T')[0], // Formato YYYY-MM-DD
    }

    const rest = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify(contractData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const session = await rest.json()

    window.location = session?.url

    toast('You submitted the following values', {
      description: (
        <>
          <p>El id: del usuario es {user_id}</p>
          <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
            <code className="text-white">
              {JSON.stringify(contractData, null, 2)}
            </code>
          </pre>
        </>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha de reserva</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPPP', { locale: es })
                      ) : (
                        <span>Elija una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    captionLayout="dropdown"
                    locale={es}
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Esta fecha se utilizará para la reserva de su cita.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Notas</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Puede agregar cualquier nota adicional para su reserva."
                  className="w-full"
                />
              </FormControl>
              <FormDescription>
                Puede agregar cualquier nota adicional para su reserva.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  )
}
