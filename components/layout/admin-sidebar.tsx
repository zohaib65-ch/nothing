"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, FolderTree, Settings, Store, LogOut, Shield, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AdminSidebarContentProps {
  onClose?: () => void;
}

export function AdminSidebarContent({ onClose }: AdminSidebarContentProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "DASHBOARD", href: "/admin", icon: LayoutDashboard },
    { name: "PRODUCTS", href: "/admin/products", icon: Package },
    { name: "CATEGORIES", href: "/admin/categories", icon: FolderTree },
    { name: "ORDERS", href: "/admin/orders", icon: ShoppingBag },
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
    <div className="flex flex-col justify-between h-full select-none bg-white">
      <div className="space-y-6 p-6">
        {/* Brand */}
        <div className="flex items-center space-x-3 pb-4 border-b border-neutral-200">
          <div className="p-2 bg-[#D71921]/10 rounded border border-[#D71921]/30 animate-pulse">
            <Shield className="h-5 w-5 text-[#D71921]" />
          </div>
          <div>
            <div className="font-ndot text-sm tracking-widest text-neutral-900 uppercase">NOTHING(R)</div>
            <div className="font-lattera text-[10px] text-neutral-500 uppercase">ADMIN CONTROL PANEL</div>
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
                onClick={onClose}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all font-bold uppercase tracking-wider",
                  isActive ? "bg-[#D71921] text-white shadow-md shadow-[#D71921]/10" : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100",
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name} </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export function AdminSidebar() {
  return (
    <aside className="hidden lg:flex w-64 bg-white border-r border-neutral-200 flex-col h-screen sticky top-0">
      <AdminSidebarContent />
    </aside>
  );
}
