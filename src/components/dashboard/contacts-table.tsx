'use client'

import { useState } from 'react'
import { Trash2, Edit2, Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const mockContacts = [
  { id: 1, name: 'John Doe', phone: '+1 (555) 123-4567', email: 'john@example.com', groups: 'Marketing', status: 'active' },
  { id: 2, name: 'Jane Smith', phone: '+1 (555) 234-5678', email: 'jane@example.com', groups: 'Support', status: 'active' },
  { id: 3, name: 'Bob Wilson', phone: '+1 (555) 345-6789', email: 'bob@example.com', groups: 'Marketing', status: 'inactive' },
  { id: 4, name: 'Alice Johnson', phone: '+1 (555) 456-7890', email: 'alice@example.com', groups: 'Sales', status: 'active' },
  { id: 5, name: 'Charlie Brown', phone: '+1 (555) 567-8901', email: 'charlie@example.com', groups: 'Support', status: 'active' },
]

export function ContactsTable() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      {/* Search and Add */}
      <div className="flex items-center gap-3 flex-col sm:flex-row">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search by name, phone, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
          />
        </div>
        <Button className="w-full sm:w-auto gap-2 bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4" />
          Add Contact
        </Button>
      </div>

      {/* Table */}
      <Card className="border-gray-200">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-200 bg-gray-50 hover:bg-gray-50">
                  <TableHead className="text-gray-700 font-semibold">Name</TableHead>
                  <TableHead className="text-gray-700 font-semibold">Phone</TableHead>
                  <TableHead className="text-gray-700 font-semibold">Email</TableHead>
                  <TableHead className="text-gray-700 font-semibold">Groups</TableHead>
                  <TableHead className="text-gray-700 font-semibold">Status</TableHead>
                  <TableHead className="text-right text-gray-700 font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.map((contact) => (
                  <TableRow key={contact.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <TableCell className="text-gray-900 font-medium">{contact.name}</TableCell>
                    <TableCell className="text-gray-600">{contact.phone}</TableCell>
                    <TableCell className="text-gray-600">{contact.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {contact.groups}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={contact.status === 'active' 
                          ? 'bg-green-100 text-green-800 border-green-200' 
                          : 'bg-gray-100 text-gray-700 border-gray-200'
                        }
                        variant="outline"
                      >
                        {contact.status === 'active' ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-600 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      {filteredContacts.length === 0 && (
        <Card className="border-gray-200">
          <CardContent className="p-12 text-center">
            <p className="text-gray-600">No contacts found</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
