import { ReactNode } from 'react'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface StatCardProps {
  title: string
  value: string | number
  change?: number
  icon: ReactNode
  trend?: 'up' | 'down'
}

export function StatCard({ title, value, change, icon, trend = 'up' }: StatCardProps) {
  return (
    <Card className="border-gray-200 card-elevated group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="stat-label">{title}</p>
          </div>
          <div className="flex-shrink-0 p-2.5 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
            {icon}
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <p className="stat-metric">{value}</p>
          </div>
          {change !== undefined && (
            <div
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md font-semibold text-xs ${
                trend === 'up' 
                  ? 'bg-green-50 text-green-700' 
                  : 'bg-red-50 text-red-700'
              }`}
            >
              {trend === 'up' ? (
                <ArrowUpRight className="h-3.5 w-3.5" />
              ) : (
                <ArrowDownRight className="h-3.5 w-3.5" />
              )}
              {Math.abs(change)}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
