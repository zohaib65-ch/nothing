"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, ExternalLink, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AdminSidebarContent } from "./admin-sidebar";

export function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

  const getTitle = () => {
    if (pathname === "/admin") return "ANALYTICS OVERVIEW";
    if (pathname.startsWith("/admin/products")) return "PRODUCT MANAGEMENT";
    if (pathname.startsWith("/admin/categories")) return "CATEGORY MANAGEMENT";
    if (pathname.startsWith("/admin/media")) return "MEDIA LIBRARY";
    if (pathname.startsWith("/admin/settings")) return "STORE SETTINGS";
    return "ADMIN PANEL";
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  return (
    <header className="h-16 border-b border-neutral-200 bg-white px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      <div className="flex items-center space-x-3">
        {/* Mobile Sidebar Hamburger */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button
              className="lg:hidden p-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
              title="Open Navigation Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 border-r border-neutral-200">
            <AdminSidebarContent onClose={() => setIsOpen(false)} />
          </SheetContent>
        </Sheet>

        <span className="h-2 w-2 rounded-full bg-[#D71921] animate-ping" />
        <h1 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900">
          {getTitle()}
        </h1>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center space-x-1 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider px-2 sm:px-3 py-1.5 bg-neutral-50 border border-neutral-200 text-neutral-600 hover:border-neutral-400 hover:text-neutral-900 transition-colors rounded-lg"
        >
          <span>VIEW SITE</span>
          <ExternalLink className="h-3 w-3" />
        </Link>

        <button
          onClick={handleLogout}
          className="inline-flex items-center space-x-1 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider px-2 sm:px-3 py-1.5 bg-red-50 border border-red-100 text-[#D71921] hover:bg-[#D71921] hover:text-white transition-colors rounded-lg"
          title="Sign Out of Admin Session"
        >
          <LogOut className="h-3 w-3" />
          <span>LOGOUT</span>
        </button>
      </div>
    </header>
  );
}
