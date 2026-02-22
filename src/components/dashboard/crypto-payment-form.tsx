'use client'

import { useState } from 'react'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const cryptoOptions = [
  { symbol: 'BTC', name: 'Bitcoin', rate: 67500 },
  { symbol: 'ETH', name: 'Ethereum', rate: 3500 },
  { symbol: 'USDT', name: 'Tether', rate: 1 },
  { symbol: 'SOL', name: 'Solana', rate: 210 },
]

const packages = [
  { credits: 1000, price: 50, usd: '$50' },
  { credits: 5000, price: 200, usd: '$200' },
  { credits: 10000, price: 350, usd: '$350' },
  { credits: 25000, price: 750, usd: '$750' },
]

export function CryptoPaymentForm() {
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoOptions[0])
  const [selectedPackage, setSelectedPackage] = useState(packages[0])
  const [isOpen, setIsOpen] = useState(false)

  const cryptoAmount = (selectedPackage.price / selectedCrypto.rate).toFixed(8)

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle>Choose Package</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {packages.map((pkg) => (
            <button
              key={pkg.credits}
              onClick={() => setSelectedPackage(pkg)}
              className={`p-4 rounded-lg border transition-all ${
                selectedPackage.credits === pkg.credits
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <p className="text-sm text-gray-600">{pkg.credits.toLocaleString()}</p>
              <p className="font-bold text-gray-900">{pkg.usd}</p>
            </button>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center text-xs font-bold text-white">
                  {selectedCrypto.symbol[0]}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{selectedCrypto.name}</p>
                  <p className="text-xs text-gray-600">{selectedCrypto.symbol}</p>
                </div>
              </div>
              <ChevronDown className={`h-4 w-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {cryptoOptions.map((crypto) => (
                  <button
                    key={crypto.symbol}
                    onClick={() => {
                      setSelectedCrypto(crypto)
                      setIsOpen(false)
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 first:rounded-t-lg last:rounded-b-lg border-b border-gray-100 last:border-0"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center text-xs font-bold text-white">
                      {crypto.symbol[0]}
                    </div>
                    <div>
                      <p className="text-gray-900 font-semibold">{crypto.name}</p>
                      <p className="text-xs text-gray-600">${crypto.rate.toLocaleString()}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-gray-700 mb-2">Amount to Send</p>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={cryptoAmount}
              readOnly
              className="text-xl font-bold bg-transparent border-0 p-0 text-gray-900"
            />
            <span className="text-lg font-semibold text-gray-600">{selectedCrypto.symbol}</span>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            ~${(parseFloat(cryptoAmount) * selectedCrypto.rate).toFixed(2)} USD
          </p>
        </div>

        <div className="space-y-2 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-700 font-mono">
            0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b
          </p>
          <p className="text-xs text-gray-600">Send exactly {cryptoAmount} {selectedCrypto.symbol} to this address</p>
        </div>

        <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white">
          Continue to Payment
          <ArrowRight className="h-4 w-4" />
        </Button>

        <p className="text-xs text-gray-600 text-center">
          Credits will be added within 10-30 minutes of confirmation
        </p>
      </CardContent>
    </Card>
  )
}
