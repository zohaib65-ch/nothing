import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nothingcmf.pk"),
  title: {
    default: "Nothing Pakistan | Premium E-Commerce Store",
    template: "%s | Nothing Pakistan",
  },
  description: "Explore and buy Nothing & CMF smartphones, wireless audio earbuds, fast chargers, and premium accessories in Pakistan with nationwide delivery.",
  keywords: [
    "Nothing Phone Pakistan",
    "CMF Phone Pakistan",
    "Nothing Earbuds Pakistan",
    "Nothing Charger Pakistan",
    "Nothing accessories Pakistan",
    "Nothing official store Pakistan",
  ],
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Nothing Pakistan | Premium E-Commerce Store",
    description: "Explore and buy Nothing & CMF smartphones, wireless audio earbuds, fast chargers, and premium accessories in Pakistan with nationwide delivery.",
    url: "https://www.nothingcmf.pk",
    siteName: "Nothing Pakistan",
    locale: "en_PK",
    type: "website",
    images: [
      {
        url: "/nothing_pakistan.avif",
        width: 1200,
        height: 630,
        alt: "Nothing Pakistan Premium Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nothing Pakistan | Premium E-Commerce Store",
    description: "Explore and buy Nothing & CMF smartphones, wireless audio earbuds, fast chargers, and premium accessories in Pakistan with nationwide delivery.",
    images: ["/nothing_pakistan.avif"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
