import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store'
import AppLayout from '@/components/layout/AppLayout'
import SkeletonPage from '@/components/ui/SkeletonPage'

const Landing = lazy(() => import('@/pages/Landing'))
const Login = lazy(() => import('@/pages/Login'))
const Signup = lazy(() => import('@/pages/Signup'))
const Onboarding = lazy(() => import('@/pages/Onboarding'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Subscriptions = lazy(() => import('@/pages/Subscriptions'))
const Insurance = lazy(() => import('@/pages/Insurance'))
const Upload = lazy(() => import('@/pages/Upload'))
const Profile = lazy(() => import('@/pages/Profile'))
const Settings = lazy(() => import('@/pages/Settings'))
const Billing = lazy(() => import('@/pages/Billing'))
const About = lazy(() => import('@/pages/About'))

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}

function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)
  if (isAuthenticated) return <Navigate to="/dashboard" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <Suspense fallback={<SkeletonPage />}>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
        <Route path="/signup" element={<PublicOnlyRoute><Signup /></PublicOnlyRoute>} />

        {/* Protected */}
        <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/billing" element={<Billing />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
