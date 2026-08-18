import type { Metadata } from "next";
import { TroubleshootingClient } from "./troubleshooting-client";

export const metadata: Metadata = {
  title: "Troubleshooting | Nothing Official Pakistan",
  description:
    "Find troubleshooting guides for Nothing & CMF devices. Resolve issues with account, Bluetooth, battery, camera, connectivity, charging, and more.",
  alternates: {
    canonical: "https://www.nothingcmf.pk/support-centre/troubleshooting",
  },
  openGraph: {
    title: "Troubleshooting | Nothing Official Pakistan",
    description:
      "Find troubleshooting guides for Nothing & CMF devices. Resolve issues with account, Bluetooth, battery, camera, connectivity, charging, and more.",
    url: "https://www.nothingcmf.pk/support-centre/troubleshooting",
    images: [
      {
        url: "/nothing_pakistan.avif",
        width: 1200,
        height: 630,
        alt: "Nothing Pakistan Troubleshooting",
      },
    ],
  },
};

export default function TroubleshootingPage() {
  return <TroubleshootingClient />;
}
