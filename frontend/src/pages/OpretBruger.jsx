import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import { Mail, Lock, Eye, EyeOff, User, Home, Loader2, Check } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const requirements = [
  { label: 'Mindst 6 tegn', test: (p) => p.length >= 6 },
  { label: 'Indeholder et tal', test: (p) => /\d/.test(p) },
]

export default function OpretBruger() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await axios.post('http://localhost:5001/api/auth/register', form)
      login(res.data.token, res.data.user)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Der opstod en fejl. Prøv igen.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-16 min-h-screen bg-stone-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card p-8"
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-forest-600 rounded-xl flex items-center justify-center mb-3 shadow-sm">
              <Home size={22} className="text-white" />
            </div>
            <h1 className="font-display text-2xl font-bold text-gray-900">Opret bruger</h1>
            <p className="text-gray-500 text-sm mt-1">Kom i gang med BoligSilkeborg i dag</p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-5"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Name */}
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5 block">
                Fulde navn
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Anders Nielsen"
                  required
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5 block">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="din@email.dk"
                  required
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5 block">
                Adgangskode
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="input-field pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Password requirements */}
              {form.password.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2 flex flex-col gap-1"
                >
                  {requirements.map((req) => (
                    <div
                      key={req.label}
                      className={`flex items-center gap-2 text-xs transition-colors ${
                        req.test(form.password) ? 'text-green-600' : 'text-gray-400'
                      }`}
                    >
                      <Check size={11} className={req.test(form.password) ? 'opacity-100' : 'opacity-30'} />
                      {req.label}
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Opretter bruger...
                </>
              ) : (
                'Opret bruger'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400">eller</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <p className="text-center text-sm text-gray-500">
            Har du allerede en konto?{' '}
            <Link to="/login" className="text-forest-600 font-semibold hover:text-forest-700 transition-colors">
              Log ind
            </Link>
          </p>
        </motion.div>

        {/* Terms note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-xs text-gray-400 mt-4 px-4"
        >
          Ved at oprette en bruger accepterer du vores vilkår og betingelser samt privatlivspolitik.
        </motion.p>

      </div>
    </div>
  )
}