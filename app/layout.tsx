import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#050505] text-[#F5F5F7] font-ntype">
        {children}
      </body>
    </html>
  );
}
