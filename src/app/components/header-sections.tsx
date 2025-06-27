export default function HeaderSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <header className="w-full flex-col md:flex-row flex items-center text-center md:text-left text-balance justify-between">
      <h2 className="text-2xl md:text-4xl font-bold mb-4 flex-1">{title}</h2>

      <p className="text-secondary mb-6 flex-1">{children}</p>
    </header>
  )
}
