'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export interface FAQItem {
  id: string
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openId === item.id

        return (
          <Card key={item.id} className="border-gray-200 overflow-hidden">
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-sm font-semibold text-gray-900 text-left">{item.question}</h3>
              <ChevronDown
                className={`h-4 w-4 text-gray-600 flex-shrink-0 transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isOpen && (
              <CardContent className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <p className="text-sm text-gray-700 leading-relaxed">{item.answer}</p>
              </CardContent>
            )}
          </Card>
        )
      })}
    </div>
  )
}
