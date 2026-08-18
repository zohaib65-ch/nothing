import * as React from "react";
import type { Metadata } from "next";
import { WHATSAPP_NUMBER } from "@/lib/config";
import { SupportClient } from "./support-client";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Support Centre | Nothing Official Pakistan",
  description:
    "Get help with your Nothing & CMF devices. View FAQs, OTA updates instructions, troubleshooting steps, and contact official customer support in Pakistan.",
  alternates: {
    canonical: "https://www.nothingcmf.pk/support-centre",
  },
  openGraph: {
    title: "Support Centre | Nothing Official Pakistan",
    description:
      "Get help with your Nothing & CMF devices. View FAQs, OTA updates instructions, troubleshooting steps, and contact official customer support in Pakistan.",
    url: "https://www.nothingcmf.pk/support-centre",
    images: [
      {
        url: "/nothing_pakistan.avif",
        width: 1200,
        height: 630,
        alt: "Nothing Pakistan Support Centre",
      },
    ],
  },
};

const faqs = [
  {
    question: "How to install the latest Phone OS via OTA?",
    answer:
      "If you're looking to install the latest Operating System (OS) update for a Nothing phone through Over-The-Air (OTA) update, please follow these straightforward steps:\n\n1. Ensure Connectivity: Connect your device to a stable Wi-Fi network to avoid any potential interruption during the download process.\n\n2. Battery Check: Make sure that your phone's battery level is at least 50%, or keep it connected to a charger.\n\n3. Backup Your Data: Although OTA updates are generally safe, it's a good habit to back up any crucial data before proceeding.\n\n4. Initiate the Update:\n- Open the Settings on your Nothing phone.\n- Scroll down and tap on System.\n- Select System updates. Your device will automatically check for the availability of a new OS version. If an update is available, you will see an option to download and Install the update.\n\n5. Download the Update: Click on Download. The update file will start downloading to your device. Depending on your connection speed and the size of the update, this might take some time.\n\n6. Install the Update: After the download is complete, you will be prompted to install the update. You might need to confirm the process and agree to restart your phone after the installation.\n\n7. Automatic Restart: Your phone should automatically restart during the installation process. This is normal, and the update will begin to install. Keep the device undisturbed while the update is applied.\n\n8. Completion: Once the installation is complete, your phone will restart. You should then see a confirmation that your device has been updated to the latest OS version.\n\nIf necessary, review the change-log for details on the update's improvements and new features. If at any stage you encounter issues or the phone advises that no updates are available, and you believe this isn't correct, please reach out to Nothing's customer support for further assistance. Make sure to provide any error messages or issues you've encountered. Our team is happy to help ensure your Nothing phone stays up-to-date.",
  },
  {
    question: "How to turn on Android auto on my Nothing phone?",
    answer:
      "To enable Android Auto on your Nothing phone, please follow these steps:\n\n1. First, confirm that your car or stereo supports Android Auto. Consult your vehicle's manual or contact the manufacturer to check compatibility.\n\n2. On your Nothing phone, go to Settings > Connected Devices > Connection Preferences > Android Auto.\n\n3. Enable \"USB debugging\" in your phone's Developer Options. If you haven’t enabled Developer Options, go to Settings > About Phone > Nothing OS and tap \"Build Number\" seven times. Then return to System > Developer Options > USB Debugging.\n\n4. Connect your phone to your car using a high-quality USB cable.\n\n5. You may see a prompt on your phone to allow Android Auto permission to access features of your phone. Agree to these prompts.\n\n6. For wireless Android Auto connections, if supported by your car, pair your phone to your vehicle’s Bluetooth. Follow the instructions on your car's display to complete setup.\n\nIf you encounter issues such as the phone only charging when connected and not projecting Android Auto:\n- Ensure your USB cable is appropriate for data transfer, not only charging. If in doubt, try a different cable.\n- Restart your Nothing phone and try reconnecting to your car.\n\nMake sure to keep your Android Auto app and your car's infotainment system software updated to the latest version for optimal functionality and compatibility. Please contact Nothing customer support for further assistance if you have further issues or questions. We’re here to help!",
  },
  {
    question: "How to pair my Nothing Ear or Ear (a) with my phone?",
    answer:
      "Before you begin:\nMake sure your phone has Bluetooth enabled. If your phone supports Google Fast Pair, ensure it’s turned on (usually in Bluetooth settings).\n\nSteps:\nWith both buds inside, open the lid of the charging case. Put the earphone in pairing mode:\n\nMethod 1 : If your phone supports Fast Pair, simply leave the case open. Your phone should automatically detect the earphone and notify you to connect.\n\nMethod 2 : If Fast Pair isn’t available or you need to pair manually, press and hold the function button on the charging case for about 3 seconds. The indicator light will start blinking white, indicating pairing mode.\n\nConnect to your phone:\nIf using Fast Pair, follow the on-screen prompts on your phone to complete the connection. Otherwise, Open your phone’s Bluetooth settings. Look for the earphone name in the list of available devices. Tap on it to connect.",
  },
  {
    question: "How to activate the ChatGPT feature on my Nothing Headphone?",
    answer:
      "1. This feature is compatible only with Nothing smartphones. Please upgrade your phone system to the latest version.\n\n2. Please upgrade your Nothing X app to the latest version.\n\n3. Please make sure to download, install, and log into the ChatGPT application from the Google Play Store and use the ChatGPT Voice feature at least once.\n\n4. You need to enable and apply the ChatGPT setting through Nothing X app >> Controls >> Voice AI >> ChatGPT. Please check if you meet the above conditions. If your issue remains unresolved following these steps, please contact us again.",
  },
  {
    question: "How to add lock screen widgets on my Nothing phone?",
    answer:
      "To add lock screen widgets to your Nothing phone, please follow these steps:\n1. Open the 'Settings' on your device.\n2. Scroll to and tap on 'Lock screen.'\n3. Choose 'Lockscreen widgets.'\n4. From here, you can add or arrange the widgets that appear on your lock screen.\n\nPlease contact Nothing customer support for further assistance if you have further issues or questions. We’re here to help! Thank you for choosing Nothing!",
  },
];

export default function SupportCentrePage() {
  return (
    <>
      <JsonLd type="faq" data={{ faqs }} />
      <SupportClient whatsappNumber={WHATSAPP_NUMBER} faqs={faqs} />
    </>
  );
}
