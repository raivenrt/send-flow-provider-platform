'use client'

import { HelpCircle, Mail, MessageSquare, Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FAQAccordion } from '@/components/dashboard/faq-accordion'

const faqItems = [
  {
    id: 'faq-1',
    question: 'How do I send my first SMS message?',
    answer: 'After signing up and adding credits, go to the Contacts page to add recipients. Then use the Compose feature to write and send your message. You can send to individual contacts or entire groups.',
  },
  {
    id: 'faq-2',
    question: 'What are the accepted payment methods?',
    answer: 'We accept all major cryptocurrencies including Bitcoin (BTC), Ethereum (ETH), Tether (USDT), and Solana (SOL). Payments are processed instantly with confirmation typically within 10-30 minutes.',
  },
  {
    id: 'faq-3',
    question: 'How long do my credits last?',
    answer: 'Credits remain active for 12 months from the purchase date. After 12 months, any unused credits will expire. We recommend using your credits regularly to maintain an active account.',
  },
  {
    id: 'faq-4',
    question: 'Can I cancel or refund my purchase?',
    answer: 'Cryptocurrency purchases are non-refundable due to the irreversible nature of blockchain transactions. However, credits do not expire within the 12-month period, so you have plenty of time to use them.',
  },
  {
    id: 'faq-5',
    question: 'What is your API rate limit?',
    answer: 'The standard rate limit is 1,000 requests per minute. If you need higher limits, contact our support team to discuss upgrading your plan.',
  },
  {
    id: 'faq-6',
    question: 'How can I export my contacts?',
    answer: 'On the Contacts page, click the Export button to download your contacts as a CSV file. You can also import contacts from a CSV file using the Import button.',
  },
]

export default function SupportPage() {
  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-100">
            <HelpCircle className="h-6 w-6 text-blue-600" />
          </div>
          Help & Support
        </h1>
        <p className="text-gray-600 mt-2">Find answers and get help from our support team</p>
      </div>

      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email Support */}
        <Card className="border-gray-200 card-elevated flex flex-col">
          <CardHeader className="border-b border-gray-200">
            <div className="p-3 w-fit rounded-lg bg-blue-50 mb-3">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-gray-900">Email Support</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col flex-1 pt-6">
            <p className="text-sm text-gray-600 mb-6 flex-1">
              Send us an email and we'll respond within 24 hours
            </p>
            <Button className="w-full gap-2 border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 font-medium">
              support@sendflow.com
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Chat Support */}
        <Card className="border-gray-200 card-elevated flex flex-col">
          <CardHeader className="border-b border-gray-200">
            <div className="p-3 w-fit rounded-lg bg-purple-50 mb-3">
              <MessageSquare className="h-6 w-6 text-purple-600" />
            </div>
            <CardTitle className="text-gray-900">Live Chat</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col flex-1 pt-6">
            <p className="text-sm text-gray-600 mb-6 flex-1">
              Chat with our support team in real-time
            </p>
            <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium">
              Start Chat
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Status & Hours */}
      <Card className="border-green-200 card-elevated bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-green-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-green-900 mb-2">Support Status</h3>
              <p className="text-sm text-green-700">
                All systems operational. Support team is available 24/7 UTC. Average response time: 2-4 hours.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Form */}
      <Card className="border-gray-200 card-elevated">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-gray-900">Send us a Message</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
              <Input
                placeholder="How can we help?"
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 h-10"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
              <textarea
                placeholder="Describe your issue or question..."
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
              />
            </div>
            <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium h-10">
              Send Message
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <FAQAccordion items={faqItems} />
      </div>

      {/* Resources */}
      <Card className="border-gray-200 card-elevated">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-gray-900">Additional Resources</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Blog', description: 'Read tips and updates' },
              { title: 'Documentation', description: 'Technical guides' },
              { title: 'Status Page', description: 'Service status' },
              { title: 'Community', description: 'Join our community' },
            ].map((resource, idx) => (
              <button
                key={idx}
                className="p-4 rounded-lg border border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all text-left group"
              >
                <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{resource.title}</p>
                <p className="text-xs text-gray-600 mt-1">{resource.description}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
