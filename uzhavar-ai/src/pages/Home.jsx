import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Home = () => {
  const { t, i18n } = useTranslation()
  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'ta' : 'en'
    i18n.changeLanguage(nextLang)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('preferredLanguage', nextLang)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-600 via-green-500 to-teal-600 bg-[length:200%_200%] animate-gradient">
      <div className="absolute right-6 top-6 z-20">
        <button
          type="button"
          onClick={toggleLanguage}
          className="group flex items-center gap-1 rounded-full bg-white/20 p-1 text-xs font-semibold text-white backdrop-blur transition hover:bg-white/30"
        >
          <span
            className={`rounded-full px-3 py-1 transition ${
              i18n.language === 'en'
                ? 'bg-white/90 text-emerald-700 shadow'
                : 'text-white/70'
            }`}
          >
            EN
          </span>
          <span
            className={`rounded-full px-3 py-1 transition ${
              i18n.language === 'ta'
                ? 'bg-white/90 text-emerald-700 shadow'
                : 'text-white/70'
            }`}
          >
            தமிழ்
          </span>
        </button>
      </div>

      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="paddy-lines" />
        <div className="paddy-particles" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center text-white">
        <p className="text-sm uppercase tracking-[0.4em] text-white/70">{t('heroBadge')}</p>
        <h1 className="mt-4 text-5xl font-bold leading-tight md:text-6xl">{t('heroTitle')}</h1>
        <p className="mt-6 max-w-2xl text-lg text-white/90">{t('heroSub')}</p>
        <Link
          to="/analyze"
          className="mt-8 inline-block rounded-2xl bg-white px-8 py-4 text-lg font-semibold text-green-700 shadow-xl transition duration-300 hover:scale-105 hover:shadow-2xl"
        >
          {t('startAnalysis')}
        </Link>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {[t('featureAI'), t('featureMarket'), t('featureTamil')].map((label) => (
            <span
              key={label}
              className="rounded-full bg-white/20 px-4 py-2 text-sm text-white/90 backdrop-blur shadow-inner shadow-white/20"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="hero-wave z-10" aria-hidden="true">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#ECFDF5"
            d="M0,192L80,176C160,160,320,128,480,138.7C640,149,800,203,960,197.3C1120,192,1280,128,1360,96L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>
      </div>
    </main>
  )
}

export default Home
