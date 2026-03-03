import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { Home, Loader2 } from 'lucide-react'
import PropertyCard from '../components/ui/PropertyCard'
import FilterPanel from '../components/ui/FilterPanel'

const defaultFilters = {
  type: '',
  area: '',
  rooms: 8,
  size: 300,
  max_price: 25000,
  dog_allowed: false,
  cat_allowed: false,
  balcony: false,
  elevator: false,
  parking: false,
  washing_machine: false,
  ev_charging: false,
  available_from: '',
}

export default function Boliger() {
  const [searchParams] = useSearchParams()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    ...defaultFilters,
    area: searchParams.get('area') || '',
    type: searchParams.get('type') || '',
  })

  // Sync filters when URL search params change (e.g. clicking navbar links)
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      type: searchParams.get('type') || '',
      area: searchParams.get('area') || '',
    }))
  }, [searchParams])

  const fetchProperties = useCallback(async () => {
    setLoading(true)
    try {
      const params = {}
      if (filters.type) params.type = filters.type
      if (filters.area) params.area = filters.area
      if (filters.rooms < 8) params.max_rooms = filters.rooms
      if (filters.size < 300) params.max_size = filters.size
      if (filters.max_price < 25000) params.max_price = filters.max_price
      if (filters.dog_allowed) params.dog_allowed = true
      if (filters.cat_allowed) params.cat_allowed = true
      if (filters.balcony) params.balcony = true
      if (filters.elevator) params.elevator = true
      if (filters.parking) params.parking = true
      if (filters.washing_machine) params.washing_machine = true
      if (filters.ev_charging) params.ev_charging = true
      if (filters.available_from) params.available_from = filters.available_from

      const res = await axios.get('http://localhost:5001/api/properties', { params })
      setProperties(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchProperties()
    }, 300)
    return () => clearTimeout(timeout)
  }, [fetchProperties])

  const pageTitle = () => {
    if (filters.type === 'Lejlighed') return 'Lejligheder i Silkeborg'
    if (filters.type === 'Hus') return 'Huse & Rækkehuse i Silkeborg'
    if (filters.type === 'Rækkehus') return 'Rækkehuse i Silkeborg'
    return 'Boliger i Silkeborg'
  }

  return (
    <div className="pt-16 min-h-screen bg-stone-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
              {pageTitle()}
            </h1>
            <p className="text-gray-500">
              {loading
                ? 'Henter boliger...'
                : `${properties.length} bolig${properties.length !== 1 ? 'er' : ''} fundet`}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          <aside className="lg:w-72 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <FilterPanel filters={filters} onChange={setFilters} />
            </div>
          </aside>

          <div className="flex-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                <Loader2 size={32} className="animate-spin mb-3 text-forest-500" />
                <p className="text-sm">Henter boliger...</p>
              </div>
            ) : properties.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                  <Home size={28} className="text-gray-400" />
                </div>
                <h3 className="font-display font-semibold text-xl text-gray-700 mb-2">
                  Ingen boliger fundet
                </h3>
                <p className="text-gray-400 text-sm max-w-xs">
                  Prøv at justere dine filtre for at se flere resultater.
                </p>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={JSON.stringify(filters)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                >
                  {properties.map((property, i) => (
                    <PropertyCard key={property.id} property={property} index={i} />
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}