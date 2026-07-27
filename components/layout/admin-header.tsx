"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, ExternalLink, Menu, AlertTriangle } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AdminSidebarContent } from "./admin-sidebar";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

export function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const getTitle = () => {
    if (pathname === "/admin") return "ANALYTICS OVERVIEW";
    if (pathname.startsWith("/admin/products")) return "PRODUCT MANAGEMENT";
    if (pathname.startsWith("/admin/categories")) return "CATEGORY MANAGEMENT";
    if (pathname.startsWith("/admin/media")) return "MEDIA LIBRARY";
    if (pathname.startsWith("/admin/settings")) return "STORE SETTINGS";
    return "ADMIN PANEL";
  };

  const handleConfirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setIsLogoutModalOpen(false);
      router.push("/admin/login");
      router.refresh();
    } catch {
      setIsLogoutModalOpen(false);
      router.push("/admin/login");
    } finally {
      setIsLoggingOut(false);
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
          onClick={() => setIsLogoutModalOpen(true)}
          className="inline-flex items-center space-x-1 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider px-2 sm:px-3 py-1.5 bg-red-50 border border-red-100 text-[#D71921] hover:bg-[#D71921] hover:text-white transition-colors rounded-lg cursor-pointer"
          title="Sign Out of Admin Session"
        >
          <LogOut className="h-3 w-3" />
          <span>LOGOUT</span>
        </button>
      </div>

      {isLogoutModalOpen && (
        <Modal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          title="CONFIRM LOGOUT"
          maxWidth="sm"
        >
          <div className="space-y-4 font-mono text-xs text-neutral-900 dark:text-white">
            <div className="flex items-center space-x-3 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-lg text-red-700 dark:text-red-400">
              <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0" />
              <div>
                <p className="font-bold uppercase text-red-800 dark:text-red-300">ADMIN SESSION END</p>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-sans mt-0.5">
                  Are you sure you want to end your current administrator session?
                </p>
              </div>
            </div>

            <div className="pt-4 flex justify-end space-x-3 border-t border-neutral-200 dark:border-[#26262A]">
              <Button
                variant="outline"
                type="button"
                onClick={() => setIsLogoutModalOpen(false)}
              >
                CANCEL
              </Button>
              <Button
                variant="red"
                type="button"
                isLoading={isLoggingOut}
                onClick={handleConfirmLogout}
                leftIcon={<LogOut className="h-4 w-4" />}
              >
                LOGOUT
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </header>
  );
}
