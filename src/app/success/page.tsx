import { PartyPopper } from 'lucide-react'

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <PartyPopper className="h-24 w-24 animate-bounce text-green-500" />

      <h1 className="text-xl md:text-4xl font-bold tracking-wide">
        ¡Gracias por su compra!
      </h1>
      <p className="mt-2 text-lg">Su pago ha sido procesado con éxito.</p>
    </div>
  )
}
