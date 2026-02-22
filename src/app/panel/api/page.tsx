'use client'

import { Code, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CodeBlock } from '@/components/dashboard/code-block'

const apiDocs = [
  {
    title: 'Authentication',
    description: 'All API requests require an API key included in the Authorization header.',
    endpoint: '',
    code: 'Authorization: Bearer your_api_key_here',
    language: 'bash',
  },
  {
    title: 'Send SMS Message',
    description: 'Send an SMS message to a single recipient or multiple recipients.',
    endpoint: 'POST /api/v1/messages/send',
    code: `curl -X POST https://api.sendflow.com/api/v1/messages/send \\
  -H "Authorization: Bearer your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "phone": "+1234567890",
    "message": "Hello! This is a test message.",
    "type": "transactional"
  }'`,
    language: 'bash',
  },
  {
    title: 'Get Message Status',
    description: 'Retrieve the delivery status of a sent message.',
    endpoint: 'GET /api/v1/messages/:message_id',
    code: `curl -X GET https://api.sendflow.com/api/v1/messages/msg_123456 \\
  -H "Authorization: Bearer your_api_key_here"`,
    language: 'bash',
  },
  {
    title: 'Create Contact Group',
    description: 'Create a new contact group for organizing your contacts.',
    endpoint: 'POST /api/v1/groups',
    code: `curl -X POST https://api.sendflow.com/api/v1/groups \\
  -H "Authorization: Bearer your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Marketing Team",
    "description": "Q1 Marketing Campaign"
  }'`,
    language: 'bash',
  },
  {
    title: 'Add Contact to Group',
    description: 'Add a contact to a specific group.',
    endpoint: 'POST /api/v1/groups/:group_id/contacts',
    code: `curl -X POST https://api.sendflow.com/api/v1/groups/grp_123/contacts \\
  -H "Authorization: Bearer your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "phone": "+1234567890",
    "name": "John Doe",
    "email": "john@example.com"
  }'`,
    language: 'bash',
  },
]

export default function ApiDocsPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopyApiKey = (index: number) => {
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-100">
            <Code className="h-6 w-6 text-blue-600" />
          </div>
          API Documentation
        </h1>
        <p className="text-gray-600 mt-2">Complete reference for SendFlow SMS API</p>
      </div>

      {/* API Key Section */}
      <Card className="border-blue-200 card-elevated bg-blue-50">
        <CardHeader>
          <CardTitle className="text-lg">Your API Key</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-3">
            <div className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-3 font-mono text-sm text-gray-700 truncate">
              sk_live_12345678901234567890abcdef
            </div>
            <Button
              onClick={() => handleCopyApiKey(0)}
              size="icon"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {copiedIndex === 0 ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-gray-600">Keep this key secure. Do not share it publicly.</p>
        </CardContent>
      </Card>

      {/* Base URL */}
      <Card className="border-gray-200 card-elevated">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-lg font-semibold text-gray-900">Base URL</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 font-mono text-sm text-blue-600">
            https://api.sendflow.com
          </div>
        </CardContent>
      </Card>

      {/* API Endpoints */}
      <div className="space-y-6">
        {apiDocs.map((doc, idx) => (
          <Card key={idx} className="border-gray-200 card-elevated">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-lg font-semibold text-gray-900">{doc.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <p className="text-gray-700 text-sm">{doc.description}</p>
              {doc.endpoint && (
                <div className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono">
                  <span className="text-green-600 font-semibold">POST</span>
                  <span className="text-gray-700 ml-2">{doc.endpoint}</span>
                </div>
              )}

              {doc.code && (
                <div>
                  <p className="text-xs text-gray-600 mb-2">Example Request</p>
                  <CodeBlock code={doc.code} language={doc.language} />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Error Codes */}
      <Card className="border-gray-200 card-elevated">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-lg font-semibold text-gray-900">Error Codes</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {[
              { code: '400', message: 'Bad Request - Invalid parameters' },
              { code: '401', message: 'Unauthorized - Invalid or missing API key' },
              { code: '403', message: 'Forbidden - Insufficient permissions' },
              { code: '429', message: 'Too Many Requests - Rate limit exceeded' },
              { code: '500', message: 'Internal Server Error' },
            ].map((error, idx) => (
              <div key={idx} className="flex gap-4 pb-3 border-b border-gray-200 last:border-0">
                <span className="text-red-600 font-mono font-semibold min-w-12">{error.code}</span>
                <span className="text-gray-700">{error.message}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
