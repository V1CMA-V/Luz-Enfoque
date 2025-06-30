import { createClient } from '@/utils/supabase/server'

interface PortfolioItem {
  id: string
  created_at: string
  image_url: string
  alt: string
  width: number
  height: number
}

const PortfolioPage = async () => {
  const supabase = await createClient()
  const { data: portfolioItems, error } = await supabase
    .from('portfolio')
    .select('*')

  if (error) {
    console.error('Error fetching portfolio items:', error)
  }

  return (
    <div className="flex flex-col gap-8 items-center justify-center mt-32">
      <h1 className="text-xl md:text-4xl font-bold">Portafolio</h1>

      <div className="grid grid-cols-3 gap-4">
        {portfolioItems?.map((item: PortfolioItem) => (
          <div
            id="portfolio-item"
            key={item.id}
            className="p-4 rounded-2xl shadow-lg bg-white flex flex-col items-center justify-center overflow-hidden"
          >
            <img
              src={item.image_url}
              alt={item.alt}
              className="w-[200px] h-[200px] object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PortfolioPage
