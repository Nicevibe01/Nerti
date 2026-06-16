export default function SkeletonPage() {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-card border border-default flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
            <path d="M6 22V10l4 0 8 8V10h4v12h-4l-8-8v8z" fill="#8b5cf6"/>
          </svg>
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{animationDelay:'0ms'}} />
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{animationDelay:'150ms'}} />
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{animationDelay:'300ms'}} />
        </div>
      </div>
    </div>
  )
}
