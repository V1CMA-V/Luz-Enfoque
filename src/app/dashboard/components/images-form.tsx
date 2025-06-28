'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createClient } from '@/utils/supabase/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const FormSchema = z.object({
  picture: z
    .array(z.instanceof(File))
    .nonempty('Por favor, selecciona al menos una imagen'),

  orientation: z.enum(['ancha', 'larga'], {
    required_error: 'Por favor, selecciona la orientación de las fotos',
  }),
})

export default function ImagesForm({ contractId }: { contractId: string }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      picture: [],
    },
  })

  async function onSubmit(dataforms: z.infer<typeof FormSchema>) {
    const supabase = await createClient()

    const uploadedFiles = await Promise.all(
      dataforms.picture.map(async (file): Promise<string | null> => {
        const filePath = `${file.name}-${Date.now()}`

        const { error } = await supabase.storage
          .from('contracts-images')
          .upload(filePath, file)

        if (error) {
          console.error('Error uploading file:', error)
          return null
        }

        const { data } = supabase.storage
          .from('contracts-images')
          .getPublicUrl(filePath)

        return data.publicUrl
      })
    )

    // Ejemplo de actualización de datos en la base de datos
    const { error } = await supabase.from('contracts_images').insert({
      contract_id: contractId,
      url: uploadedFiles,
      orientation: dataforms.orientation,
    })

    if (error) {
      toast.error('Error al actualizar el servicio')
    }

    toast('Servicio actualizado con éxito')
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="picture"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagenes de la sesión</FormLabel>
                <Input
                  id="picture"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    field.onChange(Array.from(e.target.files || []))
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="orientation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Orientación de las imágenes</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Selecciona una orientación" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ancha">Ancha</SelectItem>
                    <SelectItem value="larga">Larga</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="cursor-pointer">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
