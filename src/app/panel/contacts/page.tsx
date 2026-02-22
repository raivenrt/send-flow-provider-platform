import { Users, Upload, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactsTable } from "@/components/dashboard/contacts-table";

export default function ContactsPage() {
  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-start justify-between flex-col sm:flex-row gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            Contacts
          </h1>
          <p className="text-gray-600 mt-2">Manage and organize your contact list</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button className="gap-2 flex-1 sm:flex-none bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2 flex-1 sm:flex-none bg-blue-600 text-white hover:bg-blue-700">
            <Upload className="h-4 w-4" />
            Import
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="card-elevated p-6">
          <p className="stat-label">Total Contacts</p>
          <p className="stat-metric mt-3">5,234</p>
          <p className="text-xs text-green-600 mt-2">↑ 2.5% from last month</p>
        </div>
        <div className="card-elevated p-6">
          <p className="stat-label">Active This Month</p>
          <p className="stat-metric mt-3">3,891</p>
          <p className="text-xs text-green-600 mt-2">↑ 12% engagement</p>
        </div>
        <div className="card-elevated p-6">
          <p className="stat-label">Contact Groups</p>
          <p className="stat-metric mt-3">12</p>
          <p className="text-xs text-gray-500 mt-2">Organized segments</p>
        </div>
      </div>

      {/* Contacts Table */}
      <ContactsTable />
    </div>
  );
}
