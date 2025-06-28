'use client'

import { Button } from '@/components/ui/button'
import JSZip from 'jszip'
import { DownloadIcon } from 'lucide-react'

function getExtensionFromUrl(url: string) {
  const match = url.match(/\.([a-zA-Z0-9]+)(\?|$)/)
  return match ? match[1] : 'png'
}

export default function DownloadAll({
  urlsArray, // Array of image URLs to download
  contract_id,
}: {
  urlsArray: string[] // Array of URLs to download
  contract_id?: string // Optional contract ID for context
}) {
  const downloadAllImages = async (imageUrls: string[]) => {
    const zip = new JSZip()
    // Descarga cada imagen y la agrega al zip
    await Promise.all(
      imageUrls.map(async (url, idx) => {
        const response = await fetch(url)
        const blob = await response.blob()
        const ext = getExtensionFromUrl(url)
        zip.file(`imagen-${idx + 1}.${ext}`, blob)
      })
    )

    // Genera el zip y lo descarga
    const content = await zip.generateAsync({ type: 'blob' })
    const zipUrl = URL.createObjectURL(content)
    const a = document.createElement('a')
    a.href = zipUrl
    a.download = `sesion-${contract_id}.zip`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(zipUrl)
  }

  return (
    <Button
      className="cursor-pointer"
      onClick={() => downloadAllImages(urlsArray)}
    >
      <DownloadIcon className="inline mr-2 h-4 w-4" />
      Descargar todas las fotos (.zip)
    </Button>
  )
}
