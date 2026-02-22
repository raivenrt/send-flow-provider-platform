"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  MessageCircle,
  Users,
  Wallet,
  Code,
  HelpCircle,
  BarChart3,
  LogOut,
  Send,
  Clock,
  ArrowRightLeft,
} from "lucide-react";

const menuItems = [
  { href: "/panel", label: "Dashboard", icon: BarChart3 },
  { href: "/panel/send-sms", label: "Send SMS", icon: Send },
  { href: "/panel/sms-history", label: "SMS History", icon: Clock },
  { href: "/panel/contacts", label: "Contacts", icon: Users },
  { href: "/panel/balance", label: "Balance", icon: Wallet },
  { href: "/panel/transfer-balance", label: "Transfer Balance", icon: ArrowRightLeft },
  { href: "/panel/api", label: "API Docs", icon: Code },
  { href: "/panel/support", label: "Support", icon: HelpCircle },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarHeader className="border-b border-gray-200 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-purple-600 to-blue-700 shadow-sm">
            <MessageCircle className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900">SendFlow</span>
            <span className="text-xs text-gray-500">SMS Platform</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-6">
        <div className="mb-8">
          <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Dashboard
          </p>
          <SidebarMenu className="gap-1">
            {menuItems.slice(0, 3).map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={`rounded-lg mx-2 px-4 py-2.5 text-sm font-medium transition-all ${
                      isActive ? "nav-item-active shadow-sm" : "nav-item"
                    }`}
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </div>

        <div>
          <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Management
          </p>
          <SidebarMenu className="gap-1">
            {menuItems.slice(3, 6).map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={`rounded-lg mx-2 px-4 py-2.5 text-sm font-medium transition-all ${
                      isActive ? "nav-item-active shadow-sm" : "nav-item"
                    }`}
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </div>

        <div className="pt-4">
          <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Resources
          </p>
          <SidebarMenu className="gap-1">
            {menuItems.slice(6, 8).map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={`rounded-lg mx-2 px-4 py-2.5 text-sm font-medium transition-all ${
                      isActive ? "nav-item-active shadow-sm" : "nav-item"
                    }`}
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </div>
      </SidebarContent>

      <div className="border-t border-gray-200 p-4 mt-auto">
        <button className="w-full flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </Sidebar>
  );
}
