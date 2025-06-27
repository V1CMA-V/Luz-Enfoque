'use client'

import Link from 'next/link'
import * as React from 'react'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

export const MenuList = ({
  best_sellers,
}: {
  best_sellers: { title: string; body: string }[]
}) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Descubre más</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Luz & Enfoque
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Descubre como nuestras pasiones se unen para ofrecerte una
                      experiencia única y enriquecedora. La fotografía siendo
                      una parte fundamental de nuestra identidad.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/portafolio" title="Portafolio">
                Explora nuestro portafolio de fotografía y descubre la magia
                detrás de cada imagen.
              </ListItem>
              <ListItem href="/blog" title="Blog">
                Sumérgete en nuestro blog, donde compartimos historias, consejos
                y reflexiones sobre fotografía.
              </ListItem>
              <ListItem href="/" title="Pendientes">
                Estamos trabajando en nuevas secciones para enriquecer tu
                experiencia. ¡Pronto habrá más sorpresas!
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Servicios populares</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {best_sellers.map((service) => (
                <ListItem key={service.title} title={service.title}>
                  {service.body}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="#contacto">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contacto
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
