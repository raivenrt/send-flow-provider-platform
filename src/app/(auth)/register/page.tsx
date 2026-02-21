"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <main className="h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 liquid-blob bg-black">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="glass-card p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Create your account
            </h1>
            <p className="text-white/60">Join SendFlow and start messaging today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-blue-500"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-blue-500"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-blue-500"
              />
              <p className="text-xs text-white/50">Must be at least 8 characters</p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-lg h-10 font-semibold disabled:opacity-50"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-white/50 rounded-lg">
                Already have an account?
              </span>
            </div>
          </div>

          {/* Sign In Link */}
          <Button
            asChild
            variant="outline"
            className="w-full border-white/20 bg-transparent duration-200 text-white hover:bg-white/10 hover:text-neutral-400 rounded-lg h-10"
          >
            <Link href="/login" className="flex items-center justify-center gap-2">
              Sign in instead
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Footer Text */}
        <p className="text-center text-xs text-white/40 mt-8">
          By creating an account, you agree to our{" "}
          <Link href="#" className="text-blue-400 hover:text-blue-300">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-blue-400 hover:text-blue-300">
            Privacy Policy
          </Link>
        </p>
      </div>
    </main>
  );
}
