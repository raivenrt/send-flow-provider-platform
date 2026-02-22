'use client'

import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { MessageSquare, Users, TrendingUp, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatCard } from '@/components/dashboard/stat-card'

const messageData = [
  { name: 'Mon', messages: 4000 },
  { name: 'Tue', messages: 3000 },
  { name: 'Wed', messages: 2000 },
  { name: 'Thu', messages: 2780 },
  { name: 'Fri', messages: 1890 },
  { name: 'Sat', messages: 2390 },
  { name: 'Sun', messages: 3490 },
]

const categoryData = [
  { name: 'Marketing', value: 35, fill: '#3b82f6' },
  { name: 'Support', value: 28, fill: '#8b5cf6' },
  { name: 'Notifications', value: 22, fill: '#06b6d4' },
  { name: 'Transactional', value: 15, fill: '#10b981' },
]

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Messages"
          value="24,589"
          change={12}
          trend="up"
          icon={<MessageSquare className="h-5 w-5" />}
        />
        <StatCard
          title="Active Contacts"
          value="1,234"
          change={8}
          trend="up"
          icon={<Users className="h-5 w-5" />}
        />
        <StatCard
          title="Delivery Rate"
          value="99.2%"
          change={2}
          trend="up"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <StatCard
          title="Avg. Response Time"
          value="2.3s"
          change={5}
          trend="down"
          icon={<Clock className="h-5 w-5" />}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message Trends */}
        <Card className="lg:col-span-2 border-gray-200 card-elevated">
          <CardHeader className="pb-6 border-b border-gray-200">
            <CardTitle className="text-lg font-semibold text-gray-900">Message Trends</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={messageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                <XAxis stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#000' }}
                />
                <Legend />
                <Bar dataKey="messages" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="border-gray-200 card-elevated flex flex-col">
          <CardHeader className="pb-6 border-b border-gray-200">
            <CardTitle className="text-lg font-semibold text-gray-900">Message Categories</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 flex-1 flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#000' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-gray-900 font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-gray-200 card-elevated">
        <CardHeader className="pb-6 border-b border-gray-200">
          <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {[
              { time: '2 hours ago', event: 'Sent campaign to 500 contacts', status: 'success' },
              { time: '5 hours ago', event: 'New contact imported', status: 'success' },
              { time: '1 day ago', event: 'API token refreshed', status: 'info' },
              { time: '2 days ago', event: 'Batch message failed (3 retries)', status: 'warning' },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-start gap-4 pb-3 border-b border-gray-200 last:border-0">
                <div className={`w-2 h-2 rounded-full mt-1.5 ${
                  activity.status === 'success' ? 'bg-green-500' :
                  activity.status === 'warning' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700">{activity.event}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
