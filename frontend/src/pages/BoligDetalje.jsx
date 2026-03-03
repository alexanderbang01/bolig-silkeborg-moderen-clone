import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  MapPin,
  BedDouble,
  Maximize2,
  ArrowLeft,
  Heart,
  Phone,
  Mail,
  Calendar,
  Building2,
  Loader2,
  Dog,
  Cat,
  Zap,
  ParkingCircle,
  Sunset,
  ArrowUpDown,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Share2,
  Thermometer,
  Droplets,
  Wind,
  Star,
  Clock,
  ShieldCheck,
  TreePine,
  Train,
  ShoppingBag,
  GraduationCap,
  Stethoscope,
  Info,
  Eye,
  Expand,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";
import Badge from "../components/ui/Badge";

const extraImages = [
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=85",
  "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200&q=85",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=85",
  "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&q=85",
  "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=85",
];

const nearbyPlaces = [
  {
    icon: ShoppingBag,
    label: "Kvickly Silkeborg",
    distance: "350 m",
    type: "Indkøb",
  },
  {
    icon: Train,
    label: "Silkeborg Station",
    distance: "600 m",
    type: "Transport",
  },
  {
    icon: GraduationCap,
    label: "Silkeborg Skole",
    distance: "800 m",
    type: "Skole",
  },
  { icon: TreePine, label: "Gudenåen", distance: "1,2 km", type: "Natur" },
  {
    icon: Stethoscope,
    label: "Silkeborg Sygehus",
    distance: "2,1 km",
    type: "Sundhed",
  },
];

const energyLabels = ["A", "B", "C", "D", "E", "F", "G"];
const energyColors = {
  A: "bg-green-500",
  B: "bg-lime-500",
  C: "bg-yellow-400",
  D: "bg-orange-400",
  E: "bg-orange-500",
  F: "bg-red-500",
  G: "bg-red-700",
};

const FeatureRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
    <span className="flex items-center gap-2 text-sm text-gray-600">
      <Icon size={15} className="text-forest-500" />
      {label}
    </span>
    {typeof value === "boolean" ? (
      value ? (
        <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
          <Check size={11} /> Ja
        </span>
      ) : (
        <span className="flex items-center gap-1 text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
          <X size={11} /> Nej
        </span>
      )
    ) : (
      <span className="text-sm font-medium text-gray-800">{value}</span>
    )}
  </div>
);

const ReviewCard = ({ name, rating, date, text, initials }) => (
  <div className="card p-5">
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-forest-400 to-forest-700 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          {initials}
        </div>
        <div>
          <div className="font-semibold text-gray-900 text-sm">{name}</div>
          <div className="text-gray-400 text-xs">{date}</div>
        </div>
      </div>
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={12}
            className={
              i < rating
                ? "text-amber-400 fill-amber-400"
                : "text-gray-200 fill-gray-200"
            }
          />
        ))}
      </div>
    </div>
    <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
  </div>
);

