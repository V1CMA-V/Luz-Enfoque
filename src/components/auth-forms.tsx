'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'
import { Input } from './ui/input'

const authSchema = z.object({
  email: z.string().email('Debe ser un correo válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

type AuthFormValues = z.infer<typeof authSchema>

export default function AuthForms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
  })

  const onSubmit = (data: AuthFormValues) => {
    console.log('Datos del formulario:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Correo</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register('email')}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}

          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            {...register('password')}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        <Button type="submit" className="w-full">
          Iniciar sesión
        </Button>
      </div>
    </form>
  )
}
