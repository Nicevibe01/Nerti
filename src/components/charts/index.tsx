import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { mockMonthlyTrends, mockCategoryBreakdown, mockInsuranceBreakdown } from '@/data/mockData'

const tooltipStyle = {
  backgroundColor: '#0d1628',
  border: '1px solid #1a2d4a',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '12px',
}

// ── Monthly Trends ────────────────────────────────────────────────────────────
export function MonthlyTrendsChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={mockMonthlyTrends} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="gradSub" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradIns" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1a2d4a" />
        <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
        <Tooltip
          contentStyle={tooltipStyle}
          itemStyle={{ color: '#ffffff' }}
          labelStyle={{ color: '#ffffff' }}
          formatter={(v: number) => [`$${v.toFixed(2)}`, '']}
        />
        <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
        <Area type="monotone" dataKey="subscriptions" name="Subscriptions" stroke="#3b82f6" fill="url(#gradSub)" strokeWidth={2} dot={false} />
        <Area type="monotone" dataKey="insurance" name="Insurance" stroke="#8b5cf6" fill="url(#gradIns)" strokeWidth={2} dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

// ── Predictive Cash Flow ──────────────────────────────────────────────────────
export function CashFlowChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={mockMonthlyTrends} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="gradTotal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1a2d4a" />
        <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
        <Tooltip
          contentStyle={tooltipStyle}
          itemStyle={{ color: '#ffffff' }}
          labelStyle={{ color: '#ffffff' }}
          formatter={(v: number, _n, props) => [
            `$${v.toFixed(2)}${props.payload?.predicted ? ' (predicted)' : ''}`,
            'Total outflow'
          ]}
        />
        <Area
          type="monotone" dataKey="total" name="Total" stroke="#3b82f6"
          fill="url(#gradTotal)" strokeWidth={2} dot={false}
          strokeDasharray="4 3"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

// ── Category Breakdown ────────────────────────────────────────────────────────
export function CategoryPieChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={mockCategoryBreakdown}
          cx="50%" cy="50%"
          innerRadius={55} outerRadius={80}
          paddingAngle={3}
          dataKey="value"
        >
          {mockCategoryBreakdown.map((entry, i) => (
            <Cell key={i} fill={entry.color} opacity={0.85} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={tooltipStyle}
          itemStyle={{ color: '#ffffff' }}
          labelStyle={{ color: '#ffffff' }}
          formatter={(v: number) => [`$${v.toFixed(2)}`, '']}
        />
        <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
      </PieChart>
    </ResponsiveContainer>
  )
}

// ── Insurance Breakdown ───────────────────────────────────────────────────────
export function InsurancePieChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={mockInsuranceBreakdown}
          cx="50%" cy="50%"
          innerRadius={55} outerRadius={80}
          paddingAngle={3}
          dataKey="value"
        >
          {mockInsuranceBreakdown.map((entry, i) => (
            <Cell key={i} fill={entry.color} opacity={0.85} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={tooltipStyle}
          itemStyle={{ color: '#ffffff' }}
          labelStyle={{ color: '#ffffff' }}
          formatter={(v: number) => [`$${v.toFixed(2)}`, '']}
        />
        <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
      </PieChart>
    </ResponsiveContainer>
  )
}

// ── Spending Bar ──────────────────────────────────────────────────────────────
export function SpendingBarChart() {
  const data = mockMonthlyTrends.filter(m => !m.predicted)
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1a2d4a" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
        <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: '#ffffff' }} labelStyle={{ color: '#ffffff' }} formatter={(v: number) => [`$${v.toFixed(2)}`, '']} />
        <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
        <Bar dataKey="subscriptions" name="Subscriptions" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        <Bar dataKey="insurance" name="Insurance" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
