import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, MapPin, ArrowRight, Home, Building2, TreePine } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' },
  }),
}

const stats = [
  { label: 'Aktive boliger', value: '120+' },
  { label: 'Tilfredse lejere', value: '850+' },
  { label: 'Områder dækket', value: '12' },
]

const features = [
  {
    icon: Home,
    title: 'Lejligheder',
    desc: 'Moderne lejligheder centralt i Silkeborg og nærliggende byområder.',
    color: 'bg-lake-50 text-lake-600',
    link: '/boliger?type=Lejlighed',
  },
  {
    icon: TreePine,
    title: 'Huse',
    desc: 'Familievenlige huse med have i naturskønne omgivelser.',
    color: 'bg-forest-50 text-forest-600',
    link: '/boliger?type=Hus',
  },
  {
    icon: Building2,
    title: 'Rækkehuse',
    desc: 'Praktiske rækkehuse med terrasse og fælles grønne arealer.',
    color: 'bg-sand-50 text-sand-600',
    link: '/boliger?type=Rækkehus',
  },
]

const areas = [
  { name: 'Silkeborg', count: 45, img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80' },
  { name: 'Virklund', count: 18, img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80' },
  { name: 'Sejs', count: 12, img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80' },
  { name: 'Them', count: 9, img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80' },
]

const testimonials = [
  {
    name: 'Sara Lindqvist',
    initials: 'SL',
    area: 'Silkeborg',
    text: 'Vi fandt vores drømmelejlighed på under en uge. Siden er super nem at bruge og udlejeren var fantastisk.',
    rating: 5,
  },
  {
    name: 'Mikkel Dahl',
    initials: 'MD',
    area: 'Virklund',
    text: 'Endelig en boligside der er nem at navigere. Filtreringen gjorde det hurtigt at finde præcis hvad vi søgte.',
    rating: 5,
  },
  {
    name: 'Louise Holm',
    initials: 'LH',
    area: 'Sejs',
    text: 'Fantastisk service og en god hjemmeside. Fandt vores hus i Sejs og er super glade for det!',
    rating: 5,
  },
]

export default function Forside() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate('/boliger')
  }

  return (
    <div className="pt-16">

      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-forest-900/80 via-forest-800/60 to-lake-900/50" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={0}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white/90 text-sm font-medium mb-6"
            >
              <MapPin size={14} /> Silkeborg & omegn
            </motion.div>

            <motion.h1
              variants={fadeUp} initial="hidden" animate="visible" custom={1}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 text-balance"
            >
              Find din næste bolig i{' '}
              <span className="text-forest-300 italic">Silkeborg</span>
            </motion.h1>

            <motion.p
              variants={fadeUp} initial="hidden" animate="visible" custom={2}
              className="text-white/75 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl"
            >
              Udforsk hundredvis af boliger i Silkeborg og omegn. Fra hyggelige lejligheder ved søerne til store familievillaer i naturskønne områder.
            </motion.p>

            <motion.form
              variants={fadeUp} initial="hidden" animate="visible" custom={3}
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row gap-3 max-w-xl"
            >
              <div className="flex-1 flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                <Search size={18} className="text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Søg efter område, adresse..."
                  className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 outline-none text-sm"
                />
              </div>
              <button type="submit" className="btn-primary whitespace-nowrap">
                Søg boliger <ArrowRight size={16} />
              </button>
            </motion.form>

            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={4}
              className="flex flex-wrap gap-8 mt-12"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-bold text-white font-display">{s.value}</div>
                  <div className="text-white/60 text-sm">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2"
          >
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Alle boligtyper samlet ét sted
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Uanset om du leder efter en lejlighed, et hus eller et rækkehus, finder du det her.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link to={f.link} className="card p-6 hover:-translate-y-1 transition-transform duration-300 block group">
                  <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-4`}>
                    <f.icon size={22} />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-gray-900 mb-2 group-hover:text-forest-700 transition-colors">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">{f.desc}</p>
                  <span className="text-forest-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Se {f.title.toLowerCase()} <ArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <h2 className="font-display text-4xl font-bold text-gray-900 mb-3">Populære områder</h2>
              <p className="text-gray-500 text-lg">Udforsk boliger i de mest eftertragtede områder</p>
            </div>
            <Link to="/boliger" className="btn-secondary hidden sm:flex">
              Se alle boliger <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {areas.map((area, i) => (
              <motion.div
                key={area.name}
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link
                  to={`/boliger?area=${area.name}`}
                  className="group relative block rounded-2xl overflow-hidden aspect-[3/4] shadow-card hover:shadow-card-hover transition-shadow duration-300"
                >
                  <img src={area.img} alt={area.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-display font-semibold text-xl">{area.name}</h3>
                    <p className="text-white/70 text-sm">{area.count} boliger</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link to="/boliger" className="btn-secondary">Se alle boliger <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">Hvad siger vores brugere?</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Tusindvis af lejere har fundet deres drømmebolig via BoligSilkeborg.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card p-6"
              >
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-forest-400 to-forest-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.area}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">Sådan finder du din bolig</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Fra søgning til nøgler i hånden – vi guider dig hele vejen.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Søg og filtrer', desc: 'Brug vores avancerede filtre til at finde boliger der matcher dine ønsker og budget.', icon: Search },
              { step: '02', title: 'Gem favoritter', desc: 'Opret en gratis bruger og gem de boliger du er interesseret i til senere.', icon: Home },
              { step: '03', title: 'Book fremvisning', desc: 'Kontakt udlejer direkte og book en fremvisning på et tidspunkt der passer dig.', icon: MapPin },
              { step: '04', title: 'Flyt ind', desc: 'Underskriv lejekontrakt digitalt og modtag dine nøgler. Velkommen hjem!', icon: ArrowRight },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 bg-forest-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <item.icon size={22} className="text-white" />
                </div>
                <div className="text-xs font-bold text-forest-400 tracking-widest mb-2">{item.step}</div>
                <h3 className="font-display font-semibold text-lg text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - only shown when NOT logged in */}
      {!user && (
        <section className="py-24 bg-forest-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-5">
                Klar til at finde din nye bolig?
              </h2>
              <p className="text-forest-200 text-lg mb-10 max-w-xl mx-auto">
                Opret en gratis bruger og gem dine favoritboliger, så du aldrig mister overblikket.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/opret-bruger" className="btn-primary bg-white text-forest-800 hover:bg-forest-50">
                  Opret gratis bruger <ArrowRight size={16} />
                </Link>
                <Link to="/boliger" className="btn-secondary bg-transparent text-white border-white/30 hover:bg-white/10 hover:border-white/50">
                  Se alle boliger
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

    </div>
  )
}