"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, FolderTree, Settings, LogOut, Shield, ShoppingBag, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

export interface AdminSidebarContentProps {
  onClose?: () => void;
}

export function AdminSidebarContent({ onClose }: AdminSidebarContentProps) {
  const pathname = usePathname();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);

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

      {/* Bottom Actions: View Site & Logout */}
      <div className="p-6 border-t border-neutral-200 space-y-2">
        <Link
          href="/"
          target="_blank"
          onClick={onClose}
          className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-600 hover:border-neutral-400 hover:text-neutral-900 transition-colors font-mono text-xs font-bold uppercase tracking-wider"
        >
          <div className="flex items-center space-x-2">
            <ExternalLink className="h-4 w-4" />
            <span>VIEW SITE</span>
          </div>
        </Link>

        <button
          type="button"
          onClick={() => setIsLogoutModalOpen(true)}
          className="w-full flex items-center space-x-2 px-3 py-2.5 rounded-lg bg-red-50 border border-red-100 text-[#D71921] hover:bg-[#D71921] hover:text-white transition-colors font-mono text-xs font-bold uppercase tracking-wider cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          <span>LOGOUT</span>
        </button>
      </div>

      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="Logout Confirmation"
        subtitle="Are you sure you want to log out of the admin panel?"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-xs text-neutral-500 font-sans">
            You will need to sign in again to access the admin control panel and manage products, categories, or orders.
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" size="sm" onClick={() => setIsLogoutModalOpen(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="red"
              size="sm"
              onClick={() => {
                if (onClose) onClose();
                handleLogout();
              }}
            >
              Log Out
            </Button>
          </div>
        </div>
      </Modal>
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
