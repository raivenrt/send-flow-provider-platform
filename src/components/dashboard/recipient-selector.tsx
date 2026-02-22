'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Upload, List } from 'lucide-react'

interface RecipientSelectorProps {
  onRecipientsChange: (recipients: string[]) => void
  recipients?: string[]
}

const mockContactGroups = [
  { id: 1, name: 'Marketing List', count: 1250 },
  { id: 2, name: 'VIP Customers', count: 320 },
  { id: 3, name: 'Newsletter Subscribers', count: 5890 },
]

export function RecipientSelector({ onRecipientsChange }: RecipientSelectorProps) {
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null)
  const [manualPhones, setManualPhones] = useState('')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleGroupSelect = (groupId: number) => {
    setSelectedGroup(groupId)
    const group = mockContactGroups.find(g => g.id === groupId)
    if (group) {
      // Mock phone numbers
      const phones = Array(group.count).fill(null).map((_, i) => `+1${Math.random().toString().slice(2, 12)}`)
      onRecipientsChange(phones)
    }
  }

  const handleManualChange = (value: string) => {
    setManualPhones(value)
    const phones = value
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0)
    onRecipientsChange(phones)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      // Mock CSV parsing
      const mockPhones = Array(Math.floor(Math.random() * 100) + 10).fill(null).map((_, i) => `+1${Math.random().toString().slice(2, 12)}`)
      onRecipientsChange(mockPhones)
    }
  }

  return (
    <Card className="border-gray-200 card-elevated">
      <CardHeader className="border-b border-gray-200">
        <CardTitle className="text-lg font-semibold text-gray-900">Recipients</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="group" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="group">Contact Groups</TabsTrigger>
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="csv">CSV Upload</TabsTrigger>
          </TabsList>

          <TabsContent value="group" className="space-y-4">
            <p className="text-sm text-gray-600">Select a contact group to send SMS to all members</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mockContactGroups.map(group => (
                <button
                  key={group.id}
                  onClick={() => handleGroupSelect(group.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedGroup === group.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{group.name}</p>
                      <p className="text-sm text-gray-500">{group.count.toLocaleString()} contacts</p>
                    </div>
                    <List className="h-5 w-5 text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="manual" className="space-y-4">
            <p className="text-sm text-gray-600">Enter phone numbers, one per line (include country code, e.g., +1234567890)</p>
            <textarea
              value={manualPhones}
              onChange={(e) => handleManualChange(e.target.value)}
              placeholder={"+1234567890\n+1987654321\n+44123456789"}
              rows={8}
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none font-mono text-sm"
            />
            <p className="text-xs text-gray-500">{manualPhones.split('\n').filter(p => p.trim()).length} phone numbers entered</p>
          </TabsContent>

          <TabsContent value="csv" className="space-y-4">
            <p className="text-sm text-gray-600">Upload a CSV file with phone numbers (one per row, with country codes)</p>
            <label className="block">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-400 transition-colors cursor-pointer text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="font-semibold text-gray-900">Click to upload CSV file</p>
                <p className="text-sm text-gray-500">or drag and drop</p>
                {uploadedFile && <p className="text-sm text-green-600 mt-2">✓ {uploadedFile.name}</p>}
              </div>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
