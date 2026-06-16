import type { Subscription, InsurancePolicy, Alert, ActivityItem, UpcomingPayment, MonthlyTrend } from '@/types'
import { addDays, format, subDays, subMonths } from 'date-fns'

const today = new Date()
const fmt = (d: Date) => format(d, 'yyyy-MM-dd')

export const mockSubscriptions: Subscription[] = [
  { id: 's1', name: 'Netflix', category: 'Entertainment', amount: 15.99, billingCycle: 'monthly', nextBillingDate: fmt(addDays(today, 2)), status: 'active', color: '#e50914' },
  { id: 's2', name: 'Spotify', category: 'Entertainment', amount: 9.99, billingCycle: 'monthly', nextBillingDate: fmt(addDays(today, 5)), status: 'active', color: '#1db954' },
  { id: 's3', name: 'Adobe Creative Cloud', category: 'Productivity', amount: 54.99, billingCycle: 'monthly', nextBillingDate: fmt(addDays(today, 12)), status: 'active', color: '#ff0000' },
  { id: 's4', name: 'GitHub Pro', category: 'Developer Tools', amount: 4.00, billingCycle: 'monthly', nextBillingDate: fmt(addDays(today, 18)), status: 'active', color: '#6e40c9' },
  { id: 's5', name: 'Notion', category: 'Productivity', amount: 8.00, billingCycle: 'monthly', nextBillingDate: fmt(addDays(today, 22)), status: 'active', color: '#000000' },
  { id: 's6', name: 'ChatGPT Plus', category: 'AI Tools', amount: 20.00, billingCycle: 'monthly', nextBillingDate: fmt(addDays(today, 3)), status: 'active', color: '#10a37f' },
  { id: 's7', name: 'Figma Professional', category: 'Design', amount: 12.00, billingCycle: 'monthly', nextBillingDate: fmt(addDays(today, 28)), status: 'active', color: '#f24e1e' },
  { id: 's8', name: 'Linear', category: 'Productivity', amount: 8.00, billingCycle: 'monthly', nextBillingDate: fmt(addDays(today, 9)), status: 'paused', color: '#5e6ad2' },
  { id: 's9', name: 'Vercel Pro', category: 'Developer Tools', amount: 20.00, billingCycle: 'monthly', nextBillingDate: fmt(addDays(today, 15)), status: 'active', color: '#000000' },
  { id: 's10', name: 'YouTube Premium', category: 'Entertainment', amount: 13.99, billingCycle: 'monthly', nextBillingDate: fmt(addDays(today, 7)), status: 'active', color: '#ff0000' },
]

export const mockInsurancePolicies: InsurancePolicy[] = [
  { id: 'i1', name: 'Health Shield Plan', provider: 'BlueCross Health', category: 'health', premium: 220.00, frequency: 'monthly', renewalDate: fmt(addDays(today, 45)), status: 'active', color: '#0ea5e9' },
  { id: 'i2', name: 'Term Life Cover', provider: 'Prudential Life', category: 'life', premium: 45.00, frequency: 'monthly', renewalDate: fmt(addDays(today, 120)), status: 'active', color: '#8b5cf6' },
  { id: 'i3', name: 'Auto Insurance', provider: 'StateFarm Auto', category: 'auto', premium: 98.00, frequency: 'monthly', renewalDate: fmt(addDays(today, 22)), status: 'expiring_soon', color: '#f59e0b' },
  { id: 'i4', name: 'Home & Contents', provider: 'Allstate Home', category: 'home', premium: 112.00, frequency: 'monthly', renewalDate: fmt(addDays(today, 200)), status: 'active', color: '#10b981' },
  { id: 'i5', name: 'Device Protection', provider: 'SquareTrade', category: 'device', premium: 12.99, frequency: 'monthly', renewalDate: fmt(addDays(today, 8)), status: 'expiring_soon', color: '#f97316' },
]

