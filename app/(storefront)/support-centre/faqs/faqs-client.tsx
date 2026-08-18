"use client";

import * as React from "react";
import Link from "next/link";

interface FaqTable {
  headers: string[];
  rows: { country: string; org: string; website: string }[];
}

interface FaqItem {
  question: string;
  answer: string;
  table?: FaqTable;
  note?: string;
}

interface FaqCategory {
  id: string;
  name: string;
  faqs: FaqItem[];
}

const faqCategories: FaqCategory[] = [
  {
    id: "account",
    name: "Account",
    faqs: [
      {
        question: "How to register a Nothing account?",
        answer:
          "On Nothing OS devices, go to Settings - Log in/Register Nothing account in the top right corner, or open the Nothing app and tap Register. You can choose from the following two registration methods:\n\nEmail registration: Enter your email address, enter the 6-digit security verification code received, and set a strong password to complete.\n\nGoogle account (third-party account) registration: Tap the third-party icon at the bottom. The system will use the underlying hardware security framework for one-tap registration/login.\n\nOn non-Nothing OS devices, use the Nothing X app, go to My page - Nothing account, and tap Log in/Register. You can choose from the following two registration methods:\n\nEmail registration: Enter your email address, enter the 6-digit security verification code received, and set a strong password to complete.\n\nGoogle/Apple account (third-party account) registration: Tap the third-party account icon at the bottom. The system will use underlying hardware security framework for one-tap registration/login.",
      },
      {
        question: "What is a third-party account?",
        answer:
          "A third-party account is an account registered with a third-party identity provider (e.g. Google, Apple). Users can use a third-party account to authorize login to a Nothing account. Nothing OS/Nothing account/Nothing accounts support authorising login via a Google account. Apple devices/Nothing accounts support authorised login via a Google account or Apple ID.",
      },
      {
        question: "How many Nothing accounts can be registered with one email address?",
        answer:
          "Only one Nothing account can be registered with one email address. If you enter an email address that is already registered, the system will prompt you to log in directly.",
      },
      {
        question: "Can I merge two independent accounts registered via a third party and email?",
        answer:
          "No. To protect user privacy and system security, Nothing accounts that are registered via two independent channels cannot be merged.",
      },
      {
        question: "How do I log in to my Nothing account?",
        answer:
          "On Nothing OS devices, go to Settings - Log in/Register Nothing account in the top right corner, or enter via a Nothing app, and tap Register. You can choose from the following two registration methods:\n\nEmail login: Enter the email address and password for your registered Nothing account. You will be logged in upon successful verification.\n\nGoogle account (third-party account) login: Tap the third-party icon at the bottom. The system will call the underlying hardware security framework to log in. If you are already logged in to the third-party app, it will prompt an authorized login; otherwise, you must manually enter your third-party account password. You will be logged in to your Nothing account upon successful authentication.\n\nOn non-Nothing OS devices, use the Nothing X app, go to My page - Nothing account, and tap Log in/Register. You can choose from the following two registration methods:\n\nEmail login: Enter the email address and password for your registered Nothing account. You will be logged in upon successful verification.\n\nGoogle/Apple account (third-party account) login: Tap the third-party icon at the bottom. The system will call the underlying hardware security framework to log in. If you are already logged in to the third-party app, it will prompt an authorized login; otherwise, you must manually enter the third-party account password. You will be logged in to your Nothing account upon successful authentication.",
      },
      {
        question: "Why does the account show 'abnormal login'?",
        answer:
          "Account login failed for the following reasons:\n- Network issue: please check if the network is disconnected or unavailable.\n- Too many attempts: your account has been temporarily locked due to multiple incorrect password/verification code entries. Please try again in 1 hour.\n- Other activity: the system detected unsafe activity on your account and it has been temporarily locked. Please try again later.",
      },
      {
        question: "Will my account be automatically deleted/released if I don't log in for a long time?",
        answer:
          "Long term inactivity protection will not affect account retention, yet additional verification may be required for certain sensitive operations.",
      },
      {
        question: "How to log out of your Nothing account",
        answer:
          "1. Nothing OS devices: 'Settings app' > '[Nothing account]' > scroll to the bottom of the page and tap [Log out].\n2. Computer/mobile phone browser: Access the Account Center via https://account.nothing.tech and on the home page tap/click [Log out].\n3. Nothing app: Go to 'Profile' > tap the gear icon in the top right corner > tap 'Log out'.",
      },
      {
        question: "How do I delete my Nothing account?",
        answer:
          "Note: Deleting your account is an irreversible action. Once deleted, you will lose all purchase digital assets, community badges and synced data from ecosystem devices.\n\nSteps:\nGo to Settings - Nothing Account in the top right corner - Privacy Center - Delete account.\nThe system will prompt you to enter a verification code or confirm with final security verification. Once submitted, your account will enter the deletion and clearance process.",
      },
      {
        question: "Forgot password, how do I reset it?",
        answer:
          "1. Reset password:\nGo to Settings - Log in/Register Nothing account page in the top right corner, and tap 'Forgot password'.\nEnter the email address registered to your Nothing account, and tap to send a password reset link.\nOpen your email and tap the password reset link to set a new password.",
      },
      {
        question: "Why does the system prompt \"Abnormal login\" after changing the password?",
        answer:
          "To protect account information, for 24 hours after you change your password, the system will temporarily limit login attempts on new devices, and you can still log in on previously used devices.",
      },
      {
        question: "What is Nothing Account Two-Factor Authentication (2FA)? Do I have to enable it?",
        answer:
          "Two-factor authentication is the highest-grade security defense mechanism for your account. Even if someone else obtains your password, they cannot easily log in.\n\nEven if another user can log in to your account, the login will have to pass password, the device will require a 6-digit Security code, which ensures the security of your account.\n\nGo to Settings in the phone - Nothing account in the top right corner - Account and Security to enable.",
      },
      {
        question: "Why haven't I received the verification email?",
        answer:
          "Our system sends emails instantly. If you haven't received yours, please check your 'Spam' or 'Subscriptions/Promotions' folders. Official Nothing sender addresses always end with @nothing.tech.",
      },
      {
        question: "If prompted with 'SMS/email sending frequency limit reached', when can I send again?",
        answer:
          "To prevent accidental traffic and verification code flooding, the system has set a security threshold: the same account can receive a maximum of 10 verification codes within 1 hour. If prompted that the limit has been reached, a cooldown mechanism is triggered. Please try again after 1 hour or 24 hours.",
      },
      {
        question: "Why does the system display \"Verification code invalid or expired\" after receiving the verification code?",
        answer:
          "1. Expired: The Nothing email verification code is only valid for 15 minutes. If it expires, please request a new one.\n2. Multiple requests: If you have sent multiple codes, please enter the last verification code you received. Previous entries will automatically become invalid.",
      },
    ],
  },
  {
    id: "order-payment",
    name: "Order & Payment",
    faqs: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept major credit and debit cards, Cash on Delivery (COD) in select areas, and online bank transfers. All digital payments are processed through secure payment gateways.",
      },
      {
        question: "How do I cancel my order?",
        answer:
          "You can cancel your order prior to dispatch by reaching out to our Customer Support team with your Order ID. Once an order has been shipped, it cannot be cancelled directly and must follow our return process.",
      },
      {
        question: "Can I modify my order after placing it?",
        answer:
          "If your order has not been dispatched yet, please contact Customer Support immediately to update delivery details or order items.",
      },
      {
        question: "Where can I find my invoice?",
        answer:
          "An official invoice is sent to your registered email address upon order confirmation. You can also request a copy by contacting customer support.",
      },
      {
        question: "Why was my payment declined?",
        answer:
          "Payment declines may happen due to incorrect card details, insufficient funds, or security blocks from your bank. Please verify your details or contact your issuing bank for assistance.",
      },
    ],
  },
  {
    id: "technical-support",
    name: "Technical Support",
    faqs: [
      {
        question: "How do I enable and use my phone's accessibility features?",
        answer:
          "Accessibility features make it easier for visually impaired users to use the phone.\n\n1. Your phone supports the screen reader TalkBack. To enable TalkBack, go to Settings → Accessibility.\nRight or left to move between items\nDouble tap to activate an item\nDrag 2 fingers to scroll\nTurn off talkback: in settings, tap use talkback. There will be an outline. Double tap it. On the confirmation message, tap stop. There will be an outline. Double tap it.\n2. Tap specific items on your screen to hear them read or described aloud. Go to Settings → Accessibility-Select to speak.\nTap a specific item, like text or an image\nDrag your finger across the screen to select multiple items\nTap play to hear everything on screen\nSelect text that appears inside the camera view\n3. You can scale the font, bold the text, and enable high-contrast text to improve the readability and visibility of content on the screen. You can adjust these settings in Settings → Accessibility → Font and Display Size.\n4. Color correction assists in using the phone, making it more user-friendly for colorblind users. This can be done in Settings → Accessibility → Color and Animation.\n5. Magnification function: Quickly magnifies the screen for a clearer view of content. Go to Settings → Accessibility → Magnification\nUse the shortcut to start magnification\nTap the screen\nDrag 2 fingers to adjust zoom\nUse shortcut to stop magnification\nTo zoom in temporarily:\nMake sure your magnification type is set to full screen\nUse shortcut to start magnification\nTouch & hold anywhere on the screen\nDrag finger to move around the screen\nLift finger to stop magnification\n6. The real-time captioning feature can detect the audio content on the device and automatically generate captions. The caption language can be switched to other languages as needed, which can be set in Settings → Accessibility → Live Caption.\nTo move captions, touch and hold. Then drag up or down\nTo expand captions, double tap them",
      },
      {
        question: "I have a problem with the product.",
        answer:
          "We advise you to check the troubleshooting tips. If the issue persists, please contact our customer support team for further assistance.",
      },
      {
        question: "How can I transfer data from my other brand Android phone or iPhone to the Nothing Phone?",
        answer:
          "Since the Nothing Phone uses the Google Android system, you may refer to the official Google support documentation for data transfer methods. Please ensure that your phone is fully charged before transferring data to avoid any failure or loss due to insufficient battery power.",
      },
      {
        question: "How can I factory reset my phone?",
        answer:
          "Factory reset phones by going to Settings > System > Reset Options > Erase All Data (Factory Reset).",
      },
    ],
  },
  {
    id: "shipping-delivery",
    name: "Shipping & Delivery",
    faqs: [
      {
        question: "How to get Free shipping?",
        answer:
          "Shipping fees apply to orders below threshold. Orders over this threshold qualify for free shipping, depending on your location and the promotion at the time of purchase.",
      },
      {
        question: "Can I request a delivery time window?",
        answer:
          "We are currently unable to guarantee specific delivery time windows. Delivery times are determined by the logistics provider and may vary by region.",
      },
      {
        question: "What should I do if my package is returned to sender?",
        answer:
          "If your package is returned to us, please contact our Customer Support team. We can assist with re-shipping your order or help you request a refund, depending on your preference and eligibility.",
      },
      {
        question: "Can I ship to PO Box or APO/FPO addresses?",
        answer:
          "Unfortunately, we do not ship to PO Boxes or military addresses (APO/FPO) at this time.",
      },
      {
        question: "When will I receive my tracking number after placing my order?",
        answer:
          "Your tracking number will be issued once your order has been processed and dispatched from our warehouse. This usually takes 1-2 business days. You will receive a notification email with the tracking details once available.",
      },
      {
        question: "Do you ship on weekends or national holidays?",
        answer:
          "Standard and Express Shipping services typically operate on business days only.\n\nWhile we strive to provide the best service to all regions, there are some areas where we have limitations in enhancing our standard shipping options further. Factors such as logistical constraints, carrier limitations, and regulatory restrictions may prevent us from offering Express Shipping in these specific regions.\nHowever, we continually explore opportunities to improve and expand our services to meet the needs of our customers in every possible way.",
      },
      {
        question: "What happens if there's a delay with my order?",
        answer:
          "We strive to meet the promised delivery times. However, in rare instances, unforeseen circumstances or issues with the shipping carrier may cause delays. If this occurs, please contact our customer support team, and we'll do our best to assist you.",
      },
      {
        question: "Can I track my delivery?",
        answer:
          "Yes. You can track your package by the tracking number on delivery email we send. If you need help, feel free to contact our Customer Support and we'll be happy to assist.",
      },
      {
        question: "Can I change the delivery address?",
        answer:
          "1. We can change your address before the order label number is issued.\n2. Once the order label is issued, the address cannot be changed.",
      },
      {
        question: "How long will it take for my order to arrive?",
        answer:
          "Standard delivery typically takes 3-5 business days. However, actual delivery times may vary depending on the local courier and unforeseen circumstances, and in some cases, may take up to 2-4 weeks.\nFor Express Shipping, estimated delivery times depend on your location and the courier service used. In general, Express orders arrive within 1-3 business days after dispatch from our warehouse.",
      },
      {
        question: "What do I do if my package is held at customs?",
        answer:
          "If your package is held at customs, please first contact the courier responsible for your delivery. They are usually able to assist with customs clearance procedures. Additionally, you may contact our Customer Support team so we can follow up from our side.",
      },
      {
        question: "What do I do if someone else has received the order?",
        answer:
          "Please contact our Customer Support for assistance. You may also contact the courier directly to file for a parcel lost claim. The investigation may proceed faster if the courier received direct complaints from the recipient.",
      },
      {
        question: "What do I do if my order is lost?",
        answer:
          "Please get in touch directly with your courier for clarification. You'll find your courier's contact details in your order confirmation email.\n\nFeel free to contact our Customer Support for further assistance.",
      },
      {
        question: "What do I do if I've received an empty or tampered package?",
        answer: "Please contact our Customer Support for further assistance.",
      },
      {
        question: "What is Express Shipping?",
        answer:
          "Express Shipping is a premium shipping option that allows you to receive your order faster than standard shipping. It prioritizes your package, ensuring quicker delivery to your doorstep.",
      },
    ],
  },
  {
    id: "returns-exchanges",
    name: "Returns & Exchanges",
    faqs: [
      {
        question: "Do you provide a pre-paid shipping label for returns?",
        answer: "Yes, we provide a pre-paid return label for eligible return requests.",
      },
      {
        question: "What happens if my return package is lost in transit?",
        answer:
          "1. If you use our provided return label, we will work with the logistics provider to investigate. If the item cannot be located, we will file a claim on your behalf.\n2. If you use your own shipping method, we can support the investigation, but you will need to file a claim directly with the carrier.",
      },
      {
        question: "Can I just keep the promotional products?",
        answer:
          "No, all items, including promotional or free gifts, must be returned in order to receive a full refund.",
      },
      {
        question: "Can I return part of my order and keep the rest?",
        answer:
          "Yes, partial returns are accepted. However, all bundled or promotional items must be returned together to qualify for a refund.",
      },
      {
        question: "What if I cancelled my order, will I get a refund on the express shipping?",
        answer:
          "Yes, if you cancel your order before it has been shipped, you will typically receive a refund for the express shipping fee. When you cancel your order, the shipping process is halted, and the shipping cost associated with the order should be refunded back to your original payment method.\n\nHowever, if the order has already been shipped before you cancel it, the shipping fee may not be refundable. In such cases, you may still be eligible for a refund on the product cost itself once the returned items.",
      },
      {
        question: "How do I find the nearest Service Centre?",
        answer:
          "Please contact our Customer Support to help you find the closest Service Centre.",
      },
      {
        question: "How do I return my order?",
        answer:
          "Please get in touch with our customer support within 30-day of the product delivery date, and we will look into this for you.\n\nWe ask that the product(s) be kept in reasonable condition, and if possible, returned in the original packaging.\n\nThe return and refund policy only applies to the products sold on Nothing official website.\n\nIf your purchase includes a free gift, it must be returned along with the phone.",
      },
      {
        question: "What is your return policy?",
        answer:
          "Nothing offers a 30-day return policy on its products. The return and refund policy is varied by products, please contact customer support for more details.\nIf your purchase includes a free gift, it must be returned along with the phone.",
      },
      {
        question: "What information do I need to provide when contacting customer support?",
        answer:
          "Please when contacting the customer support team please make sure to have in your hands the following information: your full name, email address, phone number, order number, your confirmation email with your order number, your address.",
      },
      {
        question: "I've returned my order. When will I receive my refund?",
        answer:
          "We will promptly process your refund once your returned device is received and inspected. Once processed, please allow 14 working days for the fund to become available on your method of payment.",
      },
    ],
  },
  {
    id: "warranty",
    name: "Warranty",
    faqs: [
      {
        question: "What information and documents are required to request a repair?",
        answer: "Please contact customer support for case-specific requirements.",
      },
      {
        question: "How do I submit a warranty claim online?",
        answer:
          "Please visit LINK select your product category, click on 'Submit Request,' and follow the instructions provided.",
      },
      {
        question: "Who pays for shipping if I send my device abroad for warranty repair?",
        answer:
          "Warranty support is only valid in the country or region where the product was originally purchased. Cross region warranty service is not available.",
      },
      {
        question: "How do I register my product for warranty outside my country?",
        answer:
          "You can only return to the country/region of purchase to apply for warranty service.",
      },
      {
        question: "Does Nothing offer international (cross region) warranty service?",
        answer:
          "No, our warranty service is only available in the original country or region of purchase.",
      },
      {
        question: "How long is the Warranty valid?",
        answer: "Please check this link LINK",
      },
      {
        question: "Do you sell accessories separately? Where can I purchase them?",
        answer: "Yes we do, please contact our customer service for your requests.",
      },
      {
        question: "Can I get a loan phone while my Phone is being repaired?",
        answer: "This is currently not available.",
      },
      {
        question: "I have a problem with a device purchased at the nothing.tech.",
        answer:
          "We advise you to check the troubleshooting tips available in these FAQs. If the issue cannot be resolved, our customer support will be able to assist you.",
      },
      {
        question: "I have a problem with a Nothing device that was not purchased at nothing.tech.",
        answer:
          "We advise you to check the troubleshooting tips available in these FAQs. If the issue cannot be resolved, you can either refer to the seller where you purchased the device, or get in touch with our customer support",
      },
      {
        question: "What does the Warranty cover?",
        answer:
          "Please refer to the Safety Information; Warranty Card provided with your product.\n\nYou may also find Warranty information via this link.",
      },
    ],
  },
  {
    id: "other",
    name: "Other",
    faqs: [
      {
        question: "How can I recycle my old discarded device?",
        answer:
          "Guidelines for the recycling of discarded electronic and electrical devices: To safely recycle old discarded devices, please contact local recycling points or retailers for recycling. For more information, please refer to the following details:",
        table: {
          headers: ["Country/Region", "Organization", "Website"],
          rows: [
            { country: "Austria", org: "ERP Austria", website: "https://erp-recycling.org/de-at/" },
            { country: "Belgium", org: "Recupel", website: "https://www.recupel.be/en/find-a-collection-point/?categories=1" },
            { country: "Canada", org: "EPRA", website: "https://epra.ca/" },
            { country: "Czech Republic", org: "REMA", website: "https://www.rema.cloud/projekt/bud-liny" },
            { country: "Denmark", org: "ERP Denmark", website: "https://erp-recycling.org/en-dk/where-to-recycle/" },
            { country: "Finland", org: "ERP Finland", website: "https://erp-recycling.org/en-fi/where-to-recycle/" },
            { country: "France", org: "Ecologic", website: "https://www.ecologic-france.com/citoyens/ou-deposer-mes-dechets.html" },
            { country: "Germany", org: "ERP Germany", website: "https://erp-recycling.org/en-de/where-to-recycle/" },
            { country: "Ireland", org: "ERP Ireland", website: "https://erp-recycling.org/ie/where-to-recycle/" },
            { country: "Italy", org: "ERP Italy", website: "https://erp-recycling.org/en-it/where-to-recycle/" },
            { country: "Netherlands", org: "Stichting Open", website: "https://inleverpunten.stichting-open.org/" },
            { country: "Poland", org: "ERP Poland", website: "https://erp-recycling.org/pl-pl/" },
            { country: "Portugal", org: "ERP Portugal", website: "https://erp-recycling.org/pt-pt/onde-reciclar/rede-depositrao/" },
            { country: "Spain", org: "ERP Spain", website: "https://erp-recycling.org/en-es/where-to-recycle/" },
            { country: "Sweden", org: "ERP Sweden", website: "https://erp-recycling.org/se-se/" },
            { country: "The United Kingdom", org: "ERP UK", website: "https://erp-recycling.org/uk/where-to-recycle/" },
            { country: "The United States", org: "/", website: "https://www.h2compliance.com/nothing-tech/" },
          ],
        },
        note: "For other countries and regions not listed above, please refer to local regulations and contact your local recycling authority or local retailer for proper disposal.",
      },
    ],
  },
];

