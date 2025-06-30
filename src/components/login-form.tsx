import { Camera } from 'lucide-react'

import { cn } from '@/lib/utils'
import AuthForms from './auth-forms'
import AuthGithub from './auth-github'
import AuthGoogle from './auth-google'

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <a href="#" className="flex flex-col items-center gap-2 font-medium">
            <div className="flex size-8 items-center justify-center rounded-md">
              <Camera className="size-6" />
            </div>
            <span className="sr-only">Luz & Enfoque</span>
          </a>
          <h1 className="text-xl font-bold">Bienvenido a Luz & Enfoque</h1>
          <div className="text-center text-sm">
            No tienes una cuenta?{' '}
            <a href="/register" className="underline underline-offset-4">
              Regístrate
            </a>
          </div>
        </div>

        <AuthForms />

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            O iniciar sesión con
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <AuthGithub />

          <AuthGoogle />
        </div>
      </div>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Al hacer clic en continuar, aceptas nuestros{' '}
        <a href="#">Términos de Servicio</a> y{' '}
        <a href="#">Política de Privacidad</a>.
      </div>
    </div>
  )
}
