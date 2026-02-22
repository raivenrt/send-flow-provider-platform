"use client";

import { useState } from "react";
import { Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface SmsRecord {
  id: string;
  date: string;
  senderId: string;
  message: string;
  recipients: number;
  cost: number;
  status: "sent" | "pending" | "failed";
  successCount: number;
  failedCount: number;
  countries: string[];
}

const mockSmsHistory: SmsRecord[] = [
  {
    id: "1",
    date: "2024-02-21 14:32",
    senderId: "SendFlow",
    message: "Your verification code is: 123456. Please do not share.",
    recipients: 1250,
    cost: 12.5,
    status: "sent",
    successCount: 1248,
    failedCount: 2,
    countries: ["USA", "Canada"],
  },
  {
    id: "2",
    date: "2024-02-20 10:15",
    senderId: "Marketing",
    message: "Special offer: 50% off all products this weekend only!",
    recipients: 3891,
    cost: 38.91,
    status: "sent",
    successCount: 3885,
    failedCount: 6,
    countries: ["USA", "UK", "Canada"],
  },
  {
    id: "3",
    date: "2024-02-19 09:45",
    senderId: "+14155552671",
    message: "Your appointment is confirmed for tomorrow at 2:00 PM",
    recipients: 542,
    cost: 5.42,
    status: "sent",
    successCount: 541,
    failedCount: 1,
    countries: ["USA"],
  },
  {
    id: "4",
    date: "2024-02-18 16:20",
    senderId: "Support",
    message: "We need your urgent attention. Please call us.",
    recipients: 150,
    cost: 1.5,
    status: "failed",
    successCount: 45,
    failedCount: 105,
    countries: ["USA", "Australia"],
  },
];

type SortField = "date" | "recipients" | "cost" | "status";
type SortOrder = "asc" | "desc";

export default function SmsHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "sent" | "failed" | "pending">(
    "all",
  );
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [selectedRecord, setSelectedRecord] = useState<SmsRecord | null>(null);

  // Filter and sort
  let filtered = mockSmsHistory.filter((record) => {
    const matchesSearch =
      record.senderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Sort
  filtered.sort((a, b) => {
    let aVal: any = a[sortField];
    let bVal: any = b[sortField];

    if (sortField === "date") {
      aVal = new Date(a.date).getTime();
      bVal = new Date(b.date).getTime();
    }

    if (sortOrder === "asc") {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const totalCost = filtered.reduce((sum, r) => sum + r.cost, 0);
  const totalRecipients = filtered.reduce((sum, r) => sum + r.recipients, 0);
  const successRate =
    filtered.length > 0
      ? (
          (filtered.reduce((sum, r) => sum + r.successCount, 0) /
            filtered.reduce((sum, r) => sum + r.recipients, 0)) *
          100
        ).toFixed(1)
      : 0;

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-100">
            <Clock className="h-6 w-6 text-blue-600" />
          </div>
          SMS History
        </h1>
        <p className="text-gray-600 mt-2">View and track all sent SMS messages</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="card-elevated p-6">
          <p className="stat-label">Total Messages</p>
          <p className="stat-metric mt-3">{filtered.length}</p>
        </div>
        <div className="card-elevated p-6">
          <p className="stat-label">Total Recipients</p>
          <p className="stat-metric mt-3">{totalRecipients.toLocaleString()}</p>
        </div>
        <div className="card-elevated p-6">
          <p className="stat-label">Total Cost</p>
          <p className="stat-metric mt-3">${totalCost.toFixed(2)}</p>
        </div>
        <div className="card-elevated p-6">
          <p className="stat-label">Success Rate</p>
          <p className="stat-metric mt-3">{successRate}%</p>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-gray-200 card-elevated">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-lg font-semibold text-gray-900">Filters</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search
              </label>
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by sender or message..."
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="sent">Sent</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                From Date
              </label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="bg-white border-gray-300 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                To Date
              </label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="bg-white border-gray-300 text-gray-900"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-gray-200 card-elevated">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-200 bg-gray-50 hover:bg-gray-50">
                  <TableHead
                    onClick={() => toggleSort("date")}
                    className="text-gray-700 font-semibold cursor-pointer hover:text-gray-900"
                  >
                    Date & Time{" "}
                    {sortField === "date" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="text-gray-700 font-semibold">Sender ID</TableHead>
                  <TableHead className="text-gray-700 font-semibold">Message</TableHead>
                  <TableHead
                    onClick={() => toggleSort("recipients")}
                    className="text-gray-700 font-semibold cursor-pointer hover:text-gray-900 text-right"
                  >
                    Recipients{" "}
                    {sortField === "recipients" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    onClick={() => toggleSort("cost")}
                    className="text-gray-700 font-semibold cursor-pointer hover:text-gray-900 text-right"
                  >
                    Cost {sortField === "cost" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    onClick={() => toggleSort("status")}
                    className="text-gray-700 font-semibold cursor-pointer hover:text-gray-900"
                  >
                    Status {sortField === "status" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="text-gray-700 font-semibold text-right">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((record) => (
                  <TableRow
                    key={record.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="text-gray-900 font-medium text-sm">
                      {record.date}
                    </TableCell>
                    <TableCell className="text-gray-700 text-sm font-semibold">
                      {record.senderId}
                    </TableCell>
                    <TableCell className="text-gray-700 text-sm max-w-xs truncate">
                      {record.message}
                    </TableCell>
                    <TableCell className="text-gray-900 font-semibold text-right text-sm">
                      {record.recipients}
                    </TableCell>
                    <TableCell className="text-gray-900 font-semibold text-right text-sm">
                      ${record.cost.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          record.status === "sent"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : record.status === "pending"
                              ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                              : "bg-red-100 text-red-800 border-red-200"
                        }
                        variant="outline"
                      >
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        onClick={() => setSelectedRecord(record)}
                        className="gap-2 h-8 px-3 bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200"
                        variant="outline"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Details Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="border-gray-200 card-elevated w-full max-w-2xl">
            <CardHeader className="border-b border-gray-200 flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">
                SMS Details
              </CardTitle>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Date & Time</p>
                  <p className="text-lg font-semibold text-gray-900 mt-2">
                    {selectedRecord.date}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Sender ID</p>
                  <p className="text-lg font-semibold text-gray-900 mt-2">
                    {selectedRecord.senderId}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Recipients</p>
                  <p className="text-lg font-semibold text-gray-900 mt-2">
                    {selectedRecord.recipients}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total Cost</p>
                  <p className="text-lg font-semibold text-gray-900 mt-2">
                    ${selectedRecord.cost.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm text-gray-600 font-medium mb-3">Message Content</p>
                <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                  <p className="text-gray-900 text-sm leading-relaxed">
                    {selectedRecord.message}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 border-t border-gray-200 pt-6">
                <div>
                  <p className="text-sm text-gray-600 font-medium mb-2">
                    Status Breakdown
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600 font-medium">Successful</span>
                      <span className="text-gray-900 font-semibold">
                        {selectedRecord.successCount}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-red-600 font-medium">Failed</span>
                      <span className="text-gray-900 font-semibold">
                        {selectedRecord.failedCount}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium mb-2">Countries</p>
                  <div className="space-y-1">
                    {selectedRecord.countries.map((country) => (
                      <p key={country} className="text-sm text-gray-900">
                        ✓ {country}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 flex gap-3">
                <Button
                  onClick={() => setSelectedRecord(null)}
                  className="flex-1 bg-white border border-gray-300 text-gray-900 hover:bg-gray-50 h-10"
                  variant="outline"
                >
                  Close
                </Button>
                <Button className="flex-1 bg-blue-600 text-white hover:bg-blue-700 h-10">
                  Download Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
