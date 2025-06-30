'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createClient } from '@/utils/supabase/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const FormSchema = z.object({
  title: z.string({
    required_error: 'Por favor, ingresa el título del post',
  }),

  content: z.string({
    required_error: 'Por favor, ingresa el contenido del post',
  }),

  picture: z
    .array(z.instanceof(File))
    .nonempty('Por favor, selecciona al menos una imagen'),
})

export default function BlogForms() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      picture: [],
    },
  })

  async function onSubmit(dataforms: z.infer<typeof FormSchema>) {
    const supabase = await createClient()
    const { data: user } = await supabase.auth.getUser()

    const id_user = user?.user?.id

    // Convert content into JSON array by splitting paragraphs
    const contentJson = dataforms.content
      .split('\n')
      .filter((paragraph) => paragraph.trim() !== '')

    const uploadedFiles = await Promise.all(
      dataforms.picture.map(async (file): Promise<string | null> => {
        // Separate the file name and extension
        const fileNameParts = file.name.split('.')
        const fileExtension = fileNameParts.pop() // Get the last part as the extension

        const filePath = `${fileNameParts}-${Date.now()}.${fileExtension}`

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
    const { error } = await supabase.from('posts').insert({
      creator_id: id_user,
      title: dataforms.title,
      content: contentJson,
      image_url: uploadedFiles[0],
    })

    if (error) {
      toast.error('Error al actualizar el servicio')

      return
    }

    form.reset() // Reset the form state
    toast('Servicio actualizado con éxito')
  }

  return (
    <div className="w-full flex flex-col items-center justify-center gap-3">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titulo</FormLabel>
                <Input
                  id="title"
                  placeholder="Ingresa el título del post"
                  {...field}
                />

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contenido</FormLabel>
                <Textarea
                  id="content"
                  placeholder="Ingresa el contenido del post"
                  {...field}
                />

                <FormMessage />
              </FormItem>
            )}
          />

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

          <Button type="submit" className="cursor-pointer">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
