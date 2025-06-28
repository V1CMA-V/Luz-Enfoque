'use client'

import { Button } from '@/components/ui/button'

const mimeToExt: { [key: string]: string } = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
  'image/gif': 'gif',
  'image/bmp': 'bmp',
  'image/svg+xml': 'svg',
  // puedes agregar más tipos según lo que subas
}

export default function DownloadIndividual({
  image_url,
  index,
}: {
  image_url: string
  index?: number
}) {
  const url = image_url || 'https://example.com/default-image.png'

  const handleDownload = async (
    url: string | URL | Request,
    filenameBase = 'mi-foto'
  ) => {
    const response = await fetch(url)
    const blob = await response.blob()
    // Obtenemos el content-type
    const contentType = response.headers.get('content-type') || ''
    // Buscamos la extensión
    const ext = mimeToExt[contentType] || 'png' // fallback a png
    // Preparamos el nombre real del archivo
    const filename = `${filenameBase}.${ext}`

    const objectUrl = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = objectUrl
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(objectUrl)
  }

  return (
    <Button
      variant={'outline'}
      className="cursor-pointer"
      onClick={() => handleDownload(url, `mi-foto-${(index ?? 0) + 1}`)}
    >
      Descargar imagen
    </Button>
  )
}
