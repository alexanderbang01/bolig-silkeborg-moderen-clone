import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ArrowRight, LogIn } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useFavorites } from '../context/FavoritesContext'
import PropertyCard from '../components/ui/PropertyCard'

export default function Favoritter() {
  const { user } = useAuth()
  const { favorites, fetchFavorites } = useFavorites()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      fetchFavorites()
    }
  }, [user])

  if (!user) {
    return (
      <div className="pt-16 min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card p-10 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Heart size={28} className="text-red-400" />
          </div>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">
            Log ind for at se favoritter
          </h2>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            Du skal være logget ind for at gemme og se dine favoritboliger.
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/login" className="btn-primary w-full justify-center">
              <LogIn size={16} />
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

  return (
    <div className="pt-16 min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-1 flex items-center gap-3">
                <Heart size={28} className="text-red-400" fill="currentColor" />
                Mine favoritter
              </h1>
              <p className="text-gray-500">
                {favorites.length === 0
                  ? 'Du har ingen gemte boliger endnu'
                  : `${favorites.length} gemt${favorites.length !== 1 ? 'e' : ''} bolig${favorites.length !== 1 ? 'er' : ''}`}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mb-5">
              <Heart size={36} className="text-red-300" />
            </div>
            <h3 className="font-display font-semibold text-2xl text-gray-700 mb-3">
              Ingen gemte boliger endnu
            </h3>
            <p className="text-gray-400 text-sm max-w-xs mb-8 leading-relaxed">
              Klik på hjerteikonet på en bolig for at gemme den her, så du nemt kan finde den igen.
            </p>
            <Link to="/boliger" className="btn-primary">
              Udforsk boliger
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {favorites.map((property, i) => (
              <PropertyCard key={property.id} property={property} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}