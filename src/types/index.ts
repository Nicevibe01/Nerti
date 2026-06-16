export interface Subscription {
  id: string
  name: string
  category: string
  amount: number
  billingCycle: 'monthly' | 'annual' | 'weekly'
  nextBillingDate: string
  status: 'active' | 'paused' | 'cancelled'
  logo?: string
  color: string
}

export interface InsurancePolicy {
  id: string
  name: string
  provider: string
  category: 'health' | 'life' | 'auto' | 'home' | 'device'
  premium: number
  frequency: 'monthly' | 'annual' | 'quarterly'
  renewalDate: string
  status: 'active' | 'expiring_soon' | 'expired'
  color: string
}

export interface Alert {
  id: string
  type: 'subscription' | 'insurance' | 'anomaly' | 'prediction' | 'reminder'
  severity: 'info' | 'warning' | 'critical'
  title: string
  description: string
  amount?: number
  dueDate?: string
  read: boolean
  timestamp: string
}

export interface ActivityItem {
  id: string
  type: 'subscription' | 'insurance' | 'prediction' | 'alert' | 'upload'
  title: string
  subtitle: string
  amount?: number
  timestamp: string
  status: 'completed' | 'upcoming' | 'predicted' | 'warning'
}

export interface UpcomingPayment {
  id: string
  name: string
  type: 'subscription' | 'insurance'
  amount: number
  dueDate: string
  daysUntil: number
  urgent: boolean
}

export interface MonthlyTrend {
  month: string
  subscriptions: number
  insurance: number
  total: number
  predicted: boolean
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  plan: 'trial' | 'pro'
  trialEndsAt?: string
  accountType: 'individual' | 'business'
  joinedAt: string
}

export interface OnboardingState {
  step: number
  accountType: 'individual' | 'business' | null
  goals: string[]
  sourceConnected: boolean
  completed: boolean
}