export function FaqsClient() {
  const [activeTab, setActiveTab] = React.useState("account");
  const [search, setSearch] = React.useState("");
  const [expandedIndices, setExpandedIndices] = React.useState<Record<string, boolean>>({});

  const toggleFaq = (key: string) => {
    setExpandedIndices((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const activeCategory = faqCategories.find((cat) => cat.id === activeTab) || faqCategories[0];

  const filteredFaqs = search.trim()
    ? activeCategory.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(search.toLowerCase()) ||
          faq.answer.toLowerCase().includes(search.toLowerCase())
      )
    : activeCategory.faqs;

  return (
    <div data-hide-dots="true" className="min-h-screen bg-[#f4f4f2] pt-20 text-[#111]">
      {/* ─── Breadcrumb + Search bar ─────────────────────────── */}
      <div>
        <div className="mx-auto flex max-w-[980px] items-center justify-between px-6 py-4 md:px-10">
          <nav className="flex items-center gap-2 font-lattera text-[11px] tracking-[0.16em] uppercase" style={{ color: "#2f5fb3" }}>
            <Link href="/support-centre" className="hover:underline">
              NOTHING
            </Link>
            <span className="text-black/30">/</span>
            <span className="text-black/50 tracking-[0.16em]">FAQ</span>
          </nav>
          <div className="flex h-[38px] w-[240px] items-center gap-2 rounded-full bg-white px-4">
            <svg className="h-3.5 w-3.5 shrink-0 text-black/35" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="search"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="font-ntype-mono flex-1 bg-transparent text-[13px] font-[300] text-black outline-none placeholder:text-black/35"
            />
          </div>
        </div>
      </div>

      {/* ─── Main Content Area (Sidebar + Content) ────────────── */}
      <div className="mx-auto max-w-[980px] px-6 pt-10 pb-24 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[180px_1fr]">
          {/* Left Sidebar Navigation */}
          <aside className="space-y-2">
            {faqCategories.map((cat) => {
              const isActive = cat.id === activeTab;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveTab(cat.id);
                    setSearch("");
                  }}
                  className={`font-ntype-mono block w-full text-left text-[13px] leading-[20px] transition-colors ${
                    isActive
                      ? "font-medium text-black"
                      : "font-[300] text-black/40 hover:text-black/70"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </aside>

          {/* Right Content Column */}
          <div>
            <h1 className="font-ntype text-[clamp(1.5rem,2.5vw,2rem)] font-normal leading-none text-black">
              {activeCategory.name}
            </h1>

            <div className="mt-6">
              {filteredFaqs.length === 0 ? (
                <div>
                  <div className="faq-dot-line my-3 h-[4px] w-full" />
                  <p className="font-ntype-mono text-[13px] font-[300] text-black/50">
                    No articles found in this section.
                  </p>
                </div>
              ) : (
                <div className="divide-y-0">
                  {filteredFaqs.map((faq, index) => {
                    const isExpanded = !!expandedIndices[`${activeCategory.id}-${index}`];
                    return (
                      <div key={faq.question}>
                        {/* Dotted Separator */}
                        <div className="faq-dot-line my-3 h-[4px] w-full" />

                        {/* Accordion Header */}
                        <button
                          onClick={() => toggleFaq(`${activeCategory.id}-${index}`)}
                          className="flex w-full items-start justify-between gap-4 text-left"
                        >
                          <span className="font-ntype-mono text-[13px] font-[300] leading-[20px] text-black hover:underline">
                            {faq.question}
                          </span>
                          <span className="font-ntype-mono shrink-0 text-[13px] font-[300] leading-[20px] text-[#002f6c] hover:underline">
                            {isExpanded ? "( Read Less )" : "( Read More )"}
                          </span>
                        </button>

                        {/* Accordion Answer Content */}
                        {isExpanded && (
                          <div className="pt-4 pb-2 space-y-4">
                            <p className="font-ntype-mono text-[13px] font-[300] leading-[20px] text-black whitespace-pre-line">
                              {faq.answer}
                            </p>

                            {/* Render Table if available */}
                            {faq.table && (
                              <div className="overflow-x-auto my-4">
                                <table className="w-full border border-black border-collapse font-ntype-mono text-[13px] font-[300] leading-[18px]">
                                  <thead>
                                    <tr className="border-b border-black">
                                      {faq.table.headers.map((header) => (
                                        <th
                                          key={header}
                                          className="border-r border-black last:border-r-0 p-2 text-left font-normal text-black"
                                        >
                                          {header}
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {faq.table.rows.map((row, rIdx) => (
                                      <tr key={rIdx} className="border-b border-black last:border-b-0">
                                        <td className="border-r border-black p-2 text-black whitespace-nowrap">
                                          {row.country}
                                        </td>
                                        <td className="border-r border-black p-2 text-black whitespace-nowrap">
                                          {row.org}
                                        </td>
                                        <td className="p-2 text-black">
                                          {row.website.startsWith("http") ? (
                                            <a
                                              href={row.website}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-black hover:underline break-all"
                                            >
                                              {row.website}
                                            </a>
                                          ) : (
                                            row.website
                                          )}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}

                            {/* Render Note if available */}
                            {faq.note && (
                              <p className="font-ntype-mono text-[13px] font-[300] leading-[20px] text-black">
                                {faq.note}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {/* Final bottom dotted line */}
                  <div className="faq-dot-line my-3 h-[4px] w-full" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
