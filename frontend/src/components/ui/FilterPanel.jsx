import { useState } from 'react'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'

const AREAS = ['Silkeborg', 'Sejs', 'Virklund', 'Them', 'Resenbro']
const TYPES = ['Lejlighed', 'Hus', 'Rækkehus']

const ROOM_STEPS = [1, 2, 3, 4, 5, 6, 7, 8]
const SIZE_STEPS = [20, 40, 60, 80, 100, 120, 150, 180, 200, 250, 300]

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

function StepSlider({ steps, value, onChange, formatLabel }) {
  const index = steps.indexOf(value) === -1 ? steps.length - 1 : steps.indexOf(value)
  const percent = (index / (steps.length - 1)) * 100

  const handleChange = (e) => {
    const newIndex = parseInt(e.target.value)
    onChange(steps[newIndex])
  }

  return (
    <div className="relative pt-1 pb-7">
      {/* Track background */}
      <div className="relative h-2 bg-gray-200 rounded-full mx-0">

        {/* Filled portion */}
        <div
          className="absolute left-0 top-0 h-2 bg-forest-600 rounded-full transition-all duration-150"
          style={{ width: `${percent}%` }}
        />

        {/* Green thumb dot */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-forest-600 rounded-full shadow-md border-2 border-white transition-all duration-150 pointer-events-none"
          style={{ left: `calc(${percent}% - 10px)` }}
        />
      </div>

      {/* Tick marks + labels */}
      <div className="relative flex justify-between mt-2">
        {steps.map((step, i) => (
          <div key={step} className="flex flex-col items-center" style={{ width: 0 }}>
            <div
              className={`w-0.5 h-1.5 rounded-full transition-colors duration-150 ${
                i <= index ? 'bg-forest-500' : 'bg-gray-300'
              }`}
            />
            <span
              className="text-xs text-gray-400 mt-0.5 whitespace-nowrap select-none"
              style={{ transform: 'translateX(-50%)' }}
            >
              {formatLabel ? formatLabel(step) : step}
            </span>
          </div>
        ))}
      </div>

      {/* Invisible range input overlaid on top */}
      <input
        type="range"
        min={0}
        max={steps.length - 1}
        step={1}
        value={index}
        onChange={handleChange}
        className="absolute inset-0 w-full h-8 opacity-0 cursor-pointer"
        style={{ top: 0, margin: 0 }}
      />
    </div>
  )
}

export default function FilterPanel({ filters, onChange }) {
  const [open, setOpen] = useState(false)

  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value })
  }

  const handleReset = () => {
    onChange(defaultFilters)
  }

  const activeCount = [
    filters.type,
    filters.area,
    filters.dog_allowed,
    filters.cat_allowed,
    filters.balcony,
    filters.elevator,
    filters.parking,
    filters.washing_machine,
    filters.ev_charging,
    filters.available_from,
    filters.max_price < 25000,
    filters.rooms < 8,
    filters.size < 300,
  ].filter(Boolean).length

  return (
    <div className="w-full">
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-gray-200 shadow-sm text-sm font-medium text-gray-700 mb-3"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-forest-600" />
          Filtre
          {activeCount > 0 && (
            <span className="bg-forest-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </span>
        <ChevronDown size={16} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <div className={`lg:block ${open ? 'block' : 'hidden'}`}>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 flex flex-col gap-6">

          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-forest-600" />
              Filtre
              {activeCount > 0 && (
                <span className="bg-forest-100 text-forest-700 text-xs rounded-full px-2 py-0.5 font-medium">
                  {activeCount} aktive
                </span>
              )}
            </h3>
            {activeCount > 0 && (
              <button
                onClick={handleReset}
                className="text-xs text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1"
              >
                <X size={12} /> Nulstil
              </button>
            )}
          </div>

          {/* Boligtype */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
              Boligtype
            </label>
            <div className="flex flex-wrap gap-2">
              {TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => handleChange('type', filters.type === t ? '' : t)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-150 ${
                    filters.type === t
                      ? 'bg-forest-600 text-white border-forest-600'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-forest-400 hover:text-forest-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Område */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
              Område
            </label>
            <div className="flex flex-wrap gap-2">
              {AREAS.map((a) => (
                <button
                  key={a}
                  onClick={() => handleChange('area', filters.area === a ? '' : a)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-150 ${
                    filters.area === a
                      ? 'bg-lake-600 text-white border-lake-600'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-lake-400 hover:text-lake-700'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* Antal værelser */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Antal værelser
              </label>
              <span className="text-sm font-semibold text-forest-700">
                {filters.rooms === 8 ? 'Alle' : `Op til ${filters.rooms} vær.`}
              </span>
            </div>
            <StepSlider
              steps={ROOM_STEPS}
              value={filters.rooms}
              onChange={(v) => handleChange('rooms', v)}
            />
          </div>

          {/* Størrelse */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Størrelse <span className="normal-case">(m²)</span>
              </label>
              <span className="text-sm font-semibold text-forest-700">
                {filters.size === 300 ? 'Alle' : `Op til ${filters.size} m²`}
              </span>
            </div>
            <StepSlider
              steps={SIZE_STEPS}
              value={filters.size}
              onChange={(v) => handleChange('size', v)}
              formatLabel={(v, i, arr) => {
                if (v === 20) return '20'
                if (v === 300) return '300'
                return ''
              }}
            />
          </div>

          {/* Maks husleje */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Maks husleje
              </label>
              <span className="text-sm font-semibold text-forest-700">
                {filters.max_price === 25000 ? 'Alle' : `${filters.max_price.toLocaleString('da-DK')} kr.`}
              </span>
            </div>
            <div className="relative pt-1">
              {/* Custom styled track */}
              <div className="relative h-2 bg-gray-200 rounded-full">
                <div
                  className="absolute left-0 top-0 h-2 bg-forest-600 rounded-full"
                  style={{ width: `${((filters.max_price - 3000) / (25000 - 3000)) * 100}%` }}
                />
                {/* Green thumb dot */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-forest-600 rounded-full shadow-md border-2 border-white pointer-events-none"
                  style={{ left: `calc(${((filters.max_price - 3000) / (25000 - 3000)) * 100}% - 10px)` }}
                />
              </div>
              <input
                type="range"
                min={3000}
                max={25000}
                step={500}
                value={filters.max_price}
                onChange={(e) => handleChange('max_price', parseInt(e.target.value))}
                className="absolute inset-0 w-full h-8 opacity-0 cursor-pointer"
                style={{ top: 0, margin: 0 }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-5">
              <span>3.000 kr.</span>
              <span>25.000 kr.</span>
            </div>
          </div>

          {/* Ledig fra */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
              Ledig fra
            </label>
            <input
              type="date"
              value={filters.available_from}
              onChange={(e) => handleChange('available_from', e.target.value)}
              className="input-field text-sm"
            />
          </div>

          {/* Faciliteter */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block">
              Faciliteter
            </label>
            <div className="grid grid-cols-1 gap-2">
              {[
                { key: 'dog_allowed', label: 'Hund tilladt' },
                { key: 'cat_allowed', label: 'Kat tilladt' },
                { key: 'balcony', label: 'Altan / terrasse' },
                { key: 'elevator', label: 'Elevator' },
                { key: 'parking', label: 'Parkering' },
                { key: 'washing_machine', label: 'Vaskemaskine muligt' },
                { key: 'ev_charging', label: 'Opladning til elbil' },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => handleChange(key, !filters[key])}
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-150 flex-shrink-0 ${
                      filters[key]
                        ? 'bg-forest-600 border-forest-600'
                        : 'bg-white border-gray-300 group-hover:border-forest-400'
                    }`}
                  >
                    {filters[key] && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span
                    onClick={() => handleChange(key, !filters[key])}
                    className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors"
                  >
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}