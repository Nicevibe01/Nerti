import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, User, Mail, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui'
import { useAuthStore } from '@/store'

export default function Signup() {
  const navigate = useNavigate()
  const signup = useAuthStore(s => s.signup)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !password) { setError('Please fill in all fields.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setLoading(true)
    setError('')
    try {
      await signup(name, email, password)
      navigate('/onboarding')
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
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <img src="/favicon.png" alt="Nerti" className="w-9 h-9 rounded-xl object-cover" />
          </Link>
          <h1 className="text-xl font-semibold text-primary">Create your account</h1>
          <div className="flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-emerald-900/20 border border-emerald-800/30 text-xs text-emerald-400">
            <CheckCircle size={12} /> 2 months free — no card required
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-secondary">Full name</label>
            <div className="relative">
              <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} autoComplete="name"
                className="w-full bg-card border border-default rounded-lg px-3 py-2.5 text-sm text-primary placeholder:text-muted pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-secondary">Email address</label>
            <div className="relative">
              <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email"
                className="w-full bg-card border border-default rounded-lg px-3 py-2.5 text-sm text-primary placeholder:text-muted pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-secondary">Password</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input type={showPw ? 'text' : 'password'} placeholder="Min. 6 characters" value={password} onChange={e => setPassword(e.target.value)} autoComplete="new-password"
                className="w-full bg-card border border-default rounded-lg px-3 py-2.5 text-sm text-primary placeholder:text-muted pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors" />
              <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary">
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-xs text-red-400 bg-red-900/20 border border-red-800 rounded-lg px-3 py-2">{error}</div>
          )}

          <Button type="submit" loading={loading} className="w-full mt-1">
            Create account
          </Button>

          <p className="text-[11px] text-muted text-center">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>

          <div className="text-center border-t border-default pt-3">
            <span className="text-xs text-muted">Already have an account? </span>
            <Link to="/login" className="text-xs text-purple-400 hover:text-purple-300">Sign in</Link>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
