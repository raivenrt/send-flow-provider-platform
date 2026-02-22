'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface CodeBlockProps {
  code: string
  language?: string
}

export function CodeBlock({ code, language = 'javascript' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="border-gray-200 bg-gray-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono text-gray-600">{language}</span>
          <Button
            onClick={handleCopy}
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-gray-600 hover:text-gray-900 hover:bg-gray-200"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <pre className="text-sm font-mono text-gray-800 overflow-x-auto bg-white p-3 rounded border border-gray-200">
          <code>{code}</code>
        </pre>
      </CardContent>
    </Card>
  )
}
