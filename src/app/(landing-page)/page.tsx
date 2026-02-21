import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import LiquidEther from "@/components/LiquidEther/LiquidEther";

export default function Home() {
  return (
    <main className="h-full bg-black liquid-blob">
      <div className="w-full h-full absolute">
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={10}
          cursorSize={60}
          isViscous
          viscous={20}
          iterationsViscous={16}
          iterationsPoisson={16}
          resolution={0.25}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="w-full">
          <Navbar />
        </div>

        <section className="grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="mb-6 inline-block">
              <div className="glass-card px-4 py-2">
                <p className="text-sm text-blue-300 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  Easy - No KYC - Cheep
                </p>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="gradient-text">Powerful SMS</span>
              <br />
              <span className="text-white">for Your Business</span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              Send and receive SMS messages at scale. Connect with your customers
              instantly with our modern, reliable messaging platform built for businesses
              of all sizes.
            </p>

            {/* CTA Button */}
            <Button
              asChild
              size="lg"
              className="bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-full px-8 text-base h-12 font-semibold"
            >
              <Link href="/register" className="flex items-center gap-2">
                Start Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>

            {/* Additional info */}
            <p className="text-sm text-white/50 mt-8">
              No credit card required • Free tier available
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
