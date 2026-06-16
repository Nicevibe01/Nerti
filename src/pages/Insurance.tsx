import { motion } from 'framer-motion'
import { format, parseISO, differenceInDays } from 'date-fns'
import { Shield, AlertCircle } from 'lucide-react'
import { Card, Badge, Button, SectionHeader } from '@/components/ui'
import { InsurancePieChart } from '@/components/charts'
import { useInsuranceStore } from '@/store'
import clsx from 'clsx'

const categoryColors: Record<string, string> = {
  health: '#0ea5e9',
  life: '#8b5cf6',
  auto: '#f59e0b',
  home: '#10b981',
  device: '#f97316',
}

export default function Insurance() {
  const { policies } = useInsuranceStore()
  const total = policies.reduce((sum, p) => sum + p.premium, 0)
  const expiringSoon = policies.filter(p => p.status === 'expiring_soon')

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-primary">Insurance</h1>
            <p className="text-sm text-muted mt-0.5">{policies.length} policies — ${total.toFixed(2)}/month total premiums</p>
          </div>
          <Button size="sm" variant="secondary">
            <Shield size={14} /> Add policy
          </Button>
        </div>

        {/* Expiring banner */}
        {expiringSoon.length > 0 && (
          <div className="mb-4 p-3.5 rounded-xl bg-amber-900/10 border border-amber-800/20 flex items-center gap-3">
            <AlertCircle size={16} className="text-amber-300 flex-shrink-0" />
            <div className="text-sm">
              <span className="font-medium text-amber-800">{expiringSoon.length} {expiringSoon.length === 1 ? 'policy' : 'policies'} renewing soon:</span>
              <span className="text-amber-400/80 ml-2">{expiringSoon.map(p => p.name).join(', ')}</span>
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Monthly premiums', value: `$${total.toFixed(2)}` },
            { label: 'Annual coverage cost', value: `$${(total * 12).toFixed(2)}` },
            { label: 'Active policies', value: policies.filter(p => p.status === 'active').length.toString() },
          ].map(c => (
            <Card key={c.label}>
              <div className="text-[10px] text-muted uppercase tracking-wider mb-1">{c.label}</div>
              <div className="text-lg font-mono font-semibold text-primary">{c.value}</div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <Card>
              <SectionHeader title="All policies" />
              <div className="flex flex-col gap-2">
                {policies.map(policy => {
                  const daysUntilRenewal = differenceInDays(parseISO(policy.renewalDate), new Date())
                  const color = categoryColors[policy.category]
                  return (
                    <div key={policy.id} className={clsx(
                      'flex items-center gap-3 p-4 rounded-xl border transition-all hover:bg-card-hover',
                      policy.status === 'expiring_soon' ? 'border-amber-800/30 bg-amber-900/10' : 'border-default'
                    )}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${color}18`, color }}>
                        <Shield size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-primary">{policy.name}</div>
                        <div className="text-xs text-muted">{policy.provider}</div>
                      </div>
                      <div className="text-right hidden sm:block">
                        <div className="text-xs text-muted">Renews</div>
                        <div className={clsx('text-xs', daysUntilRenewal <= 30 ? 'text-amber-400' : 'text-primary')}>
                          {format(parseISO(policy.renewalDate), 'MMM d, yyyy')}
                        </div>
                        {daysUntilRenewal <= 30 && (
                          <div className="text-[10px] text-amber-400">in {daysUntilRenewal} days</div>
                        )}
                      </div>
                      <div className="text-right ml-2">
                        <div className="text-sm font-mono font-medium text-primary">${policy.premium.toFixed(2)}</div>
                        <div className="text-[10px] text-muted">{policy.frequency}</div>
                      </div>
                      <div className="flex flex-col gap-1 items-end">
                        <Badge variant={
                          policy.status === 'active' ? 'success' :
                          policy.status === 'expiring_soon' ? 'warning' : 'danger'
                        }>
                          {policy.status === 'expiring_soon' ? 'expiring' : policy.status}
                        </Badge>
                        <Badge variant="default">{policy.category}</Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>

          <div className="flex flex-col gap-4">
            <Card>
              <SectionHeader title="By category" subtitle="Monthly premium split" />
              <InsurancePieChart />
            </Card>
            <Card>
              <SectionHeader title="Renewal timeline" />
              <div className="flex flex-col gap-2">
                {[...policies]
                  .sort((a, b) => differenceInDays(parseISO(a.renewalDate), parseISO(b.renewalDate)))
                  .map(p => {
                    const days = differenceInDays(parseISO(p.renewalDate), new Date())
                    return (
                      <div key={p.id} className="flex items-center justify-between py-1.5">
                        <div className="text-xs text-primary truncate flex-1">{p.name}</div>
                        <div className={clsx('text-xs font-mono ml-2', days <= 30 ? 'text-amber-400' : 'text-muted')}>
                          {days}d
                        </div>
                      </div>
                    )
                  })}
              </div>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
