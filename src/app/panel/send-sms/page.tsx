"use client";

import { useState } from "react";
import { Send, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecipientSelector } from "@/components/dashboard/recipient-selector";
import { MessageComposer, MessageStats } from "@/components/dashboard/message-composer";

type AnalysisState = "idle" | "analyzing" | "analyzed" | "sending" | "sent";

interface AnalysisResult {
  validRecipients: number;
  invalidRecipients: string[];
  duplicateRecipients: number;
  countriesDetected: string[];
  estimatedCost: number;
  totalSmsParts: number;
}

const countryCodes: { [key: string]: string } = {
  "+1": "USA/Canada",
  "+44": "UK",
  "+33": "France",
  "+49": "Germany",
  "+39": "Italy",
  "+34": "Spain",
  "+61": "Australia",
  "+81": "Japan",
  "+86": "China",
  "+91": "India",
};

function detectCountries(phones: string[]): string[] {
  const countries = new Set<string>();
  phones.forEach((phone) => {
    for (const code in countryCodes) {
      if (phone.startsWith(code)) {
        countries.add(countryCodes[code]);
        break;
      }
    }
  });
  return Array.from(countries);
}

export default function SendSmsPage() {
  const [senderId, setSenderId] = useState("");
  const [recipients, setRecipients] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [messageStats, setMessageStats] = useState<MessageStats | null>(null);
  const [analysisState, setAnalysisState] = useState<AnalysisState>("idle");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleRecipientChange = (newRecipients: string[]) => {
    setRecipients(newRecipients);
  };

  const handleMessageChange = (newMessage: string, stats: MessageStats) => {
    setMessage(newMessage);
    setMessageStats(stats);
  };

  const validatePhoneNumber = (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, "");
    return cleaned.length >= 7 && cleaned.length <= 15;
  };

  const handleAnalyzeRecipients = async () => {
    setAnalysisState("analyzing");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const validRecipients = recipients.filter(validatePhoneNumber);
    const invalidRecipients = recipients.filter((phone) => !validatePhoneNumber(phone));
    const uniqueValid = [...new Set(validRecipients)];
    const duplicateRecipients = validRecipients.length - uniqueValid.length;

    const result: AnalysisResult = {
      validRecipients: uniqueValid.length,
      invalidRecipients,
      duplicateRecipients,
      countriesDetected: detectCountries(uniqueValid),
      estimatedCost: uniqueValid.length * (messageStats?.partCount || 1) * 0.01,
      totalSmsParts: uniqueValid.length * (messageStats?.partCount || 1),
    };

    setAnalysisResult(result);
    setAnalysisState("analyzed");
  };

  const handleSendSms = async () => {
    if (!analysisResult) return;

    setAnalysisState("sending");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setAnalysisState("sent");

    // Reset after 3 seconds
    setTimeout(() => {
      setSenderId("");
      setRecipients([]);
      setMessage("");
      setAnalysisResult(null);
      setAnalysisState("idle");
    }, 3000);
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-100">
            <Send className="h-6 w-6 text-blue-600" />
          </div>
          Send SMS
        </h1>
        <p className="text-gray-600 mt-2">Send SMS messages to your contacts</p>
      </div>

      {/* Success State */}
      {analysisState === "sent" && (
        <Card className="border-green-200 card-elevated bg-green-50">
          <CardContent className="pt-6 flex items-start gap-4">
            <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-900">SMS sent successfully!</h3>
              <p className="text-sm text-green-700 mt-1">
                {analysisResult?.validRecipients} SMS messages sent (
                {analysisResult?.totalSmsParts} SMS parts). Cost: $
                {analysisResult?.estimatedCost.toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Form */}
      {analysisState !== "sent" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Sender ID */}
            <Card className="border-gray-200 card-elevated">
              <CardHeader className="border-b border-gray-200">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Sender ID
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sender ID or Phone Number
                </label>
                <Input
                  value={senderId}
                  onChange={(e) => setSenderId(e.target.value)}
                  placeholder="Enter sender ID (e.g., SendFlow) or phone number"
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                />
                <p className="text-xs text-gray-500 mt-2">
                  This is displayed as the sender on recipient devices
                </p>
              </CardContent>
            </Card>

            {/* Recipients */}
            <RecipientSelector
              onRecipientsChange={handleRecipientChange}
              recipients={recipients}
            />

            {/* Message Composer */}
            <MessageComposer onMessageChange={handleMessageChange} />

            {/* Analyze Section */}
            <div className="flex gap-3">
              <Button
                onClick={handleAnalyzeRecipients}
                disabled={
                  !senderId ||
                  recipients.length === 0 ||
                  !message ||
                  analysisState !== "idle"
                }
                className="bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex-1 h-11 font-medium"
              >
                {analysisState === "analyzing" ? "Analyzing..." : "Analyze Recipients"}
              </Button>
            </div>
          </div>

          {/* Right Sidebar - Analysis Results */}
          {analysisState === "analyzed" && analysisResult && (
            <div className="space-y-4">
              <Card className="border-gray-200 card-elevated bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardHeader className="border-b border-blue-200">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Cost Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Total Recipients</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {analysisResult.validRecipients}
                    </p>
                  </div>
                  <div className="border-t border-blue-200 pt-4">
                    <p className="text-sm text-gray-600 font-medium">Valid Numbers</p>
                    <p className="text-2xl font-bold text-green-600 mt-2">
                      {analysisResult.validRecipients}
                    </p>
                  </div>
                  {analysisResult.invalidRecipients.length > 0 && (
                    <div className="border-t border-blue-200 pt-4">
                      <p className="text-sm text-gray-600 font-medium">Invalid Numbers</p>
                      <p className="text-2xl font-bold text-red-600 mt-2">
                        {analysisResult.invalidRecipients.length}
                      </p>
                    </div>
                  )}
                  {analysisResult.duplicateRecipients > 0 && (
                    <div className="border-t border-blue-200 pt-4">
                      <p className="text-sm text-gray-600 font-medium">
                        Duplicates Removed
                      </p>
                      <p className="text-2xl font-bold text-yellow-600 mt-2">
                        {analysisResult.duplicateRecipients}
                      </p>
                    </div>
                  )}
                  <div className="border-t border-blue-200 pt-4">
                    <p className="text-sm text-gray-600 font-medium">SMS Parts Total</p>
                    <p className="text-2xl font-bold text-blue-600 mt-2">
                      {analysisResult.totalSmsParts}
                    </p>
                  </div>
                  <div className="border-t border-blue-200 pt-4">
                    <p className="text-sm text-gray-600 font-medium">Estimated Cost</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      ${analysisResult.estimatedCost.toFixed(2)}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Countries */}
              {analysisResult.countriesDetected.length > 0 && (
                <Card className="border-gray-200 card-elevated">
                  <CardHeader className="border-b border-gray-200">
                    <CardTitle className="text-sm font-semibold text-gray-900">
                      Countries
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      {analysisResult.countriesDetected.map((country) => (
                        <div
                          key={country}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-gray-700">{country}</span>
                          <span className="font-semibold text-gray-900">✓</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Send Button */}
              <Button
                onClick={handleSendSms}
                disabled={analysisState !== "analyzed"}
                className="w-full bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 h-12 font-semibold text-lg"
              >
                {analysisState === "analyzed" ? "Sending..." : "Send SMS"}
              </Button>

              {/* Cost Warning */}
              <Card className="border-yellow-200 card-elevated bg-yellow-50">
                <CardContent className="pt-6 flex gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-yellow-900">Cost Warning</p>
                    <p className="text-xs text-yellow-700 mt-1">
                      You will be charged ${analysisResult.estimatedCost.toFixed(2)} upon
                      sending. This cannot be undone.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
