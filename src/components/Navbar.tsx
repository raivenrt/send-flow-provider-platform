import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-400 to-purple-600 flex items-center justify-center font-bold text-white text-sm group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-shadow">
            SF
          </div>
          <span className="text-xl font-bold text-white hidden sm:inline">SendFlow</span>
        </Link>

        {/* Right side buttons */}
        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="ghost"
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button
            asChild
            className="bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-full"
          >
            <Link href="/register">Signup Free</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
