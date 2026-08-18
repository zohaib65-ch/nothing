import type { Metadata } from "next";
import { SoftwareDownloadClient } from "./software-download-client";

export const metadata: Metadata = {
  title: "Software Download | Nothing Official Pakistan",
  description:
    "Download the latest Nothing X app and CMF Watch app for iOS and Android. Get updates, firmware, and companion apps.",
  alternates: {
    canonical: "https://www.nothingcmf.pk/support-centre/software-download",
  },
  openGraph: {
    title: "Software Download | Nothing Official Pakistan",
    description:
      "Download the latest Nothing X app and CMF Watch app for iOS and Android. Get updates, firmware, and companion apps.",
    url: "https://www.nothingcmf.pk/support-centre/software-download",
    images: [
      {
        url: "/nothing_pakistan.avif",
        width: 1200,
        height: 630,
        alt: "Nothing Pakistan Software Download",
      },
    ],
  },
};

export default function SoftwareDownloadPage() {
  return <SoftwareDownloadClient />;
}
