import { useState } from 'react'
import { motion } from 'framer-motion'
import { format, parseISO } from 'date-fns'
import {
  CreditCard, Shield, AlertTriangle, TrendingUp, Clock, Activity,
  ChevronRight, ArrowUpRight, Zap
} from 'lucide-react'
import { Card, StatCard, Badge, SectionHeader, Button } from '@/components/ui'
import { MonthlyTrendsChart, CategoryPieChart, InsurancePieChart, CashFlowChart } from '@/components/charts'
import { useSubscriptionStore, useInsuranceStore, useAlertStore, useAuthStore } from '@/store'
import { financialSummary, mockUpcomingPayments, mockActivity } from '@/data/mockData'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, delay },
})

export default function Dashboard() {
  const navigate = useNavigate()
  const user = useAuthStore(s => s.user)
  const { alerts } = useAlertStore()
  const [activeTab, setActiveTab] = useState<'all' | 'subscriptions' | 'insurance' | 'alerts'>('all')

  const unreadAlerts = alerts.filter(a => !a.read)
  const criticalAlerts = alerts.filter(a => a.severity === 'critical' && !a.read)

  const filteredActivity = activeTab === 'all' ? mockActivity :
    activeTab === 'alerts' ? mockActivity.filter(a => a.type === 'alert') :
    mockActivity.filter(a => a.type === activeTab)

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div {...fadeUp(0)} className="mb-6">
        <h1 className="text-xl font-semibold text-primary">
          Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {user?.name?.split(' ')[0]}.
        </h1>
        <p className="text-sm text-muted mt-0.5">Here is your financial overview for {format(new Date(), 'MMMM d, yyyy')}.</p>
      </motion.div>

      {/* Critical alerts banner */}
      {criticalAlerts.length > 0 && (
        <motion.div {...fadeUp(0.05)} className="mb-4">
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-red-100 border-red-900">
            <AlertTriangle size={16} className="text-red-900 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="text-sm text-red-900 font-medium">{criticalAlerts[0].title}</span>
              <span className="text-xs text-red-900 ml-2">{criticalAlerts[0].description}</span>
            </div>
            <Badge variant="danger">{criticalAlerts.length} critical</Badge>
          </div>
        </motion.div>
      )}

      {/* Stat cards */}
      <motion.div {...fadeUp(0.1)} className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard
          label="Subscriptions / mo"
          value={`$${financialSummary.totalSubscriptions.toFixed(2)}`}
          sub={`${financialSummary.activeSubscriptions} active services`}
          icon={<CreditCard size={16} />}
          accent="#3b82f6"
          trend="neutral"
          trendText="9 active, 1 paused"
        />
        <StatCard
          label="Insurance / mo"
          value={`$${financialSummary.totalInsurance.toFixed(2)}`}
          sub={`${financialSummary.activePolicies} policies`}
          icon={<Shield size={16} />}
          accent="#8b5cf6"
        />
        <StatCard
          label="Next 72 hours"
          value={`$${financialSummary.upcomingNext72h.toFixed(2)}`}
          sub="2 scheduled deductions"
          icon={<Clock size={16} />}
          accent="#f59e0b"
          trend="down"
          trendText="Due in 2–3 days"
        />
        <StatCard
          label="Total monthly"
          value={`$${(financialSummary.totalSubscriptions + financialSummary.totalInsurance).toFixed(2)}`}
          sub="All commitments combined"
          icon={<TrendingUp size={16} />}
          accent="#10b981"
          trend="neutral"
          trendText="Stable this month"
        />
      </motion.div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-4 mb-4">
        {/* Upcoming payments */}
        <motion.div {...fadeUp(0.15)} className="lg:col-span-1">
          <Card className="h-full">
            <SectionHeader
              title="Upcoming payments"
              subtitle="Next 30 days"
              action={<button onClick={() => navigate('/subscriptions')} className="text-xs text-purple-500 hover:text-purple-300 flex items-center gap-1">View all <ChevronRight size={12} /></button>}
            />
            <div className="flex flex-col gap-1">
              {mockUpcomingPayments.slice(0, 7).map((p) => (
                <div key={p.id} className={clsx(
                  'flex items-center justify-between px-2.5 py-2 rounded-lg transition-colors',
                  p.urgent ? 'bg-red-900/10 border border-red-800/20' : 'hover:bg-card-hover'
                )}>
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={clsx('w-1.5 h-1.5 rounded-full flex-shrink-0', p.urgent ? 'bg-amber-600' : 'bg-purple-400')} />
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-primary truncate">{p.name}</div>
                      <div className="text-[10px] text-muted">{p.type}</div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <div className="text-xs font-mono text-primary">${p.amount.toFixed(2)}</div>
                    <div className={clsx('text-[10px]', p.daysUntil <= 3 ? 'text-amber-400' : 'text-muted')}>
                      {p.daysUntil === 0 ? 'Today' : `in ${p.daysUntil}d`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-default flex items-center justify-between">
              <span className="text-xs text-muted">30-day total</span>
              <span className="text-sm font-mono font-semibold text-primary">${financialSummary.upcomingNext30d.toFixed(2)}</span>
            </div>
          </Card>
        </motion.div>

        {/* Charts */}
        <motion.div {...fadeUp(0.2)} className="lg:col-span-2 flex flex-col gap-4">
          <Card>
            <SectionHeader title="Monthly trends" subtitle="Subscriptions and insurance over time" />
            <MonthlyTrendsChart />
          </Card>
          <Card>
            <SectionHeader title="Predictive cash flow" subtitle="Simulated 2-month forward projection" />
            <CashFlowChart />
          </Card>
        </motion.div>
      </div>

      {/* Alerts + Activity */}
      <div className="grid lg:grid-cols-3 gap-4 mb-4">
        {/* Alert panel */}
        <motion.div {...fadeUp(0.25)}>
          <Card className="h-full">
            <SectionHeader
              title="Predictive alerts"
              subtitle={`${unreadAlerts.length} unread`}
              action={<Badge variant={unreadAlerts.length > 0 ? 'warning' : 'default'}>{unreadAlerts.length}</Badge>}
            />
            <div className="flex flex-col gap-2">
              {alerts.slice(0, 5).map(a => (
                <div key={a.id} className={clsx(
                  'flex gap-2.5 p-2.5 rounded-lg transition-colors',
                  !a.read ? 'bg-blue-900/10 border-blue-900/20' : 'hover:bg-card-hover'
                )}>
                  <div className={clsx('w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0',
                    a.severity === 'critical' ? 'bg-red-600' :
                    a.severity === 'warning' ? 'bg-amber-400' : 'bg-blue-400'
                  )} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-primary">{a.title}</div>
                    {a.amount && <div className="text-[10px] text-muted">${a.amount.toFixed(2)}</div>}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Activity feed */}
        <motion.div {...fadeUp(0.3)} className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-base font-semibold text-primary">Activity feed</h2>
                <p className="text-xs text-muted">Unified timeline of all financial events</p>
              </div>
              <div className="flex gap-1">
                {(['all', 'subscriptions', 'insurance', 'alerts'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={clsx(
                      'px-2.5 py-1 text-[11px] rounded-lg font-medium transition-colors capitalize',
                      activeTab === tab ? 'bg-purple-600/20 text-purple-400' : 'text-muted hover:text-secondary'
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1 max-h-64 overflow-y-auto">
              {filteredActivity.map(item => (
                <div key={item.id} className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-card-hover transition-colors">
                  <div className={clsx('w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0',
                    item.status === 'upcoming' ? 'bg-purple-900/30 text-purple-400' :
                    item.status === 'predicted' ? 'bg-blue-900/30 text-blue-400' :
                    item.status === 'warning' ? 'bg-reds-900/30 text-yellow-400' :
                    'bg-emerald-900/20 text-emerald-400'
                  )}>
                    {item.type === 'subscription' ? <CreditCard size={13} /> :
                     item.type === 'insurance' ? <Shield size={13} /> :
                     item.type === 'alert' ? <AlertTriangle size={13} /> :
                     <Activity size={13} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-primary">{item.title}</div>
                    <div className="text-[10px] text-muted">{item.subtitle}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    {item.amount && <div className="text-xs font-mono text-primary">${item.amount.toFixed(2)}</div>}
                    <div className={clsx('text-[10px]',
                      item.status === 'upcoming' ? 'text-blue-400' :
                      item.status === 'predicted' ? 'text-purple-400' :
                      item.status === 'warning' ? 'text-amber-400' : 'text-muted'
                    )}>
                      {item.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Category breakdowns */}
      <motion.div {...fadeUp(0.35)} className="grid md:grid-cols-2 gap-4">
        <Card>
          <SectionHeader title="Subscription breakdown" subtitle="By category this month" />
          <CategoryPieChart />
        </Card>
        <Card>
          <SectionHeader title="Insurance breakdown" subtitle="Monthly premium distribution" />
          <InsurancePieChart />
        </Card>
      </motion.div>

      {/* Trial prompt */}
      <motion.div {...fadeUp(0.4)} className="mt-4">
        <div className="card p-4 flex items-center justify-between gap-4 border-blue-600/20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600/15 flex items-center justify-center text-purple-400">
              <Zap size={18} />
            </div>
            <div>
              <div className="text-sm font-medium text-primary">Your free trial is active</div>
              <div className="text-xs text-muted">47 days remaining — upgrade at any time to keep access.</div>
            </div>
          </div>
          <Button variant="secondary" size="sm" onClick={() => navigate('/billing')}>
            View plan <ArrowUpRight size={14} />
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
