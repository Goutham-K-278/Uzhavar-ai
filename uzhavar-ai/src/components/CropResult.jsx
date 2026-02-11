import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  CalendarDays,
  Droplet,
  Gauge,
  TrendingUp,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

const riskClasses = {
  Low: 'bg-emerald-100 text-emerald-700',
  Medium: 'bg-amber-100 text-amber-700',
  High: 'bg-rose-100 text-rose-700',
}

const CropResult = ({ crop }) => {
  const { t, i18n } = useTranslation()

  const confidenceValue =
    crop.confidence ?? Math.round((crop.score || 0) * 100)

  const riskBadge =
    riskClasses[crop.risk] || 'bg-slate-100 text-slate-700'

  const [displayProfit, setDisplayProfit] = useState(crop.profit)
  const previousProfitRef = useRef(crop.profit)

  // Profit animation
  useEffect(() => {
    let frame
    const duration = 700
    const startValue = previousProfitRef.current
    const change = crop.profit - startValue
    const startTime = performance.now()

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setDisplayProfit(Math.round(startValue + change * eased))

      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      } else {
        previousProfitRef.current = crop.profit
      }
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [crop.profit])

  const confidenceBarWidth = `${Math.min(confidenceValue, 100)}%`

  return (
    <motion.article
      whileHover={{
        scale: 1.015,
        boxShadow: '0 30px 60px rgba(16,185,129,0.25)',
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-xl ring-1 ring-emerald-100"
    >
      {/* HEADER */}
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.35em] text-emerald-400">
          {t('recommended')}
        </p>

        <h4 className="text-2xl font-semibold text-slate-900">
          {crop.name}
        </h4>

        <p className="text-sm text-emerald-600">
          {crop.tamilName}
        </p>
      </header>

      {/* PROFIT SECTION */}
      <div className="mt-6 flex items-center gap-4">
        <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700">
          <TrendingUp className="h-6 w-6" />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500">
            {t('expectedProfit')}
          </p>

          <p className="text-5xl font-black leading-tight text-emerald-900">
            ₹{displayProfit.toLocaleString()}
          </p>
        </div>
      </div>

      {/* METRICS GRID */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">

        {/* CONFIDENCE */}
        <div className="flex flex-col justify-between rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm h-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-600">
              <Gauge className="h-4 w-4 text-emerald-500" />
              <span className="text-sm font-semibold">
                {t('confidenceLabel')}
              </span>
            </div>

            <span className="text-lg font-bold text-emerald-700">
              {confidenceValue}%
            </span>
          </div>

          <div className="mt-4 h-2 w-full rounded-full bg-emerald-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-lime-300 transition-all duration-700"
              style={{ width: confidenceBarWidth }}
            />
          </div>
        </div>

        {/* RISK */}
        <div className="flex flex-col justify-between rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm h-full">
          <div className="flex items-center gap-2 text-slate-600">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-semibold">
              {t('riskLabel')}
            </span>
          </div>

          <span
            className={`mt-4 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${riskBadge}`}
          >
            {t(`riskLevels.${crop.risk}`, {
              defaultValue: crop.risk || '-',
            })}
          </span>
        </div>

        {/* WATER */}
        <div className="flex flex-col justify-between rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm h-full">
          <div className="flex items-center gap-2 text-slate-600">
            <Droplet className="h-4 w-4 text-sky-500" />
            <span className="text-sm font-semibold">
              {t('waterNeedTitle')}
            </span>
          </div>

          <span className="mt-4 inline-flex w-fit items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
            {t('waterLabel', { amount: crop.water })}
          </span>
        </div>

        {/* SEASON */}
        <div className="flex flex-col justify-between rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm h-full">
          <div className="flex items-center gap-2 text-slate-600">
            <CalendarDays className="h-4 w-4 text-emerald-500" />
            <span className="text-sm font-semibold">
              {t('seasonLabel')}
            </span>
          </div>

          <div className="mt-4 space-y-1 text-sm text-slate-700">
            <p className="font-medium leading-snug">
              {crop.seasonRecommendation?.[i18n.language] ||
                crop.seasonRecommendation?.en}
            </p>

            <p className="text-xs text-slate-500">
              {t('seasonFocusLabel')}:{' '}
              {t(
                `seasonNames.${crop.seasons?.[0] || 'Annual'}`
              )}
            </p>
          </div>
        </div>

      </div>

      {/* REASON SECTION */}
      <section className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
          {t('reasonLabel')}
        </p>

        <p className="mt-2 text-sm text-emerald-900 leading-relaxed">
          {crop.reasonText?.[i18n.language] ||
            crop.reasonText?.en}
        </p>
      </section>
    </motion.article>
  )
}

export default CropResult