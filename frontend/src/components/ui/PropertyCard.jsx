import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, MapPin, BedDouble, Maximize2 } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useFavorites } from '../../context/FavoritesContext'
import Badge from './Badge'

export default function PropertyCard({ property, index = 0 }) {
  const { user } = useAuth()
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const fav = isFavorite(property.id)

  const handleFavorite = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!user) return
    if (fav) {
      await removeFavorite(property.id)
    } else {
      await addFavorite(property.id)
    }
  }

  const typeLabel = {
    Lejlighed: 'Lejlighed',
    Hus: 'Hus',
    Rækkehus: 'Rækkehus',
  }

  const activeBadges = ['dog_allowed', 'cat_allowed', 'balcony', 'elevator', 'parking', 'washing_machine', 'ev_charging']
    .filter((key) => property[key])
    .slice(0, 3)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: 'easeOut' }}
    >
      <Link to={`/boliger/${property.id}`} className="card block group overflow-hidden">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={property.image_url}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Type badge */}
          <div className="absolute top-3 left-3">
            <span className="badge bg-white/90 backdrop-blur-sm text-forest-700 border border-white/50 text-xs font-semibold shadow-sm">
              {typeLabel[property.type] || property.type}
            </span>
          </div>

          {/* Favorite button */}
          <button
            onClick={handleFavorite}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200 shadow-sm ${
              fav
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-white/90 text-gray-400 hover:text-red-500 hover:bg-white'
            } ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={user ? (fav ? 'Fjern fra favoritter' : 'Gem som favorit') : 'Log ind for at gemme'}
          >
            <Heart size={15} fill={fav ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-display font-semibold text-gray-900 text-base leading-snug mb-1 group-hover:text-forest-700 transition-colors duration-200">
            {property.title}
          </h3>

          <p className="flex items-center gap-1 text-gray-500 text-xs mb-3">
            <MapPin size={12} />
            {property.address}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-3">
            <span className="flex items-center gap-1.5 text-sm text-gray-600">
              <BedDouble size={14} className="text-forest-500" />
              {property.rooms} vær.
            </span>
            <span className="flex items-center gap-1.5 text-sm text-gray-600">
              <Maximize2 size={14} className="text-forest-500" />
              {property.size} m²
            </span>
          </div>

          {/* Badges */}
          {activeBadges.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {activeBadges.map((key) => (
                <Badge key={key} type={key} />
              ))}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div>
              <span className="text-xl font-bold text-forest-700">
                {property.price.toLocaleString('da-DK')}
              </span>
              <span className="text-gray-400 text-sm ml-1">kr./md.</span>
            </div>
            <span className="text-xs text-gray-400">
              Ledig {new Date(property.available_from).toLocaleDateString('da-DK', { day: 'numeric', month: 'short' })}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}