export default function BoligDetalje() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("oversigt");

  const fav = property ? isFavorite(property.id) : false;

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/properties/${id}`,
        );
        setProperty(res.data);
      } catch {
        navigate("/boliger");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id, navigate]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight")
        setActiveImg((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
      if (e.key === "ArrowLeft")
        setActiveImg((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleFavorite = async () => {
    if (!user) return navigate("/login");
    if (fav) await removeFavorite(property.id);
    else await addFavorite(property.id);
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <Loader2 size={36} className="animate-spin text-forest-500" />
      </div>
    );
  }

  if (!property) return null;

  const allImages = [
    property.image_url,
    ...extraImages.slice(0, 4),
    property.floorplan_url,
  ].filter(Boolean);

  const typeLabel = {
    Lejlighed: "Lejlighed",
    Hus: "Hus",
    Rækkehus: "Rækkehus",
  };
  const pricePerSqm = Math.round(property.price / property.size);
  const deposit = property.price * 3;
  const prepaidRent = property.price * 3;

  const tabs = [
    { id: "oversigt", label: "Oversigt" },
    { id: "detaljer", label: "Detaljer & faciliteter" },
    { id: "beliggenhed", label: "Beliggenhed" },
    { id: "anmeldelser", label: "Anmeldelser" },
  ];

  return (
    <div className="pt-16 min-h-screen bg-stone-50">
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-5 right-5 text-white/70 hover:text-white text-sm flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl transition-colors"
            >
              <X size={16} /> Luk
            </button>

            <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {activeImg + 1} / {allImages.length}
            </div>

            <div
              className="relative w-full max-w-5xl px-16"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={allImages[activeImg]}
                  alt=""
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                  className="w-full max-h-[75vh] object-contain rounded-2xl"
                />
              </AnimatePresence>
              <button
                onClick={() =>
                  setActiveImg((p) => (p === 0 ? allImages.length - 1 : p - 1))
                }
                className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={() =>
                  setActiveImg((p) => (p === allImages.length - 1 ? 0 : p + 1))
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            <div
              className="flex items-center gap-2 mt-5 px-4 overflow-x-auto max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`flex-shrink-0 w-16 h-11 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImg === i
                      ? "border-white scale-110"
                      : "border-white/20 opacity-50 hover:opacity-80"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-5"
        >
          <Link
            to="/boliger"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-forest-700 transition-colors"
          >
            <ArrowLeft size={16} />
            Tilbage til boliger
          </Link>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden h-[480px]">
            <div
              className="col-span-2 row-span-2 relative cursor-pointer group overflow-hidden"
              onClick={() => {
                setActiveImg(0);
                setLightboxOpen(true);
              }}
            >
              <img
                src={allImages[0]}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
            </div>
            {allImages.slice(1, 5).map((img, i) => (
              <div
                key={i}
                className="relative cursor-pointer group overflow-hidden"
                onClick={() => {
                  setActiveImg(i + 1);
                  setLightboxOpen(true);
                }}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                {i === 3 && allImages.length > 5 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Eye size={22} className="mx-auto mb-1" />
                      <span className="text-sm font-semibold">
                        +{allImages.length - 5} flere
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              {allImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveImg(i);
                    setLightboxOpen(true);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    i === 0
                      ? "bg-forest-600 w-5"
                      : "bg-gray-300 hover:bg-forest-400"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => {
                setActiveImg(0);
                setLightboxOpen(true);
              }}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-forest-700 bg-white border border-gray-200 hover:border-forest-300 px-4 py-2 rounded-xl transition-all shadow-sm"
            >
              <Expand size={14} />
              Se alle {allImages.length} billeder
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Title block — price removed from here */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="card p-6"
            >
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="badge bg-forest-50 text-forest-700 border border-forest-200">
                    {typeLabel[property.type] || property.type}
                  </span>
                  <span className="badge bg-lake-50 text-lake-700 border border-lake-200">
                    {property.area}
                  </span>
                  <span className="badge bg-amber-50 text-amber-700 border border-amber-200">
                    <Star size={10} fill="currentColor" /> 4.8
                  </span>
                </div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-2">
                  {property.title}
                </h1>
                <p className="flex items-center gap-1.5 text-gray-500">
                  <MapPin size={14} />
                  {property.address}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: BedDouble, label: "Værelser", value: property.rooms },
                  {
                    icon: Maximize2,
                    label: "Størrelse",
                    value: `${property.size} m²`,
                  },
                  {
                    icon: ArrowUpDown,
                    label: "Etage",
                    value:
                      property.floor === 0 ? "Stue" : `${property.floor}. sal`,
                  },
                  {
                    icon: Calendar,
                    label: "Ledig fra",
                    value: new Date(property.available_from).toLocaleDateString(
                      "da-DK",
                      { day: "numeric", month: "short" },
                    ),
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="bg-stone-50 rounded-xl p-3 text-center"
                  >
                    <Icon size={18} className="text-forest-500 mx-auto mb-1" />
                    <div className="font-semibold text-gray-900 text-sm">
                      {value}
                    </div>
                    <div className="text-xs text-gray-400">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tabs */}
            <div className="flex gap-1 bg-white rounded-xl p-1 border border-gray-100 shadow-sm overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    activeTab === tab.id
                      ? "bg-forest-600 text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              {activeTab === "oversigt" && (
                <motion.div
                  key="oversigt"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  <div className="card p-6">
                    <h2 className="font-display font-semibold text-xl text-gray-900 mb-4">
                      Om boligen
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {property.description}
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Boligen er beliggende i et roligt og attraktivt kvarter i{" "}
                      {property.area}, tæt på alle dagligdagens faciliteter. Den
                      velindrettede bolig byder på generøse rum med gode
                      lysforhold og en gennemtænkt planløsning, der giver
                      optimalt udbytte af de {property.size} m².
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      Køkkenet er udstyret med moderne hvidevarer og god
                      arbejdsplads. Badeværelset er nyrenoveret med fliser fra
                      gulv til loft og inkluderer både bruseniche og badekar.
                      Fra stuen er der adgang til{" "}
                      {property.balcony
                        ? "altan/terrasse med gode sydvendte solforhold"
                        : "det grønne gårdareal"}
                      .
                    </p>
                  </div>

                  <div className="card p-6">
                    <h2 className="font-display font-semibold text-xl text-gray-900 mb-4">
                      Boligens højdepunkter
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        {
                          icon: ShieldCheck,
                          text: "Nyistandsat og klar til indflytning",
                        },
                        {
                          icon: Thermometer,
                          text: "Fjernvarme med lavt varmeforbrug",
                        },
                        {
                          icon: Droplets,
                          text: "Nyrenoveret badeværelse (2023)",
                        },
                        {
                          icon: Wind,
                          text: "Mekanisk ventilation i hele boligen",
                        },
                        {
                          icon: TreePine,
                          text: "Natur og rekreative områder i nærheden",
                        },
                        {
                          icon: Info,
                          text: "Energimærke B – lavt energiforbrug",
                        },
                      ].map(({ icon: Icon, text }) => (
                        <div
                          key={text}
                          className="flex items-center gap-3 p-3 bg-forest-50/50 rounded-xl"
                        >
                          <div className="w-8 h-8 bg-forest-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon size={15} className="text-forest-600" />
                          </div>
                          <span className="text-sm text-gray-700">{text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="card p-6">
                    <h2 className="font-display font-semibold text-xl text-gray-900 mb-4">
                      Inkluderet i lejen
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        { label: "Vand", included: true },
                        { label: "Varme (aconto)", included: true },
                        { label: "Internet", included: false },
                        { label: "Tv-pakke", included: false },
                        { label: "Fællesantenne", included: true },
                        { label: "Renovation", included: true },
                        { label: "Trappevask", included: true },
                        {
                          label: "Havevedligehold",
                          included: property.type !== "Lejlighed",
                        },
                        { label: "Elevator", included: property.elevator },
                      ].map(({ label, included }) => (
                        <div
                          key={label}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                            included
                              ? "bg-green-50 text-green-700"
                              : "bg-gray-50 text-gray-400"
                          }`}
                        >
                          {included ? <Check size={13} /> : <X size={13} />}
                          {label}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="card p-6">
                    <h2 className="font-display font-semibold text-xl text-gray-900 mb-4">
                      Økonomi ved indflytning
                    </h2>
                    <div className="flex flex-col gap-2">
                      {[
                        {
                          label: "Månedlig husleje",
                          value: `${property.price.toLocaleString("da-DK")} kr.`,
                          highlight: true,
                        },
                        {
                          label: "Acontobidrag (vand/varme)",
                          value: "850 kr.",
                        },
                        {
                          label: "Depositum (3 mdr.)",
                          value: `${deposit.toLocaleString("da-DK")} kr.`,
                        },
                        {
                          label: "Forudbetalt leje (3 mdr.)",
                          value: `${prepaidRent.toLocaleString("da-DK")} kr.`,
                        },
                      ].map(({ label, value, highlight }) => (
                        <div
                          key={label}
                          className={`flex items-center justify-between py-3 px-4 rounded-xl ${
                            highlight
                              ? "bg-forest-50 border border-forest-100"
                              : "border-b border-gray-100 last:border-0"
                          }`}
                        >
                          <span
                            className={`text-sm ${highlight ? "font-semibold text-forest-800" : "text-gray-600"}`}
                          >
                            {label}
                          </span>
                          <span
                            className={`font-semibold ${highlight ? "text-forest-700 text-base" : "text-gray-800 text-sm"}`}
                          >
                            {value}
                          </span>
                        </div>
                      ))}
                      <div className="mt-2 p-4 bg-amber-50 border border-amber-100 rounded-xl">
                        <p className="text-xs text-amber-700 flex items-start gap-2">
                          <Info size={13} className="flex-shrink-0 mt-0.5" />
                          Ved indflytning skal der betales depositum +
                          forudbetalt leje. Acontobidraget er et estimat og kan
                          variere.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="card p-6">
                    <h2 className="font-display font-semibold text-xl text-gray-900 mb-5">
                      Sådan foregår det
                    </h2>
                    <div className="flex flex-col gap-0">
                      {[
                        {
                          step: "1",
                          title: "Send en henvendelse",
                          desc: "Kontakt os via mail eller telefon for at høre mere om boligen.",
                        },
                        {
                          step: "2",
                          title: "Book en fremvisning",
                          desc: "Vi aftaler et tidspunkt der passer dig til at se boligen.",
                        },
                        {
                          step: "3",
                          title: "Indsend ansøgning",
                          desc: "Udfyld en lejeransøgning med dine oplysninger og ønsker.",
                        },
                        {
                          step: "4",
                          title: "Underskriv lejekontrakt",
                          desc: "Vi sender kontrakten digitalt og aftaler indflytningsdato.",
                        },
                        {
                          step: "5",
                          title: "Indflyt",
                          desc: "Modtag nøgler og tag din nye bolig i besiddelse!",
                        },
                      ].map(({ step, title, desc }, i, arr) => (
                        <div key={step} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 bg-forest-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                              {step}
                            </div>
                            {i < arr.length - 1 && (
                              <div className="w-0.5 h-8 bg-forest-200 my-1" />
                            )}
                          </div>
                          <div className="pb-6">
                            <div className="font-semibold text-gray-900 text-sm mb-0.5">
                              {title}
                            </div>
                            <div className="text-gray-500 text-xs leading-relaxed">
                              {desc}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "detaljer" && (
                <motion.div
                  key="detaljer"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  <div className="card p-6">
                    <h2 className="font-display font-semibold text-xl text-gray-900 mb-4">
                      Hvad er inkluderet
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "dog_allowed",
                        "cat_allowed",
                        "balcony",
                        "elevator",
                        "parking",
                        "washing_machine",
                        "ev_charging",
                      ]
                        .filter((k) => property[k])
                        .map((k) => (
                          <Badge
                            key={k}
                            type={k}
                            className="text-sm px-3 py-1.5"
                          />
                        ))}
                      {[
                        "dog_allowed",
                        "cat_allowed",
                        "balcony",
                        "elevator",
                        "parking",
                        "washing_machine",
                        "ev_charging",
                      ]
                        .filter((k) => !property[k])
                        .map((k) => (
                          <span
                            key={k}
                            className="badge bg-gray-50 text-gray-400 border border-gray-200 line-through text-sm px-3 py-1.5"
                          >
                            <X size={10} />
                            {
                              {
                                dog_allowed: "Hund tilladt",
                                cat_allowed: "Kat tilladt",
                                balcony: "Altan/terrasse",
                                elevator: "Elevator",
                                parking: "Parkering",
                                washing_machine: "Vaskemaskine",
                                ev_charging: "Elbil-opladning",
                              }[k]
                            }
                          </span>
                        ))}
                    </div>
                  </div>

                  <div className="card p-6">
                    <h2 className="font-display font-semibold text-xl text-gray-900 mb-4">
                      Boligoplysninger
                    </h2>
                    <FeatureRow
                      icon={Building2}
                      label="Boligtype"
                      value={property.type}
                    />
                    <FeatureRow
                      icon={MapPin}
                      label="Område"
                      value={property.area}
                    />
                    <FeatureRow
                      icon={BedDouble}
                      label="Antal værelser"
                      value={`${property.rooms} værelser`}
                    />
                    <FeatureRow
                      icon={Maximize2}
                      label="Boligareal"
                      value={`${property.size} m²`}
                    />
                    <FeatureRow
                      icon={ArrowUpDown}
                      label="Etage"
                      value={
                        property.floor === 0
                          ? "Stueetage"
                          : `${property.floor}. etage`
                      }
                    />
                    <FeatureRow
                      icon={Calendar}
                      label="Ledig fra"
                      value={new Date(
                        property.available_from,
                      ).toLocaleDateString("da-DK", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    />
                    <FeatureRow
                      icon={Thermometer}
                      label="Opvarmning"
                      value="Fjernvarme"
                    />
                    <FeatureRow
                      icon={Droplets}
                      label="Vandforsyning"
                      value="Kommunalt vand"
                    />
                    <FeatureRow icon={Info} label="Energimærke" value="B" />
                    <FeatureRow
                      icon={Clock}
                      label="Mindste lejeperiode"
                      value="12 måneder"
                    />
                  </div>

                  <div className="card p-6">
                    <h2 className="font-display font-semibold text-xl text-gray-900 mb-4">
                      Faciliteter
                    </h2>
                    <FeatureRow
                      icon={Dog}
                      label="Hund tilladt"
                      value={property.dog_allowed}
                    />
                    <FeatureRow
                      icon={Cat}
                      label="Kat tilladt"
                      value={property.cat_allowed}
                    />
                    <FeatureRow
                      icon={Sunset}
                      label="Altan / terrasse"
                      value={property.balcony}
                    />
                    <FeatureRow
                      icon={ArrowUpDown}
                      label="Elevator"
                      value={property.elevator}
                    />
                    <FeatureRow
                      icon={ParkingCircle}
                      label="Parkering"
                      value={property.parking}
                    />
                    <FeatureRow
                      icon={Check}
                      label="Vaskemaskine muligt"
                      value={property.washing_machine}
                    />
                    <FeatureRow
                      icon={Zap}
                      label="Opladning til elbil"
                      value={property.ev_charging}
                    />
                  </div>

                  <div className="card p-6">
                    <h2 className="font-display font-semibold text-xl text-gray-900 mb-4">
                      Energimærke
                    </h2>
                    <div className="flex flex-col gap-1.5">
                      {energyLabels.map((label) => (
                        <div key={label} className="flex items-center gap-3">
                          <div
                            className={`h-8 flex items-center justify-end pr-3 rounded-r-full text-white text-sm font-bold ${energyColors[label]} ${label === "B" ? "shadow-md ring-2 ring-offset-1 ring-lime-400" : ""}`}
                            style={{
                              width: `${(["A", "B", "C", "D", "E", "F", "G"].indexOf(label) + 4) * 28}px`,
                            }}
                          >
                            {label}
                          </div>
                          {label === "B" && (
                            <span className="text-xs font-semibold text-lime-600 bg-lime-50 px-2 py-0.5 rounded-full border border-lime-200">
                              Denne bolig
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-4">
                      Energimærke B betyder lavt energiforbrug og lavere
                      varmeregninger.
                    </p>
                  </div>

                  {property.floorplan_url && (
                    <div className="card overflow-hidden">
                      <div className="p-5 border-b border-gray-100">
                        <h2 className="font-display font-semibold text-xl text-gray-900">
                          Plantegning
                        </h2>
                      </div>
                      <img
                        src={property.floorplan_url}
                        alt="Plantegning"
                        className="w-full object-contain max-h-80 bg-gray-50 cursor-pointer"
                        onClick={() => {
                          setActiveImg(allImages.length - 1);
                          setLightboxOpen(true);
                        }}
                      />
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "beliggenhed" && (
                <motion.div
                  key="beliggenhed"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  <div className="card p-6">
                    <h2 className="font-display font-semibold text-xl text-gray-900 mb-3">
                      Om området
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      {property.area} er et af de mest eftertragtet områder i
                      Silkeborg-egnen. Området byder på en unik kombination af
                      by- og naturliv, med nærhed til Silkeborgs smukke søer,
                      skove og ådale.
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Med gode forbindelser til Silkeborg centrum og let adgang
                      til motorvejen er {property.area} et oplagt valg for både
                      familier, studerende og pendlere. Området har et stærkt
                      lokalt fællesskab med hyggelige caféer, butikker og grønne
                      parkområder.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: "Transport", score: "9/10" },
                      { label: "Indkøb", score: "8/10" },
                      { label: "Natur", score: "10/10" },
                      { label: "Skoler", score: "8/10" },
                    ].map(({ label, score }) => (
                      <div key={label} className="card p-4 text-center">
                        <div className="text-2xl font-bold font-display text-forest-700">
                          {score}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="card p-6">
                    <h2 className="font-display font-semibold text-xl text-gray-900 mb-4">
                      I nærheden
                    </h2>
                    <div className="flex flex-col gap-2">
                      {nearbyPlaces.map(
                        ({ icon: Icon, label, distance, type }) => (
                          <div
                            key={label}
                            className="flex items-center gap-4 py-2.5 border-b border-gray-100 last:border-0"
                          >
                            <div className="w-9 h-9 bg-forest-50 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Icon size={16} className="text-forest-600" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-800">
                                {label}
                              </div>
                              <div className="text-xs text-gray-400">
                                {type}
                              </div>
                            </div>
                            <div className="text-sm font-semibold text-forest-600">
                              {distance}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="card overflow-hidden">
                    <div className="p-5 border-b border-gray-100">
                      <h2 className="font-display font-semibold text-xl text-gray-900">
                        Kort
                      </h2>
                      <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                        <MapPin size={13} /> {property.address}
                      </p>
                    </div>
                    <iframe
                      title="Kort"
                      width="100%"
                      height="380"
                      src="https://www.openstreetmap.org/export/embed.html?bbox=9.4,56.1,9.7,56.2&layer=mapnik&marker=56.154,9.545"
                      className="border-0"
                    />
                    <div className="p-3 text-center bg-gray-50">
                      <a
                        href="https://www.openstreetmap.org/?mlat=56.154&mlon=9.545#map=14/56.154/9.545"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-lake-600 hover:underline"
                      >
                        Åbn i OpenStreetMap
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "anmeldelser" && (
                <motion.div
                  key="anmeldelser"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  <div className="card p-6">
                    <h2 className="font-display font-semibold text-xl text-gray-900 mb-5">
                      Bedømmelse
                    </h2>
                    <div className="flex flex-col sm:flex-row items-center gap-8">
                      <div className="text-center">
                        <div className="text-6xl font-bold font-display text-gray-900">
                          4.8
                        </div>
                        <div className="flex items-center justify-center gap-0.5 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className="text-amber-400 fill-amber-400"
                            />
                          ))}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          Baseret på 12 anmeldelser
                        </div>
                      </div>
                      <div className="flex-1 w-full flex flex-col gap-2">
                        {[
                          { label: "Beliggenhed", score: 5 },
                          { label: "Stand", score: 4.9 },
                          { label: "Udlejer", score: 4.7 },
                          { label: "Pris/kvalitet", score: 4.6 },
                        ].map(({ label, score }) => (
                          <div key={label} className="flex items-center gap-3">
                            <span className="text-xs text-gray-500 w-24 flex-shrink-0">
                              {label}
                            </span>
                            <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(score / 5) * 100}%` }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="h-full bg-amber-400 rounded-full"
                              />
                            </div>
                            <span className="text-xs font-semibold text-gray-700 w-6 text-right">
                              {score}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <ReviewCard
                      name="Maria Thomsen"
                      initials="MT"
                      rating={5}
                      date="Januar 2025"
                      text="Fantastisk lejlighed i et super område. Udlejeren var meget hjælpsom og hurtig til at svare på spørgsmål. Vi boede her i 2 år og ville gerne have fortsat, men fik job i en anden by. Kan varmt anbefales!"
                    />
                    <ReviewCard
                      name="Jakob Sørensen"
                      initials="JS"
                      rating={5}
                      date="November 2024"
                      text="Flot og velholdt bolig med god beliggenhed. Kort afstand til alt. Nabo til søerne og tæt på indkøb. Meget lys og rummelig. Varmeudgifterne er lave grundet fjernvarme og god isolering."
                    />
                    <ReviewCard
                      name="Camilla Bech"
                      initials="CB"
                      rating={4}
                      date="August 2024"
                      text="God bolig og god udlejer. Området er roligt og familievenligt. Parkeringen kan til tider være svær at finde, men ellers er der intet at klage over. God pris for hvad man får."
                    />
                    <ReviewCard
                      name="Thomas Kjeldsen"
                      initials="TK"
                      rating={5}
                      date="Maj 2024"
                      text="Boede her i 3 år og havde en super oplevelse fra start til slut. Udlejer var altid hurtig til at ordne ting og boligen var i rigtig god stand. Stor anbefaling herfra!"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT sidebar */}
          <div className="flex flex-col gap-5">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="card p-6 lg:sticky lg:top-24"
            >
              <div className="mb-4">
                <div className="text-3xl font-bold text-forest-700 font-display">
                  {property.price.toLocaleString("da-DK")} kr.
                </div>
                <div className="text-gray-400 text-sm">
                  pr. måned · {pricePerSqm.toLocaleString("da-DK")} kr./m²
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className="text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">4.8</span>
                <span className="text-xs text-gray-400">(12 anmeldelser)</span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {[
                  "dog_allowed",
                  "cat_allowed",
                  "balcony",
                  "elevator",
                  "parking",
                  "washing_machine",
                  "ev_charging",
                ]
                  .filter((k) => property[k])
                  .map((k) => (
                    <Badge key={k} type={k} />
                  ))}
              </div>

              <div className="bg-stone-50 rounded-xl p-4 mb-5 flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Depositum</span>
                  <span className="font-medium text-gray-800">
                    {deposit.toLocaleString("da-DK")} kr.
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Forudbetalt leje</span>
                  <span className="font-medium text-gray-800">
                    {prepaidRent.toLocaleString("da-DK")} kr.
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Ledig fra</span>
                  <span className="font-medium text-gray-800">
                    {new Date(property.available_from).toLocaleDateString(
                      "da-DK",
                      { day: "numeric", month: "short", year: "numeric" },
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Min. lejeperiode</span>
                  <span className="font-medium text-gray-800">12 måneder</span>
                </div>
              </div>

              <button
                onClick={handleFavorite}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm border-2 transition-all duration-200 mb-3 ${
                  fav
                    ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                    : "bg-white text-gray-600 border-gray-200 hover:border-forest-400 hover:text-forest-700"
                }`}
              >
                <Heart size={16} fill={fav ? "currentColor" : "none"} />
                {fav ? "Gemt som favorit" : "Gem som favorit"}
              </button>

              <a
                href="mailto:kontakt@boligsilkeborg.dk"
                className="btn-primary w-full justify-center mb-3"
              >
                <Mail size={16} /> Kontakt udlejer
              </a>

              <a
                href="tel:+4587654321"
                className="btn-secondary w-full justify-center"
              >
                <Phone size={16} /> Ring til os
              </a>

              <p className="text-center text-xs text-gray-400 mt-4">
                Svar inden for 24 timer · Ingen bindingsperiode
              </p>

              <div className="mt-5 pt-5 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lake-400 to-lake-700 flex items-center justify-center text-white font-bold text-sm">
                    BS
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">
                      BoligSilkeborg ApS
                    </div>
                    <div className="text-xs text-gray-400 flex items-center gap-1">
                      <ShieldCheck size={11} className="text-green-500" />{" "}
                      Verificeret udlejer
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                  Vi har administreret boliger i Silkeborg siden 2010 og
                  prioriterer altid trygge og tilfredse lejere.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
