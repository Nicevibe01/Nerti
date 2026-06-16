import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Zap, CreditCard, Shield, Eye, Lock, ChevronRight,
  BarChart2, Bell, CheckCircle, ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui'
import { useThemeStore } from '@/store'
import { Sun, Moon } from 'lucide-react'


const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
})

export default function Landing() {
  const navigate = useNavigate()
  const { isDark, toggle } = useThemeStore()

  return (
    <div className="min-h-screen bg-primary text-primary">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-default max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <img src="/favicon.png" alt="Nerti" className="w-8 h-8 rounded-lg object-cover" />
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm text-secondary hover:text-primary transition-colors">Features</a>
          <a href="#pricing" className="text-sm text-secondary hover:text-primary transition-colors">Pricing</a>
          <a href="/about" className="text-sm text-secondary hover:text-primary transition-colors">About</a>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={toggle} className="w-8 h-8 rounded-lg text-muted hover:text-primary hover:bg-card flex items-center justify-center transition-colors">
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Sign in</Button>
          <Button size="sm" onClick={() => navigate('/signup')}>Get started</Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
        

        <motion.h1 {...fadeUp(0.1)} className="text-4xl md:text-6xl font-semibold text-primary leading-tight mb-6">
          Understanding what leaves<br />
          <span className="gradient-text">your account before it happens.</span>
        </motion.h1>

        <motion.p {...fadeUp(0.2)} className="text-lg text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
          Nerti maps your subscriptions, insurance premiums, and upcoming financial commitments into a single intelligent view, so you are never caught off guard.
        </motion.p>

        <motion.div {...fadeUp(0.3)} className="flex items-center justify-center gap-3 flex-wrap">
          <Button size="lg" onClick={() => navigate('/signup')}>
            Start free trial <ArrowRight size={16} />
          </Button>
          <Button variant="secondary" size="lg" onClick={() => navigate('/login')}>
            Sign in
          </Button>
        </motion.div>
        {/* Hero visual */}
        <motion.div {...fadeUp(0.4)} className="mt-16 relative">
          <div className="rounded-2xl border border-default bg-secondary overflow-hidden shadow-2xl glow-blue">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-default">
              <img src='favicon.png' className="w-5 h-5 rounded-full" />
             
              <div className="ml-4 flex-1 h-5 rounded bg-card" />
            </div>
            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Subscriptions', value: '$166.97', color: '#3b82f6' },
                { label: 'Insurance', value: '$487.99', color: '#8b5cf6' },
                { label: 'Next 72h', value: '$35.98', color: '#f59e0b' },
                { label: 'Active Services', value: '14', color: '#10b981' },
              ].map((s) => (
                <div key={s.label} className="card p-4">
                  <div className="text-[10px] text-muted uppercase tracking-wider mb-1">{s.label}</div>
                  <div className="text-xl font-mono font-semibold" style={{ color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>
            <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card p-4">
                <div className="text-xs font-medium text-secondary mb-3">Upcoming payments</div>
                {[
                  { name: 'Netflix', days: 2, amount: '$15.99' },
                  { name: 'ChatGPT Plus', days: 3, amount: '$20.00' },
                  { name: 'Spotify', days: 5, amount: '$9.99' },
                ].map((p) => (
                  <div key={p.name} className="flex items-center justify-between py-2 border-b border-default last:border-0">
                    <div className="text-xs text-primary">{p.name}</div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-amber-400">in {p.days}d</span>
                      <span className="text-xs font-mono text-primary">{p.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="card p-4">
                <div className="text-xs font-medium text-secondary mb-3">Alerts</div>
                {[
                  { text: 'Netflix billing in 2 days', sev: 'warning' },
                  { text: 'Unusual Adobe CC charge', sev: 'critical' },
                  { text: 'Auto insurance renewal soon', sev: 'info' },
                ].map((a, i) => (
                  <div key={i} className="flex items-center gap-2 py-2 border-b border-default last:border-0">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${a.sev === 'critical' ? 'bg-red-400' : a.sev === 'warning' ? 'bg-amber-400' : 'bg-blue-400'}`} />
                    <span className="text-xs text-secondary">{a.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-5xl mx-auto px-6 py-20">
        <motion.div {...fadeUp(0)} className="text-center mb-14">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">Features</div>
          <h2 className="text-3xl font-semibold text-primary">Everything your finances need visibility on</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: CreditCard,
              title: 'Subscription Tracking',
              description: 'Every recurring service in one place. Billing dates, amounts, and categories — always visible.',
              color: '#3b82f6',
            },
            {
              icon: Shield,
              title: 'Insurance Management',
              description: 'Track premium payments and renewal dates across health, life, auto, and home policies.',
              color: '#8b5cf6',
            },
            {
              icon: Bell,
              title: 'Predictive Alerts',
              description: 'Know what is leaving your account 24–72 hours before it happens. No more surprise deductions.',
              color: '#f59e0b',
            },
            {
              icon: BarChart2,
              title: 'Spending Analytics',
              description: 'Visual breakdowns of where your money goes each month, with category and trend analysis.',
              color: '#10b981',
            },
            {
              icon: Eye,
              title: 'Financial Timeline',
              description: 'A 30-day forward-looking view of all scheduled and predicted financial events.',
              color: '#ec4899',
            },
            {
              icon: Lock,
              title: 'Read-only by Design',
              description: 'Nerti operates on visibility only. Your financial accounts remain entirely under your control.',
              color: '#f97316',
            },
          ].map(({ icon: Icon, title, description, color }, i) => (
            <motion.div key={title} {...fadeUp(i * 0.05)}>
              <div className="card card-hover p-5 h-full">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${color}18`, color }}>
                  <Icon size={18} />
                </div>
                <h3 className="text-sm font-semibold text-primary mb-2">{title}</h3>
                <p className="text-sm text-secondary leading-relaxed">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-default">
        <div className="text-center mb-10">
          <div className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">Security</div>
          <h2 className="text-2xl font-semibold text-primary">Built for trust</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Eye, title: 'Read-only access', description: 'Nerti never initiates transactions or requests write permissions.' },
            { icon: Lock, title: 'End-to-end encrypted', description: 'All data in transit and at rest is encrypted using industry standards.' },
            { icon: Shield, title: 'Zero data selling', description: 'Your financial data is never sold, shared, or monetized with third parties.' },
          ].map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex gap-4">
              <div className="w-9 h-9 rounded-lg bg-emerald-900/20 border border-emerald-800/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <Icon size={16} />
              </div>
              <div>
                <div className="text-sm font-medium text-primary mb-1">{title}</div>
                <div className="text-sm text-secondary">{description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-5xl mx-auto px-6 py-20 border-t border-default">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">Pricing</div>
          <h2 className="text-3xl font-semibold text-primary">Simple, honest pricing</h2>
          <p className="text-secondary mt-2 text-sm">Try Nerti free for 2 months. No credit card required.</p>
        </div>
        <div className="max-w-sm mx-auto">
          <div className="card p-8 text-center glow-purple border-purple-600/20">
            <div className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-4">Pro Plan</div>
            <div className="flex items-end justify-center gap-1 mb-2">
              <span className="text-4xl font-semibold text-primary font-mono">$4.99</span>
              <span className="text-secondary text-sm mb-1">/month</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/20 border border-emerald-800/30 text-xs text-emerald-400 font-medium mb-6">
              <CheckCircle size={12} /> 2 months free — then $4.99/month
            </div>
            <div className="flex flex-col gap-3 text-left mb-8">
              {[
                'Unlimited subscription tracking',
                'Insurance premium monitoring',
                '24–72h predictive alerts',
                'Bank statement upload & analysis',
                'Spending analytics & trends',
                'Multi-account support',
              ].map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-secondary">
                  <CheckCircle size={14} className="text-emerald-400 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
            <Button size="lg" className="w-full" onClick={() => navigate('/signup')}>
              Start free trial <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-t border-default text-center">
        <h2 className="text-3xl font-semibold text-primary mb-4">See what your money is doing before it moves.</h2>
        <p className="text-secondary mb-8 text-sm">Join thousands of people who have total visibility over their financial commitments.</p>
        <div className="flex items-center justify-center gap-3">
          <Button size="lg" onClick={() => navigate('/signup')}>Get started free</Button>
          <Button variant="secondary" size="lg" onClick={() => navigate('/login')}>Sign in</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-default py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/favicon.png" alt="Nerti" className="w-6 h-6 rounded object-cover" />
          </div>
          <div className="flex items-center gap-6 text-xs text-muted">
            <a href="/about" className="hover:text-primary transition-colors">About</a>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
          <div className="text-xs text-muted">2025 Nerti. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
