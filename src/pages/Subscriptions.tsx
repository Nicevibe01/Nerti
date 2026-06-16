import { useState } from 'react'
import { motion } from 'framer-motion'
import { format, parseISO } from 'date-fns'
import { CreditCard, Search, Filter, Pause, Play, ExternalLink } from 'lucide-react'
import { Card, Badge, Button, SectionHeader } from '@/components/ui'
import { SpendingBarChart, CategoryPieChart } from '@/components/charts'
import { useSubscriptionStore } from '@/store'
import clsx from 'clsx'

const categories = ['All', 'Entertainment', 'Productivity', 'AI Tools', 'Developer Tools', 'Design']

export default function Subscriptions() {
  const { subscriptions, toggleStatus } = useSubscriptionStore()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'paused'>('all')

  const filtered = subscriptions.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'All' || s.category === category
    const matchStatus = statusFilter === 'all' || s.status === statusFilter
    return matchSearch && matchCat && matchStatus
  })

  const total = subscriptions.filter(s => s.status === 'active').reduce((sum, s) => sum + s.amount, 0)

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-primary">Subscriptions</h1>
            <p className="text-sm text-muted mt-0.5">
              {subscriptions.filter(s => s.status === 'active').length} active services — ${total.toFixed(2)}/month
            </p>
          </div>
          <Button size="sm" variant="secondary">
            <CreditCard size={14} /> Add subscription
          </Button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Monthly total', value: `$${total.toFixed(2)}`, sub: 'active subscriptions' },
            { label: 'Annual projection', value: `$${(total * 12).toFixed(2)}`, sub: 'at current rate' },
            { label: 'Services tracked', value: subscriptions.length.toString(), sub: `${subscriptions.filter(s => s.status === 'paused').length} paused` },
          ].map(c => (
            <Card key={c.label}>
              <div className="text-[10px] text-muted uppercase tracking-wider mb-1">{c.label}</div>
              <div className="text-lg font-mono font-semibold text-primary">{c.value}</div>
              <div className="text-xs text-muted mt-0.5">{c.sub}</div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-4 mb-4">
          {/* List */}
          <div className="lg:col-span-2">
            <Card>
              <SectionHeader title="All subscriptions" />
              {/* Filters */}
              <div className="flex flex-col gap-2 mb-4">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    placeholder="Search subscriptions..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full bg-secondary border border-default rounded-lg pl-9 pr-3 py-2 text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {(['all', 'active', 'paused'] as const).map(s => (
                    <button key={s} onClick={() => setStatusFilter(s)}
                      className={clsx('px-2.5 py-1 text-xs rounded-lg font-medium capitalize transition-colors',
                        statusFilter === s ? 'bg-purple-600/20 text-purple-400' : 'text-muted hover:text-secondary hover:bg-card-hover'
                      )}>
                      {s}
                    </button>
                  ))}
                  <div className="ml-auto">
                    <select value={category} onChange={e => setCategory(e.target.value)}
                      className="text-xs bg-card border border-default rounded-lg px-2 py-1 text-secondary focus:outline-none focus:ring-1 focus:ring-purple-500">
                      {categories.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                {filtered.map(sub => (
                  <div key={sub.id} className="flex items-center gap-3 p-3 rounded-xl border border-transparent hover:border-default hover:bg-card-hover transition-all">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center font-semibold text-sm flex-shrink-0"
                      style={{ backgroundColor: `${sub.color}22`, color: sub.color }}>
                      {sub.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-primary">{sub.name}</div>
                      <div className="text-xs text-muted">{sub.category}</div>
                    </div>
                    <div className="text-right hidden sm:block">
                      <div className="text-xs text-muted">Next billing</div>
                      <div className="text-xs text-primary">{format(parseISO(sub.nextBillingDate), 'MMM d')}</div>
                    </div>
                    <div className="text-right ml-2">
                      <div className="text-sm font-mono font-medium text-primary">${sub.amount.toFixed(2)}</div>
                      <div className="text-[10px] text-muted">{sub.billingCycle}</div>
                    </div>
                    <Badge variant={sub.status === 'active' ? 'success' : sub.status === 'paused' ? 'warning' : 'danger'}>
                      {sub.status}
                    </Badge>
                    <button onClick={() => toggleStatus(sub.id)}
                      className="w-7 h-7 rounded-lg bg-card border border-default flex items-center justify-center text-muted hover:text-primary transition-colors flex-shrink-0">
                      {sub.status === 'active' ? <Pause size={13} /> : <Play size={13} />}
                    </button>
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div className="text-center py-8 text-sm text-muted">No subscriptions found.</div>
                )}
              </div>
            </Card>
          </div>

          {/* Charts sidebar */}
          <div className="flex flex-col gap-4">
            <Card>
              <SectionHeader title="By category" />
              <CategoryPieChart />
            </Card>
          </div>
        </div>

        <Card>
          <SectionHeader title="Monthly spending history" subtitle="Past 6 months" />
          <SpendingBarChart />
        </Card>
      </motion.div>
    </div>
  )
}
