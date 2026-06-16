import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, CheckCircle, X, AlertCircle } from 'lucide-react'
import { Card, Button, SectionHeader } from '@/components/ui'
import clsx from 'clsx'

type UploadState = 'idle' | 'uploading' | 'processing' | 'done' | 'error'

const mockTransactions = [
  { date: 'Jun 01', description: 'NETFLIX.COM', amount: -15.99, type: 'subscription' },
  { date: 'Jun 03', description: 'SPOTIFY AB', amount: -9.99, type: 'subscription' },
  { date: 'Jun 05', description: 'BLUECROSS HEALTH', amount: -220.00, type: 'insurance' },
  { date: 'Jun 08', description: 'ADOBE INC', amount: -54.99, type: 'subscription' },
  { date: 'Jun 10', description: 'STATEFARMAUTO INS', amount: -98.00, type: 'insurance' },
  { date: 'Jun 12', description: 'OPENAI *CHATGPT', amount: -20.00, type: 'subscription' },
  { date: 'Jun 14', description: 'GITHUB INC', amount: -4.00, type: 'subscription' },
  { date: 'Jun 18', description: 'NOTION LABS', amount: -8.00, type: 'subscription' },
]

export default function UploadPage() {
  const [uploadState, setUploadState] = useState<UploadState>('idle')
  const [progress, setProgress] = useState(0)
  const [dragOver, setDragOver] = useState(false)
  const [filename, setFilename] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const simulateUpload = (name: string) => {
    setFilename(name)
    setUploadState('uploading')
    setProgress(0)
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          setUploadState('processing')
          setTimeout(() => setUploadState('done'), 2000)
          return 100
        }
        return p + Math.random() * 15
      })
    }, 100)
  }

  const handleFile = (file: File) => {
    if (!file) return
    const ext = file.name.split('.').pop()?.toLowerCase()
    if (!['pdf', 'csv'].includes(ext ?? '')) {
      setUploadState('error')
      return
    }
    simulateUpload(file.name)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const reset = () => {
    setUploadState('idle')
    setProgress(0)
    setFilename('')
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-primary">Upload Bank Statement</h1>
          <p className="text-sm text-muted mt-0.5">Import a PDF or CSV bank statement to analyze your financial activity.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <Card>
            <SectionHeader title="Upload file" />

            <input ref={fileRef} type="file" accept=".pdf,.csv" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />

            <AnimatePresence mode="wait">
              {uploadState === 'idle' && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div
                    onDrop={handleDrop}
                    onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                    onDragLeave={() => setDragOver(false)}
                    onClick={() => fileRef.current?.click()}
                    className={clsx(
                      'border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all',
                      dragOver ? 'border-purple-500 bg-purple-900/10' : 'border-default hover:border-purple-600/50 hover:bg-card-hover'
                    )}
                  >
                    <Upload size={28} className="text-muted mx-auto mb-3" />
                    <div className="text-sm font-medium text-primary mb-1">Drop your file here</div>
                    <div className="text-xs text-muted mb-4">Supports PDF and CSV bank statements</div>
                    <Button size="sm" variant="secondary" type="button">Browse files</Button>
                  </div>
                  <div className="flex items-center gap-2 mt-3 text-[11px] text-muted">
                    <AlertCircle size={11} />
                    Files are processed locally — your data never leaves your device.
                  </div>
                </motion.div>
              )}

              {uploadState === 'uploading' && (
                <motion.div key="uploading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center py-8 gap-4">
                  <FileText size={32} className="text-purple-400" />
                  <div className="text-sm text-primary font-medium">Uploading {filename}</div>
                    <div className="w-full bg-card rounded-full h-1.5 overflow-hidden">
                    <div className="h-full bg-purple-600 rounded-full transition-all duration-100" style={{ width: `${Math.min(progress, 100)}%` }} />
                  </div>
                  <div className="text-xs text-muted">{Math.min(Math.round(progress), 100)}%</div>
                </motion.div>
              )}

              {uploadState === 'processing' && (
                <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center py-8 gap-3">
                  <div className="w-12 h-12 rounded-full bg-purple-600/10 border border-purple-600/20 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full border-2 border-purple-600 border-t-transparent animate-spin" />
                  </div>
                  <div className="text-sm font-medium text-primary">Analyzing financial activity...</div>
                  <div className="text-xs text-muted">Identifying subscriptions, insurance, and patterns</div>
                </motion.div>
              )}

              {uploadState === 'done' && (
                <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-6 gap-3 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-900/30 border border-emerald-800/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle size={22} />
                  </div>
                  <div className="text-sm font-medium text-primary">Analysis complete</div>
                  <div className="text-xs text-muted">{mockTransactions.length} transactions identified</div>
                  <Button size="sm" variant="ghost" onClick={reset}><X size={13} /> Upload another</Button>
                </motion.div>
              )}

              {uploadState === 'error' && (
                <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-6 gap-3 text-center">
                  <AlertCircle size={28} className="text-red-400" />
                  <div className="text-sm font-medium text-primary">Unsupported file type</div>
                  <div className="text-xs text-muted">Please upload a PDF or CSV file.</div>
                  <Button size="sm" variant="secondary" onClick={reset}>Try again</Button>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          <Card>
            <SectionHeader title="Supported formats" />
            <div className="flex flex-col gap-3">
              {[
                { fmt: 'PDF', desc: 'Bank-exported PDF statements', icon: '📄' },
                { fmt: 'CSV', desc: 'Comma-separated transaction exports', icon: '📊' },
              ].map(f => (
                <div key={f.fmt} className="flex items-center gap-3 p-3 rounded-lg border border-default">
                  <div className="text-lg">{f.icon}</div>
                  <div>
                    <div className="text-sm font-medium text-primary">{f.fmt}</div>
                    <div className="text-xs text-muted">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-purple-900/10 border border-purple-900/20">
              <div className="text-xs font-medium text-purple-400 mb-1">Privacy by design</div>
              <div className="text-[11px] text-muted leading-relaxed">
                All statement processing happens locally in your browser. No file content is ever transmitted to external servers.
              </div>
            </div>
          </Card>
        </div>

        {/* Parsed preview */}
        <AnimatePresence>
          {uploadState === 'done' && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <SectionHeader title="Parsed transactions" subtitle="Identified financial activity from your statement" />
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-default">
                        <th className="text-left py-2 px-2 text-[11px] font-medium text-muted uppercase tracking-wider">Date</th>
                        <th className="text-left py-2 px-2 text-[11px] font-medium text-muted uppercase tracking-wider">Description</th>
                        <th className="text-left py-2 px-2 text-[11px] font-medium text-muted uppercase tracking-wider">Type</th>
                        <th className="text-right py-2 px-2 text-[11px] font-medium text-muted uppercase tracking-wider">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-default">
                      {mockTransactions.map((t, i) => (
                        <tr key={i} className="hover:bg-card-hover transition-colors">
                          <td className="py-2.5 px-2 text-xs font-mono text-muted">{t.date}</td>
                          <td className="py-2.5 px-2 text-xs text-primary">{t.description}</td>
                          <td className="py-2.5 px-2">
                            <span className={clsx('text-[10px] px-2 py-0.5 rounded-full font-medium',
                              t.type === 'subscription' ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-900/30 text-purple-400'
                            )}>
                              {t.type}
                            </span>
                          </td>
                          <td className="py-2.5 px-2 text-right text-xs font-mono text-red-400">{t.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="border-t border-default">
                      <tr>
                        <td colSpan={3} className="py-2.5 px-2 text-xs text-muted">Total outflow</td>
                        <td className="py-2.5 px-2 text-right text-sm font-mono font-semibold text-primary">
                          ${Math.abs(mockTransactions.reduce((s, t) => s + t.amount, 0)).toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
