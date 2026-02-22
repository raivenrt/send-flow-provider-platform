import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BackButton from "@/components/BackButton";
import RegistrationForm from "@/components/Forms/RegistrationForm";

export default function RegisterPage() {
  return (
    <main className="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 liquid-blob bg-black">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="glass-card p-8 sm:p-10">
          <BackButton />
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Create your account
            </h1>
            <p className="text-white/60">Join SendFlow and start messaging today</p>
          </div>

          {/* Form */}
          <RegistrationForm />
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