export const mockAlerts: Alert[] = [
  { id: 'a1', type: 'subscription', severity: 'warning', title: 'Netflix billing in 2 days', description: '$15.99 will be deducted on ' + fmt(addDays(today, 2)), amount: 15.99, dueDate: fmt(addDays(today, 2)), read: false, timestamp: new Date().toISOString() },
  { id: 'a2', type: 'subscription', severity: 'info', title: 'ChatGPT Plus renews in 3 days', description: '$20.00 scheduled for ' + fmt(addDays(today, 3)), amount: 20.00, dueDate: fmt(addDays(today, 3)), read: false, timestamp: subDays(today, 0).toISOString() },
  { id: 'a3', type: 'insurance', severity: 'warning', title: 'Auto insurance renewal in 22 days', description: 'StateFarm Auto — $98.00/month renewal approaching', amount: 98.00, dueDate: fmt(addDays(today, 22)), read: true, timestamp: subDays(today, 1).toISOString() },
  { id: 'a4', type: 'anomaly', severity: 'critical', title: 'Unusual activity detected', description: 'Adobe CC charge is 2.4x higher than your monthly average', amount: 54.99, read: false, timestamp: subDays(today, 2).toISOString() },
  { id: 'a5', type: 'insurance', severity: 'warning', title: 'Device Protection expiring in 8 days', description: 'SquareTrade device protection renewal due soon', amount: 12.99, dueDate: fmt(addDays(today, 8)), read: true, timestamp: subDays(today, 3).toISOString() },
  { id: 'a6', type: 'prediction', severity: 'info', title: 'High-spend week ahead', description: 'You have $45.98 in scheduled deductions over the next 72 hours', amount: 45.98, read: true, timestamp: subDays(today, 1).toISOString() },
]

export const mockActivity: ActivityItem[] = [
  { id: 'ac1', type: 'subscription', title: 'Netflix', subtitle: 'Scheduled deduction', amount: 15.99, timestamp: addDays(today, 2).toISOString(), status: 'upcoming' },
  { id: 'ac2', type: 'subscription', title: 'ChatGPT Plus', subtitle: 'Scheduled deduction', amount: 20.00, timestamp: addDays(today, 3).toISOString(), status: 'upcoming' },
  { id: 'ac3', type: 'subscription', title: 'Spotify', subtitle: 'Scheduled deduction', amount: 9.99, timestamp: addDays(today, 5).toISOString(), status: 'upcoming' },
  { id: 'ac4', type: 'subscription', title: 'YouTube Premium', subtitle: 'Predicted deduction', amount: 13.99, timestamp: addDays(today, 7).toISOString(), status: 'predicted' },
  { id: 'ac5', type: 'insurance', title: 'Device Protection', subtitle: 'Insurance renewal', amount: 12.99, timestamp: addDays(today, 8).toISOString(), status: 'upcoming' },
  { id: 'ac6', type: 'subscription', title: 'Linear', subtitle: 'Subscription paused', amount: 8.00, timestamp: subDays(today, 1).toISOString(), status: 'completed' },
  { id: 'ac7', type: 'subscription', title: 'GitHub Pro', subtitle: 'Payment processed', amount: 4.00, timestamp: subDays(today, 3).toISOString(), status: 'completed' },
  { id: 'ac8', type: 'alert', title: 'Unusual charge flagged', subtitle: 'Adobe CC — reviewed', timestamp: subDays(today, 2).toISOString(), status: 'warning' },
  { id: 'ac9', type: 'insurance', title: 'Health Shield Plan', subtitle: 'Payment processed', amount: 220.00, timestamp: subDays(today, 5).toISOString(), status: 'completed' },
  { id: 'ac10', type: 'upload', title: 'Bank statement uploaded', subtitle: 'May 2025 analyzed — 42 transactions', timestamp: subDays(today, 7).toISOString(), status: 'completed' },
]

