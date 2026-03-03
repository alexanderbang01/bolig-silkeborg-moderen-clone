import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  User, Mail, LogOut, Heart, Home,
  Shield, ChevronRight, Calendar, Settings
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useFavorites } from '../context/FavoritesContext'

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="card p-5 flex items-center gap-4">
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
      <Icon size={20} />
    </div>
    <div>
      <div className="text-2xl font-bold font-display text-gray-900">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  </div>
)

const MenuRow = ({ icon: Icon, label, sublabel, to, onClick, danger }) => {
  const inner = (
    <div
      className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-150 cursor-pointer group ${
        danger
          ? 'hover:bg-red-50'
          : 'hover:bg-forest-50'
      }`}
      onClick={onClick}
    >
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
        danger
          ? 'bg-red-50 text-red-500 group-hover:bg-red-100'
          : 'bg-forest-50 text-forest-600 group-hover:bg-forest-100'
      }`}>
        <Icon size={17} />
      </div>
      <div className="flex-1 min-w-0">
        <div className={`text-sm font-medium ${danger ? 'text-red-600' : 'text-gray-800'}`}>{label}</div>
        {sublabel && (
          <div className="text-xs text-gray-400 truncate">{sublabel}</div>
        )}
      </div>
      <ChevronRight size={15} className="text-gray-300 group-hover:text-gray-400 transition-colors" />
    </div>
  )

  if (to) {
    return <Link to={to}>{inner}</Link>
  }
  return inner
}

export default function Profil() {
  const { user, logout } = useAuth()
  const { favorites } = useFavorites()
  const navigate = useNavigate()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  if (!user) {
    return (
      <div className="pt-16 min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card p-10 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-forest-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <User size={28} className="text-forest-500" />
          </div>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">
            Log ind for at se din profil
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Du skal være logget ind for at tilgå din profil.
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/login" className="btn-primary w-full justify-center">
              Log ind
            </Link>
            <Link to="/opret-bruger" className="btn-secondary w-full justify-center">
              Opret gratis bruger
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const initials = user.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'BS'

  const joinedDate = new Date().toLocaleDateString('da-DK', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="pt-16 min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-5"
          >
            {/* Avatar */}
            <div className="w-16 h-16 bg-gradient-to-br from-forest-500 to-forest-700 rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0">
              <span className="text-white font-bold text-xl font-display">{initials}</span>
            </div>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
                {user.name}
              </h1>
              <p className="text-gray-500 text-sm flex items-center gap-1.5 mt-0.5">
                <Mail size={13} />
                {user.email}
              </p>
              <p className="text-gray-400 text-xs flex items-center gap-1.5 mt-0.5">
                <Calendar size={12} />
                Medlem siden {joinedDate}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-2 gap-4"
        >
          <StatCard
            icon={Heart}
            label="Gemte boliger"
            value={favorites.length}
            color="bg-red-50 text-red-500"
          />
          <StatCard
            icon={Home}
            label="Besøgte boliger"
            value="—"
            color="bg-forest-50 text-forest-600"
          />
        </motion.div>

        {/* Account section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="card p-2"
        >
          <div className="px-3 py-2 mb-1">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Min konto</h2>
          </div>
          <MenuRow
            icon={Heart}
            label="Mine favoritter"
            sublabel={`${favorites.length} gemte boliger`}
            to="/favoritter"
          />
          <MenuRow
            icon={User}
            label="Profiloplysninger"
            sublabel={user.email}
            to="/profil"
          />
          <MenuRow
            icon={Settings}
            label="Indstillinger"
            sublabel="Notifikationer og præferencer"
            to="/profil"
          />
        </motion.div>

        {/* Security section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="card p-2"
        >
          <div className="px-3 py-2 mb-1">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Sikkerhed</h2>
          </div>
          <MenuRow
            icon={Shield}
            label="Skift adgangskode"
            sublabel="Sidst ændret ukendt"
            to="/profil"
          />
        </motion.div>

        {/* Logout section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="card p-2"
        >
          <div className="px-3 py-2 mb-1">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Session</h2>
          </div>
          <MenuRow
            icon={LogOut}
            label="Log ud"
            sublabel="Afslut din session"
            danger
            onClick={() => setShowLogoutConfirm(true)}
          />
        </motion.div>

        {/* Logout confirm */}
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="card p-6 border border-red-100"
          >
            <h3 className="font-display font-semibold text-gray-900 mb-2">Er du sikker?</h3>
            <p className="text-gray-500 text-sm mb-5">
              Du vil blive logget ud af din konto på denne enhed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleLogout}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
              >
                Log ud
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 transition-colors"
              >
                Annuller
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  )
}