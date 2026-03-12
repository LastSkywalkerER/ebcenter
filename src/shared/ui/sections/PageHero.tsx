interface PageHeroProps {
  tag: string
  title: string
  description: string
}

export function PageHero({ tag, title, description }: PageHeroProps) {
  return (
    <section
      className='py-[60px]'
      style={{ background: 'linear-gradient(140deg, #1A2E52, #2B4A8A)' }}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='inline-block bg-white/[0.18] text-white/95 text-[12px] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-4'>
          {tag}
        </div>
        <h1 className='text-[clamp(28px,5vw,44px)] font-extrabold text-white leading-tight mb-4'>
          {title}
        </h1>
        <p className='text-[16px] text-white/75 max-w-[640px] leading-[1.7]'>{description}</p>
      </div>
    </section>
  )
}