export const mockUpcomingPayments: UpcomingPayment[] = [
  { id: 'up1', name: 'Netflix', type: 'subscription', amount: 15.99, dueDate: fmt(addDays(today, 2)), daysUntil: 2, urgent: true },
  { id: 'up2', name: 'ChatGPT Plus', type: 'subscription', amount: 20.00, dueDate: fmt(addDays(today, 3)), daysUntil: 3, urgent: true },
  { id: 'up3', name: 'Spotify', type: 'subscription', amount: 9.99, dueDate: fmt(addDays(today, 5)), daysUntil: 5, urgent: false },
  { id: 'up4', name: 'YouTube Premium', type: 'subscription', amount: 13.99, dueDate: fmt(addDays(today, 7)), daysUntil: 7, urgent: false },
  { id: 'up5', name: 'Device Protection', type: 'insurance', amount: 12.99, dueDate: fmt(addDays(today, 8)), daysUntil: 8, urgent: false },
  { id: 'up6', name: 'Linear', type: 'subscription', amount: 8.00, dueDate: fmt(addDays(today, 9)), daysUntil: 9, urgent: false },
  { id: 'up7', name: 'Vercel Pro', type: 'subscription', amount: 20.00, dueDate: fmt(addDays(today, 15)), daysUntil: 15, urgent: false },
  { id: 'up8', name: 'Auto Insurance', type: 'insurance', amount: 98.00, dueDate: fmt(addDays(today, 22)), daysUntil: 22, urgent: false },
]

export const mockMonthlyTrends: MonthlyTrend[] = [
  { month: format(subMonths(today, 5), 'MMM'), subscriptions: 142, insurance: 385, total: 527, predicted: false },
  { month: format(subMonths(today, 4), 'MMM'), subscriptions: 156, insurance: 385, total: 541, predicted: false },
  { month: format(subMonths(today, 3), 'MMM'), subscriptions: 148, insurance: 385, total: 533, predicted: false },
  { month: format(subMonths(today, 2), 'MMM'), subscriptions: 166, insurance: 487, total: 653, predicted: false },
  { month: format(subMonths(today, 1), 'MMM'), subscriptions: 162, insurance: 487, total: 649, predicted: false },
  { month: format(today, 'MMM'), subscriptions: 166, insurance: 487, total: 653, predicted: false },
  { month: format(addDays(today, 30), 'MMM'), subscriptions: 170, insurance: 487, total: 657, predicted: true },
  { month: format(addDays(today, 60), 'MMM'), subscriptions: 174, insurance: 487, total: 661, predicted: true },
]

export const mockCategoryBreakdown = [
  { name: 'Entertainment', value: 39.97, color: '#3b82f6' },
  { name: 'Productivity', value: 70.99, color: '#8b5cf6' },
  { name: 'AI Tools', value: 20.00, color: '#10b981' },
  { name: 'Developer', value: 24.00, color: '#f59e0b' },
  { name: 'Design', value: 12.00, color: '#ec4899' },
]

export const mockInsuranceBreakdown = [
  { name: 'Health', value: 220.00, color: '#0ea5e9' },
  { name: 'Home', value: 112.00, color: '#10b981' },
  { name: 'Auto', value: 98.00, color: '#f59e0b' },
  { name: 'Life', value: 45.00, color: '#8b5cf6' },
  { name: 'Device', value: 12.99, color: '#f97316' },
]

export const mockUser = {
  id: 'u1',
  name: 'Adebayo Okonkwo',
  email: 'adebayo@gmail.com',
  plan: 'trial' as const,
  trialEndsAt: fmt(addDays(today, 47)),
  accountType: 'individual' as const,
  joinedAt: fmt(subDays(today, 13)),
}

export const financialSummary = {
  totalSubscriptions: mockSubscriptions.filter(s => s.status === 'active').reduce((sum, s) => sum + s.amount, 0),
  totalInsurance: mockInsurancePolicies.reduce((sum, p) => sum + p.premium, 0),
  upcomingNext72h: mockUpcomingPayments.filter(p => p.daysUntil <= 3).reduce((sum, p) => sum + p.amount, 0),
  upcomingNext30d: mockUpcomingPayments.reduce((sum, p) => sum + p.amount, 0),
  savedVsAvg: 34.50,
  activeSubscriptions: mockSubscriptions.filter(s => s.status === 'active').length,
  activePolicies: mockInsurancePolicies.filter(p => p.status === 'active').length,
}
