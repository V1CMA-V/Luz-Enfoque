import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle,
  Circle,
  HelpCircle,
} from 'lucide-react'

export const labels = [
  {
    value: 'familiar',
    label: 'Familiar',
  },
  {
    value: 'profesional',
    label: 'Profesional',
  },
  {
    value: 'producto',
    label: 'Producto',
  },
  {
    value: 'retrato',
    label: 'Retrato',
  },
  {
    value: 'evento',
    label: 'Evento',
  },
]

export const slugs = [
  {
    value: 'familiar',
    label: 'Familiar',
  },
  {
    value: 'profesional',
    label: 'Profesional',
  },
  {
    value: 'producto',
    label: 'Producto',
  },
  {
    value: 'retrato',
    label: 'Retrato',
  },
  {
    value: 'evento',
    label: 'Evento',
  },
]

export const statuses = [
  {
    value: 'pending',
    label: 'Pendiente',
    icon: HelpCircle,
  },
  {
    value: 'progress',
    label: 'En Progreso',
    icon: Circle,
  },
  {
    value: 'done',
    label: 'Done',
    icon: CheckCircle,
  },
]

export const priorities = [
  {
    label: 'Baja',
    value: 'low',
    icon: ArrowDown,
  },
  {
    label: 'Media',
    value: 'medium',
    icon: ArrowRight,
  },
  {
    label: 'Alta',
    value: 'high',
    icon: ArrowUp,
  },
]
