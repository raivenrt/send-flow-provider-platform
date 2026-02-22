"use client";

import { Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="flex items-center justify-end px-8 py-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <Settings className="h-5 w-5" />
          </Button>
          <div className="bg-white py-3 px-4 rounded-md text-green-600 text-xs font-bold shadow-sm">
            1820
          </div>
        </div>
      </div>
    </header>
  );
}
