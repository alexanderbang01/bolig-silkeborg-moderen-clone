import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Heart,
  Shield,
  Users,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Award,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
}

const team = [
  {
    name: 'Anders Møller',
    role: 'Grundlægger & CEO',
    initials: 'AM',
    from: 'bg-gradient-to-br from-forest-400 to-forest-700',
    bio: 'Anders har over 15 års erfaring inden for ejendomsmarkedet i Silkeborg og grundlagde BoligSilkeborg i 2010 med visionen om at gøre boligmarkedet mere tilgængeligt.',
  },
  {
    name: 'Camilla Dahl',
    role: 'Kundechef',
    initials: 'CD',
    from: 'bg-gradient-to-br from-lake-400 to-lake-700',
    bio: 'Camilla sørger for at både lejere og udlejere altid har en god oplevelse. Hun brænder for at hjælpe mennesker med at finde det perfekte sted at bo.',
  },
  {
    name: 'Rasmus Holm',
    role: 'Teknisk direktør',
    initials: 'RH',
    from: 'bg-gradient-to-br from-sand-400 to-sand-600',
    bio: 'Rasmus er ansvarlig for vores digitale platform og sikrer at BoligSilkeborg altid er hurtig, sikker og nem at bruge for alle.',
  },
  {
    name: 'Sofie Vestergaard',
    role: 'Ejendomsmægler',
    initials: 'SV',
    from: 'bg-gradient-to-br from-purple-400 to-purple-700',
    bio: 'Sofie har indgående kendskab til boligmarkedet i hele Silkeborg-egnen og rådgiver dagligt lejere og udlejere om markedet.',
  },
]

const values = [
  {
    icon: Heart,
    title: 'Passion for boliger',
    desc: 'Vi elsker det vi laver. Hver dag arbejder vi for at hjælpe mennesker med at finde det perfekte sted at kalde hjem.',
    color: 'bg-red-50 text-red-500',
  },
  {
    icon: Shield,
    title: 'Tryghed og tillid',
    desc: 'Alle vores udlejere er verificerede og vi garanterer en tryg og transparent boligoplevelse fra start til slut.',
    color: 'bg-forest-50 text-forest-600',
  },
  {
    icon: Users,
    title: 'Lokalt fællesskab',
    desc: 'Vi er fra Silkeborg og kender området. Vi er stolte af at bidrage til et levende og inkluderende lokalt fællesskab.',
    color: 'bg-lake-50 text-lake-600',
  },
  {
    icon: Award,
    title: 'Kvalitet i alt',
    desc: 'Fra vores platform til vores kundeservice stræber vi altid efter den højeste kvalitet i alt hvad vi gør.',
    color: 'bg-amber-50 text-amber-600',
  },
]

const stats = [
  { value: '120+', label: 'Aktive boliger' },
  { value: '850+', label: 'Tilfredse lejere' },
  { value: '15 år', label: 'Erfaring på markedet' },
  { value: '4.8★', label: 'Gennemsnitlig bedømmelse' },
]

const timeline = [
  {
    year: '2010',
    title: 'BoligSilkeborg grundlægges',
    desc: 'Anders Møller stifter BoligSilkeborg med visionen om at forenkle boligmarkedet lokalt.',
  },
  {
    year: '2013',
    title: 'Første 100 boliger',
    desc: 'Vi når milepælen på 100 aktive boliger og udvider teamet med 3 nye medarbejdere.',
  },
  {
    year: '2017',
    title: 'Digital transformation',
    desc: 'Vi lancerer vores nye digitale platform med avanceret filtrering og favoritfunktion.',
  },
  {
    year: '2020',
    title: 'Udvidelse til hele regionen',
    desc: 'BoligSilkeborg udvider til at dække hele Silkeborg-egnen inkl. Them, Sejs og Virklund.',
  },
  {
    year: '2024',
    title: 'Ny moderne platform',
    desc: 'Vi lancerer en helt ny, moderne platform med endnu bedre brugeroplevelse og flere funktioner.',
  },
]

