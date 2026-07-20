"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Settings,
  Store,
  LogOut,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "DASHBOARD", href: "/admin", icon: LayoutDashboard },
    { name: "PRODUCTS", href: "/admin/products", icon: Package },
    { name: "CATEGORIES", href: "/admin/categories", icon: FolderTree },
    { name: "SETTINGS", href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/admin/login";
    } catch {
      window.location.href = "/admin/login";
    }
  };

  return (
    <aside className="w-64 bg-[#0A0A0B] border-r border-[#26262A] flex flex-col justify-between h-screen sticky top-0 select-none">
      <div className="space-y-6 p-6">
        {/* Brand */}
        <div className="flex items-center space-x-3 pb-4 border-b border-[#26262A]">
          <div className="p-2 bg-[#D71921]/10 rounded border border-[#D71921]/30">
            <Shield className="h-5 w-5 text-[#D71921]" />
          </div>
          <div>
            <div className="font-ndot text-sm tracking-widest text-white uppercase">
              NOTHING (R)
            </div>
            <div className="font-lattera text-[10px] text-neutral-500 uppercase">
              ADMIN CONTROL PANEL
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 font-lattera text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors font-bold uppercase tracking-wider",
                  isActive
                    ? "bg-[#D71921] text-white shadow-lg shadow-[#D71921]/20"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-6 border-t border-[#26262A] space-y-2 font-lattera text-xs">
        <Link
          href="/"
          target="_blank"
          className="flex items-center space-x-3 px-3 py-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
        >
          <Store className="h-4 w-4" />
          <span>VIEW STORE FRONT</span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>LOGOUT</span>
        </button>
      </div>
    </aside>
  );
}
