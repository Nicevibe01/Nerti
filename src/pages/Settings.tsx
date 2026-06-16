import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Moon, Shield, Smartphone, Mail, MessageSquare, Globe, Trash2 } from 'lucide-react'
import { Card, Toggle, Button, SectionHeader, Divider } from '@/components/ui'
import { useThemeStore } from '@/store'

export default function Settings() {
  const { isDark, toggle } = useThemeStore()
  const [notifs, setNotifs] = useState({
    push: true,
    email: true,
    sms: false,
    upcoming: true,
    renewals: true,
    anomaly: true,
    weekly: false,
  })

  const set = (key: keyof typeof notifs) => (v: boolean) => setNotifs(p => ({ ...p, [key]: v }))

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-primary">Settings</h1>
          <p className="text-sm text-muted mt-0.5">Manage your preferences and notifications.</p>
        </div>

        <div className="flex flex-col gap-4">
          {/* Appearance */}
          <Card>
            <SectionHeader title="Appearance" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon size={16} className="text-muted" />
                <div>
                  <div className="text-sm font-medium text-primary">Dark mode</div>
                  <div className="text-xs text-muted">Use dark theme across Nerti</div>
                </div>
              </div>
              <Toggle checked={isDark} onChange={toggle} />
            </div>
          </Card>

          {/* Notification channels */}
          <Card>
            <SectionHeader title="Notification channels" subtitle="How Nerti reaches you with alerts" />
            <div className="flex flex-col gap-4">
              {[
                { key: 'push', icon: Smartphone, label: 'Push notifications', desc: 'Alerts on this device' },
                { key: 'email', icon: Mail, label: 'Email alerts', desc: 'Sent to your registered email' },
                { key: 'sms', icon: MessageSquare, label: 'SMS reminders', desc: 'Text messages for critical alerts' },
              ].map(({ key, icon: Icon, label, desc }) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon size={16} className="text-muted" />
                    <div>
                      <div className="text-sm font-medium text-primary">{label}</div>
                      <div className="text-xs text-muted">{desc}</div>
                    </div>
                  </div>
                  <Toggle checked={notifs[key as keyof typeof notifs]} onChange={set(key as keyof typeof notifs)} />
                </div>
              ))}
            </div>
          </Card>

          {/* Alert types */}
          <Card>
            <SectionHeader title="Alert types" subtitle="Choose which events trigger notifications" />
            <div className="flex flex-col gap-4">
              {[
                { key: 'upcoming', icon: Bell, label: 'Upcoming payments', desc: 'Alerts 24–72h before charges' },
                { key: 'renewals', icon: Shield, label: 'Insurance renewals', desc: 'Policy renewal reminders' },
                { key: 'anomaly', icon: Bell, label: 'Anomaly detection', desc: 'Unusual or unexpected charges' },
                { key: 'weekly', icon: Globe, label: 'Weekly summary', desc: 'Weekly digest of financial activity' },
              ].map(({ key, icon: Icon, label, desc }) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon size={16} className="text-muted" />
                    <div>
                      <div className="text-sm font-medium text-primary">{label}</div>
                      <div className="text-xs text-muted">{desc}</div>
                    </div>
                  </div>
                  <Toggle checked={notifs[key as keyof typeof notifs]} onChange={set(key as keyof typeof notifs)} />
                </div>
              ))}
            </div>
          </Card>

          {/* Danger zone */}
          <Card>
            <SectionHeader title="Account" />
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-primary">Export data</div>
                  <div className="text-xs text-muted">Download all your Nerti data as CSV</div>
                </div>
                <Button size="sm" variant="secondary">Export</Button>
              </div>
              <Divider />
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-red-400">Delete account</div>
                  <div className="text-xs text-muted">Permanently remove your account and all data</div>
                </div>
                <Button size="sm" variant="danger">
                  <Trash2 size={13} /> Delete
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
