import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Forside from './pages/Forside'
import Boliger from './pages/Boliger'
import BoligDetalje from './pages/BoligDetalje'
import Login from './pages/Login'
import OpretBruger from './pages/OpretBruger'
import Favoritter from './pages/Favoritter'
import Profil from './pages/Profil'
import OmOs from './pages/OmOs'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Forside />} />
          <Route path="/boliger" element={<Boliger />} />
          <Route path="/boliger/:id" element={<BoligDetalje />} />
          <Route path="/login" element={<Login />} />
          <Route path="/opret-bruger" element={<OpretBruger />} />
          <Route path="/favoritter" element={<Favoritter />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/om-os" element={<OmOs />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}