interface PricingCardProps {
  title: string
  description: string
  features: string[]
  ctaText: string
  isFeatured?: boolean
  featuredBadge?: string
  onCtaClick: () => void
}

export function PricingCard({
  title,
  description,
  features,
  ctaText,
  isFeatured,
  featuredBadge,
  onCtaClick,
}: PricingCardProps) {
  return (
    <div
      className={`relative flex flex-col gap-5 rounded-xl p-8 bg-white ${
        isFeatured
          ? 'border-2 border-blue-600 shadow-[0_0_0_1px_rgb(37,99,235,0.3)]'
          : 'border-[1.5px] border-slate-200'
      }`}
    >
      {isFeatured && featuredBadge && (
        <div className='absolute top-[-12px] left-7 bg-blue-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full tracking-wide'>
          {featuredBadge}
        </div>
      )}
      <div>
        <h3 className='text-xl font-bold text-slate-900'>{title}</h3>
        <p className='mt-2 text-sm text-slate-500 leading-relaxed'>{description}</p>
      </div>
      <ul className='flex flex-col gap-2.5 flex-1'>
        {features.map((f, i) => (
          <li key={i} className='relative pl-5 text-sm text-slate-500 leading-snug'>
            <span className='absolute left-0 text-blue-600 font-bold text-xs'>—</span>
            {f}
          </li>
        ))}
      </ul>
      <button
        onClick={onCtaClick}
        className={`w-full py-2.5 px-5 rounded-lg text-sm font-semibold transition-colors ${
          isFeatured
            ? 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
            : 'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
        }`}
      >
        {ctaText}
      </button>
    </div>
  )
}
