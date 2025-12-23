import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { BreadcrumbItem } from '@/lib/types'

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm font-mono">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          
          return (
            <li key={index} className="flex items-center gap-2">
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-white font-semibold">
                  {item.label}
                </span>
              )}
              
              {!isLast && (
                <ChevronRight className="w-4 h-4 text-white/30" />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
