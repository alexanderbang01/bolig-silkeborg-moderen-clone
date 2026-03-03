import { Link } from 'react-router-dom'
import { Home, Heart, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-forest-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <div className="w-8 h-8 bg-forest-500 rounded-lg flex items-center justify-center group-hover:bg-forest-400 transition-colors duration-200">
                <Home size={16} className="text-white" />
              </div>
              <span className="font-display font-semibold text-xl tracking-tight">
                Bolig<span className="text-forest-400">Silkeborg</span>
              </span>
            </Link>
            <p className="text-forest-300 text-sm leading-relaxed max-w-xs">
              Din lokale boligplatform for Silkeborg og omegn. Find din næste lejlighed, hus eller rækkehus her.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-1">Navigation</h4>
            <Link to="/" className="text-forest-300 hover:text-white text-sm transition-colors duration-200">Forside</Link>
            <Link to="/boliger" className="text-forest-300 hover:text-white text-sm transition-colors duration-200">Boliger</Link>
            <Link to="/favoritter" className="text-forest-300 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1.5">
              Favoritter
            </Link>
            <Link to="/profil" className="text-forest-300 hover:text-white text-sm transition-colors duration-200">Min profil</Link>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-1">Kontakt</h4>
            <a href="mailto:kontakt@boligsilkeborg.dk" className="text-forest-300 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2">
              <Mail size={14} /> kontakt@boligsilkeborg.dk
            </a>
            <a href="tel:+4587654321" className="text-forest-300 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2">
              <Phone size={14} /> +45 87 65 43 21
            </a>
            <p className="text-forest-400 text-xs mt-2">
              Åbningstider: Man–Fre 9–17
            </p>
          </div>
        </div>

        <div className="border-t border-forest-700 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-forest-400 text-xs">
            © {new Date().getFullYear()} BoligSilkeborg. Alle rettigheder forbeholdes.
          </p>
          <p className="text-forest-500 text-xs flex items-center gap-1">
            Lavet med <Heart size={11} className="text-forest-400" /> i Silkeborg
          </p>
        </div>
      </div>
    </footer>
  )
}