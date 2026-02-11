import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import CropForm from '../components/CropForm.jsx'
import CropResult from '../components/CropResult.jsx'
import { crops, agriInsights } from '../data/crops.js'

const SEASON_CALENDAR = {
  Kuruvai: [5, 6, 7],
  Samba: [8, 9, 10, 11, 0],
  Navarai: [11, 0, 1, 2],
  Rabi: [9, 10, 11, 0, 1],
  Summer: [3, 4, 5],
  Kharif: [5, 6, 7, 8],
  Annual: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
}

const clamp = (value, min = 0, max = 1) =>
  Math.max(min, Math.min(max, value))

const getCurrentSeason = () => {
  const monthIndex = new Date().getMonth()
  return (
    Object.entries(SEASON_CALENDAR).find(([, months]) =>
      months.includes(monthIndex)
    )?.[0] || 'Annual'
  )
}

const getSeasonScore = (seasons = [], currentSeason) => {
  if (seasons.includes(currentSeason)) return 1
  if (seasons.includes('Annual')) return 0.8
  return seasons.length > 0 ? 0.55 : 0.4
}

const normalizeProfit = (value, min, max) => {
  if (max - min === 0) return 1
  return clamp((value - min) / (max - min))
}

const LoadingGrid = () => (
  <div className="grid gap-10 md:grid-cols-2 justify-items-center">
    {[0, 1].map((item) => (
      <div
        key={item}
        className="h-64 w-full max-w-md animate-pulse rounded-3xl bg-gradient-to-r from-emerald-50 via-white to-emerald-50 shadow-inner"
      />
    ))}
  </div>
)

const Analyze = () => {
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { t, i18n } = useTranslation()

  const handleSuggestion = ({
    soilType,
    waterAvailability,
    district,
  }) => {
    setIsLoading(true)
    setResults([])

    const currentSeason = getCurrentSeason()
    const profitValues = crops.map((crop) => crop.profit)
    const minProfit = Math.min(...profitValues)
    const maxProfit = Math.max(...profitValues)

    const scored = crops
      .map((crop) => {
        const soilScore = crop.soilScores?.[soilType] ?? 0.35
        const waterScore = crop.waterScores?.[waterAvailability] ?? 0.4
        const districtScore = crop.districtScores?.[district] ?? 0.4
        const seasonScore = getSeasonScore(
          crop.seasons || [],
          currentSeason
        )
        const profitScore = normalizeProfit(
          crop.profit,
          minProfit,
          maxProfit
        )

        const totalScore =
          soilScore * 0.3 +
          waterScore * 0.25 +
          districtScore * 0.2 +
          seasonScore * 0.15 +
          profitScore * 0.1

        return {
          ...crop,
          score: totalScore,
          confidence: Math.round(totalScore * 100),
        }
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 2)

    setTimeout(() => {
      setResults(scored)
      setIsLoading(false)
    }, 800)
  }

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'ta' : 'en'
    i18n.changeLanguage(nextLang)
    localStorage.setItem('preferredLanguage', nextLang)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 py-14">
      <div className="mx-auto max-w-7xl px-6">
        {/* Language Toggle */}
        <div className="mb-8 flex justify-end">
          <button
            onClick={toggleLanguage}
            className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm transition hover:bg-emerald-200"
          >
            <span
              className={
                i18n.language === 'en'
                  ? 'text-emerald-900'
                  : 'text-emerald-500'
              }
            >
              EN
            </span>
            <span className="mx-1">|</span>
            <span
              className={
                i18n.language === 'ta'
                  ? 'text-emerald-900'
                  : 'text-emerald-500'
              }
            >
              தமிழ்
            </span>
          </button>
        </div>

        {/* Form Card */}
        <div className="mx-auto mb-14 max-w-2xl rounded-3xl border border-emerald-100 bg-white p-10 shadow-xl">
          <h2 className="mb-6 text-2xl font-semibold text-slate-900">
            {t('cropInput')}
          </h2>
          <CropForm onSubmit={handleSuggestion} isLoading={isLoading} />
        </div>

        {/* Results Section */}
        <section>
          <h2 className="mb-10 text-center text-3xl font-semibold text-slate-900">
            {t('recommended')}
          </h2>

          {isLoading && <LoadingGrid />}

          {!isLoading && results.length === 0 && (
            <p className="text-center text-sm text-slate-500">
              {t('submitPrompt')}
            </p>
          )}

          {!isLoading && results.length > 0 && (
            <AnimatePresence mode="wait">
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid gap-10 md:grid-cols-2 justify-items-center"
              >
                {results.map((crop) => (
                  <CropResult key={crop.id} crop={crop} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </section>

        {/* Agri Insights */}
        <section className="mx-auto mt-20 max-w-4xl rounded-3xl border border-emerald-200 bg-white/90 p-8 shadow-xl">
          <h3 className="text-xl font-semibold text-slate-900">
            {t('agriIntelHeading')}
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            {t('agriIntelSub')}
          </p>

          <ul className="mt-6 space-y-4">
            {agriInsights.map((tip) => (
              <li
                key={tip.id}
                className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4"
              >
                <span className="text-lg">🌱</span>
                <p className="text-sm text-slate-700">
                  {i18n.language === 'ta' ? tip.ta : tip.en}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}

export default Analyze
