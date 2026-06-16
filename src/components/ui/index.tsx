import { forwardRef } from 'react'
import clsx from 'clsx'

// ── Button ───────────────────────────────────────────────────────────────────
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, className, children, disabled, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed'
    const variants = {
      primary: 'bg-purple-600 hover:bg-purple-500 text-white',
      secondary: 'bg-card border border-default hover:border-purple-500 text-primary',
      ghost: 'text-secondary hover:text-primary hover:bg-card',
      danger: 'bg-red-900/20 border border-red-800 text-red-400 hover:bg-red-900/40',
    }
    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5',
      md: 'text-sm px-4 py-2 gap-2',
      lg: 'text-base px-6 py-3 gap-2',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading && (
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

// ── Input ────────────────────────────────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export function Input({ label, error, icon, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-secondary">{label}</label>}
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">{icon}</div>}
        <input
          className={clsx(
            'w-full bg-card border rounded-lg px-3 py-2.5 text-sm text-primary placeholder:text-muted',
            'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors',
            error ? 'border-red-500' : 'border-default',
            icon ? 'pl-10' : '',
            className
          )}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  )
}

// ── Badge ────────────────────────────────────────────────────────────────────
interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  children: React.ReactNode
  className?: string
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  const variants = {
    default: 'bg-card border-default text-secondary',
    success: 'bg-emerald-900/30 border-emerald-800 text-emerald-400',
    warning: 'bg-amber-900/30 border-amber-800 text-amber-400',
    danger: 'bg-red-900/30 border-red-800 text-red-400',
    info: 'bg-purple-900/30 border-purple-800 text-purple-400',
  }
  return (
    <span className={clsx('inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border', variants[variant], className)}>
      {children}
    </span>
  )
}

// ── Card ─────────────────────────────────────────────────────────────────────
interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export function Card({ children, className, hover, onClick }: CardProps) {
  return (
    <div
      className={clsx('card p-4', hover && 'card-hover cursor-pointer', className)}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string
  value: string
  sub?: string
  icon: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
  trendText?: string
  accent?: string
}

export function StatCard({ label, value, sub, icon, trend, trendText, accent = '#8b5cf6' }: StatCardProps) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted uppercase tracking-wider">{label}</span>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${accent}18`, color: accent }}>
          {icon}
        </div>
      </div>
      <div>
        <div className="text-2xl font-semibold text-primary font-mono">{value}</div>
        {sub && <div className="text-xs text-muted mt-0.5">{sub}</div>}
      </div>
      {trendText && (
        <div className={clsx('text-xs font-medium flex items-center gap-1',
          trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-red-400' : 'text-muted'
        )}>
          {trendText}
        </div>
      )}
    </Card>
  )
}

// ── Toggle ───────────────────────────────────────────────────────────────────
interface ToggleProps {
  checked: boolean
  onChange: (v: boolean) => void
  label?: string
  size?: 'sm' | 'md'
}

export function Toggle({ checked, onChange, label, size = 'md' }: ToggleProps) {
  const sizes = {
    sm: { track: 'w-8 h-4', thumb: 'w-3 h-3', translate: 'translate-x-4' },
    md: { track: 'w-11 h-6', thumb: 'w-5 h-5', translate: 'translate-x-5' },
  }
  const s = sizes[size]
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <div
        className={clsx('relative rounded-full transition-colors duration-200', s.track, checked ? 'bg-purple-600' : 'bg-card border border-default')}
        onClick={() => onChange(!checked)}
      >
        <div className={clsx('absolute top-0.5 left-0.5 rounded-full bg-white transition-transform duration-200', s.thumb, checked && s.translate)} />
      </div>
      {label && <span className="text-sm text-secondary">{label}</span>}
    </label>
  )
}

// ── Divider ──────────────────────────────────────────────────────────────────
export function Divider({ className }: { className?: string }) {
  return <div className={clsx('border-t border-default', className)} />
}

// ── Empty State ──────────────────────────────────────────────────────────────
export function EmptyState({ icon, title, description, action }: { icon: React.ReactNode, title: string, description: string, action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
      <div className="w-12 h-12 rounded-xl bg-card border border-default flex items-center justify-center text-muted">
        {icon}
      </div>
      <div>
        <div className="text-sm font-medium text-primary">{title}</div>
        <div className="text-xs text-muted mt-0.5">{description}</div>
      </div>
      {action}
    </div>
  )
}

// ── Section Header ───────────────────────────────────────────────────────────
export function SectionHeader({ title, subtitle, action }: { title: string, subtitle?: string, action?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <h2 className="text-base font-semibold text-primary">{title}</h2>
        {subtitle && <p className="text-xs text-muted mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}
