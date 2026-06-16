import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, CreditCard, Shield, Upload, User, Settings,
  Bell, Sun, Moon, LogOut, Menu, X, ChevronRight, Zap, ReceiptText
} from 'lucide-react'
import clsx from 'clsx'
import { useAuthStore, useThemeStore, useAlertStore } from '@/store'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/subscriptions', label: 'Subscriptions', icon: CreditCard },
  { to: '/insurance', label: 'Insurance', icon: Shield },
  { to: '/upload', label: 'Upload Statement', icon: Upload },
  { to: '/billing', label: 'Billing', icon: ReceiptText },
]

const bottomNavItems = [
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const { isDark, toggle } = useThemeStore()
  const { alerts, markRead, markAllRead } = useAlertStore()
  const unread = alerts.filter(a => !a.read).length

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="flex h-screen bg-primary overflow-hidden">
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={clsx(
        'fixed lg:static inset-y-0 left-0 z-40 w-60 flex flex-col bg-secondary border-r border-default transition-transform duration-300',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-default">
          <img src="/favicon.png" alt="Nerti" className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
          <button className="ml-auto lg:hidden text-muted" onClick={() => setSidebarOpen(false)}>
            <X size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
          <div className="text-[10px] font-semibold text-muted uppercase tracking-wider px-2 mb-2">Overview</div>
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => clsx(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150',
                isActive
                  ? 'bg-purple-600/15 text-purple-400 border border-purple-600/20'
                  : 'text-secondary hover:text-primary hover:bg-card'
              )}
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}

          <div className="text-[10px] font-semibold text-muted uppercase tracking-wider px-2 mt-4 mb-2">Account</div>
          {bottomNavItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => clsx(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150',
                isActive
                  ? 'bg-purple-600/15 text-purple-400 border border-purple-600/20'
                  : 'text-secondary hover:text-primary hover:bg-card'
              )}
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Trial banner */}
        {user?.plan === 'trial' && (
          <div className="mx-3 mb-3 p-3 rounded-lg bg-purple-600/10 border border-purple-600/20">
            <div className="text-xs font-semibold text-purple-400">Free Trial</div>
            <div className="text-[11px] text-muted mt-0.5">
              Ends {user.trialEndsAt} — <span className="text-purple-400 cursor-pointer" onClick={() => navigate('/billing')}>Upgrade</span>
            </div>
          </div>
        )}

        {/* User */}
        <div className="border-t border-default p-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-600/20 border border-purple-600/30 flex items-center justify-center text-xs font-semibold text-purple-400 flex-shrink-0">
              <img src="/favicon.png" alt="Nerti" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-primary truncate">{user?.name}</div>
              <div className="text-[10px] text-muted truncate">{user?.email}</div>
            </div>
            <button onClick={handleLogout} className="text-muted hover:text-red-400 transition-colors">
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="flex items-center gap-3 px-4 py-3 border-b border-default bg-secondary flex-shrink-0">
          <button className="lg:hidden text-muted hover:text-primary" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </button>

          <div className="flex-1" />

          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="w-8 h-8 rounded-lg text-muted hover:text-primary hover:bg-card flex items-center justify-center transition-colors"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(v => !v)}
              className="w-8 h-8 rounded-lg text-muted hover:text-primary hover:bg-card flex items-center justify-center transition-colors relative"
            >
              <Bell size={16} />
              {unread > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-purple-500" />
              )}
            </button>

            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-10 w-80 card shadow-2xl z-50 overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-default">
                    <span className="text-sm font-semibold text-primary">Alerts</span>
                    <div className="flex items-center gap-3">
                        {unread > 0 && (
                        <button onClick={markAllRead} className="text-xs text-purple-400 hover:text-purple-300">
                          Mark all read
                        </button>
                      )}
                      <button onClick={() => setNotifOpen(false)} className="text-muted hover:text-primary">
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-default">
                    {alerts.slice(0, 6).map(alert => (
                      <div
                        key={alert.id}
                        className={clsx('px-4 py-3 cursor-pointer hover:bg-card transition-colors', !alert.read && 'bg-purple-900/10')}
                        onClick={() => markRead(alert.id)}
                      >
                        <div className="flex items-start gap-2">
                          <div className={clsx('w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0',
                            alert.severity === 'critical' ? 'bg-red-400' :
                            alert.severity === 'warning' ? 'bg-amber-400' : 'bg-purple-400'
                          )} />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium text-primary">{alert.title}</div>
                            <div className="text-[11px] text-muted mt-0.5 line-clamp-2">{alert.description}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2.5 border-t border-default">
                    <button
                      onClick={() => { navigate('/settings'); setNotifOpen(false) }}
                      className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
                    >
                      Notification settings <ChevronRight size={12} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <button onClick={() => navigate('/profile')} className="w-8 h-8 rounded-full bg-purple-600/20 border border-purple-600/30 flex items-center justify-center text-xs font-semibold text-purple-400">
            {user?.name?.charAt(0) ?? 'U'}
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  )
}
