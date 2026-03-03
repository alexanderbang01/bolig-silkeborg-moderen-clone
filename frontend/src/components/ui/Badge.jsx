import {
  Dog,
  Cat,
  Zap,
  ParkingCircle,
  WashingMachine,
  Sunset,
  ArrowUpDown,
  Check,
} from 'lucide-react'

const badgeConfig = {
  dog_allowed: {
    label: 'Hund tilladt',
    icon: Dog,
    className: 'bg-amber-50 text-amber-700 border border-amber-200',
  },
  cat_allowed: {
    label: 'Kat tilladt',
    icon: Cat,
    className: 'bg-orange-50 text-orange-700 border border-orange-200',
  },
  balcony: {
    label: 'Altan/terrasse',
    icon: Sunset,
    className: 'bg-sky-50 text-sky-700 border border-sky-200',
  },
  elevator: {
    label: 'Elevator',
    icon: ArrowUpDown,
    className: 'bg-purple-50 text-purple-700 border border-purple-200',
  },
  parking: {
    label: 'Parkering',
    icon: ParkingCircle,
    className: 'bg-blue-50 text-blue-700 border border-blue-200',
  },
  washing_machine: {
    label: 'Vaskemaskine',
    icon: WashingMachine,
    className: 'bg-teal-50 text-teal-700 border border-teal-200',
  },
  ev_charging: {
    label: 'Elbil-opladning',
    icon: Zap,
    className: 'bg-green-50 text-green-700 border border-green-200',
  },
}

export default function Badge({ type, label, className = '' }) {
  const config = badgeConfig[type]

  if (config) {
    const Icon = config.icon
    return (
      <span className={`badge ${config.className} ${className}`}>
        <Icon size={11} />
        {config.label}
      </span>
    )
  }

  return (
    <span className={`badge bg-gray-100 text-gray-600 border border-gray-200 ${className}`}>
      <Check size={11} />
      {label}
    </span>
  )
}