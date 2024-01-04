import { cn } from '@/utils'

interface PageLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
  className?: string
}

export default function PageLayout({ children, title, description, className }: PageLayoutProps) {
  return (
    <div className={cn(`w-full`, className)}>
      {(title || description) && (
        <div className={`pb-4 mb-4 border-b`}>
          {title && <h2 className={`text-3xl sm:text-4xl font-medium mb-2`}>{title}</h2>}
          {description && <p className={`text-gray-600 font-medium`}>{description}</p>}
        </div>
      )}

      {children}
    </div>
  )
}