export default function OmOs() {
  return (
    <div className="pt-16 min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest-800 py-24">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80)',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white/80 text-sm font-medium mb-6">
              <MapPin size={14} /> Silkeborg, Danmark
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Vi hjælper dig med at finde{' '}
              <span className="text-forest-300 italic">dit hjem</span>
            </h1>
            <p className="text-forest-200 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
              BoligSilkeborg er Silkeborgs mest betroede boligplatform. Siden
              2010 har vi hjulpet hundredvis af familier, par og enkeltpersoner
              med at finde den perfekte bolig.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold font-display text-forest-700 mb-1">
                  {s.value}
                </div>
                <div className="text-gray-500 text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-bold text-forest-500 uppercase tracking-widest mb-3 block">
                Vores mission
              </span>
              <h2 className="font-display text-4xl font-bold text-gray-900 mb-6 leading-tight">
                At gøre det nemt at finde et godt sted at bo i Silkeborg
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Vi tror på at alle fortjener et hjem de er glade for. Derfor
                arbejder vi hver dag på at gøre boligmarkedet i Silkeborg mere
                transparent, tilgængeligt og trygt – for både lejere og
                udlejere.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Vores platform giver dig adgang til alle ledige boliger i
                Silkeborg og omegn, med detaljerede informationer, billeder og
                mulighed for at filtrere præcis efter dine behov. Vi er ikke
                bare en hjemmeside – vi er dit lokale boligteam.
              </p>
              <Link to="/boliger" className="btn-primary">
                Se alle boliger <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80"
                alt=""
                className="rounded-2xl object-cover w-full h-48 shadow-card"
              />
              <img
                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80"
                alt=""
                className="rounded-2xl object-cover w-full h-48 shadow-card mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80"
                alt=""
                className="rounded-2xl object-cover w-full h-48 shadow-card"
              />
              <img
                src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80"
                alt=""
                className="rounded-2xl object-cover w-full h-48 shadow-card mt-8"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-xs font-bold text-forest-500 uppercase tracking-widest mb-3 block">
              Vores værdier
            </span>
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Det vi tror på
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Vores værdier er fundamentet for alt hvad vi gør – hver dag og i
              hvert møde med vores kunder.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="card p-6 hover:-translate-y-1 transition-transform duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${v.color} flex items-center justify-center mb-4`}
                >
                  <v.icon size={22} />
                </div>
                <h3 className="font-display font-semibold text-lg text-gray-900 mb-2">
                  {v.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-xs font-bold text-forest-500 uppercase tracking-widest mb-3 block">
              Vores historie
            </span>
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Fra idé til Silkeborgs bedste boligside
            </h2>
          </motion.div>

          <div className="flex flex-col gap-0">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-6"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-forest-600 rounded-2xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm">
                    {item.year}
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-0.5 h-12 bg-forest-200 my-1" />
                  )}
                </div>
                <div className="pb-10">
                  <h3 className="font-display font-semibold text-lg text-gray-900 mb-1 mt-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-xs font-bold text-forest-500 uppercase tracking-widest mb-3 block">
              Teamet
            </span>
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Mød folkene bag BoligSilkeborg
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Vi er et passioneret team af boligeksperter, der alle bor og
              arbejder i Silkeborg.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="card p-6 text-center"
              >
                <div
                  className={`w-20 h-20 rounded-2xl ${member.from} flex items-center justify-center text-white text-2xl font-bold font-display mx-auto mb-4 shadow-sm`}
                >
                  {member.initials}
                </div>
                <h3 className="font-display font-semibold text-lg text-gray-900 mb-0.5">
                  {member.name}
                </h3>
                <p className="text-forest-600 text-xs font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-forest-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-5">
              Har du spørgsmål?
            </h2>
            <p className="text-forest-200 text-lg mb-10 max-w-xl mx-auto">
              Vi er altid klar til at hjælpe. Kontakt os på telefon eller mail –
              vi svarer inden for 24 timer på hverdage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:kontakt@boligsilkeborg.dk"
                className="btn-primary bg-white text-forest-800 hover:bg-forest-50 justify-center inline-flex items-center gap-2"
              >
                <Mail size={16} /> kontakt@boligsilkeborg.dk
              </a>

              <a
                href="tel:+4587654321"
                className="btn-secondary bg-transparent text-white border-white/30 hover:bg-white/10 hover:border-white/50 justify-center inline-flex items-center gap-2"
              >
                <Phone size={16} /> +45 87 65 43 21
              </a>
            </div>
            <div className="flex items-center justify-center gap-2 mt-6 text-forest-300 text-sm">
              <Clock size={14} />
              Åbningstider: Mandag–Fredag kl. 9–17
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}