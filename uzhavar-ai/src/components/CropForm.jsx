import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const CropForm = ({ onSubmit, isLoading = false }) => {
  const [district, setDistrict] = useState('Coimbatore')
  const [soilType, setSoilType] = useState('Red')
  const [waterAvailability, setWaterAvailability] = useState('Medium')
  const { t } = useTranslation()
  const districtOptions = ['Coimbatore', 'Thanjavur', 'Madurai', 'Salem']
  const soilOptions = ['Red', 'Clay', 'Loamy']
  const waterOptions = ['Low', 'Medium', 'High']

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({ district, soilType, waterAvailability })
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-emerald-700">{t('cropInput')}</p>
        <h3 className="mb-4 font-display text-3xl font-semibold text-slate-900">{t('findBest')}</h3>
        <p className="text-base text-gray-600">{t('heroSub')}</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">{t('district')}</label>
          <select
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 transition focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 hover:border-emerald-200"
            value={district}
            onChange={(event) => setDistrict(event.target.value)}
          >
            {districtOptions.map((option) => (
              <option key={option} value={option}>
                {t(`districtNames.${option}`)}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">{t('soilType')}</label>
          <select
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 transition focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 hover:border-emerald-200"
            value={soilType}
            onChange={(event) => setSoilType(event.target.value)}
          >
            {soilOptions.map((option) => (
              <option key={option} value={option}>
                {t(`soilNames.${option}`)}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">{t('waterAvailability')}</label>
          <select
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 transition focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 hover:border-emerald-200"
            value={waterAvailability}
            onChange={(event) => setWaterAvailability(event.target.value)}
          >
            {waterOptions.map((option) => (
              <option key={option} value={option}>
                {t(`waterLevels.${option}`)}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full rounded-xl py-3 font-semibold transition duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-green-300 ${
            isLoading
              ? 'cursor-wait bg-emerald-400 text-emerald-950 shadow-[0_0_28px_rgba(16,185,129,0.85)] ring-2 ring-emerald-200/70 animate-pulse'
              : 'bg-green-600 text-white shadow-md hover:bg-green-700'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2 text-sm">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-900/30 border-t-emerald-900" />
              {t('generating')}
            </span>
          ) : (
            t('generate')
          )}
        </button>
      </form>
    </div>
  )
}

export default CropForm
