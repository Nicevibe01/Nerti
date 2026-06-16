import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Building2, Calendar } from 'lucide-react'
import { Card, Button, Input, SectionHeader, Badge } from '@/components/ui'
import { useAuthStore } from '@/store'
import { format, parseISO } from 'date-fns'

export default function Profile() {
  const { user } = useAuthStore()
  const [name, setName] = useState(user?.name ?? '')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-primary">Profile</h1>
          <p className="text-sm text-muted mt-0.5">Manage your personal information and account details.</p>
        </div>

        <div className="flex flex-col gap-4">
          {/* Avatar section */}
          <Card>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-600/30 flex items-center justify-center text-2xl font-semibold text-purple-400 flex-shrink-0">
                {user?.name?.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="text-base font-semibold text-primary">{user?.name}</div>
                <div className="text-sm text-muted">{user?.email}</div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={user?.plan === 'trial' ? 'info' : 'success'}>
                    {user?.plan === 'trial' ? 'Free trial' : 'Pro'}
                  </Badge>
                  <Badge variant="default">{user?.accountType}</Badge>
                </div>
              </div>
              <Button size="sm" variant="secondary">Change photo</Button>
            </div>
          </Card>

          {/* Personal info */}
          <Card>
            <SectionHeader title="Personal information" />
            <div className="flex flex-col gap-4">
              <Input label="Full name" value={name} onChange={e => setName(e.target.value)} icon={<User size={14} />} />
              <Input label="Email address" value={user?.email ?? ''} readOnly icon={<Mail size={14} />}
                className="opacity-60 cursor-not-allowed" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-secondary">
                  <Building2 size={14} className="text-muted" />
                  Account type: <span className="text-primary capitalize">{user?.accountType}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary">
                <Calendar size={14} className="text-muted" />
                Member since: <span className="text-primary">{user?.joinedAt ? format(parseISO(user.joinedAt), 'MMMM d, yyyy') : '—'}</span>
              </div>
              <div className="flex justify-end">
                <Button size="sm" onClick={handleSave}>
                  {saved ? 'Saved' : 'Save changes'}
                </Button>
              </div>
            </div>
          </Card>

          {/* Security */}
          <Card>
            <SectionHeader title="Security" />
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-primary">Password</div>
                  <div className="text-xs text-muted">Last changed — never</div>
                </div>
                <Button size="sm" variant="secondary">Change password</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-primary">Two-factor authentication</div>
                  <div className="text-xs text-muted">Add an extra layer of security</div>
                </div>
                <Button size="sm" variant="secondary">Enable 2FA</Button>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
