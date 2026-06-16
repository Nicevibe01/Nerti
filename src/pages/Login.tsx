import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { Button, Input } from '@/components/ui'
import { useAuthStore } from '@/store'

export default function Login() {
  const navigate = useNavigate()
  const login = useAuthStore(s => s.login)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) { setError('Please fill in all fields.'); return }
    setLoading(true)
    setError('')
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <img src="/favicon.png" alt="Nerti" className="w-9 h-9 rounded-xl object-cover" />
          </Link>
          <h1 className="text-xl font-semibold text-primary">Welcome back</h1>
          <p className="text-sm text-secondary mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 flex flex-col gap-4">
          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            icon={<Mail size={15} />}
            autoComplete="email"
          />
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-secondary">Password</label>
              <button type="button" className="text-xs text-purple-400 hover:text-purple-300">Forgot password?</button>
            </div>
            <div className="relative">
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type={showPw ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full bg-card border border-default rounded-lg px-3 py-2.5 text-sm text-primary placeholder:text-muted pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              />
              <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary">
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-xs text-red-400 bg-red-900/20 border border-red-800 rounded-lg px-3 py-2">{error}</div>
          )}

          <Button type="submit" loading={loading} className="w-full mt-1">
            Sign in
          </Button>

          <div className="text-center">
            <span className="text-xs text-muted">Don't have an account? </span>
            <Link to="/signup" className="text-xs text-purple-400 hover:text-purple-300">Create account</Link>
          </div>
        </form>

        <p className="text-center text-[11px] text-muted mt-6">
          Any email and password works — this is a demo environment.
        </p>
      </motion.div>
    </div>
  )
}
