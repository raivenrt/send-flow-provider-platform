"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <main className="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 liquid-blob bg-black">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="glass-card p-8 sm:p-10">
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Reset your password
                </h1>
                <p className="text-white/60">
                  Enter your email and we'll send you a link to reset it
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-blue-500"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-lg h-10 font-semibold disabled:opacity-50"
                >
                  {isLoading ? "Sending..." : "Send reset link"}
                </Button>
              </form>

              {/* Back to Login */}
              <Button
                asChild
                variant="ghost"
                className="w-full text-white/60 hover:text-white hover:bg-white/10 rounded-lg h-10 mt-4 flex items-center justify-center gap-2"
              >
                <Link href="/login">
                  <ArrowLeft className="w-4 h-4" />
                  Back to login
                </Link>
              </Button>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center space-y-6">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-linear-to-br from-green-400 to-blue-500 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Check your email</h2>
                  <p className="text-white/60">
                    We've sent a password reset link to <br />
                    <span className="font-semibold text-white">{email}</span>
                  </p>
                </div>

                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                  <p className="text-sm text-blue-200">
                    The link will expire in 24 hours. If you don't see the email, check
                    your spam folder.
                  </p>
                </div>

                <Button
                  asChild
                  className="w-full bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-lg h-10 font-semibold"
                >
                  <Link href="/login">Back to login</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
