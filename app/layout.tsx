import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "NOTHING (INTL) - Premium E-Commerce Platform",
  description: "Pure instinct. Transparent tech smartphones, audio devices, and custom modular engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark h-full antialiased", "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col bg-[#050505] text-[#F5F5F7] font-ntype">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}

