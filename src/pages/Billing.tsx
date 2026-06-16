import { motion } from 'framer-motion'
import { CheckCircle, Zap, CreditCard, FileText } from 'lucide-react'
import { Card, Button, Badge, SectionHeader } from '@/components/ui'
import { useAuthStore } from '@/store'
import { format, parseISO } from 'date-fns'

const features = [
  'Unlimited subscription tracking',
  'Insurance premium monitoring',
  '24–72h predictive alerts',
  'Bank statement upload and analysis',
  'Spending analytics and trends',
  'Multi-account support',
  'Priority support',
  'PWA mobile app access',
]

export default function Billing() {
  const { user } = useAuthStore()

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-primary">Billing</h1>
          <p className="text-sm text-muted mt-0.5">Manage your plan and billing information.</p>
        </div>

        {/* Current plan */}
        <Card className="mb-4 border-purple-600/20">
          <SectionHeader title="Current plan" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600/15 flex items-center justify-center text-purple-400">
                <Zap size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold text-primary flex items-center gap-2">
                  Pro Plan
                  <Badge variant={user?.plan === 'trial' ? 'info' : 'success'}>
                    {user?.plan === 'trial' ? 'Trial active' : 'Active'}
                  </Badge>
                </div>
                {user?.plan === 'trial' && user.trialEndsAt && (
                  <div className="text-xs text-muted mt-0.5">
                    Free trial ends {format(parseISO(user.trialEndsAt), 'MMMM d, yyyy')}
                  </div>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-mono font-semibold text-primary">$4.99</div>
              <div className="text-xs text-muted">/month after trial</div>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {/* Plan details */}
          <Card>
            <SectionHeader title="What's included" />
            <div className="flex flex-col gap-2.5">
              {features.map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-secondary">
                  <CheckCircle size={14} className="text-emerald-400 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </Card>

          {/* Checkout UI */}
          <Card>
            <SectionHeader title="Payment method" subtitle="Secure checkout via Stripe" />
            <div className="flex flex-col gap-4">
              <div className="p-4 rounded-xl border border-default bg-secondary">
                <div className="text-xs text-muted mb-3">Card details</div>
                <div className="space-y-2">
                  <div className="h-9 rounded-lg bg-card border border-default flex items-center px-3 gap-2">
                    <CreditCard size={14} className="text-muted" />
                    <span className="text-xs text-muted">•••• •••• •••• 4242</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-9 rounded-lg bg-card border border-default flex items-center px-3">
                      <span className="text-xs text-muted">MM / YY</span>
                    </div>
                    <div className="h-9 rounded-lg bg-card border border-default flex items-center px-3">
                      <span className="text-xs text-muted">CVC</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-secondary">Subtotal</span>
                <span className="font-mono text-primary">$4.99</span>
              </div>
              <div className="flex items-center justify-between text-sm border-t border-default pt-2">
                <span className="font-medium text-primary">Total today</span>
                <span className="font-mono font-semibold text-emerald-400">$0.00</span>
              </div>
              <div className="text-[11px] text-muted">2-month free trial. Billing starts after trial ends.</div>

              <Button className="w-full" size="md">
                Activate subscription
              </Button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted">
                <CheckCircle size={11} className="text-emerald-400" />
                Secured by Stripe — cancel anytime
              </div>
            </div>
          </Card>
        </div>

        {/* Billing history */}
        <Card>
          <SectionHeader title="Billing history" />
          <div className="text-center py-8">
            <FileText size={24} className="text-muted mx-auto mb-2" />
            <div className="text-sm text-muted">No invoices yet.</div>
            <div className="text-xs text-muted mt-0.5">Your first invoice will appear here after your trial ends.</div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
