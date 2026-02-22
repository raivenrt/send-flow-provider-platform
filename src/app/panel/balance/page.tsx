import { Wallet, TrendingDown, History, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CryptoPaymentForm } from "@/components/dashboard/crypto-payment-form";

export default function BalancePage() {
  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-100">
            <Wallet className="h-6 w-6 text-blue-600" />
          </div>
          Account Balance
        </h1>
        <p className="text-gray-600 mt-2">Manage your credits and top-up balance</p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Balance */}
        <div className="card-elevated p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <p className="stat-label">Current Balance</p>
          <p className="text-5xl font-bold text-gray-900 mt-4 mb-6">2,450</p>
          <p className="text-sm text-gray-600 font-medium">Credits available</p>
          <Button className="w-full mt-6 bg-blue-600 text-white hover:bg-blue-700">
            Top Up Credits
          </Button>
        </div>

        {/* Usage */}
        <div className="card-elevated p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="stat-label">Monthly Usage</p>
              <p className="text-4xl font-bold text-gray-900 mt-3">1,280</p>
              <p className="text-sm text-gray-600 mt-2">of 5,000 credits</p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-50">
              <TrendingDown className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2.5 rounded-full"
              style={{ width: "25.6%" }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-3">25.6% of monthly quota used</p>
        </div>
      </div>

      {/* Top-up Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CryptoPaymentForm />
        </div>

        {/* Transaction History */}
        <div className="card-elevated p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <History className="h-5 w-5 text-blue-600" />
            Recent Transactions
          </h3>
          <div className="space-y-3 flex-1">
            {[
              {
                date: "Feb 20, 2024",
                type: "Top-up",
                amount: "+5,000",
                status: "completed",
              },
              {
                date: "Feb 18, 2024",
                type: "Campaign",
                amount: "-250",
                status: "completed",
              },
              {
                date: "Feb 15, 2024",
                type: "Top-up",
                amount: "+10,000",
                status: "completed",
              },
              {
                date: "Feb 12, 2024",
                type: "Support SMS",
                amount: "-180",
                status: "completed",
              },
            ].map((tx, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-sm pb-3 border-b border-gray-200 last:border-0"
              >
                <div>
                  <p className="text-gray-900 font-medium">{tx.type}</p>
                  <p className="text-xs text-gray-500">{tx.date}</p>
                </div>
                <p
                  className={`font-semibold ${tx.amount.startsWith("+") ? "text-green-600" : "text-gray-600"}`}
                >
                  {tx.amount}
                </p>
              </div>
            ))}
          </div>
          <Button className="mt-4 w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
            View All Transactions
          </Button>
        </div>
      </div>

      {/* Info Alert */}
      <div className="card-elevated p-5 border-yellow-200 bg-yellow-50 flex gap-3">
        <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-yellow-900">
            Credits expire after 1 year
          </p>
          <p className="text-xs text-yellow-700 mt-1">
            Unused credits will expire after 12 months from the purchase date. Use them
            regularly to keep your balance active.
          </p>
        </div>
      </div>
    </div>
  );
}
