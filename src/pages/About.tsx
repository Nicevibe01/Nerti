import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, Eye, Lock, Shield, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui'

export default function About() {
  return (
    <div className="min-h-screen bg-primary text-primary">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-default max-w-4xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <img src="/favicon.png" alt="Nerti" className="w-8 h-8 rounded-lg object-cover" />
        </Link>
        <Link to="/">
          <Button variant="ghost" size="sm"><ArrowLeft size={14} /> Back</Button>
        </Link>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex flex-col gap-10">
          <div>
            <div className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">About Nerti</div>
            <h1 className="text-3xl font-semibold text-primary mb-4">
              See what your money is doing before it moves.
            </h1>
            <p className="text-secondary leading-relaxed">
              Nerti is a financial intelligence platform designed for individuals and businesses who want total clarity over their recurring financial commitments — before they happen, not after.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-primary mb-3">The problem we solve</h2>
            <p className="text-secondary leading-relaxed mb-3">
              Most people have no real visibility into what leaves their accounts until after it has already happened. A subscription renews. An insurance premium deducts. A service they forgot about charges again.
            </p>
            <p className="text-secondary leading-relaxed">
              Nerti maps every recurring financial commitment — subscriptions, insurance premiums, scheduled deductions — into a single intelligent view. You see what is coming, when it is coming, and how much.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {[
              { icon: Eye, title: 'Clarity first', desc: 'Every design decision in Nerti prioritizes clear, honest financial visibility. We never hide information or use design patterns that obscure costs.' },
              { icon: Lock, title: 'Read-only by principle', desc: 'Nerti is built around a read-only philosophy. We surface information — we do not control, manage, or transact on your behalf.' },
              { icon: Shield, title: 'No data monetization', desc: 'Your financial data is yours. We do not sell it, share it, or use it for advertising. Full stop.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4">
                <div className="w-9 h-9 rounded-lg bg-purple-600/10 flex items-center justify-center text-purple-400 flex-shrink-0">
                  <Icon size={16} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-primary mb-1">{title}</div>
                  <div className="text-sm text-secondary leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-default pt-8">
            <h2 className="text-lg font-semibold text-primary mb-2">Product note</h2>
            <p className="text-sm text-secondary leading-relaxed">
              This is a frontend prototype demonstrating the Nerti product concept. All data shown is simulated. No real financial accounts are connected, no real transactions are processed, and no backend infrastructure is involved.
            </p>
          </div>

          <div className="flex gap-3">
            <Link to="/signup"><Button>Get started free</Button></Link>
            <Link to="/"><Button variant="secondary">Back to home</Button></Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
