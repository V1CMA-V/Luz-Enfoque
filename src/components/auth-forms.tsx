'use client'

import { login } from '@/app/login/actions'
import { KeyRound } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

// Define Zod schema for validation
const authSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export default function AuthForms() {
  const [errors, setErrors] = useState({ email: '', password: '' })

  const handleValidation = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const result = authSchema.safeParse({ email, password })

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors
      setErrors({
        email: fieldErrors.email?.[0] || '',
        password: fieldErrors.password?.[0] || '',
      })
      event.preventDefault()
    } else {
      setErrors({ email: '', password: '' })
    }
  }

  return (
    <form
      className="flex flex-col gap-4 w-96"
      method="post"
      onSubmit={handleValidation}
    >
      <Label htmlFor="email">Email:</Label>
      <Input id="email" name="email" type="email" />
      {errors.email && <span className="text-red-500">{errors.email}</span>}

      <Label htmlFor="password">Password:</Label>
      <Input id="password" name="password" type="password" />
      {errors.password && (
        <span className="text-red-500">{errors.password}</span>
      )}

      <Button variant="outline" className="cursor-pointer" formAction={login}>
        <KeyRound /> Iniciar sesión
      </Button>
    </form>
  )
}
