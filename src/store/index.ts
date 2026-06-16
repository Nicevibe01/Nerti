import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Subscription, InsurancePolicy, Alert, OnboardingState } from '@/types'
import { mockSubscriptions, mockInsurancePolicies, mockAlerts, mockUser } from '@/data/mockData'

// ── Auth Store ──────────────────────────────────────────────────────────────
interface AuthStore {
  isAuthenticated: boolean
  user: typeof mockUser | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: async (email: string, _password: string) => {
        await new Promise(r => setTimeout(r, 800))
        set({ isAuthenticated: true, user: { ...mockUser, email } })
        return true
      },
      signup: async (name: string, email: string, _password: string) => {
        await new Promise(r => setTimeout(r, 1000))
        set({ isAuthenticated: true, user: { ...mockUser, name, email } })
        return true
      },
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    { name: 'nerti-auth' }
  )
)

// ── Theme Store ──────────────────────────────────────────────────────────────
interface ThemeStore {
  isDark: boolean
  toggle: () => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      isDark: true,
      toggle: () => {
        const next = !get().isDark
        set({ isDark: next })
        document.documentElement.classList.toggle('dark', next)
        document.documentElement.classList.toggle('light', !next)
      },
    }),
    { name: 'nerti-theme' }
  )
)

// ── Subscription Store ───────────────────────────────────────────────────────
interface SubscriptionStore {
  subscriptions: Subscription[]
  setSubscriptions: (s: Subscription[]) => void
  toggleStatus: (id: string) => void
}

export const useSubscriptionStore = create<SubscriptionStore>()((set) => ({
  subscriptions: mockSubscriptions,
  setSubscriptions: (subscriptions) => set({ subscriptions }),
  toggleStatus: (id) =>
    set((state) => ({
      subscriptions: state.subscriptions.map(s =>
        s.id === id ? { ...s, status: s.status === 'active' ? 'paused' : 'active' } : s
      ),
    })),
}))

// ── Insurance Store ──────────────────────────────────────────────────────────
interface InsuranceStore {
  policies: InsurancePolicy[]
  setPolicies: (p: InsurancePolicy[]) => void
}

export const useInsuranceStore = create<InsuranceStore>()((set) => ({
  policies: mockInsurancePolicies,
  setPolicies: (policies) => set({ policies }),
}))

// ── Alert Store ──────────────────────────────────────────────────────────────
interface AlertStore {
  alerts: Alert[]
  markRead: (id: string) => void
  markAllRead: () => void
  dismiss: (id: string) => void
}

export const useAlertStore = create<AlertStore>()((set) => ({
  alerts: mockAlerts,
  markRead: (id) =>
    set((state) => ({
      alerts: state.alerts.map(a => a.id === id ? { ...a, read: true } : a),
    })),
  markAllRead: () =>
    set((state) => ({ alerts: state.alerts.map(a => ({ ...a, read: true })) })),
  dismiss: (id) =>
    set((state) => ({ alerts: state.alerts.filter(a => a.id !== id) })),
}))

// ── Onboarding Store ─────────────────────────────────────────────────────────
interface OnboardingStore extends OnboardingState {
  nextStep: () => void
  prevStep: () => void
  setAccountType: (t: 'individual' | 'business') => void
  toggleGoal: (g: string) => void
  setSourceConnected: (v: boolean) => void
  complete: () => void
  reset: () => void
}

const initialOnboarding: OnboardingState = {
  step: 0,
  accountType: null,
  goals: [],
  sourceConnected: false,
  completed: false,
}

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      ...initialOnboarding,
      nextStep: () => set((s) => ({ step: s.step + 1 })),
      prevStep: () => set((s) => ({ step: Math.max(0, s.step - 1) })),
      setAccountType: (accountType) => set({ accountType }),
      toggleGoal: (g) =>
        set((s) => ({
          goals: s.goals.includes(g) ? s.goals.filter(x => x !== g) : [...s.goals, g],
        })),
      setSourceConnected: (sourceConnected) => set({ sourceConnected }),
      complete: () => set({ completed: true }),
      reset: () => set(initialOnboarding),
    }),
    { name: 'nerti-onboarding' }
  )
)
