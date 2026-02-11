const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-green-900 to-green-700 py-24 text-white">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="text-sm font-medium text-emerald-100">Tamil Nadu Focused</p>
        <h2 className="mt-4 text-5xl font-bold leading-tight md:text-6xl">
          Smart Crop &amp; Market Intelligence for Tamil Farmers
        </h2>
        <p className="mt-6 text-lg opacity-90">
          Get crop suggestions based on soil and water conditions, plus ideal selling months
          to maximize profit across Tamil Nadu districts.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#form-section"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-green-800 shadow-lg transition hover:scale-105"
          >
            Get Crop Suggestions
          </a>
          <button className="rounded-full border border-white/60 px-8 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10">
            Explore Market Insights
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
