import { createClient } from '@/utils/supabase/server'

export default async function Hero() {
  const supabase = await createClient()
  const { data: user } = await supabase.auth.getUser()
  const userData = user?.user?.user_metadata

  return (
    <div className="flex flex-col items-center justify-center h-[75dvh] bg-gradient-to-br from-blue-500 to-purple-500 p-6 w-full text-white">
      <h1 className="text-4xl font-extrabold mb-6">Panel de Control</h1>
      <p className="text-lg mb-4">
        Bienvenido, <strong>{userData?.name || 'Usuario'}</strong>. Aquí puedes
        gestionar tu cuenta y explorar las opciones disponibles.
      </p>
      {userData?.avatar_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={userData.avatar_url}
          alt={userData?.name || 'Avatar'}
          className="rounded-full border-4 border-white shadow-lg mb-4"
          width={120}
          height={120}
        />
      )}
      <div className="flex space-x-4 mt-6">
        <button className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-lg shadow-md transition">
          Editar Perfil
        </button>
        <button className="px-4 py-2 bg-red-700 hover:bg-red-800 rounded-lg shadow-md transition">
          Cerrar Sesión
        </button>
      </div>
    </div>
  )
}
