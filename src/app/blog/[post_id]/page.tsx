import { createClient } from '@/utils/supabase/server'

interface BlogPostPageProps {
  params: {
    post_id: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const supabase = await createClient()

  const { data: post } = await supabase
    .from('posts')
    .select('*, creator_id(name, avatar_url)')
    .eq('id', params.post_id)
    .single()

  if (!post) {
    return <p>Post not found</p>
  }

  return (
    <div className="w-full max-w-2xl m-auto p-4 mt-16">
      <article className="bg-white rounded-xl shadow-lg p-6 mb-4 border border-gray-100">
        <div className="mb-4">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        </div>

        <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
        {post.content.map((paragraph: string, index: number) => (
          <p key={index} className="text-gray-700 mb-4">
            {paragraph}
          </p>
        ))}
        <p className="text-sm text-gray-500">
          Escrito por {post.creator_id.name}
        </p>
      </article>
    </div>
  )
}
