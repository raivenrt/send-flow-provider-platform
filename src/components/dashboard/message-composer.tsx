'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

interface MessageComposerProps {
  onMessageChange: (message: string, stats: MessageStats) => void
}

export interface MessageStats {
  length: number
  partCount: number
  encoding: 'GSM' | 'Unicode'
  costPerPart: number
  totalCost: number
}

const GSM_7BIT_LIMIT = 160
const GSM_MULTIPART_LIMIT = 153
const UNICODE_LIMIT = 70
const UNICODE_MULTIPART_LIMIT = 67

function detectEncoding(text: string): 'GSM' | 'Unicode' {
  // GSM 7-bit alphabet
  const gsmChars = new Set(
    '@£$¥èéùìòÇØøÅåΔ_ΦΓΛΩΠΨΣΘΞ\n\r\t abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .,!?:;\'"()[]{}<>\\~`-/&%*=+-|^~[]'
  )
  
  for (const char of text) {
    if (!gsmChars.has(char) && char.charCodeAt(0) > 127) {
      return 'Unicode'
    }
  }
  return 'GSM'
}

function calculateParts(text: string, encoding: 'GSM' | 'Unicode'): number {
  if (text.length === 0) return 0
  
  const limit = encoding === 'GSM' ? GSM_7BIT_LIMIT : UNICODE_LIMIT
  const multipartLimit = encoding === 'GSM' ? GSM_MULTIPART_LIMIT : UNICODE_MULTIPART_LIMIT
  
  if (text.length <= limit) return 1
  
  return Math.ceil(text.length / multipartLimit)
}

export function MessageComposer({ onMessageChange }: MessageComposerProps) {
  const [message, setMessage] = useState('')
  const [encoding, setEncoding] = useState<'GSM' | 'Unicode'>('GSM')

  useEffect(() => {
    const newEncoding = detectEncoding(message)
    setEncoding(newEncoding)

    const partCount = calculateParts(message, newEncoding)
    const costPerPart = 0.01 // Mock pricing
    const totalCost = partCount * costPerPart

    const stats: MessageStats = {
      length: message.length,
      partCount,
      encoding: newEncoding,
      costPerPart,
      totalCost,
    }

    onMessageChange(message, stats)
  }, [message, onMessageChange])

  const limit = encoding === 'GSM' ? GSM_7BIT_LIMIT : UNICODE_LIMIT
  const partCount = calculateParts(message, encoding)
  const remaining = partCount === 1 ? limit - message.length : (partCount * (encoding === 'GSM' ? GSM_MULTIPART_LIMIT : UNICODE_MULTIPART_LIMIT)) - message.length

  return (
    <Card className="border-gray-200 card-elevated">
      <CardHeader className="border-b border-gray-200">
        <CardTitle className="text-lg font-semibold text-gray-900">Message Composer</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your SMS message here..."
          rows={6}
          className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
          maxLength={encoding === 'GSM' ? 9999 : 9999}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
            <p className="text-xs text-gray-600 font-medium">Characters</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{message.length}</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
            <p className="text-xs text-gray-600 font-medium">SMS Parts</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{partCount}</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
            <p className="text-xs text-gray-600 font-medium">Encoding</p>
            <p className="text-lg font-bold text-blue-600 mt-1">{encoding}</p>
          </div>
          <div className={`p-3 rounded-lg border ${remaining >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <p className="text-xs text-gray-600 font-medium">Remaining</p>
            <p className={`text-2xl font-bold mt-1 ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>{remaining}</p>
          </div>
        </div>

        {encoding === 'Unicode' && (
          <div className="flex gap-3 p-4 rounded-lg bg-blue-50 border border-blue-200">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-900">Unicode detected</p>
              <p className="text-xs text-blue-700 mt-1">Message contains characters outside GSM 7-bit (e.g., emojis, accents). SMS parts will be reduced to {UNICODE_MULTIPART_LIMIT} characters per part.</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
