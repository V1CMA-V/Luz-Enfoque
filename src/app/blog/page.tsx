import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function BlogPage() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from('posts')
    .select('*, creator_id(name, avatar_url)')

  return (
    <div className="w-full flex flex-col items-center justify-center gap-8">
      <section className="w-full h-[50dvh] flex flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-2xl font-semibold">Blog</h1>
        <p className="mt-4">Aquí encontrarás artículos interesantes.</p>
      </section>

      <div className="w-full max-w-7xl m-auto p-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts?.length ? (
          posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-lg p-6 mb-4 border border-gray-100"
            >
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-700 mb-4">{post.body}</p>
              <p className="text-sm text-gray-500">
                Escrito por {post.creator_id.name}
              </p>

              <Link href={`/blog/${post.id}`}>
                <Button variant="outline" className="mt-4 cursor-pointer">
                  Leer más
                </Button>
              </Link>
            </article>
          ))
        ) : (
          <p>No hay artículos disponibles en este momento.</p>
        )}
      </div>
    </div>
  )
}
