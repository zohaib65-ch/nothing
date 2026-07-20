"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, ExternalLink } from "lucide-react";

export function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();

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
    <header className="h-16 border-b border-[#26262A] bg-[#050505] px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center space-x-3">
        <span className="h-2 w-2 rounded-full bg-[#D71921] animate-ping" />
        <h1 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
          {getTitle()}
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center space-x-1 font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 bg-[#141416] border border-[#26262A] text-neutral-300 hover:border-[#D71921] hover:text-[#D71921] transition-colors"
        >
          <span>VIEW STOREFRONT</span>
          <ExternalLink className="h-3 w-3" />
        </Link>

        <button
          onClick={handleLogout}
          className="inline-flex items-center space-x-1 font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 bg-[#D71921]/10 border border-[#D71921]/40 text-[#D71921] hover:bg-[#D71921] hover:text-white transition-colors"
          title="Sign Out of Admin Session"
        >
          <LogOut className="h-3 w-3" />
          <span>LOGOUT</span>
        </button>
      </div>
    </header>
  );
}
