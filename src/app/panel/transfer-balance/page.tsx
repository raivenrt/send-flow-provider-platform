"use client";

import { useState } from "react";
import { Check, AlertCircle, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface RecipientInfo {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

type Step = "recipient" | "amount" | "confirm" | "success";

const TRANSFER_FEE_PERCENTAGE = 2;
const MINIMUM_TRANSFER = 100;

export default function TransferBalancePage() {
  const [currentBalance] = useState(5000);
  const [transferId, setTransferId] = useState("");
  const [recipient, setRecipient] = useState<RecipientInfo | null>(null);
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState<Step>("recipient");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCheckUser = async () => {
    setError("");
    if (!transferId.trim()) {
      setError("Please enter a Transfer ID");
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Mock validation - reject self-transfer
      if (transferId === "self123") {
        setError("Cannot transfer balance to your own account");
      } else if (transferId.startsWith("user_")) {
        setRecipient({
          id: transferId,
          username: transferId.replace("user_", "User "),
          email: `${transferId}@example.com`,
        });
        setStep("amount");
      } else {
        setError("Transfer ID not found. Please check and try again.");
      }
      setLoading(false);
    }, 800);
  };

  const handleBackToRecipient = () => {
    setStep("recipient");
    setRecipient(null);
    setAmount("");
    setError("");
  };

  const handleProceedToConfirm = () => {
    setError("");
    const amountNum = parseFloat(amount);

    if (!amount.trim()) {
      setError("Please enter an amount");
      return;
    }

    if (isNaN(amountNum)) {
      setError("Please enter a valid amount");
      return;
    }

    if (amountNum < MINIMUM_TRANSFER) {
      setError(`Minimum transfer amount is ${MINIMUM_TRANSFER} credits`);
      return;
    }

    if (amountNum > currentBalance) {
      setError("Insufficient balance for this transfer");
      return;
    }

    setStep("confirm");
  };

  const handleConfirmTransfer = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      setStep("success");
      setLoading(false);
    }, 1200);
  };

  const handleNewTransfer = () => {
    setStep("recipient");
    setRecipient(null);
    setAmount("");
    setTransferId("");
    setError("");
    setSuccess(false);
  };

  const amountNum = parseFloat(amount) || 0;
  const fee = amountNum * (TRANSFER_FEE_PERCENTAGE / 100);
  const finalAmount = amountNum - fee;
  const remainingBalance = currentBalance - amountNum;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Transfer Balance</h1>
          <p className="text-gray-600 mt-2">Send your credits to another user</p>
        </div>

        {success && step === "success" ? (
          // Success State
          <Card className="border-green-200 card-elevated bg-green-50">
            <CardContent className="pt-12 pb-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-green-900 mb-2">
                Transfer Successful!
              </h2>
              <p className="text-green-700 mb-8">
                {amountNum} credits have been transferred to {recipient?.username}
              </p>
              <div className="bg-white rounded-lg p-6 mb-8 border border-green-200">
                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transfer Amount:</span>
                    <span className="font-semibold text-gray-900">
                      {amountNum} credits
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transfer Fee:</span>
                    <span className="font-semibold text-gray-900">
                      -{fee.toFixed(2)} credits
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between">
                    <span className="text-gray-600">Recipient Receives:</span>
                    <span className="font-bold text-green-600">
                      {finalAmount.toFixed(2)} credits
                    </span>
                  </div>
                </div>
              </div>
              <Button
                onClick={handleNewTransfer}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Make Another Transfer
              </Button>
            </CardContent>
          </Card>
        ) : (
          // Main Form
          <Card className="border-gray-200 card-elevated">
            <CardContent className="p-8">
              {/* Step 1: Recipient Selection */}
              {step === "recipient" && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Recipient Transfer ID
                    </label>
                    <p className="text-sm text-gray-600 mb-4">
                      Enter the Transfer ID of the user you want to send balance to.
                      (e.g., user_123)
                    </p>
                    <div className="flex gap-3">
                      <Input
                        placeholder="Enter Transfer ID"
                        value={transferId}
                        onChange={(e) => {
                          setTransferId(e.target.value);
                          setError("");
                        }}
                        disabled={loading}
                        className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 h-11"
                      />
                      <Button
                        onClick={handleCheckUser}
                        // loading={loading}
                        disabled={loading || !transferId.trim()}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6"
                      >
                        Check User
                      </Button>
                    </div>
                  </div>

                  {error && (
                    <div className="flex gap-3 p-4 rounded-lg bg-red-50 border border-red-200">
                      <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Amount Selection */}
              {step === "amount" && recipient && (
                <div className="space-y-6">
                  {/* Recipient Info */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                    <p className="text-sm font-semibold text-gray-600 mb-3">
                      Transferring to:
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {recipient.username}
                        </p>
                        <p className="text-sm text-gray-600">
                          {recipient.email.replace(/(?<=.).(?=@)/, "*")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Balance Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-sm font-medium text-gray-600">Current Balance</p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">
                        {currentBalance}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">credits</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-sm font-medium text-gray-600">Remaining After</p>
                      <p
                        className={`text-2xl font-bold mt-2 ${remainingBalance >= 0 ? "text-gray-900" : "text-red-600"}`}
                      >
                        {remainingBalance >= 0
                          ? remainingBalance
                          : "-" + Math.abs(remainingBalance).toFixed(0)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">credits</p>
                    </div>
                  </div>

                  {/* Amount Input */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Transfer Amount
                    </label>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => {
                          setAmount(e.target.value);
                          setError("");
                        }}
                        min="0"
                        step="1"
                        className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 h-11 pr-12"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                        credits
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      Minimum transfer: {MINIMUM_TRANSFER} credits
                    </p>
                  </div>

                  {error && (
                    <div className="flex gap-3 p-4 rounded-lg bg-red-50 border border-red-200">
                      <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleBackToRecipient}
                      variant="outline"
                      className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleProceedToConfirm}
                      disabled={!amount.trim()}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                    >
                      Continue
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {step === "confirm" && recipient && (
                <div className="space-y-6">
                  {/* Summary */}
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                      <span className="text-gray-600">Transfer to:</span>
                      <span className="font-semibold text-gray-900">
                        {recipient.username}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                      <span className="text-gray-600">Transfer Amount:</span>
                      <span className="font-semibold text-gray-900">
                        {amountNum} credits
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                      <span className="text-gray-600">
                        Transfer Fee ({TRANSFER_FEE_PERCENTAGE}%):
                      </span>
                      <span className="font-semibold text-gray-900">
                        {fee.toFixed(2)} credits
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-gray-700 font-semibold">
                        Recipient Receives:
                      </span>
                      <span className="text-xl font-bold text-blue-600">
                        {finalAmount.toFixed(2)} credits
                      </span>
                    </div>
                  </div>

                  {/* Warning */}
                  <div className="flex gap-3 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                    <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-yellow-900">
                        Please review before confirming
                      </p>
                      <p className="text-sm text-yellow-700 mt-1">
                        Once confirmed, this transfer cannot be reversed. The recipient
                        will receive {finalAmount.toFixed(2)} credits.
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={() => setStep("amount")}
                      variant="outline"
                      className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => setShowConfirm(true)}
                      disabled={loading}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium"
                    >
                      Confirm Transfer
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Transfer</AlertDialogTitle>
            <AlertDialogDescription>
              Transfer {amountNum} credits to {recipient?.username}? The recipient will
              receive {finalAmount.toFixed(2)} credits after the {TRANSFER_FEE_PERCENTAGE}
              % transfer fee.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">Note:</span> This action cannot be undone.
            </p>
          </div>
          <div className="flex gap-3">
            <AlertDialogCancel className="flex-1">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmTransfer}
              disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              {loading ? "Processing..." : "Transfer"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
