import React from 'react'

export default function BentoItem({
  title,
  description,
  img,
  className,
  children,
}: {
  title: string
  description: string
  img?: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <article
      className={`py-4 px-8 rounded-2xl bg-white  bg-no-repeat shadow-2xl ${className} flex flex-col object-cover relative `}
    >
      <div
        className="absolute inset-0 rounded-2xl bg-cover bg-center"
        style={{ backgroundImage: `url('${img}')` }}
      ></div>

      {children}
      <div className="z-10">
        <h3 className="text-lg md:text-xl font-bold mb-2">{title}</h3>
        <p className="text-md text-balance tracking-wide">{description}</p>
      </div>
    </article>
  )
}
