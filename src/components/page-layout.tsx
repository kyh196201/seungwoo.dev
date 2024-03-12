import { cn } from '@/utils'

interface PageLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
  className?: string
}

export default function PageLayout(props: PageLayoutProps) {
  const { children, title = '', description = '', className = '' } = props

  return (
    <div className={cn(`w-full`, className)}>
      {(title || description) && (
        <div className="mb-4 border-b pb-4">
          {title && <h2 className="mb-2 text-3xl font-medium sm:text-4xl">{title}</h2>}
          {description && <p className="font-medium text-primary">{description}</p>}
        </div>
      )}

      {children}
    </div>
  )
}
