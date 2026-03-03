import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, User, LogOut, Menu, X, Home } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.search])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  const isNavActive = (to) => {
    const [path, query] = to.split('?')
    if (path !== location.pathname) return false
    if (!query) return location.search === ''
    const params = new URLSearchParams(query)
    const currentParams = new URLSearchParams(location.search)
    for (const [key, val] of params.entries()) {
      if (currentParams.get(key) !== val) return false
    }
    return true
  }

  const navLinks = [
    { to: '/', label: 'Forside' },
    { to: '/boliger?type=Lejlighed', label: 'Lejligheder' },
    { to: '/boliger?type=Hus', label: 'Huse & Rækkehuse' },
    { to: '/om-os', label: 'Om os' },
  ]

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-forest-100'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-8 h-8 bg-forest-600 rounded-lg flex items-center justify-center group-hover:bg-forest-700 transition-colors duration-200">
              <Home size={16} className="text-white" />
            </div>
            <span className="font-display font-semibold text-xl text-forest-800 tracking-tight">
              Bolig<span className="text-forest-500">Silkeborg</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isNavActive(link.to)
                    ? 'bg-forest-50 text-forest-700'
                    : 'text-gray-600 hover:text-forest-700 hover:bg-forest-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            {user ? (
              <>
                <Link
                  to="/favoritter"
                  className={`btn-ghost text-sm ${isActive('/favoritter') ? 'bg-forest-50 text-forest-700' : ''}`}
                >
                  <Heart size={16} /> Favoritter
                </Link>
                <Link
                  to="/profil"
                  className={`btn-ghost text-sm ${isActive('/profil') ? 'bg-forest-50 text-forest-700' : ''}`}
                >
                  <User size={16} /> {user.name?.split(' ')[0]}
                </Link>
                <button onClick={handleLogout} className="btn-ghost text-sm text-gray-500">
                  <LogOut size={16} /> Log ud
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-ghost text-sm">Log ind</Link>
                <Link to="/opret-bruger" className="btn-primary text-sm py-2 px-4">Opret bruger</Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-forest-50 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isNavActive(link.to)
                      ? 'bg-forest-50 text-forest-700'
                      : 'text-gray-600 hover:text-forest-700 hover:bg-forest-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="border-t border-gray-100 mt-2 pt-2 flex flex-col gap-1">
                {user ? (
                  <>
                    <Link
                      to="/favoritter"
                      className="px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-forest-50 flex items-center gap-2"
                    >
                      <Heart size={16} /> Favoritter
                    </Link>
                    <Link
                      to="/profil"
                      className="px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-forest-50 flex items-center gap-2"
                    >
                      <User size={16} /> Profil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 flex items-center gap-2 text-left"
                    >
                      <LogOut size={16} /> Log ud
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-forest-50">
                      Log ind
                    </Link>
                    <Link to="/opret-bruger" className="btn-primary text-sm mt-1 justify-center">
                      Opret bruger
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}