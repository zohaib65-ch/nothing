"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "Contact@nothingofficial.pk";

export interface LegalDocument {
  id: string;
  title: string;
  sidebarLabel: string;
  content: React.ReactNode;
}

interface TermsClientProps {
  initialPolicy?: string;
}

function TermsClientInner({ initialPolicy = "privacy-policy" }: TermsClientProps) {
  const searchParams = useSearchParams();
  const policyParam = searchParams.get("policy");

  const [activeId, setActiveId] = React.useState<string>(policyParam || initialPolicy);
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);

  React.useEffect(() => {
    if (policyParam && LEGAL_DOCUMENTS.some((doc) => doc.id === policyParam)) {
      setActiveId(policyParam);
    }
  }, [policyParam]);

  const currentDoc = LEGAL_DOCUMENTS.find((d) => d.id === activeId) || LEGAL_DOCUMENTS[0];

  const handleSelectDoc = (id: string) => {
    setActiveId(id);
    setIsMobileNavOpen(false);
    window.history.pushState(null, "", `/pages/terms-of-sale?policy=${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div data-hide-dots="true" className="min-h-screen bg-[#f4f5f8] text-[#111] font-ntype82 select-text">
      <div className="w-full px-4 sm:px-8 pt-28 pb-16 sm:pt-32 sm:pb-20">
        {/* ─── Mobile Legal Selector Dropdown ───────────────────────── */}
        <div className="mb-5 lg:hidden">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-black mb-1 font-ntype82">
            LEGAL DOCUMENT
          </p>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="flex w-full items-center justify-between rounded-lg border border-black/15 bg-white px-3.5 py-2.5 text-left text-[14px] font-medium text-black shadow-sm"
            >
              <span>{currentDoc.sidebarLabel}</span>
              <ChevronDown className={`h-4 w-4 text-black transition-transform ${isMobileNavOpen ? "rotate-180" : ""}`} />
            </button>

            {isMobileNavOpen && (
              <div className="absolute left-0 right-0 z-30 mt-1 max-h-[380px] overflow-y-auto rounded-lg border border-black/15 bg-white py-1 shadow-xl">
                {LEGAL_DOCUMENTS.map((doc) => (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => handleSelectDoc(doc.id)}
                    className={`block w-full px-3.5 py-2 text-left text-[14px] font-ntype82 text-black transition-colors ${doc.id === activeId ? "bg-black text-white font-bold" : "hover:bg-black/5 font-normal"
                      }`}
                  >
                    {doc.sidebarLabel}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ─── Main Two-Column Layout ───────────────────────────────── */}
        <div className="grid gap-6 md:gap-8 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]">
          {/* ── Left Sidebar (Sticky on desktop) ───────────────────── */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-2">
              <h1 className="text-[32px] leading-[32px] mb-3 font-normal uppercase text-black font-ntype82-bold">
                LEGAL
              </h1>
              <nav className="space-y-1">
                {LEGAL_DOCUMENTS.map((doc) => {
                  return (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => handleSelectDoc(doc.id)}
                      className="block w-full text-left text-[15px] sm:text-[18px] leading-snug font-ntype82 font-[300] text-black transition-opacity cursor-pointer hover:opacity-75"
                    >
                      {doc.sidebarLabel}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* ── Right Content Area ─────────────────────────────────── */}
          <main className="min-w-0">
            <article>
              {/* Document Main Heading */}
              <div className="pb-4">
                <h1 className="text-[32px] leading-[32px] font-normal uppercase text-black font-ntype82-bold">
                  {currentDoc.title}
                </h1>
              </div>

              {/* Document Body */}
              <div className="max-w-4xl space-y-4 text-[16px] sm:text-[17px] md:text-[17.5px] leading-[1.7] text-black font-normal font-ntype82 [&_a]:text-[#04326f]">
                {currentDoc.content}
              </div>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}

export function TermsClient(props: TermsClientProps) {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#f4f5f8] pt-32 text-center text-xs font-mono text-black/50">
          LOADING...
        </div>
      }
    >
      <TermsClientInner {...props} />
    </React.Suspense>
  );
}

/* ══════════════════════════════════════════════════════════════════
   EXACT 100% OFFICIAL LEGAL DOCUMENTS DATA
══════════════════════════════════════════════════════════════════ */
const LEGAL_DOCUMENTS: LegalDocument[] = [
  // ─────────────────────────────────────────────────────────────
  // 1. PRIVACY POLICY
  // ─────────────────────────────────────────────────────────────
  {
    id: "privacy-policy",
    sidebarLabel: "Privacy Policy",
    title: "PRIVACY POLICY – NOTHING TECHNOLOGY",
    content: (
      <>
        <p className="text-[17px] text-black ">Updated Dec 30, 2025</p>
        <p>
          We take your privacy seriously and this Privacy Policy explains how Nothing Technology Limited or its affiliated companies (collectively, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collect, use, share and process your Personal Data when you are using our services, including our websites, products, apps and other Nothing services (collectively, &ldquo;<strong>Nothing Services</strong>&rdquo;). We are the &ldquo;data controller&rdquo; in respect of your Personal Data. <strong>For information that demands your particular notice and that may have a significant impact on your rights and interests, we have highlighted it in bold font to draw your attention.</strong>
        </p>

        <p>
          <strong>If you have any questions about this Privacy Policy, please contact us using the contact details provided at the end of this Privacy Policy.</strong>
        </p>

        <div className="pt-2">
          <p className="text-black mb-3">This Privacy Policy informs you of the following information:</p>
          <ol className="list-decimal pl-6 space-y-2 text-[16px]">
            <li>What is Personal Data</li>
            <li>How and when we collect Personal Data about you</li>
            <li>What Personal Data we collect</li>
            <li>How we use your Personal Data</li>
            <li>How do we process minor’s Personal Data</li>
            <li>Legal basis for processing your Personal Data</li>
            <li>How do we disclose your Personal Data</li>
            <li>How do we protect your Personal Data</li>
            <li>Data storage and transfer</li>
            <li>Your rights</li>
            <li>Third-party websites and services</li>
            <li>Changes to this Privacy Policy</li>
            <li>Contact us</li>
          </ol>
        </div>

        <section className="space-y-1.5 pt-2">

          <h1 className="text-[32px] leading-[32px] font-normal uppercase text-black font-ntype82-bold">
            1. What is Personal Data?
          </h1>
          <p>
            Personal Data is information that can be used to directly or indirectly identify you. Personal Data does not include data that has been irreversibly anonymized or aggregated so that it can no longer enable us, whether in combination with other information or otherwise, to identify you.
          </p>
        </section>

        <section className="space-y-1.5 pt-2">
          <h1 className="text-[32px] leading-[32px] font-normal uppercase text-black font-ntype82-bold">
            2. How and when we collect Personal Data about you
          </h1>
          <p>We collect and process Personal Data when you:</p>
          <ul className="list-disc pl-6 space-y-2.5">
            <li>
              visit our website (<a href="https://www.nothingcmf.pk/" className="underline underline-offset-2 hover:opacity-75">https://www.nothingcmf.pk/</a>) and use our products, apps and other Nothing services (including when registering and logging into your Nothing account, backing up or restoring your account information, binding your third party account with your Nothing account, leaving any reviews or comments, filling in forms such as when you sign up for newsletters or enter a competition, locate a store, or otherwise interact with us);
            </li>
            <li>
              purchase and/or activate any products or services from our website, device, and/or app (such as activate our software stability analyzing services, OTA services or participate in hearing test), download a software update, or subscribe to any of our services;
            </li>
            <li>contact our customer service or aftersales/support center or request information from us in any other way;</li>
            <li>participate in our customer satisfaction surveys, improvement program, or other market research, feedback and survey responses;</li>
            <li>communicate with us via social networking websites, third party apps or similar technologies;</li>
            <li>when you direct third parties to share data with us, for example, your mobile carrier.</li>
          </ul>
        </section>

        <section className="space-y-1.5 pt-2">
          <h1 className="text-[32px] leading-[32px] font-normal uppercase text-black font-ntype82-bold">
            3. What Personal Data we collect
          </h1>

          <h3 className="text-[17px] sm:text-[19px] font-bold text-black pt-2">Data you directly provide to us:</h3>
          <p>
            We and our third-party providers and business partners who enable us to operate our products, services and app, may collect and process the following Personal Data about you which you provide:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>contact details (such as your name, address, email address, phone number);</li>
            <li>device identifiers (such as IMEI and MAC address);</li>
            <li>IP address;</li>
            <li>basic information (such as your region, language and time zone);</li>
            <li>demographic information (such as age and/or other information that may identify you as an individual);</li>
            <li>account information (such as your nickname, avatar, password, account status, devices registered, and other authentication information);</li>
            <li>interaction with or responses to any customer satisfaction surveys or market research (unless these are provided anonymously);</li>
            <li>transactional information about purchases/redemption of products and services;</li>
            <li>financial and credit card information;</li>
            <li>your marketing preferences;</li>
            <li>voice data;</li>
            <li>system logs and usage-related technical information;</li>
            <li>product reviews;</li>
            <li>employment application information (such as contact information, CV, work permit status); and</li>
            <li>current location information (when you choose to locate Nothing store manually).</li>
          </ul>

          <h3 className="text-[17px] sm:text-[19px] font-bold text-black pt-3">Data generated during your use of Nothing Services</h3>
          <p>
            When you visit our website and app, purchase and/or activate a product or device, download a software update, or connect to our services, we may also collect information from you automatically, for example using cookies and other similar technologies. A cookie is a small file of letters and numbers that we may set on your device. Cookies generally only work with web browsers, but there are similar technologies that are used with apps.
          </p>
          <p>This type of information may include the following:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>type of device you use, your device&apos;s unique identifier (such as IMEI number), serial number or anonymized device ID;</li>
            <li>the IP address of your device, your operating system;</li>
            <li>usage information, product interaction, performance and diagnostic information, crash data and location information from the devices which you have purchased or on which you install or access our products or services;</li>
            <li>information about your use of our offerings, for example to distinguish you from other users of our app, to remember your preferences to help us to provide you with a good experience when you use our offerings and also information that allows us to improve them; and</li>
            <li>where available, our products and services may use GPS, your IP address, and other technologies to determine a device&apos;s approximate location to allow us to improve our products and services.</li>
          </ul>

          <h3 className="text-[17px] sm:text-[19px] font-bold text-black pt-3">Use of Cookies</h3>
          <p>
            We use cookies to provide, protect, and improve our products and services, such as by personalizing content, offering and measuring advertisements, understanding user behaviour, and providing a safer experience. Please note that the specific cookies we may use vary depending on the specific websites and services you use.
          </p>
          <p>The cookies we use fall into the following categories:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Session cookies:</strong> These allow our site to link your actions during a particular browser session. These expire each time you close your browser and do not remain on your device afterwards.</li>
            <li><strong>Persistent cookies:</strong> These are stored on your device in between browser sessions. They allow your preferences or actions across the site to be remembered. These will remain on your device until they expire, or you delete them from your cache.</li>
            <li><strong>Strictly necessary cookies:</strong> These cookies are essential for you to be able to navigate the site and use its features. Without these cookies, the services you have asked for could not be provided.</li>
            <li><strong>Performance cookies:</strong> These cookies collect information about how you use our site, e.g. which pages you go to most often.</li>
            <li><strong>Functionality cookies:</strong> These cookies allow the site to remember the choices you make (such as your user name, language, last action and search preferences) and provide enhanced, more personal features.</li>
            <li><strong>Advertising cookies:</strong> These cookies are used for advertising, including serving and rendering ads, personalising/targeting ads and measuring the effectiveness of ads.</li>
          </ul>
          <p>
            If you do not wish for cookies to be installed on your device, you can change the settings on your browser or device to reject cookies. Please note that, if you do set your internet browser to reject cookies or otherwise withdraw your consent in relation to cookies, you may not be able to access all of the functions of the site.
          </p>

          <h3 className="text-[17px] sm:text-[19px] font-bold text-black pt-3">Information we collect from third parties</h3>
          <p>
            We may obtain Personal Data about you from third parties. For example, if you log onto our app or website via your third party account (e.g. Apple, Google), we may receive information about you from these third-parties, such as your username, email address, and avatar. We are not responsible for the content or practices of third-parties. We urge you to read the privacy policies of any third-party websites, applications or social media platforms you choose to use.
          </p>
        </section>

        <section className="space-y-1.5 pt-2">
          <h1 className="text-[32px] leading-[32px] font-normal uppercase text-black font-ntype82-bold">
            4. How we use your Personal Data
          </h1>
          <p>We may process your Personal Data for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>to provide you with the information, products and services you have requested and send you marketing and advertising materials;</li>
            <li>to provide, improve, and develop our products and services;</li>
            <li>to communicate with you including in relation to a purchase or to offer you targeted advertisements and services (including if you enter a contest, or other promotion, we may use the Personal Data you provide to administer those programs);</li>
            <li>to process your transactions;</li>
            <li>for system administration purposes and for internal operations, including troubleshooting, testing, statistical and survey purposes, data analysis, user behavior analysis, research, and audits;</li>
            <li>to authenticate your access to our website, app, products and services and to distinguish you from other users (for example to remember your log-in details);</li>
            <li>to monitor your use of our website, app, products and services to improve the user experience and to ensure that content is presented in the most effective manner for you and for your device;</li>
            <li>to conduct marketing analysis to allow us to assess trends and the effectiveness of our advertising and marketing campaigns (including using your Personal Data to evaluate, analyse or predict certain personal aspects relating to you, such as your preferences, economic situation, interests, and/or location);</li>
            <li>to provide customer support and ensure we provide a good level of customer service;</li>
            <li>to personalize your services and communications where such options are available and you choose to use them;</li>
            <li>to notify you of any changes to our services;</li>
            <li>to provide voice-to-text functionality;</li>
            <li>promote safety and security, such as by monitoring fraud and investigating suspicious or potentially illegal activity or violations of our terms or policies;</li>
            <li>to ensure that our website, app, products and services are safe and secure; and</li>
            <li>to comply with applicable laws and regulations.</li>
          </ul>
          <p>
            If you no longer wish to receive email communications for marketing purposes, please contact us to opt-out or click the unsubscribe link within the email.
          </p>
        </section>

        <section className="space-y-1.5 pt-2">
          <h1 className="text-[32px] leading-[32px] font-normal uppercase text-black font-ntype82-bold">
            5. How do we process minor’s Personal Data
          </h1>
          <p>
            <strong>Our Nothing Services are mainly intended for adults. In order to protect the privacy and Personal Data of minors, we will obtain parental or legal guardian’s consent where the local laws in your country or region require before processing minors’ Personal Data. We will limit the types and scope of Personal Data collected from minors as much as possible and also limit the functions available to minors.</strong>
          </p>
          <p>
            <strong>If you are a parent or legal guardian of a minor, please ensure that you have read this Privacy Policy and are responsible for your child&apos;s activities before allowing your child to create his or her own Nothing account, use our device or apps.</strong>
          </p>
          <p>
            <strong>If you have questions on how we process minors’ Personal Data, please contact us using the contact details provided in “Contact Us”.</strong>
          </p>
        </section>

        <section className="space-y-1.5 pt-2">
          <h1 className="text-[32px] leading-[32px] font-normal uppercase text-black font-ntype82-bold">
            6. Legal basis for processing your Personal Data
          </h1>
          <p>
            We will only process your Personal Data where we have a legal basis to do so. The legal basis will depend on the purposes for which we have collected and use your Personal Data. In almost every case the legal basis will be one of the following:
          </p>
          <ul className="list-disc pl-6 space-y-2.5">
            <li><strong>Consent:</strong> For example, where you have provided your consent to receive certain marketing from us. You can withdraw your consent at any time, including by clicking on the &ldquo;unsubscribe&rdquo; link at the bottom of any marketing email we send you.</li>
            <li><strong>Our legitimate business interests:</strong> Where it is necessary for us to understand our customers, promote our services and operate effectively provided in each case that this is done in a legitimate way which does not unduly affect your privacy and other rights. For example, we will rely on this legal basis when we conduct certain market analysis to understand our customers in sufficient detail so we can create new services and improve the profile of our brand.</li>
            <li><strong>Performance of a contract with you (or in order to take steps prior to entering into a contract with you):</strong> For example, where you have purchased a product from us and we need to use your contact details and payment information in order to process your order and send the product to you.</li>
            <li><strong>Compliance with law:</strong> Where we are subject to a legal obligation and need to use your Personal Data in order to comply with that obligation.</li>
          </ul>
        </section>

        <section className="space-y-1.5 pt-2">
          <h1 className="text-[32px] leading-[32px] font-normal uppercase text-black font-ntype82-bold">
            7. How do we disclose your Personal Data
          </h1>
          <p>
            We make certain Personal Data available to strategic partners that work with us to provide our products and services or help us market to customers. Personal Data will only be shared by us with these companies in order to provide or improve our products, services, and advertising; it will not be shared with third parties for their own marketing purposes without your prior express consent.
          </p>
          <p>We may disclose your Personal Data to other third parties in the following cases:</p>
          <ul className="list-disc pl-6 space-y-2.5">
            <li>for the purposes of research, evaluation, and analysis;</li>
            <li><strong>if you choose to use the product or services provided a third party.</strong> For example, if you choose to participate in the hearing test within the Nothing X app, we make certain Personal Data available to our third-party partner Mimi Hearing Technologies GmbH to provide you with personalized sound function. If you choose to use Essential Voice, we make certain Personal Data available to our third-party partner Microsoft Azure to provide you with real-time speech-to-text processing.</li>
            <li><strong>in the event that we sell any business or assets,</strong> in which case we may disclose your Personal Data to the prospective buyer of such business or assets;</li>
            <li><strong>if we or substantially all of our assets are acquired by a third party,</strong> in which case Personal Data held by us about our customers and visitors to our websites will be one of the transferred assets;</li>
            <li>if we are under a duty to disclose or share your Personal Data in order to <strong>comply with any legal or regulatory obligation or request;</strong> or</li>
            <li><strong>to protect the rights, property or safety of us or our users, or others, and in order to enforce or apply our terms and conditions</strong> (this includes exchanging information with other companies and organisations for the purposes of fraud protection and credit risk reduction).</li>
          </ul>
        </section>

        <section className="space-y-1.5 pt-2">
          <h1 className="text-[32px] leading-[32px] font-normal uppercase text-black font-ntype82-bold">
            8. How do we protect your Personal Data
          </h1>
          <p>
            We use appropriate technical and organizational measures to protect your Personal Data that we collect and process. The measures we use are designed to provide a level of security appropriate to the risk of processing your Personal Data. <strong>Please be aware and understand that we cannot ensure an absolute secure network. If you find that your Personal Data are breached, please contact us immediately using the contact details provided in “Contact Us” of this Privacy Policy so that we can take the corresponding measures.</strong>
          </p>
          <p>
            <strong>In the event of any accident, force majeure event or other circumstances leading to the breach of your Personal Data, we will make every effort to control the situation and promptly inform you of the cause, the security measures we have taken and you can take, and other relevant information when required by the applicable laws and regulations. In the event of a security incident related to Personal Data, we will report to the competent authorities in accordance with the requirements of the applicable laws and regulations, promptly investigate the problem, and take the corresponding remedial measures.</strong>
          </p>
        </section>

        <section className="space-y-1.5 pt-2">
          <h1 className="text-[32px] leading-[32px] font-normal uppercase text-black font-ntype82-bold">
            9. Data storage and transfer
          </h1>
          <h3 className="text-[17px] sm:text-[19px] font-bold text-black pt-1">Cross-border transfer</h3>
          <p>
            The Personal Data that we collect may be transferred to, and stored at, a destination outside the EEA or the UK, including countries, which have less strict, or no data protection laws, when compared to those in the EEA or the UK. Whenever we transfer your information in this way, we will take steps which are reasonably necessary to ensure that adequate safeguards are in place to protect your Personal Data and to make sure it is treated securely and in accordance with this Privacy Policy. In these cases, we rely on approved data transfer mechanisms (such as standard contractual clauses) to ensure your information is subject to adequate safeguards in the recipient country. If you are located in the UK or the EEA, you may contact us for a copy of the safeguards which we have put in place to protect your Personal Data and privacy rights in these circumstances.
          </p>

          <h3 className="text-[17px] sm:text-[19px] font-bold text-black pt-2">Retention period</h3>
          <p>
            We will store your Personal Data to the extent as necessary for the proper business needs of our company (e.g., for the purposes of providing service to you and complying with the requirements of laws, tax and finance), except as provided otherwise by applicable laws or regulations. When there is no such need to use your Personal Data or the retention period expires according to applicable laws or regulations, we will delete or anonymize your Personal Data.
          </p>
        </section>

        <section className="space-y-1.5 pt-2">
          <h1 className="text-[32px] leading-[32px] font-normal uppercase text-black font-ntype82-bold">
            10. Your rights
          </h1>
          <p>
            <strong>You have certain rights in relation to your Personal Data. These include: the right to object to the processing of your information for certain purposes, the right to access your Personal Data, the right to correct your Personal Data, the right to delete your Personal Data, the right to file a complaint, the right to withdraw your consent, right related to automated decision making and the ability to erase, restrict or receive a machine-readable copy of your Personal Data.</strong>
          </p>
          <p>
            We will handle any request to exercise your rights in accordance with applicable law and any relevant legal exemptions. If you wish to exercise any of these rights please contact us using the contact details below.
          </p>
          <p>
            You may also lodge a complaint with the data protection authority regarding the processing of your Personal Data if you think we have processed your Personal Data in a manner which is unlawful or breaches your rights. If you have such concerns we request that you initially contact us (using the contact details below) so that we can investigate, and hopefully resolve, your concerns.
          </p>
        </section>

        <section className="space-y-1.5 pt-2">
          <h1 className="text-[32px] leading-[32px] font-normal uppercase text-black font-ntype82-bold">
            11. Third-party websites and services
          </h1>
          <p>
            When a customer operates a link to a third-party website that has a relationship with us, we do not assume any obligation or responsibility for such policy because of the third party&apos;s privacy policy. Our websites, products, and services may contain links to or the ability for you to access third-party websites, products, and services. We are not responsible for the privacy practices employed by those third parties, nor are we responsible for the information or content their products and services contain. This Privacy Policy applies solely to data collected by us through our products and services. We encourage you to read the privacy policies of any third party before proceeding to use their websites, products, or services. Certain services accessible through our platform are provided directly by third parties, who act as independent data controllers. In particular:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Lock Glimpse:</strong> Vilykke provides lock screen wallpaper services;</li>
            <li><strong>App recommendation:</strong> Unity Technologies SF. provides personalized app recommendation services;</li>
            <li><strong>Games:</strong> Google LLC provides game services.</li>
          </ul>
          <p>
            When you choose to use these services, your personal data may be collected and processed directly by the relevant third-party provider. Such collection and processing are carried out under the sole responsibility of the respective third party, in accordance with its own privacy policy. For further details on how these third parties handle your personal data, please refer to their respective privacy policies:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Vilykke Privacy Policy available at:{" "}
              <a href="https://policies.vilykke.com/Privacy.html?lan=en&con=EN&ch=nt_cmf_android_phone_202506" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-75">
                Vilykke Privacy Policy
              </a>
            </li>
            <li>
              Unity Privacy Policy available at:{" "}
              <a href="https://assetscdn.isappcloud.com/legal/Generic%20V3//nothingpp.html" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-75">
                Unity Privacy Policy
              </a>
            </li>
            <li>
              Google Privacy Policy available at:{" "}
              <a href="https://policies.google.com/privacy?hl=en-US" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-75">
                Google Privacy Policy
              </a>
            </li>
          </ul>
          <p>
            Please note that these policies are provided and maintained solely by the relevant third-party service providers. We are not responsible for their content or practices.
          </p>
        </section>

        <section className="space-y-1.5 pt-2">
          <h1 className="text-[32px] leading-[32px] font-normal uppercase text-black font-ntype82-bold">
            12. Changes to this Privacy Policy
          </h1>
          <p>
            We may periodically change this Privacy Policy to keep pace with new technologies, industry practices, and regulatory requirements, among other reasons. The new privacy notice will be displayed on our website and app.
          </p>
        </section>

        <section className="space-y-1.5 pt-2">
          <h1 className="text-[32px] leading-[32px] font-normal uppercase text-black font-ntype82-bold">
            13. Contact us
          </h1>
          <p>If you have any questions regarding this Privacy Policy or its implementation, here is how you can reach us:</p>
          <p>
            Email Address:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-2 hover:opacity-75">
              {CONTACT_EMAIL}
            </a>{" "}
          </p>
          <p>We will respond to your inquiry within 30 days.</p>
        </section>
      </>
    ),
  },

  // ─────────────────────────────────────────────────────────────
  // 2. NOTHING CONTEST TERMS & CONDITIONS (100% EXACT LIVE DATA)
  // ─────────────────────────────────────────────────────────────
  {
    id: "contest-terms",
    sidebarLabel: "Nothing Contest Terms & Conditions",
    title: "NOTHING CONTEST TERMS & CONDITIONS",
    content: (
      <>
        <p>
          When you enter (&ldquo;Submission&rdquo;) an official Nothing Contest (&ldquo;Contest&rdquo;), you agree to abide by, and be bound by, these Nothing Contest Terms &amp; Conditions (&ldquo;Terms&rdquo;) below. Nothing reserves the right to refuse to award the Prize (as hereinafter defined) to anyone in breach of these Terms.
        </p>

        <ol className="list-decimal pl-5 space-y-1.5">
          <li>
            Sponsor. The sponsor of the Contest is Nothing Technology Limited (along with its affiliates, agents, and licensed assigns, hereinafter referred to as &ldquo;Nothing&rdquo;), an English company with offices at 21A John Street, Bedford House, London, WC1N 2BF.
          </li>

          <li>
            Contest Terms. Nothing will communicate the details of participation in the Contest through its designated online Contest website page (&ldquo;Website&rdquo;). The Contest is free to enter and no purchase is necessary.
            <ol className="list-[lower-alpha] pl-6 space-y-2 mt-2">
              <li>Official communication regarding a Contest made through the Website shall be incorporated into these Terms by reference.</li>
              <li>Should there be a conflict between any instructions on the Website and these Terms, these Terms shall prevail and control the Contest.</li>
              <li>Nothing reserves the right to amend these Terms and/or the terms of a Contest at any time or to suspend or cancel the Contest without penalty.</li>
              <li>Nothing reserves the right to exclude or disqualify at any time a Participant (as hereinafter defined) from the Contest if a breach of the prescribed Terms and/or terms of the Contest is proven.</li>
            </ol>
          </li>

          <li>
            How to Enter. Contest participants (&ldquo;Participant(s)&rdquo; or &ldquo;you&rdquo;) must be at least eighteen (18) years of age at the time of participation and may enter the Contest by following the process designated on the Website. As a Participant, you represent and warrant that you are at least eighteen (18) years of age. To be eligible to win, Participants must make their Submissions through the prescribed process as detailed on the Website before the end date of the Contest.
          </li>

          <li>
            Process: To participate in the Contest and attempt to win a Prize (as hereinafter defined), Participants shall follow the steps below:
            <ol className="list-[lower-alpha] pl-6 space-y-2 mt-2">
              <li>Please enter through the channel prescribed on the Website.</li>
              <li>Follow the instructions as detailed on the Website for participation in the Contest.</li>
              <li>
                To enter the Contest you must have a mobile phone or other wireless or electronic device that supports internet access. Normal internet access and data usage charges imposed by your carrier or online service will apply. You must have a valid email address to enter the Contest. Please note that Nothing is not responsible for computer or network problems, problems with the platform or its servers, problems with email accounts, or the failure to receive any Submission for any reason whatsoever. Nothing accepts no responsibility for Contest entries that are not successfully completed, lost, or delayed in transit due to any technical malfunction, systems, satellite, network, server, computer hardware, software or any other equipment failure. Nothing will not accept Contest entries that are: automatically generated by computer, completed by third parties or in bulk, illegible, have been altered, reconstructed, forged or tampered with, photocopies and not originals, or incomplete. There is a limit of one entry per person. Entries on behalf of another person will not be accepted and joint Submissions are not allowed.
              </li>
            </ol>
          </li>

          <li>
            Eligibility.
            <ol className="list-[lower-alpha] pl-6 space-y-2 mt-2">
              <li>
                Subject to Nothing’s reasonable discretion, the Contest is open to individuals over the age of eighteen (18) residing in any eligible region throughout the World (&ldquo;Territory&rdquo;). Due to legal restrictions, Nothing is unable to accept Submissions from Sudan, North Korea, Syria, Iran, Cuba, the Crimea region, or any other countries/regions which may be subject to export controls or sanctions at the time of the Contest. By entering the Contest, you represent and warrant that you are not subject to any blacklists or sanctions of relevant countries, including, without limitation, the United States, the United Kingdom, and the European Union and that you are in full compliance with applicable export control laws and regulations.
              </li>
              <li>In entering the Contest, you confirm that you are eligible to do so and eligible to claim any Prize you may win. Nothing may require you to provide proof that you are eligible to enter the Contest.</li>
              <li>Should shipping to a Participant’s address be excessively difficult or expensive, Nothing may, at its reasonable discretion, nominate an alternative winner.</li>
            </ol>
          </li>

          <li>
            Winner Selection. One or more Participants will be selected as winner(s) in accordance with the process designated on the Website (&ldquo;Winner(s)&rdquo;). Nothing’s decision regarding any aspect of the Contest is final and no correspondence or discussion will be entered into about it.
          </li>

          <li>
            Prohibited Content. If Participants are submitting content, Nothing, its officers, directors, employees, affiliates, agents, successors, and authorized licensees and assigns shall in no case be liable for the contents of any Submissions or misbehaviour by Participants during the Contest. Participants shall use good taste and judgment in participating in the Contest. Each Participant shall be solely responsible for ensuring that their participation and/or Submission:
            <ol className="list-[lower-alpha] pl-6 space-y-2 mt-2">
              <li>Does not offend or infringe upon the intellectual rights of third parties;</li>
              <li>Is free from obscenity or content that may be seen as harassment, intimidation, or bullying;</li>
              <li>Complies with all data protection and privacy laws;</li>
              <li>Complies with any and all other applicable laws;</li>
              <li>Is free from viruses or malware; and</li>
              <li>Is not otherwise inappropriate.</li>
            </ol>
          </li>

          <li>
            Rights to Content. By making a Submission, each Participant agrees to irrevocably assign to Nothing and its affiliates all rights to the Contest, including the right to record, edit, modify, reproduce, distribute, transmit, publish, communicate to the public, broadcast, perform, display, or otherwise use the Submission, in whole or in part, with or without modifications, in any form or medium, including but not limited to, internet, print, point of sale advertising, flyers, leaflets, for entertainment, promotional and/or advertising purposes and/or any other purpose whatsoever. To the greatest extent permitted by law, Participants agree to waive and not to assert or invoke any so-called moral rights in relation to their Submissions. Any intellectual property created pursuant to the Contest shall be the exclusive property of Nothing and Participants shall not challenge Nothing’s ownership. Nothing herein shall be deemed to license or assign any of Nothing’s intellectual property to Participants.
          </li>

          <li>
            Prize. Nothing may grant prize(s) (&ldquo;Prize(s)&rdquo;) to the Contest Winner(s). Subject to applicable laws and regulations, Nothing reserves the right to cancel or change the Prize or disqualify any Winner at its absolute discretion. The Prize will be as communicated by Nothing to the Winner(s). All Prizes are subject to availability and void where prohibited.
          </li>

          <li>
            Not included in the Prize. The Winner shall be solely responsible for any taxes associated with collection of the Prize, including, without limitation, personal income taxes. Nothing shall also not be responsible for any of the following:
            <ol className="list-[lower-alpha] pl-6 space-y-2 mt-2">
              <li>Expenses related to collection of the Prize;</li>
              <li>Lost income related to attendance of an event in connection to the Contest and/or Prize;</li>
              <li>Reimbursement of any expenses incurred in the creation of your Submission; and</li>
              <li>Any travel expenses that Nothing has not agreed to cover in advance in writing;</li>
              <li>Any income or other taxes payable by a Winner;</li>
              <li>Any other costs or expenses not explicitly agreed to in writing in advance by Nothing.</li>
            </ol>
          </li>

          <li>
            Restrictions.
            <ol className="list-[lower-alpha] pl-6 space-y-2 mt-2">
              <li>Participants must submit original, valid Submissions to the Contest and adhere at all times to these Terms and the Contest instructions as detailed on the Website.</li>
              <li>Participants may not nominate any third party to play on their behalf or use any software which may create an unfair advantage. Joint Submissions are not allowed.</li>
              <li>Participants must also at all times comply with all applicable laws, these Terms, and any and all applicable regulations.</li>
              <li>Nothing reserves the right to disqualify Participants who violate these Terms.</li>
            </ol>
          </li>

          <li>
            Notification/Announcement of Winner. The Winner(s) will be selected in accordance with the timeline stated on the Website and will be notified in writing by Nothing. The Winner must confirm his or her acceptance of the Prize in writing within the time period stated on the Website. Nothing reserves the right to disqualify any Winner who does not confirm acceptance of the Prize in accordance with these Terms and reserves the right to select an alternative Participant as the Winner in such event. In the event of a dispute about the identity of a Winner, Nothing will award the Prize to a runner-up Participant. Nothing reserves the right to not award a Prize. Under the Advertising Standards Authority (ASA) requirements, Nothing must either publish or make available information that indicates that a valid award of the Prize took place. To comply with this obligation, Nothing will send the surname and county of a Prize Winner to anyone who contacts Nothing using the details set out in the Terms within one month after the closing date of a Contest. If a Winner objects to their surname and/or county being published or made available, they should notify Nothing of this when responding to the notification email to claim their Prize. In such circumstances Nothing must still provide the information to the ASA, if requested.
          </li>

          <li>
            Prize Conditions. Except as required under applicable law, the Prize will be as referenced in these Terms and is provided as-is with no express or implied warranty or guarantee. This Contest is subject to applicable local laws and regulations, including, without limitation, tax laws. Nothing may require the Winner to sign and return an affidavit of eligibility, a liability release, and a publicity release permitting Nothing to use the Winner’s name, image, and winning Submission in promotional materials where permitted by law and subject to applicable Terms and/or terms. Refusal or inability to sign and return such forms within forty-eight (48) hours of receipt may result in disqualification and the awarding of the Prize to alternate Winner(s).
          </li>

          <li>
            General Liability Release. By entering this Contest, Participants release Nothing, its employees, agents, affiliates, and assigns from any liability whatsoever, on any theory, and waive any and all claims and causes of action arising from or related to this Contest and/or fulfilment and/or use of the Prize, to the extent permitted by applicable law. However, nothing in these Terms limits or excludes any person’s or entity’s liability for death or personal injury caused by their negligence or any other liability which may not be limited as a matter of law. Nothing will not be liable for any delay or failure to comply with its obligations for reasons beyond its reasonable control arising from but not limited to Acts of God, global or regional epidemic or pandemic, adverse weather conditions, fire, industrial dispute, war, terrorist activity, hostilities, political unrest, riots, civil commotion, plague or other natural calamities, or any other circumstances beyond Nothing’s control.
          </li>

          <li>
            Data. By entering the Contest and submitting a Submission and any other personal information, Participants are expressly consenting to the processing of their personal information by Nothing for the purpose of the Contest or any associated publicity by Nothing or its affiliates. Nothing’s <a href="https://www.nothingcmf.pk/pages/terms-of-sale" className="underline underline-offset-2 hover:opacity-75">Privacy Policy</a> will apply. Nothing may share the Submissions with partners and authorized licensees for Contest administration and Prize fulfilment purposes.
            <ol className="list-[lower-alpha] pl-6 space-y-2 mt-2">
              <li>The Participant consents to his/her Personal Data being transferred, stored (both electronically and manually) by Nothing to Nothing and its business partner(s) located outside of the European Economic Area or area of residence for the purposes of maintaining records of the Contest and developing Contest-related external marketing materials (&ldquo;Materials&rdquo;). The Participant hereby agrees that such usages shall constitute legitimate business needs for Nothing.</li>
              <li>The Participant further acknowledges and agrees that his/her participation in the Contest may result in his or her name, social media handle and other personal data (&ldquo;Personal Data&rdquo;, as defined below) being announced publicly. The Participant hereby waives any and all objections to such disclosures in the Materials.</li>
              <li>For the purposes of this Agreement, &ldquo;Personal Data&rdquo; may include, but is not limited to email address, name, birthdate, passport or ID number, home address, contact information, region of residence, likeness or appearance. Nothing and its partners shall retain the Participant’s Personal Data only as long as it may be needed.</li>
              <li>The Participant acknowledges that collection and processing of the Personal Data listed in Section 15(b) and (c) for the uses described herein shall constitute a legitimate business need of Nothing.</li>
              <li>Nothing undertakes to ensure that it and its partners will take appropriate measures to protect Participants’ Personal Data and use Participants’ Personal Data only for the purposes described in this Agreement. Both Data Controller(s) and Data Processor(s) shall sign data processing agreements (DPAs) to meet the European Union’s requirements with respect to data processing.</li>
            </ol>
          </li>

          <li>
            Interpretation and Disputes. Participants agree:
            <ol className="list-[lower-alpha] pl-6 space-y-2 mt-2">
              <li>To be bound by these Terms and all decisions of the judges (if applicable), which are final and binding.</li>
              <li>That the Terms shall be governed by the laws of England and Wales (or by mandatory local laws, if applicable), without regard to conflict of law principles. The courts of London shall have exclusive jurisdiction for any disputes. That they consent and waive any objection to the jurisdiction of said tribunals for any such disputes.</li>
              <li>The Terms shall be written and construed in the English language. Any translation shall not be the official version. In the event of any conflict, the English version shall prevail.</li>
              <li>Nothing reserves the right of interpretation with respect to these Terms. Should there exist any conflict between these Terms and any other communication, including but not limited to the Website, communication, email, public statements by Nothing employees/agents, or any other form of communication, these Terms shall prevail.</li>
            </ol>
          </li>

          <li>
            Confidentiality. Each Participant agrees to keep in strict confidence any Nothing Confidential Information they may encounter during the course of their participation in the Contest. &ldquo;Confidential Information&rdquo; includes, without limitation, the names and Personal Data of Nothing employees and agents, names and Personal Data of other Participants; information about current, future and potential products; financial information; unreleased marketing campaigns; business methods; information marked as &ldquo;Confidential&rdquo;; and any other information reasonably expected to be kept confidential under the circumstances. Participants shall not disclose, disseminate, transfer, copy, exploit, or otherwise make use of such Confidential Information without Nothing’s express written consent. Exception may be made for Confidential Information that becomes available through no fault of the Participant or is disclosed pursuant to an order from a court or other government body of competent jurisdiction, provided that the Participant notifies Nothing in advance and takes reasonable steps to limit any further disclosure.
          </li>

          <li>
            Miscellaneous.
            <ol className="list-[lower-alpha] pl-6 space-y-2 mt-2">
              <li>
                Void Where Prohibited. The Contest is void where prohibited:
                <ul className="list-disc pl-6 space-y-1.5 mt-1.5">
                  <li>If any provision or part-provision of these Terms is held by a court of competent jurisdiction to be invalid, illegal or unenforceable, it shall be deemed modified to the minimum extent necessary to make it valid, legal and enforceable.</li>
                  <li>If such modification is not possible, the relevant provision or part-provision shall be deemed deleted. Any modification to or deletion of a provision or part-provision under this clause shall not affect the validity and enforceability of the rest of these Terms.</li>
                  <li>To the extent permitted by applicable law, Nothing may suspend, modify or terminate the Contest if it believes, in its sole discretion, that malfunction, error, disruption or damage is impairing or will impair the administration, security, fairness, integrity or proper conduct of the Contest, in which case the Prize(s) will be awarded among the eligible Submissions received that were unaffected by the problem, if possible.</li>
                </ul>
              </li>
              <li>
                Sanctions/Export Control. Nothing’s products may be subject to US export control laws and any applicable export control laws including the export control laws of the European Union, the United Kingdom, and any other relevant jurisdictions. You shall not, directly or indirectly, export, re-export, or release the Products to, or make them accessible from, any jurisdiction or country to which export, re-export, or release is prohibited by applicable laws, these Terms, or any and all applicable regulations. You shall comply with all applicable laws (including federal laws), regulations, and these Terms, and complete all required undertakings.
              </li>
              <li>
                Non-discrimination. Nothing conducts the Contest in accordance with all relevant equality and anti-discrimination law (whether in relation to race, sex, gender reassignment, age, disability, sexual orientation, religion or belief, pregnancy, maternity or otherwise).
              </li>
              <li>
                Relationship Amongst the parties. Notwithstanding anything to the contrary contained in these Terms, the relationship between the Participant and Nothing is on a principal-to-principal basis and nothing in this Agreement will be construed as creating a partnership, joint venture, association of persons, or employment/agency relationship between the parties. The Participant shall not have any right to obligate or bind Nothing, or vice versa, in any manner whatsoever. Nothing contained in this Agreement shall give any rights of any kind to any third parties, whatsoever.
              </li>
              <li>
                Entire Agreement. These Terms, together with any and all exhibits, annexures, and schedules, or amendments made by Nothing in writing, constitutes the entire understanding and agreement in relation to the subject matter hereof and supersedes all other agreements, understandings and representations made by either Party, prior to execution of this Agreement, whether verbal or written.
              </li>
              <li>
                Severability. Each term and provision of these Terms shall be valid and enforceable to the fullest extent permitted by law and any invalid, illegal or unenforceable term or provision shall be deemed replaced by a term or provision that is valid and enforceable and that comes closest to expressing the intention of the invalid, illegal or unenforceable term or provision.
              </li>
            </ol>
          </li>
        </ol>
      </>
    ),
  },

  // ─────────────────────────────────────────────────────────────
  // 3. TERMS OF SALES (100% EXACT LIVE UNABRIDGED DATA)
  // ─────────────────────────────────────────────────────────────
  {
    id: "terms-of-sales",
    sidebarLabel: "Terms of Sales",
    title: "TERMS OF SALES",
    content: (
      <>
        <h1 className="text-[32px] leading-[32px] font-normal  text-black font-ntype82-bold">General</h1>
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>
            <strong>What these terms cover.</strong> These Terms of Sale set out the terms and conditions on which we supply Products you purchase from us to you. By placing an order or making a purchase from our website, you agree to the terms below.
          </li>
          <li>
            <strong>Why you should read them.</strong> Please read these Terms of Sale carefully before you submit your order to us. These Terms of Sale tell you who we are, how we will provide Products to you, how you and we may change or end the contract, what to do if there is a problem and other important information.
          </li>
          <li>
            <strong>Who we are.</strong> We are Nothing Technology Limited, a company incorporated under the laws of England and Wales (No. 12984564), with registered offices at Bedford House, 21A John Street, London WC1N 2BF, United Kingdom.
          </li>
          <li>
            References in these Terms of Sale to: (1) &ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;, &ldquo;seller&rdquo; or &ldquo;Nothing&rdquo; shall mean Nothing Technology Limited; (2) &ldquo;Products&rdquo; shall mean mobile handsets and accessories made available for sale by us on the website{" "}
            <a href="https://www.nothingcmf.pk/" className="underline underline-offset-2 hover:opacity-75">https://www.nothingcmf.pk/</a>; and (3) &ldquo;you&rdquo;, &ldquo;your&rdquo; or the &ldquo;customer&rdquo; shall mean the person purchasing the Products.
          </li>
          <li>
            <strong>How to contact us.</strong> You can contact us by using the details set out in the Contact Support section of the website at{" "}
            <a href="https://www.nothingcmf.pk/" className="underline underline-offset-2 hover:opacity-75">https://www.nothingcmf.pk/</a>{" "}
            if you would like further information or if you think that there is a mistake in these Terms of Sale.
          </li>
          <li>
            <strong>How we may contact you.</strong> If we have to contact you, we will do so by telephone or by writing to you at the email address or postal address you provided to us in your order.
          </li>
          <li>
            <strong>&ldquo;Writing&rdquo; includes emails.</strong> When we use the words &ldquo;writing&rdquo; or &ldquo;written&rdquo; in these Terms of Sale, this includes emails.
          </li>
          <li>
            <strong>&ldquo;Business Day&rdquo;</strong> means any day other than a Saturday, Sunday, or national public holiday in your country of residence. Please note that operations may be affected by additional delays during public bank holidays and major holiday periods, including Spring Festival and National Day Golden Week, as well as the Christmas and New Year period, during which fulfillment, customer service, and shipping services may be temporarily limited.
          </li>
        </ol>

        <h1 className="text-[32px] leading-[32px] font-normal  text-black font-ntype82-bold pt-4">Contract for the Purchase of Product(s)</h1>
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>
            <strong>How you place an order.</strong> By placing an order using the online check out process on our website, you are making an offer to us to buy the selected Product(s). Once we receive your order, you will receive an &ldquo;Order Confirmation Email&rdquo; from us.
          </li>
          <li>
            <strong>How we accept your order.</strong> Your offer to purchase Products will be considered by us and will be accepted upon the earlier of: (i) you receiving an email notifying you that your order has been dispatched; or (ii) delivery of the Product(s). The order will not be accepted until this point.
          </li>
          <li>
            <strong>If we cannot accept your order.</strong> If we are unable to accept your order, we will inform you of this and will not charge you for the Product(s). If you have already been charged for the Product(s), we will refund you. Whilst this is not an exhaustive list, we might decline your order because:
            <ol className="list-[lower-roman] pl-6 space-y-1.5 mt-2">
              <li>the Product is out of stock;</li>
              <li>the Product has been discontinued;</li>
              <li>there is a price fluctuation or we have identified an error in the price or description of the Product;</li>
              <li>we are unable to obtain authorisation for your payment, or we do not receive payment;</li>
              <li>a credit reference we have obtained for you does not meet our minimum requirements; and/or</li>
              <li>we have reason to suspect fraud.</li>
            </ol>
          </li>
          <li>
            <strong>Notification.</strong> If we are unable to accept your order, we will cancel your order, notify you of the cancellation, and refund any money you have paid toward the order for the Product(s) in a timely manner.
          </li>
          <li>
            <strong>Limited Liability.</strong> Unless provided for otherwise under applicable law, a refund of money you have paid towards an order will be the full extent of Nothing’s liability for any cancelled order.
          </li>
          <li>
            <strong>Your order number.</strong> For orders that have been accepted, we will assign an order number to your order and tell you what the order number is when we accept your order. If you need to contact us about your order, it will help us if you can tell us the order number whenever you contact us about your order.
          </li>
          <li>
            <strong>Order Confirmation.</strong> We reserve the right to refuse or cancel any order, or to limit quantities available for purchase, at our sole discretion and for any reason, including after an order has been submitted. We may also require additional information to verify your identity or payment method prior to processing any order. Your receipt of an order confirmation email does not mean that we’ve accepted your order or confirmed a sale. It confirms only that your order has been received. Our binding commitment to sell arises only once the order has been dispatched. If an order is cancelled after payment has been received, we will issue a full refund.
          </li>
          <li>
            <strong>Quantity Limitations.</strong> To ensure fair access and manage supply constraints, we reserve the right to limit the quantity of certain Products available for purchase. We may apply or adjust these limitations at any time, including after an order has been placed. If we are unable to fulfill your order due to Product unavailability, the affected portion of your order will be cancelled and we will refund the corresponding payment in full.
          </li>
        </ol>

        <h1 className="text-[32px] leading-[32px] font-normal  text-black font-ntype82-bold pt-4">Prices and Payments</h1>
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>
            <strong>Prices of Products.</strong> The price of the Products will be those displayed on our website at checkout where there is an inadvertent pricing error. We reserve the right to change the price of any Product and to correct any inadvertent pricing errors.
          </li>
          <li>
            <strong>Charges and transaction fees.</strong> Product prices exclude shipping charges (further details about shipping charges can be found on our website) and any transaction fees (for which we are not responsible).
          </li>
          <li>
            <strong>Credit or debit cards.</strong> If you are paying for your order with an international credit or debit card, the price displayed in your card statement may vary based on exchange rates. Your bank or card issuer may also charge additional foreign conversion charges and fees, which may increase the overall cost of your purchase. You should contact your bank or card issuer for further information about this before placing any order on our website.
          </li>
          <li>
            <strong>Electronic processing.</strong> The personal information you provide when making a purchase will be processed electronically by Nothing for the payment of the order and for anti-fraud control.
          </li>
          <li>
            <strong>Third-party payment partners and encryption.</strong> Payments on <a href="https://www.nothingcmf.pk/" className="underline underline-offset-2 hover:opacity-75">https://www.nothingcmf.pk/</a> and all related domains are handled by third-party payment partners and transmitted using the Secure Sockets Layer protocol (&ldquo;SSL&rdquo;) with 2048-bit encryption. Nothing does not store or have access to your payment details. Your credit/debit card information is retained via our third-party payment partner’s servers.
          </li>
          <li>
            <strong>Price Changes.</strong> If we reduce the price of any Product within seven (7) calendar days from the date you receive it, you may receive a one-time refund or store credit for the difference between the price you paid and the Product’s current selling price. To be eligible, you must contact our Support team within seven (7) days of delivery and provide proof of purchase. Price adjustments are issued at our sole discretion and apply only to purchases made directly through our official website. This policy excludes limited-time promotions, special sales events, flash sales, clearance items, and third-party marketplace purchases.
          </li>
        </ol>

        <h1 className="text-[32px] leading-[32px] font-normal  text-black font-ntype82-bold pt-4">Our Products</h1>
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>
            <strong>Products may vary slightly from their pictures.</strong> The images of the Products on our website are for illustrative purposes only. Although we have made every effort to display the images of the product on our website accurately, your Product may vary slightly from those images (for example, there may be a slight variation in the Product colour).
          </li>
          <li>
            <strong>Product packaging may vary.</strong> The packaging of the Product may vary from that shown in images on our website.
          </li>
        </ol>

        <h1 className="text-[32px] leading-[32px] font-normal  text-black font-ntype82-bold pt-4">Risk and Title</h1>
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>
            <strong>When you become responsible for the Product(s).</strong> Please note that you will be responsible for the Product(s) from the point at which the Product(s) is delivered to the address you have specified or the point at which you collect the Product(s).
          </li>
          <li>
            <strong>When you own the Product(s).</strong> You will own the Product(s) once we have received payment in full.
          </li>
        </ol>

        <h1 className="text-[32px] leading-[32px] font-normal  text-black font-ntype82-bold pt-4">Warranty Policy</h1>
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>
            <strong>Limited Warranty.</strong> Nothing Products, as specified in the table below, that were purchased on our official website are covered by Nothing’s limited warranty which starts from the date of delivery (the &ldquo;<strong>Limited Warranty</strong>&rdquo;).
          </li>
          <li>
            <strong>Product Defects.</strong> The Limited Warranty covers the hardware components of our Product(s) as originally supplied and Product defects caused by workmanship or build materials. The Limited Warranty does not cover any of the matters listed in the Limited Warranty Exclusions section.
          </li>
          <li>
            <strong>Original country.</strong> The Limited Warranty is only redeemable within your original country or region of purchase.
          </li>
          <li>
            <strong>Warranty Claims.</strong> To make a claim, please provide your original proof of purchase (such as your receipt(s) or invoice(s)), Product(s) model and serial number of the Product(s), and photo evidence of the Product’s defects to the Nothing Customer Service team as set out in the Contact Support section of our website.
          </li>
          <li>
            <strong>Repairs and replacement.</strong> Any repair and replacement service covered by the Limited Warranty, along with shipping and handling, will be at the expense of Nothing within the Limited Warranty period specified below.
          </li>
          <li>
            <strong>Parts and components.</strong> Nothing may use rebuilt, reconditioned or new parts and components when repairing any Product(s). Alternatively, we may replace the defective Product(s) entirely with a rebuilt, reconditioned or new Nothing Product(s).
          </li>
          <li>
            <strong>After sales assistance.</strong> Please note that we only offer after sales assistance in the areas where we make shipments (this includes repairs and/or replacements/returns). Nothing accepts no liability for orders placed outside of official sales regions.
          </li>
          <li>
            <strong>Warranty Periods.</strong> We have set out the Limited Warranty periods in respect of each of our Products below. The Products covered by the Limited Warranty will be covered for the following number of months:
          </li>
        </ol>

        {/* Warranty Periods Table */}
        <div className="overflow-x-auto rounded-lg border border-black/15 text-[15px] my-4">
          <table className="w-full text-left border-collapse">
            <thead className="bg-black/5 font-bold text-black">
              <tr>
                <th className="p-3.5 border-b border-black/15">Region</th>
                <th className="p-3.5 border-b border-black/15">Phone</th>
                <th className="p-3.5 border-b border-black/15">Audio</th>
                <th className="p-3.5 border-b border-black/15">Wearable</th>
                <th className="p-3.5 border-b border-black/15">Charger</th>
                <th className="p-3.5 border-b border-black/15">Cable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/15">
              <tr>
                <td className="p-3.5 font-semibold">UK &amp; EU</td>
                <td className="p-3.5">24</td>
                <td className="p-3.5">24</td>
                <td className="p-3.5">24</td>
                <td className="p-3.5">12</td>
                <td className="p-3.5">6</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold">US / International</td>
                <td className="p-3.5">12</td>
                <td className="p-3.5">12</td>
                <td className="p-3.5">12</td>
                <td className="p-3.5">6</td>
                <td className="p-3.5">6</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[14.5px] text-black italic">
          The following Products are excluded and are not covered by Limited Warranty: Phone Case(s), Screen Protector(s), Watch Strap(s) or Decoration Accessories.
        </p>

        <h1 className="text-[32px] leading-[32px] font-normal  text-black font-ntype82-bold pt-4">Limited Warranty Exclusions</h1>
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>
            <strong>What is not covered under the Limited Warranty.</strong> The Limited Warranty does not cover:
            <ol className="list-[lower-alpha] pl-6 space-y-2 mt-2">
              <li>software, consumable items, and accessories, even if packaged and sold together with Product(s);</li>
              <li>defects or damage resulting from accidents, neglect, misuse or abnormal use; defects or damage caused by abnormal conditions or improper storage; exposure to liquid, moisture, dampness, sand or dirt, or unusual physical, electrical or electromechanical stress;</li>
              <li>scratches, dents and cosmetic damage, unless caused by Nothing;</li>
              <li>defects or damage resulting from excessive force or use of metallic objects on the touch panel;</li>
              <li>devices that have the serial number or similar removed, defaced, damaged, altered or made illegible;</li>
              <li>ordinary wear and tear;</li>
              <li>defects or damage resulting from the use of the Product(s) in conjunction with accessories, products, or ancillary/peripheral equipment that are not furnished or approved by Nothing;</li>
              <li>any physical feature defects or damage resulting from improper testing, operation, maintenance, installation, service, or adjustment not furnished or approved by Nothing;</li>
              <li>defects or damage resulting from external causes such as collision with an object, fire, flooding, dirt, windstorm, lightning, earthquake, exposure to weather conditions, theft, blown fuse, or improper use of any electrical source;</li>
              <li>defects or damage resulting from cellular signal reception or transmission, or viruses and other software problems introduced into the Product(s);</li>
              <li>Products not purchased from our official store or authorised resellers (we recommend that you contact the point of sale for support);</li>
              <li>Products purchased outside of officially supported Nothing countries or regions.</li>
            </ol>
          </li>
          <li>repair(s) conducted by unofficial repair centres.</li>
          <li>&ldquo;Unofficial&rdquo; means not purchased through our official store or from an authorised Nothing partner.</li>
        </ol>

        <h1 className="text-[32px] leading-[32px] font-normal  text-black font-ntype82-bold pt-4">Our Cancellation Rights</h1>
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>
            <strong>Cancellations.</strong> Nothing makes every effort to supply the Products listed in your order confirmation. However, we will need to cancel your order where:
            <ol className="list-[lower-alpha] pl-6 space-y-2 mt-2">
              <li>we are legally required to do so;</li>
              <li>have reason to suspect fraud; and/or</li>
              <li>you do not, within a reasonable time of us asking for it, provide us with information that is necessary for us to provide the Products(s), for example where you provide incorrect or incomplete shipping information or contact details, or you fail to update the information when required.</li>
            </ol>
          </li>
        </ol>

        <h1 className="text-[32px] leading-[32px] font-normal  text-black font-ntype82-bold pt-4">Your Cancellation, Return and Replacement Rights</h1>
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>
            <strong>When you can exercise your rights.</strong> You may be able to cancel your contract, return a Product purchased from us or request replacement Product(s) from us in the circumstances set out below.
          </li>
          <li>
            <strong>Faulty Product or incorrect description.</strong> We are under a legal duty to supply Products that are fit for their given purpose, are of satisfactory quality and are as described. You may cancel your order or get your Product repaired or replaced following our return process if you think that a Product we have supplied does not conform with its description or is faulty.
          </li>
          <li>
            <strong>Our actions or proposed actions.</strong> You can return a Product to us or cancel your contract with us if we have told you about an upcoming change to the version of the Terms of Sales that apply to you which you do not agree to, or you have a statutory legal right to end the contract.
          </li>
          <li>
            <strong>Changing your mind.</strong> You can return your Product within 30 days of its delivery for any reason.
            <ol className="list-[lower-alpha] pl-6 space-y-2 mt-2">
              <li><strong>Condition.</strong> Please keep the Product in reasonable condition and, if possible, in the original packaging.</li>
              <li><strong>Packaging.</strong> If the Product is damaged or used in a way that reduces its value, we may make a deduction from your refund. If you return Products with missing parts or scratches, we may reduce your refund.</li>
              <li><strong>Shipping Costs.</strong> You’ll need to cover the cost of returning the Product to us.</li>
              <li><strong>Customized Goods.</strong> Customized Products —including Products with engraving— are not eligible for return unless defective or not as described.</li>
            </ol>
          </li>
          <li>
            <strong>Legal Return Rights.</strong> In addition to the above, you may have a legal right to change your mind and return certain Products within 14 days of delivery, without giving any reason. This statutory right of withdrawal is separate from—and not affected by—our 30-day return policy.
          </li>
          <li>
            <strong>Return of Gifts.</strong> If your purchase included a free gift or promotional item, that gift must also be returned in unused condition when returning the main Product. FAILURE TO RETURN THE GIFT WILL RESULT IN THE FULL VALUE OF THE GIFT BEING DISCOUNTED FROM ANY REFUND YOU RECEIVE.
          </li>
          <li>
            <strong>How to Initiate a Return.</strong> Please contact Nothing Support for a return merchandise authorisation (RMA) number and shipping label. Self-mailing is not supported. Nothing is not responsible for any parcels lost in transit if returned independently without prior authorization.
          </li>
          <li>
            <strong>Return for Refund.</strong> If you return an item under your statutory rights or our return policy, we will process a refund to your original method of payment within fourteen (14) days of verifying that the item satisfies the applicable return conditions.
          </li>
        </ol>

        <h1 className="text-[32px] leading-[32px] font-normal  text-black font-ntype82-bold pt-4">Return and Replacement Policy for Defective Product(s)</h1>
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>
            If you wish to return a Product or get a replacement Product due to the original Product not being fit for the given purpose, of satisfactory quality, or not as described, please contact us describing the problem with your Product and why you consider it to be defective, damaged, or materially different.
          </li>
          <li>
            If, after inspection, we consider that a refund is due, we will process such refund as soon as possible and, in any case, within fourteen (14) days of the day we notify you that we have confirmed that the Product is defective.
          </li>
          <li>
            Please note that we may choose not to accept returns in certain situations at our sole discretion, including defects caused by misuse, neglect, physical damage, tampering, incorrect adjustment, or normal wear and tear after purchase.
          </li>
          <li>
            If you contact us within thirty (30) days of delivery about a defective Product, you will have the option to select a repair, a replacement or a refund. If a fault is found after thirty (30) days from delivery of the Product(s), we will either repair or replace the Product.
          </li>
        </ol>

        <h1 className="text-[32px] leading-[32px] font-normal  text-black font-ntype82-bold pt-4">Shipping Policy</h1>
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>
            <strong>Dispatch.</strong> Orders are usually shipped within two (2) business days of our receipt of your payment. Orders made during promotional periods and special events may have longer shipping times.
          </li>
          <li>
            <strong>Inspection.</strong> All Products are inspected and sealed before delivery to avoid damage.
          </li>
          <li>
            <strong>Status Updates.</strong> Nothing will keep you updated on your order status via email. Orders cannot be cancelled once they have reached &ldquo;Shipped&rdquo; status.
          </li>
          <li>
            <strong>Shipping Time Calculation.</strong> Standard Shipping: 5 business days (2 business days processing + 3 business days transit). Priority Shipping: 3 business days (2 business days processing + 1 business day transit).
          </li>
          <li>
            <strong>Delivery Dates Are Estimates Only.</strong> Please note that all delivery dates are estimates only. Additional charges will be necessary for shipping addresses in remote locations.
          </li>
        </ol>

        <h1 className="text-[32px] leading-[32px] font-normal  text-black font-ntype82-bold pt-4">Delivery Limitations and Disclaimers</h1>
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>
            <strong>Force Majeure.</strong> We are not responsible for delays in delivery caused by events beyond our reasonable control (extreme weather conditions, natural disasters, pandemics, labour disputes, or transport network failures).
          </li>
          <li>
            <strong>Pre-Sales.</strong> During the pre-sale period, Products will be shipped according to the delivery timeline specified on the purchase page.
          </li>
        </ol>

        <h1 className="text-[32px] leading-[32px] font-normal  text-black font-ntype82-bold pt-4">Intellectual Property</h1>
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>
            None of these terms shall be construed as granting a licence to any trademarks, copyrights, patents, design patents, mask works, trade dress, or any other forms of intellectual property of either Nothing, its subsidiaries and affiliates or its licensors. Nothing expressly reserves all rights.
          </li>
          <li>
            You may not, and may not permit any third-party to, copy, modify, adapt, translate, reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code, underlying structure, or ideas of any software, firmware, or hardware components of the Products.
          </li>
        </ol>

        <h1 className="text-[32px] leading-[32px] font-normal  text-black font-ntype82-bold pt-4">Our Website</h1>
        <p>
          We own or have a right to use all intellectual property rights in our website, including all content. You agree that you will only use our website for personal, non-commercial use. Our website is provided on an &lsquo;as is&rsquo; and &lsquo;as available&rsquo; basis.
        </p>

        <h1 className="text-[32px] leading-[32px] font-normal  text-black font-ntype82-bold pt-4">Personal Data</h1>
        <p>
          We will only use your personal information as set out in our <a href="https://www.nothingcmf.pk/pages/privacy-policy" className="underline underline-offset-2 hover:opacity-75 font-semibold">Privacy Policy</a>.
        </p>

        <h1 className="text-[32px] leading-[32px] font-normal  text-black font-ntype82-bold pt-4">Limitation of Liability</h1>
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>
            None of these terms shall exclude either party’s liability for death or personal injury caused by negligence, fraud or fraudulent misrepresentation, or any deliberate breaches that cannot be excluded under applicable law.
          </li>
          <li>
            We are responsible to you for foreseeable losses. We only supply the Products for domestic and private use and are therefore not liable for business losses (loss of revenue, profits, business opportunity, or business interruption).
          </li>
          <li>
            Our total liability under or in connection with these Terms of Sale shall not exceed the total amount paid by you for the Product(s) giving rise to the claim.
          </li>
        </ol>

        <h1 className="text-[32px] leading-[32px] font-normal  text-black font-ntype82-bold pt-4">Transfer of rights and obligations</h1>
        <p>
          We may transfer our rights and obligations under these Terms of Sale to another organisation. You may only transfer your rights or your obligations under these Terms of Sale to another person if we agree to this in advance in writing.
        </p>

        <h1 className="text-[32px] leading-[32px] font-normal  text-black font-ntype82-bold pt-4">Changes</h1>
        <p>
          We reserve the right to update these Terms of Sale at any time without prior notification by updating our website accordingly. You will be bound by the version of the Terms of Sale in force at the time you enter into a contract to buy a Product from us.
        </p>

        <h1 className="text-[32px] leading-[32px] font-normal text-black font-ntype82-bold pt-4">Miscellaneous</h1>
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>
            Complaints. Our Customer Service team at{" "}
            <a href="https://www.nothingcmf.pk/support-centre" className="underline underline-offset-2 hover:opacity-75">
              https://www.nothingcmf.pk/support-centre
            </a>{" "}
            will do their best to resolve any problems you have with us or our Products.
          </li>
          <li>
            If a court invalidates any part of this contract, the rest of it will still apply. Each of the sections of these Terms of Sale operate separately. If any provision or part-provision of these Terms of Sale are held by a court of competent jurisdiction to be invalid, illegal or unenforceable, they shall be deemed modified to the minimum extent necessary to make it valid, legal and enforceable. If such modification is not possible, the relevant provision or part-provision shall be deemed deleted. Any modification to or deletion of a provision or part-provision under this section shall not affect the validity and enforceability of the rest of these Terms of Sale.
          </li>
          <li>
            Inurement. These Terms of Sale will be binding on the parties and their respective heirs, executors, administrators and permitted successors and assigns.
          </li>
          <li>
            Even if we delay in enforcing this contract, we can still enforce it later. If we do not insist immediately that you do anything you are required to do under these terms, or if you breach these Terms of Sale or any contract with us and we delay in taking steps against you, that will not mean that you do not have to do those things, and our previous inaction will not prevent us from taking action against you at a later date.
          </li>
          <li>
            Nobody else has any other rights under this contract. This contract is between you and us. A person who is not party to the contract shall not have any rights to enforce any of its terms.
          </li>
          <li>
            Force Majeure. Neither party shall be liable for delay in performing obligations or for failure to perform obligations hereunder if the delay or failure results from: force majeure, an Act of God, or any governmental act, fire, earthquake, explosion, accident, industrial dispute, civil commotion, acts of terrorism or anything beyond the reasonable control of either party and not involving any fault or negligence of the party affected (a &ldquo;Force Majeure Event&rdquo;). The performance of the party affected by the Force Majeure Event under the contract will be considered suspended for the period that the Force Majeure Event continues. Each party agrees to provide the other party with an extension of time for performing its obligations for the duration of that period. The party affected by the Force Majeure Event will use their reasonable endeavours to find a reasonable workaround and minimise the effects of the Force Majeure Event.
          </li>
          <li>
            Sanctions &amp; Export Control. Nothing Products may be subject to US export control laws and regulations. You shall not, directly or indirectly, export, re-export, or release the Products to, or make them accessible from, any jurisdiction or country to which export, re-export, or release is prohibited by applicable laws, Terms, or regulations. By placing an order, you represent and warrant that you are not subject to any sanctions or blacklists of relevant countries.
          </li>
          <li>
            Which laws apply to this contract and where you may bring legal proceedings. Contracts for the purchase of Products through our website and any dispute or claim arising out of or in connection with them or their subject matter or formation (including non-contractual disputes or claims) will be governed by English law. Any dispute or claim arising out of or in connection with such contracts or their formation (including non-contractual disputes or claims) will be subject to the exclusive jurisdiction of the courts of England and Wales. The preceding provision regarding jurisdiction does not apply if you are a consumer based in the European Union. If you are a consumer based in the European Union, you may make a claim in the courts of the country where you reside. Nothing in this section shall limit any mandatory consumer protections under the laws of the country in which you reside.
          </li>
          <li>
            Notices. You may give us formal notice by using the details set out in the Contact Support section of our website{" "}
            <a href="https://www.nothingcmf.pk/support-centre" className="underline underline-offset-2 hover:opacity-75">
              https://www.nothingcmf.pk/support-centre
            </a>
            . We may give notice to you at either the e-mail or postal address you provide to us when placing an order or by updating our website. Notice will be deemed received and properly served immediately when posted on our website, twenty-four (24) hours after an email is sent, or three (3) business days after the date of posting of any letter. In proving the service of any notice, it will be sufficient to prove, in the case of a letter, that such letter was properly addressed, stamped and placed in the post and, in the case of an email, that such email was sent to the specified email address of the addressee.
          </li>
          <li>
            Entire Agreement. We intend to rely on these Terms of Sale and any document expressly referred to in them in relation to the subject matter of the contract. Although we agree that we are responsible for statements and representations made by our duly authorised representatives, please make sure you ask for any changes to these Terms of Sale to be confirmed in writing. These Terms of Sale constitute the entire agreement between you and Nothing relating to the sale of Products and supersede any prior or contemporaneous communications.
          </li>
        </ol>
        <p className="text-[18px] text-black pt-2">This document was last updated on 26 June 2025.</p>
      </>
    ),
  },

  // ─────────────────────────────────────────────────────────────
  // 4. USER AGREEMENT (100% EXACT OFFICIAL LIVE DATA)
  // ─────────────────────────────────────────────────────────────
  {
    id: "user-agreement",
    sidebarLabel: "User Agreement",
    title: "USER AGREEMENT",
    content: (
      <>
        <p className="font-bold text-black text-[17px] sm:text-[18px]">Nothing User Agreement</p>
        <p>
          This User Agreement (the &ldquo;Agreement&rdquo;) applies to the Nothing website located at{" "}
          <a href="https://www.nothingcmf.pk/" className="underline underline-offset-2 hover:opacity-75">
            https://www.nothingcmf.pk/
          </a>{" "}
          (the &ldquo;Site&rdquo;) and regulates the rights and obligations between you and Nothing Technology Limited and its subsidiaries and affiliates (&ldquo;Nothing&rdquo; or &ldquo;we&rdquo; or &ldquo;us&rdquo;) when you use the Site or our products and services or participate in the Nothing community. The Site is the property of Nothing and its licensors. By using the Site or checking the box which indicates that you have agreed to the contents of this Agreement or clicking the &ldquo;Register&rdquo; or &ldquo;Sign up&rdquo; button, you confirm that you have read and accepted the Agreement. If you do not agree to the Agreement, do not click the &ldquo;Register&rdquo; or &ldquo;Sign up&rdquo; button, and do not use the Site or use or access the products or services.
        </p>
        <p>
          Every time you wish to use the Site, please check these terms to ensure you understand the terms that apply at that time. Nothing reserves the right, at its sole discretion, to amend the terms of the Agreement. Such amendments may be intended to comply with laws and regulations, clarify our terms and conditions or provide improved products or services. We will endeavour to contact you using the contact details you have provided or via public announcement if we make a material amendment to this Agreement, which has the effect of reducing or adversely affecting your rights or interests. Your continued use of the Site, or Nothing’s products or services, following the posting of changes or notifying you will mean that you accept and agree to the changes.
        </p>
        <p>
          Nothing Technology Limited is registered in England and Wales under company number 12984564 and has its registered office at 21A John Street, Bedford House, London, WC1N 2BF. Our VAT number is GB368039181.
        </p>

        <p className="text-black pt-2">Overview</p>
        <p>
          The contents of this Agreement include: other terms and conditions; use of the Site; Nothing account, security and passwords; intellectual property rights, loading content to the Site, rights you are giving us to use material you upload, privacy, service termination, links to other sites, disclaimers, indemnity and limitation of liability; governing law and disputes; miscellaneous; and feedback.
        </p>

        <p className="text-black pt-2">Other terms and conditions</p>
        <p>
          Additional terms and conditions may apply to purchases of goods or services and to certain portions or features of the Site, such as promotions and contests, and such terms are made part of this Agreement by this reference. In the event of any conflict between this Agreement and such additional terms and conditions, the latter terms shall prevail and control in relation to your use of the relevant portion or feature of the Site or the relevant goods or services. When registering for a Nothing account, and using our products or services, you shall also comply with additional terms which are incorporated herein by reference including the Nothing <a href="https://www.nothingcmf.pk/pages/privacy-policy" className="underline underline-offset-2 hover:opacity-75">Privacy Policy</a>, <a href="https://www.nothingcmf.pk/pages/nothing-website-acceptable-use-policy" className="underline underline-offset-2 hover:opacity-75">Acceptable Use Policy</a>, Cookies Policy and Community Terms and Rules.
        </p>
        <p>
          We may without notice update and make changes to the Site from time to time to reflect changes to our products, services, the applicable prices for any such products or services, our users&apos; needs and our business priorities.
        </p>
        <p>
          Our products and services are principally aimed at those aged 18 years or above. Any minors should involve and be supervised by their parents or legal guardian and obtain their consent in accordance with applicable laws.
        </p>

        <p className="text-black pt-2">Use of the Site</p>
        <p>
          You must not misuse the Site by knowingly introducing viruses, trojans, worms, logic bombs or other material that is malicious or technologically harmful. You must not use any robot, spider, page scraping or other automatic device, algorithm, methodology or similar manual process, to copy, monitor, acquire or access any portion of the Site or any Content, to attempt to obtain any information or materials by any means that are not purposely made available through the Site.
        </p>
        <p>
          You must not attempt to gain unauthorised access to any portion or feature of the Site, the server on which the Site is stored or any server, computer or database connected to the Site or to any of the services offered on or through the Site. You must not attack the Site via a denial-of-service attack or a distributed denial-of service attack. We will report any such breach to the relevant law enforcement authorities and we will co-operate with those authorities by disclosing your identity to them. In the event of such a breach, your right to use the Site will cease immediately.
        </p>
        <p>
          You may not use the Site or any Content for any purpose that is prohibited by this Agreement or that is unlawful or indecent or offensive, or to solicit the performance of any activity which infringes the rights of Nothing or others or any illegal activity.
        </p>
        <p>
          You are responsible for configuring your information technology, computer programmes and platform to access the Site. You should use your own virus protection software.
        </p>

        <p className="text-black pt-2">Nothing account, security and passwords</p>
        <p>
          You may be required to open a Nothing account to use certain features or services offered on or through the Site or otherwise. In which case your account details will be used for identity verification and providing user services. When you register and use your Nothing account you confirm that the information that you provide is accurate, complete and lawful. You also confirm that such information belongs to you and that you will update it as necessary from time to time.
        </p>
        <p>
          It is your responsibility to maintain the confidentiality of the information in relation to your account, including your password. If you fail to keep such information secure and confidential you will be entirely responsible for any activity that occurs under your account due to such failure. You may reset your password using the tools provided on the Site. You agree to notify Nothing immediately of any unauthorized use of your account or password, or any other breach of security.
        </p>
        <p>
          You may not use your Nothing account for any commercial activities including advertising or selling goods or services.
        </p>
        <p>
          When you use your Nothing account to receive products or services from Nothing or its third-party partners, you agree that Nothing or such partners may contact you in accordance with applicable law and may do so by using the contact details that you have provided.
        </p>

        <p className="text-black pt-2">Intellectual property rights</p>
        <p>
          Nothing is the owner or licensee of all intellectual property rights in the Site, and in the material published on it including without limitation all graphics, visual and user interfaces, design drawings, text, photographs, artwork, logos, sound, music, trademarks and computer code (collectively, &ldquo;Content&rdquo;). Those works and the Content are protected by copyright, patent, trade dress, unfair trade and trademark laws and treaties around the world. All such rights are reserved.
        </p>
        <p>
          Save as expressly provided in this Agreement, you may not copy, reproduce, upload, republish, translate, compile, encode, transmit or distribute in any way to any other medium, website, server or computer for distribution or publication or for any commercial enterprise, any part of the Site or its Content, without Nothing’s prior written consent.
        </p>

        <p className="text-black pt-2">Loading content to the Site</p>
        <p>
          Whenever you make use of a feature that allows you to upload content to the Site, or to make contact with other users of the Site, you must comply with the content standards set out in our <a href="https://www.nothingcmf.pk/pages/nothing-website-acceptable-use-policy" className="underline underline-offset-2 hover:opacity-75">Acceptable Use Policy</a>.
        </p>
        <p>
          You warrant that any such contribution does comply with those standards, and you will be liable to us and indemnify us for any breach of that warranty. This means you will be responsible for any loss or damage we suffer as a result of your breach of warranty.
        </p>
        <p>
          Any content you upload to the Site will be considered non-confidential and non-proprietary. You retain all of your ownership rights in your content, but you are required to grant us a limited licence to use, store and copy that content and to distribute and make it available to third parties.
        </p>
        <p>
          We also have the right to disclose your identity to any third party who is claiming that any content posted or uploaded by you to the Site constitutes a violation of their intellectual property rights, or of their right to privacy.
        </p>
        <p>
          We have the right to remove any posting you make on the Site if, in our opinion, your post does not comply with the content standards set out in our Acceptable Use Policy. You are solely responsible for securing and backing up your content.
        </p>

        <p className="text-black pt-2">Rights you are giving us to use material you upload</p>
        <p>When you upload or post content to the Site, you grant us the following rights to use that content:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>a worldwide, non-exclusive, perpetual, royalty-free, transferable licence to use, reproduce, translate, distribute, prepare derivative works of, display, and perform that user-generated content in connection with the service provided by the Site and across different media including to promote the Site or the services;</li>
          <li>a worldwide, non-exclusive, perpetual, royalty-free, transferable licence for other users, partners or advertisers to use the content in accordance with the functionality of the Site.</li>
        </ul>

        <p className="text-black pt-2">Privacy</p>
        <p>
          We value your privacy and we will only use your personal information as set out in Nothing’s <a href="https://www.nothingcmf.pk/pages/privacy-policy" className="underline underline-offset-2 hover:opacity-75">Privacy Policy</a>. Nothing reserves the right to disclose any information that it deems necessary to comply with any applicable law, regulation, legal process or governmental request or in connection with any investigation or complaint regarding your use of the Site or the services.
        </p>

        <p className="text-black pt-2">Service termination</p>
        <p>
          Nothing reserves the right to do the following, at any time, without notice: (1) terminate the use of your Nothing account and discontinue providing services to you if you fail to activate or log in to your Nothing account, or if you breach the terms of this Agreement or if your account becomes inactive; and (2) interrupt the operation of the Site to perform maintenance, error correction or other changes.
        </p>
        <p>
          The Site is made available free of charge. We do not guarantee that the Site, or any Content, will always be available or be uninterrupted. We may suspend or withdraw or restrict the availability of all or any part of the Site for business and operational reasons.
        </p>

        <p className="text-black pt-2">Links to other sites</p>
        <p>
          Where the Site contains links to other sites and resources provided by third parties, these links are provided for your convenience and information only. Such links should not be interpreted as approval by us of those linked websites and Nothing is not responsible for the content of such sites or information you may obtain from them. We have no control over the contents of those sites or resources.
        </p>

        <p className="text-black pt-2">Disclaimers</p>
        <p>
          Although we make reasonable efforts to update the information on the Site, we make no representations, warranties or guarantees, whether express or implied, that the content on our site is accurate, complete or up to date. Nothing shall not be responsible for any actions that you may take based on information on the Site and you assume total responsibility for your use of the Site and any linked sites. Nothing does not promise that the Site or any content, service or feature of the Site will be error-free or uninterrupted, or that your use of the Site will provide specific results, or that any defects will be corrected.
        </p>
        <p>
          Save where prohibited by law, in no event will Nothing be liable to you for any consequential, indirect, incidental, exemplary, or punitive damages including loss of profits, loss of revenue, loss of business, business interruption or loss of business opportunity.
        </p>

        <p className="text-black pt-2">Indemnity and limitation of liability</p>
        <p>
          You agree to indemnify and hold Nothing, its directors, officers, shareholders, predecessors and successors in interest, agents, employees, affiliates and subsidiaries, harmless from any loss, liability, demands, expenses or claims, made by any third party against Nothing due to or arising out of or in connection with your use of the Site or your breach of this Agreement.
        </p>
        <p>
          If Nothing is found to be liable to you for any loss or damage which arises out of or in connection with this Agreement, Nothing’s liability shall in no event exceed the price you have paid to Nothing.
        </p>

        <p className="text-black pt-2">Governing law and disputes</p>
        <p>
          This Agreement and any disputes arising under or in connection with it shall be governed by and construed in accordance with English law, without regard to its conflict of laws provisions. In the event of any dispute arising under or in connection with this Agreement, the parties shall attempt, promptly and in good faith, to resolve such dispute. If no settlement can be reached, you and we both agree that the courts of England and Wales will have exclusive jurisdiction (subject to mandatory local consumer rights).
        </p>
        <p>
          The European Commission&apos;s Online Dispute Resolution tool provides useful information including on rights to return and warranty claims for EU consumers who have purchased goods or services online. The tool may be accessed at{" "}
          <a href="http://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-75">
            http://ec.europa.eu/consumers/odr
          </a>.
        </p>

        <p className="text-black pt-2">Miscellaneous</p>
        <p>
          If any of the provisions of this Agreement are held by a court of competent jurisdiction to be invalid or unenforceable, such provisions shall be limited or disregarded to the minimum extent necessary and replaced with a valid provision that best reflects the intent of this Agreement, so that this Agreement shall remain in full force and effect.
        </p>

        <p className="text-black pt-2">Feedback</p>
        <p>
          Any feedback provided by you shall be deemed to be non-confidential and Nothing shall be free to use such information on an unrestricted basis. You may contact us using the following email address: feedback@nothing.tech.
        </p>
        <p className="text-[14px] text-black italic pt-2">This Agreement was published on 27 July 2021.</p>
      </>
    ),
  },

  // ─────────────────────────────────────────────────────────────
  // 5. ACCEPTABLE USE POLICY (100% EXACT OFFICIAL LIVE DATA)
  // ─────────────────────────────────────────────────────────────
  {
    id: "acceptable-use-policy",
    sidebarLabel: "Acceptable Use Policy",
    title: "ACCEPTABLE USE POLICY",
    content: (
      <>
        <p className="text-black">What&apos;s in these terms?</p>
        <p>
          This acceptable use policy sets out the content standards that apply when you upload content to our site, make contact with other users on our site, link to our site, or interact with our site in any other way.
        </p>

        <p className="text-black pt-2">Who we are and how to contact us</p>
        <p>
          <a href="https://www.nothingcmf.pk/" className="underline underline-offset-2 hover:opacity-75">
            https://www.nothingcmf.pk/
          </a>{" "}
          is a site operated by Nothing Technology Limited (&ldquo;We&rdquo;). We are registered in England and Wales under company number 12984564 and have our registered office at 21A John Street, Bedford House, London, WC1N 2BF. Our VAT number is GB368039181.
        </p>
        <p>
          To contact us, please email us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-2 hover:opacity-75">
            {CONTACT_EMAIL}
          </a>.
        </p>

        <p className="text-black pt-2">By using our site you accept these terms</p>
        <p>
          By using our site, you confirm that you accept the terms of this policy and that you agree to comply with them. If you do not agree to these terms, you must not use our site.
        </p>

        <p className="text-black pt-2">There are other terms that may apply to you</p>
        <p>
          Our <a href="#" className="underline underline-offset-2 hover:opacity-75">User Agreement</a> also applies to your use of our site.
        </p>

        <p className="text-black pt-2">We may make changes to the terms of this policy</p>
        <p>
          We amend these terms from time to time. Every time you wish to use our site, please check these terms to ensure you understand the terms that apply at that time.
        </p>

        <p className="text-black pt-2">Prohibited uses</p>
        <p>You may use our site only for lawful purposes. You may not use our site:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>In any way that breaches any applicable local, national or international law or regulation.</li>
          <li>In any way that is unlawful or fraudulent or has any unlawful or fraudulent purpose or effect.</li>
          <li>For the purpose of harming or attempting to harm minors in any way.</li>
          <li>To bully, insult, intimidate or humiliate any person.</li>
          <li>To send, knowingly receive, upload, download, use or re-use any material which does not comply with our content standards.</li>
          <li>To transmit, or procure the sending of, any unsolicited or unauthorised advertising or promotional material or any other form of similar solicitation (spam).</li>
          <li>To knowingly transmit any data, send or upload any material that contains viruses, Trojan horses, worms, time-bombs, keystroke loggers, spyware, adware or any other harmful programs or similar computer code designed to adversely affect the operation of any computer software or hardware.</li>
        </ul>
        <p className="pt-2">You also agree:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Not to reproduce, duplicate, copy or re-sell any part of our site in contravention of the provisions of our <a href="https://www.nothingcmf.pk/pages/user-agreement" className="underline underline-offset-2 hover:opacity-75">User Agreement</a>.</li>
          <li>
            Not to access without authority, interfere with, damage or disrupt:
            <ul className="list-disc pl-6 space-y-1 mt-1">
              <li>any part of our site;</li>
              <li>any equipment or network on which our site is stored;</li>
              <li>any software used in the provision of our site; or</li>
              <li>any equipment or network or software owned or used by any third party.</li>
            </ul>
          </li>
        </ul>

        <p className="text-black pt-2">Interactive services</p>
        <p>
          We may from time to time provide interactive services on our site, including, without limitation: Video-sharing facilities, Chat rooms, Bulletin boards (&ldquo;interactive services&rdquo;).
        </p>
        <p>
          Where we do provide any interactive service, we will provide clear information to you about the kind of service offered, if it is moderated and what form of moderation is used (including whether it is human or technical).
        </p>
        <p>
          We will do our best to assess any possible risks for users (and in particular, for children) from third parties when they use any interactive service provided on our site, and we will decide in each case whether it is appropriate to use moderation of the relevant service. However, we are under no obligation to oversee, monitor or moderate any interactive service we provide on our site, and we expressly exclude our liability for any loss or damage arising from the use of any interactive service by a user in contravention of our content standards.
        </p>
        <p>
          The use of any of our interactive services by a minor is subject to the consent of their parent or guardian. We advise parents who permit their children to use an interactive service that it is important that they communicate with their children about their safety online.
        </p>

        <p className="text-black pt-2">Content standards</p>
        <p>
          These content standards apply to any and all material which you contribute to our site (&ldquo;Contribution&rdquo;), and to any interactive services associated with it. The Content Standards must be complied with in spirit as well as to the letter. The standards apply to each part of any Contribution as well as to its whole. Nothing Technology Limited will determine, in its discretion, whether a Contribution breaches the Content Standards.
        </p>
        <p className="text-black pt-1">A Contribution must:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Be accurate (where it states facts).</li>
          <li>Be genuinely held (where it states opinions).</li>
          <li>Comply with the law applicable in England and Wales and in any country from which it is posted.</li>
        </ul>
        <p className="text-black pt-2">A Contribution must not:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Be defamatory of any person.</li>
          <li>Be obscene, offensive, hateful or inflammatory.</li>
          <li>Bully, insult, intimidate or humiliate.</li>
          <li>Promote sexually explicit material.</li>
          <li>Include child sexual abuse material.</li>
          <li>Promote violence.</li>
          <li>Promote discrimination based on race, caste, sex, religion, nationality, disability, sexual orientation or age.</li>
          <li>Infringe any copyright, database right or trademark of any other person.</li>
          <li>Be likely to deceive any person.</li>
          <li>Breach any legal duty owed to a third party, such as a contractual duty or a duty of confidence.</li>
          <li>Promote any illegal content or activity.</li>
          <li>Be in contempt of court.</li>
          <li>Be threatening, abuse or invade another&apos;s privacy, or cause annoyance, inconvenience or needless anxiety.</li>
          <li>Be likely to harass, upset, embarrass, alarm or annoy any other person.</li>
          <li>Impersonate any person or misrepresent your identity or affiliation with any person.</li>
          <li>Give the impression that the Contribution emanates from Nothing Technology Limited and its subsidiaries and affiliates, if this is not the case.</li>
          <li>Advocate, promote, incite any party to commit, or assist any unlawful or criminal act such as copyright infringement or computer misuse.</li>
          <li>Contain a statement which you know or believe, or have reasonable grounds for believing, that members of the public are likely to understand as encouragement to acts of terrorism.</li>
          <li>Contain any advertising or promote any services or web links to other sites.</li>
        </ul>

        <p className="text-black pt-2">Breach of this policy</p>
        <p>
          When we consider that a breach of this acceptable use policy has occurred, we may take such action as we deem appropriate. Failure to comply with this policy constitutes a material breach of the User Agreement upon which you are permitted to use our site, and may result in our taking all or any of the following actions:
        </p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Immediate, temporary or permanent withdrawal of your right to use our site.</li>
          <li>Immediate, temporary or permanent removal of any Contribution uploaded by you to our site.</li>
          <li>Issue of a warning to you.</li>
          <li>Legal proceedings against you for reimbursement of all costs on an indemnity basis.</li>
          <li>Further legal action against you.</li>
          <li>Disclosure of such information to law enforcement authorities as we reasonably feel is necessary or as required by law.</li>
        </ul>

        <p className="text-black pt-2">How this contract can be transferred</p>
        <p>
          We can transfer our rights and obligations under these terms to any third party, provided this does not adversely affect your rights under these terms.
        </p>

        <p className="text-black pt-2">Which country&apos;s laws apply to any disputes?</p>
        <p>
          If you are a consumer, please note that the terms of this policy, its subject matter and its formation are governed by English law, with jurisdiction in the courts of England and Wales (without prejudice to your mandatory local consumer rights). If you are a business, the terms are governed by English law with exclusive jurisdiction in the courts of England and Wales.
        </p>
        <p className="text-[14px] text-black italic pt-2">Published on 27 July 2021.</p>
      </>
    ),
  },

  // ─────────────────────────────────────────────────────────────
  // 6. PRE-ORDER NON-REFUNDABLE DEPOSIT AGREEMENT
  // ─────────────────────────────────────────────────────────────
  {
    id: "pre-order-agreement",
    sidebarLabel: "Pre-order Non-refundable Deposit Agreement",
    title: "PRE-ORDER NON-REFUNDABLE DEPOSIT AGREEMENT",
    content: (
      <>
        <p className="text-black">Coming Soon</p>
      </>
    ),
  },

  // ─────────────────────────────────────────────────────────────
  // 7. SECURITY VULNERABILITY REPORT (EXACT NOTHING TECH MATCH)
  // ─────────────────────────────────────────────────────────────
  {
    id: "security-vulnerability-report",
    sidebarLabel: "Security Vulnerability Report",
    title: "SECURITY VULNERABILITY REPORT",
    content: (
      <>
        <h1 className="text-[32px] pt-4 leading-[32px] font-normal text-black font-ntype82-bold">Vulnerability submission</h1>
        <h4 className="text-[16px] sm:text-[17px] font-bold text-black">How to report a security vulnerability issue</h4>
        <p>
          If you have a security vulnerability issue with a Nothing product or application, please send an e-mail to{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
        </p>
        <p>
          Use the public PGP key to encrypt email with sensitive information and to verify that security communications sent by Nothing are genuine.
        </p>

        {/* PGP Public Key Details (Plain Text) */}
        <div>
          <p>Active Date: December 1, 2025</p>
          <p>Expiration Date: N/A</p>
          <p>Key ID: 0x3430CE40</p>
          <p>Key Type: RSA</p>
          <p>Key Size: 4096/4096</p>
          <p className="break-all">Fingerprint: 7AAEA1E8DEB69E3912F2B2C33629E8953430CE40</p>
          <p>User ID: {CONTACT_EMAIL}</p>
        </div>

        <p>In your email, please provide the following information:</p>
        <ul className="list-disc pl-5 space-y-1 text-black">
          <li>Detailed description of the issue</li>
          <li>The products and software versions</li>
          <li>Information on known exploits</li>
          <li>Vulnerability category</li>
          <li>Vulnerability title</li>
          <li>Domain name</li>
          <li>Vulnerability level</li>
          <li>Vulnerability description</li>
          <li>Additional details</li>
          <li>Attachments (if any)</li>
          <li>Repair plan</li>
        </ul>

        <p>
          Please detail the process of discovering the issue and its impact. Please also include any relevant code source documents, screenshots or videos. If you used debugging tools during the vulnerability exploitation process, please upload them as attachments. If the tools are too large, please provide a download link. Additionally, please provide the vulnerability proof of concept or exploit.
        </p>
        <p>
          Note: failure to meet these requirements may result in your report not passing the review process.
        </p>
        <p>
          Once we receive your vulnerability report, we will complete the verification process within 30 working days and reply to your vulnerability email with the results. Please continue to monitor your email for updates.
        </p>
        <p>
          g_feedback@nothing.tech only collects security vulnerabilities related to Nothing products. If you have other product related issues, you can reach us via our{" "}
          <a href="https://www.nothingcmf.pk/support-centre" className="underline font-bold hover:opacity-75">
            contact us
          </a>{" "}
          page.
        </p>

        <h1 className="text-[32px] leading-[32px] font-normal uppercase text-black font-ntype82-bold pt-4">Vulnerability rewards</h1>
        <p>
          Vulnerability rewards incentivise individuals to report security vulnerabilities. Rewards are tiered based on the vulnerability levels, with more critical issues earning higher rewards. The table below outlines the vulnerability levels and rewards.
        </p>

        {/* Tiered Rewards (Exact Nothing Tech text layout) */}
        <div className="space-y-3 pt-1">
          <div>
            <p className=" text-black">Critical</p>
            <p className=" text-black">$1000 - $2000</p>
            <p>Disclosure of sensitive information, unauthorised access to core systems or large amounts of sensitive information, ultra vires on sensitive operations.</p>
          </div>

          <div>
            <p className=" text-black">High</p>
            <p className=" text-black">$500 - $1000</p>
            <p>Vulnerabilities that directly obtain permissions, lead to leakage of sensitive information, and steal internal user information.</p>
          </div>

          <div>
            <p className=" text-black">Medium</p>
            <p className=" text-black">$100 - $500</p>
            <p>Vulnerabilities that require interaction to obtain permissions, lead to serious information leakage, and steal internal user information.</p>
          </div>

          <div>
            <p className=" text-black">Low</p>
            <p className=" text-black">$20 - $100</p>
            <p>Only in a specific environment can access permissions lead to information leakage, theft of internal user information vulnerabilities.</p>
          </div>
        </div>

        <p>
          If the store coupon is not available in your region, we will convert it into other rewards on a pro-rata basis.
        </p>
        <p>
          Terms and conditions apply to all vouchers. Voucher amounts and types are at Nothing&apos;s sole discretion.
        </p>

        <h4 className="text-[17px] sm:text-[18px] font-bold text-black pt-2">Notice:</h4>
        <p>The following situations will not be rewarded:</p>
        <ol className="list-decimal pl-5 space-y-1.5 text-black">
          <li>Vulnerabilities unrelated to the Nothing products.</li>
          <li>Vulnerabilities that were made public before they were fixed.</li>
          <li>Vulnerabilities that have been publicly disclosed online.</li>
          <li>For the same vulnerability, only the first reporter will be rewarded; subsequent reporters will not receive a reward. A vulnerability found in different versions is still considered the same vulnerability.</li>
          <li>Those who exploit vulnerabilities to harm user interests, disrupt business operations, or steal user data will not receive any rewards. Additionally, Nothing reserves the right to take further legal action.</li>
          <li>By participating in the vulnerability submission program, you acknowledge and agree that any rewards granted are subject to the terms and conditions of this program. If rewards are provided in the form of cash or are otherwise taxable, it is your responsibility to comply with local tax laws and declare and pay any applicable taxes associated with the reward received. Nothing is not responsible for any individual tax obligations that may arise.</li>
          <li>Due to legal restrictions, Nothing may not be able to process rewards for countries/regions that are subject to sanctions.</li>
        </ol>

        <p className="pt-2">Rewards will be downgraded or cancelled in the following situations:</p>
        <ol className="list-decimal pl-5 space-y-1.5 text-black">
          <li>For information with serious discrepancies between the title and content, vulnerability downgrading will be carried out accordingly, in serious cases rewards will be cancelled.</li>
          <li>Review will be moderated based on high-quality reporting standards. For reports that lack key factors (text description, image proof, testing process, risk interface, parameters, etc.), have poor structured report layout, and cannot be consistently reproduced, they will be downgraded/ignored.</li>
          <li>Publicly disclosing details of vulnerabilities without Nothing&apos;s permission. In such cases, Nothing reserves the right to recover vulnerability rewards and take appropriate legal action, including seeking damages and/or injunctive relief.</li>
        </ol>

        <p>
          For the same URL, if there are similar vulnerabilities in multiple parameters, rewards will be given according to one vulnerability, and rewards will be given according to the greatest degree of harm for different types.
        </p>
        <p>
          Multiple vulnerabilities generated by the same source are counted as a single vulnerability. For example, multiple security bugs caused by the same JS, multiple page security bugs caused by the same publishing system, whole station security bugs caused by frameworks, multiple security bugs generated by domain name resolution, etc.
        </p>
        <p>
          If you submit multiple vulnerabilities in the same report, we will reward you with the highest damage level vulnerability.
        </p>
        <p>
          When submitting a vulnerability, please confirm whether it will have a real impact on the business and submit proof of actual harm. Indirect harm or speculative harm will not be considered when grading.
        </p>

        <h4 className="text-[17px] sm:text-[18px] font-bold text-black pt-2">Reward Distribution Cycle:</h4>
        <p>
          We will distribute rewards within 30 working days upon completing the verification of the vulnerability via email. Please check your reward status promptly.
        </p>

        <h1 className="text-[32px] leading-[32px] font-normal uppercase text-black font-ntype82-bold pt-4">Personal Information Involved</h1>
        <p>
          To receive the reward, you need to provide your NOTHING.tech account or other account information. However, we will not request any additional personal information during the vulnerability submission process. We will only require your registered email address for communication and your registered account information for the reward issuance.
        </p>
        <p>
          We will access, process, and share your personal information in accordance with our Privacy Policy. By participating, you agree to the access, use, and sharing of your personal information as described above and in our <a href="https://www.nothingcmf.pk/pages/privacy-policy" >Privacy Policy</a>. If you have any questions regarding this Privacy Policy or its implementation, here is how you can reach us: Email Address: privacy@nothing.tech
        </p>
      </>
    ),
  },

  // ─────────────────────────────────────────────────────────────
  // 8. RETURN/EXCHANGE POLICY FOR APPAREL (100% EXACT OFFICIAL LIVE DATA)
  // ─────────────────────────────────────────────────────────────
  {
    id: "apparel-return-policy",
    sidebarLabel: "Return/Exchange Policy for Apparel",
    title: "RETURN/EXCHANGE POLICY FOR ONLINE/IN-STORE APPAREL",
    content: (
      <>
        <p>
          At Nothing, we want to ensure that our customers have a seamless shopping experience. We understand that sometimes returns or exchanges are necessary, and we strive to make the process as easy as possible. Please review our Return/Exchange Policy below for both online and in-store apparel purchases:
        </p>
        <p>
          References in this Policy to: (1) &ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;, &ldquo;seller&rdquo; or &ldquo;Nothing&rdquo; shall mean Nothing Technology Limited; (2) &ldquo;Products&rdquo; shall mean apparel and accessories made available for sale by Nothing on our website{" "}
          <a href="https://www.nothingcmf.pk/" className="underline hover:opacity-75">
            https://www.nothingcmf.pk/
          </a>; and (3) &ldquo;you&rdquo;, &ldquo;your&rdquo; or the &ldquo;customer&rdquo; shall mean the person purchasing the Products.
        </p>

        <p className="text-black pt-2">1. General Return/Exchange Guidelines:</p>
        <ul className="space-y-1 text-black">
          <li>- Items must be in their original condition, unworn, unwashed, and with all tags attached.</li>
          <li>- Returns or exchanges are accepted within Thirty (30) days from the date of purchase.</li>
          <li>- Proof of purchase (receipt, order number, etc.) is required for all returns and exchanges.</li>
          <li>- Returns and exchanges can be made either online or at any of our physical store locations.</li>
        </ul>

        <p className="text-black pt-2">2. Online Returns/Exchanges:</p>
        <ul className="space-y-1 text-black">
          <li>- To initiate a return or exchange, please contact our customer service team or visit our website&apos;s returns/exchanges page.</li>
          <li>- Customers are responsible for the return shipping costs, unless the return is due to a manufacturing defect or an error on our part.</li>
          <li>- Refunds for online purchases will be processed back to the original form of payment within standard processing days of receiving the returned item(s).</li>
        </ul>

        <p className="text-black pt-2">3. In-Store Returns/Exchanges:</p>
        <ul className="space-y-1 text-black">
          <li>- Simply bring the item(s) you wish to return or exchange, along with the proof of purchase, to any of our store locations.</li>
          <li>- Our store associates will assist you with the return or exchange process.</li>
          <li>- Refunds for in-store purchases will be issued back to the original form of payment within standard processing days of the return.</li>
        </ul>

        <p className="text-black pt-2">Minimum No Reason Refund Periods by Country:</p>
        <ul className="space-y-1 text-black">
          <li>- United States: 30 days</li>
          <li>- Canada: 30 days</li>
          <li>- United Kingdom: 30 days</li>
          <li>- Australia: 30 days</li>
          <li>- Germany: 30 days</li>
          <li>- France: 30 days</li>
          <li>- Spain: 30 days</li>
        </ul>
        <p>
          Please note that these minimum refund periods may vary depending on local laws and regulations. We advise customers to check their specific country&apos;s consumer protection guidelines for accurate information.
        </p>

        <p className="text-black pt-2">Products that Cannot be Exchanged or Returned:</p>
        <ul className="space-y-1 text-black">
          <li>- Custom-made or personalized items.</li>
          <li>- Products marked as final sale or clearance items.</li>
          <li>- Items that have been used, damaged, or altered by the customer.</li>
        </ul>

        <p>
          We reserve the right to refuse returns or exchanges that do not meet the above criteria.
        </p>
        <p>
          If you have any further questions or concerns regarding our Return/Exchange Policy, please contact our customer service team for assistance.
        </p>
      </>
    ),
  },

  // ─────────────────────────────────────────────────────────────
  // 9. NOTHING X TERMS OF SERVICE (100% EXACT OFFICIAL LIVE DATA)
  // ─────────────────────────────────────────────────────────────
  {
    id: "nothing-x-terms-of-service",
    sidebarLabel: "Nothing X Terms of Service",
    title: "NOTHING X TERMS OF SERVICE",
    content: (
      <>
        <p>
          These Terms are entered into by and between you (or &ldquo;User&rdquo;) and Nothing Technology Limited or its affiliated companies (&ldquo;Nothing&rdquo; or &ldquo;we&rdquo;).
        </p>
        <p className="text-black">
          In order to use the Nothing X app, you should read and comply with the &ldquo;Terms of Service&rdquo; stipulated herein (hereinafter referred to as the &ldquo;Terms&rdquo;) . Please read the terms and conditions thoroughly and carefully, especially the bolded content, which will have a material effect on you. Your use of any of the services provided by Nothing X, such as downloading, installing, launching, browsing etc., is based on your acceptance of these Terms. If you do not agree to any part of these Terms, you shall not use or immediately cease using the Nothing X services.
        </p>
        <p className="text-black">
          The services we provide to you also require that you comply with other terms and conditions that we may update from time to time (including, but not limited to, <a href="https://www.nothingcmf.pk/pages/privacy-policy" className="underline hover:opacity-75">Nothing X Privacy Notice</a>, <a href="https://www.nothingcmf.pk/pages/terms-of-sales" className="underline hover:opacity-75">Terms of Sales</a>, <a href="https://www.nothingcmf.pk/pages/nothing-website-acceptable-use-policy" className="underline hover:opacity-75">Acceptable Use Policy</a>, <a href="https://www.nothingcmf.pk/pages/user-agreement" className="underline hover:opacity-75">User Agreement</a>), which constitute an integral part of the Terms governing your use of the Nothing X services. This Terms shall be legally binding between you and Nothing. In the event of any conflict or inconsistent terms, this Terms shall prevail.
        </p>

        <p className="text-black pt-2">Service Description</p>
        <p>
          Nothing X is an application that provides you with Nothing headphone connection setup service. You may log onto our Nothing X app by using your Nothing/Google/Apple account to remember your Nothing headphone setup information, or you may also enjoy the Nothing X app services anonymously.
        </p>
        <p>
          You may choose to join our improvement program so that you can help us build better products for you.
        </p>
        <p>
          We will also provide you with personalize your sound function together with our partner Mimi Hearing Technologies GmbH (&ldquo;Mimi&rdquo;) so that we can rely on the sound calibration from Mimi, which is based on the hearing test result, to further personalize your sound. For more information on Mimi test, please refer to https://mimi.io/privacy.
        </p>

        <p className="text-black pt-2">Privacy Policy</p>
        <p>
          We attach great importance to the protection of your privacy, and we will take effective measures to protect your privacy. In order to protect your personal information, we will adhere to our commitments and covenants in the Nothing X Privacy Notice. <span className="text-black">PLEASE REFER TO OUR <a href="https://www.nothingcmf.pk/pages/privacy-policy" className="underline hover:opacity-75">NOTHING X PRIVACY NOTICE</a> AS IT FORMS AN INTEGRAL PART OF THE TERMS.</span>
        </p>

        <p className="text-black pt-2">Restrictions on Use of the Services</p>
        <p>
          In addition to any other restrictions set forth in this Terms, and without limiting those restrictions, when using the Nothing X services, you agree not to (and not to attempt to):
        </p>
        <ol className="list-decimal pl-5 space-y-1.5 text-black">
          <li>make unauthorized copies of any content made available on or through the service;</li>
          <li>use any device, software or routine to interfere or attempt to interfere with the proper working of the services, or any activity conducted on the services;</li>
          <li>attempt to decipher, decompile, disassemble or reverse engineer any of the software or source code comprising or making up the services;</li>
          <li>delete or alter any material Nothing or any other person or entity posts on the services without authorization;</li>
          <li>frame or link to any of the materials or information available on the services;</li>
          <li>alter, deface, mutilate or otherwise bypass any approved software through which the services are made available;</li>
          <li>use any trademarks, service marks, design marks, logos, photographs or other content belonging to Nothing or obtained from the services;</li>
          <li>access, tamper with or use non-public areas of the services, Nothing&apos;s computer systems and infrastructure or the technical delivery systems of Nothing&apos;s providers;</li>
          <li>provide any false personal information to Nothing;</li>
          <li>create a false identity or impersonate another person or entity in any way;</li>
          <li>solicit, or attempt to solicit, personal information from other users of the services;</li>
          <li>restrict, discourage or inhibit any person from using the services, or threaten, harass, menace or intimidate Users of the services;</li>
          <li>use the services, without Nothing&apos;s express written consent, for any commercial or unauthorized purpose, including communicating or facilitating any commercial advertisement or solicitation or spamming;</li>
          <li>gain unauthorized access to the services, to other Users&apos; accounts, names or personally identifiable information, or to other computers or websites connected or linked to the services;</li>
          <li>post any virus, worm, spyware or any other computer code, file or program that may or is intended to disable, overburden, impair, damage or hijack the operation of any hardware, software or telecommunications equipment or any other aspect of the services or communications equipment and computers connected to the services; or</li>
          <li>interfere with or disrupt the services, networks or servers connected to the services or violate the regulations, policies or procedures of those networks or servers.</li>
        </ol>

        <p className="text-black pt-2">Disclaimer</p>
        <p>
          In no event shall we be liable for any failure or delay in performance due to normal maintenance of internet equipment, failure of internet connection, failure of computer communications or other systems, power failure, strikes, riots, acts of god (e.g. fire, flood, storm, etc.), explosions, war, government action, orders of judicial or administrative authorities, or any other force majeure events. As a User, you agree that you use the services and any content thereon at your own risk.
        </p>
        <p>
          Nothing does not warrant that the services will operate error free, or that the services and any content thereon are free of computer viruses or similar contamination or destructive features. If your use of the services or any content thereon results in the need for servicing or replacing equipment or data, Nothing will not be responsible for those costs.
        </p>
        <p>
          The services and all content thereon are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without any warranties of any kind. Accordingly, Nothing disclaims all warranties, including, but not limited to, the warranties of title, merchantability, non-infringement of third parties rights and fitness for particular purpose.
        </p>
        <p>
          You specifically acknowledge that Nothing shall not be liable for content or the defamatory, offensive, other illegal conduct of any third party and that the risk of harm or damage from the foregoing rests entirely with you.
        </p>

        <p className="text-black pt-2">Intellectual Property</p>
        <p>
          All information related to the App are owned by or legally authorized to Nothing, which include but not limited to all the intellectual property such as copyrights, trademark rights, patent rights and trade secrets, contained in the icons, graphics, images, diagrams, colors, interface design, layout frames, related data, additional programs or electronic files etc.
        </p>
        <p>
          Without the written approval of Nothing, you shall not grant, use, transfer or license any third party to grant, use and transfer the above-mentioned intellectual property for any profit or non-profit purposes and Nothing reserves the right to hold you responsible for the above-mentioned unauthorized actions.
        </p>

        <p className="text-black pt-2">Suspension &amp; Termination of the Service</p>
        <p>
          Nothing reserves the right to unilaterally change, suspend, restrict, terminate or revoke the application service at any time without any notice for all or part of the service content due to business development needs, and users need to accept this risk.
        </p>
        <p>
          Due to the rapid development of the Internet industry and the improvement of legislation, the existing Terms cannot guarantee to fully meet the needs of future development, and we may revise the Terms time to time. We will inform you by web announcement, App push or in-site letter, etc., and may ask you to re-authorise if necessary. The revised terms will automatically replace the version before. <span className="text-black">If you do not agree to all or part of the revised terms, please stop using Nothing X immediately. If you continue to use Nothing X after receiving any change notification, you are deemed to have accepted such modifications and shall be bound by the revised terms. You hereby agree that Nothing shall not be liable for modifying, abridging, or retaining the Nothing X service.</span>
        </p>

        <p className="text-black pt-2">Governing Law and Jurisdiction</p>
        <p>
          The Terms and any disputes arising under or in connection with it shall be governed by and construed in accordance with English law, without regard to its conflict of laws provisions. If there is any conflict between a provision of this Agreement and laws and regulations, the laws and regulations shall prevail.
        </p>
        <p>
          In the event of any dispute arising under or in connection with the Terms, the parties shall attempt, promptly and in good faith, to resolve such dispute. If no settlement can be reached, you and we both agree that the courts of England and Wales will have exclusive jurisdiction except that if you are a resident of Northern Ireland you may also bring proceedings in Northern Ireland, and if you are resident of Scotland, you may also bring proceedings in Scotland. The preceding provision regarding jurisdiction does not apply if you are a consumer based in the European Union. If you are a consumer based in the European Union, you may make a claim in the courts of the country where you reside. Claims under the Agreement must be brought within one year after the cause of action arising, or any such claim or cause of action shall be barred to the extent permitted by law.
        </p>

        <p className="text-black pt-2">Contact us</p>
        <p>
          If you have any questions regarding this Terms or its implementation, here is how you can reach us: <span className="text-black">Email Address: </span><a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:opacity-75">{CONTACT_EMAIL}</a>
        </p>
      </>
    ),
  },

  // ─────────────────────────────────────────────────────────────
  // 10. NOTHING X PRIVACY NOTICE (100% EXACT OFFICIAL LIVE DATA)
  // ─────────────────────────────────────────────────────────────
  {
    id: "nothing-x-privacy-notice",
    sidebarLabel: "Nothing X Privacy Notice",
    title: "NOTHING X PRIVACY NOTICE",
    content: (
      <>
        <p>
          We take your privacy very seriously and this Privacy Notice explains how Nothing Technology Limited or its affiliated companies (collectively, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collect, use, share and process your Personal Data when you are using the Nothing X app and relevant products and services. We are the &ldquo;data controller&rdquo; in respect of processing your Personal Data.
        </p>
        <p className="text-black">
          If you have any questions about this Privacy Notice, please contact us via contact details provided at the end of this Privacy Notice.
        </p>

        <p className=" text-black pt-2">1. What is Personal Data?</p>
        <p>
          Personal Data is information that can be used to directly or indirectly identify you. Personal Data does not include data that has been irreversibly anonymized or aggregated so that it can no longer enable us, whether in combination with other information or otherwise, to identify you.
        </p>

        <p className=" text-black pt-2">2. How and when we collect Personal Data about you</p>
        <p>We collect and process Personal Data when you:</p>
        <ul className="list-disc pl-5 space-y-1 text-black">
          <li>set up the Nothing X app;</li>
          <li>connect your Nothing X headphone with the Nothing X app;</li>
          <li>download a software update;</li>
          <li>contact our customer service or request information from us in any other way;</li>
          <li>participate in our improvement program and hearing test.</li>
        </ul>

        <p className=" text-black pt-2">3. What Personal Data we collect</p>
        <p className=" text-black">Data you directly provide to us:</p>
        <p>During your use of Nothing X app, we may collect and process the following Personal Data about you which you provide:</p>
        <ul className="list-disc pl-5 space-y-1 text-black">
          <li>basic information (such as your region and language);</li>
          <li>account information (such as password, email address, your Nothing account status, devices registered and other authentication information);</li>
        </ul>

        <p className=" text-black pt-2">Information we collect automatically through technology – including cookies and similar technologies</p>
        <p>
          We may also collect information from you automatically, for example using cookies and other similar technologies to enhance our ability to serve you. A cookie is a small file of letters and numbers that we may set on your device. Cookies generally only work with web browsers, but there are similar technologies that are used with apps.
        </p>
        <p className=" text-black">This type of information may include the following:</p>
        <ul className="list-disc pl-5 space-y-1 text-black">
          <li>type of device you use, your device&apos;s unique identifier, serial number or device ID;</li>
          <li>the IP address of your device, your operating system and browser type;</li>
          <li>usage information, product interaction, performance and diagnostic information, crash data, and location information from the devices which you have purchased or on which you install or access our products or services;</li>
          <li>information about your use of our offerings, for example to distinguish you from other users of our app, to remember your preferences to help us to provide you with a good experience when you use our offerings and also information that allows us to improve them;</li>
          <li>where available, our products and services may use GPS, your IP address, and other technologies to determine a device&apos;s approximate location to allow us to improve our products and services; and</li>
          <li>Headphone indentificator.</li>
        </ul>

        <p className=" text-black pt-2">Information we collect from third parties</p>
        <p>
          If you log onto our Nothing X app by using your Google or Apple account, we may receive information about you from these third-parties, such as your username, email address, and profile photo. We are not responsible for the content or practices of third-parties. We urge you to read the privacy policies of any third-party websites, applications or social media platforms you choose to use.
        </p>

        <p className=" text-black pt-2">4. How we use your Personal Data</p>
        <p>We may process your Personal Data for the following purposes:</p>
        <ul className="list-disc pl-5 space-y-1 text-black">
          <li>to provide, improve, and develop our products and services;</li>
          <li>to authenticate your access to our app, products and services and to distinguish you from other users (for example to remember your log-in details);</li>
          <li>to monitor your use of our app, products and services to improve the user experience and to ensure that content is presented in the most effective manner for you and for your device;</li>
          <li>to provide customer support and ensure we provide a good level of customer service;</li>
          <li>to personalize your services and communications where such options are available and you choose to use them;</li>
          <li>to ensure that our website, app, products and services are safe and secure; and</li>
          <li>to comply with applicable laws and regulations.</li>
        </ul>
        <p>
          If you no longer wish to receive email communications for marketing purposes, please contact us to opt-out or click the unsubscribe link within the email.
        </p>

        <p className=" text-black pt-2">5. Legal basis for processing your Personal Data</p>
        <p>
          We will only process your Personal Data where we have a legal basis to do so. The legal basis will depend on the purposes for which we have collected and use your Personal Data. In almost every case the legal basis will be one of the following:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-black">
          <li>
            <span>Consent:</span> For example, where you have provided your consent to receive certain marketing from us. You can withdraw your consent at any time, including by clicking on the &ldquo;unsubscribe&rdquo; link at the bottom of any marketing email we send you.
          </li>
          <li>
            <span>Our legitimate business interests:</span> Where it is necessary for us to understand our customers, promote our services and operate effectively provided in each case that this is done in a legitimate way which does not unduly affect your privacy and other rights. For example, we will rely on this legal basis when we conduct certain market analysis to understand our customers in sufficient detail so we can create new services and improve the profile of our brand.
          </li>
          <li>
            <span>Performance of a contract with you (or in order to take steps prior to entering into a contract with you):</span> For example, where you have purchased a product from us and we need to use your contact details and payment information in order to process your order and send the product to you.
          </li>
          <li>
            <span>Compliance with law:</span> Where we are subject to a legal obligation and need to use your Personal Data in order to comply with that obligation.
          </li>
        </ul>

        <p className=" text-black pt-2">6. Disclosure of Personal Data</p>
        <p>
          When you choose to participate in the hearing test within the Nothing X app, we make certain Personal Data available to our third-party partner Mimi Hearing Technologies GmbH (&ldquo;<span className="">Mimi</span>&rdquo;) to provide you with personalized sound function.
        </p>
        <p>The information that we shared with Mimi mainly includes:</p>
        <ul className="list-disc pl-5 space-y-1 text-black">
          <li>your device information used for the generation of testing results and sound calibration results (such as timestamp, IP address, headphone identificator, backend logs, and usage information when conducting the test); and</li>
        </ul>
        <p>
          In addition to the information we shared with Mimi, when conducting the hearing test, you may receive content provided by Mimi and Mimi will collect your interactions and behaviors to get the best user experience. You may choose whether to access links, content, products and services provided by Mimi, and we have no control over the privacy and data protection policies of Mimi. Please refer to the privacy policies of Mimi (<a href="https://mimi.io/privacy" target="_blank" rel="noopener noreferrer" className="underline  hover:opacity-75">https://mimi.io/privacy</a>) before submitting Personal Data to it.
        </p>

        <p className=" text-black pt-2">7. Data storage and transfer</p>
        <p>
          The Personal Data that we collect may be transferred to, and stored at, a destination outside the EEA or the UK, including countries, which have less strict, or no data protection laws, when compared to those in the EEA or the UK. Whenever we transfer your Personal Data in this way, we will take steps which are reasonably necessary to ensure that adequate safeguards are in place to protect your Personal Data and to make sure it is treated securely and in accordance with this privacy notice. In these cases, we rely on approved data transfer mechanisms (such as standard contractual clauses) to ensure your information is subject to adequate safeguards in the recipient country. If you are located in the UK or the EEA, you may contact us for a copy of the safeguards which we have put in place to protect your Personal Data and privacy rights in these circumstances.
        </p>

        <p className=" text-black pt-2">8. Your rights</p>
        <p>
          You have certain rights in relation to your Personal Data. These include: the right to object to the processing of your information for certain purposes, the right to access your Personal Data, and the ability to erase, restrict or receive a machine-readable copy of your Personal Data.
        </p>
        <p>
          We will handle any request to exercise your rights in accordance with applicable law and any relevant legal exemptions. If you wish to exercise any of these rights please contact us using the contact details below.
        </p>
        <p>
          You may also lodge a complaint with the UK&apos;s data protection authority (the ICO) regarding the processing of your Personal Data if you think we have processed your Personal Data in a manner which is unlawful or breaches your rights. If you have such concerns we request that you initially contact us (using the contact details below) so that we can investigate, and hopefully resolve, your concerns.
        </p>

        <p className=" text-black pt-2">9. Third-party websites and services</p>
        <p>
          When a customer operates a link to a third-party website that has a relationship with us, we do not assume any obligation or responsibility for such policy because of the third party&apos;s privacy policy. Our websites, products, and services may contain links to or the ability for you to access third-party websites, products, and services. We are not responsible for the privacy practices employed by those third parties, nor are we responsible for the information or content their products and services contain. This Privacy Notice applies solely to data collected by us through our Nothing X products and services. We encourage you to read the privacy policies of any third party before proceeding to use their websites, products, or services.
        </p>

        <p className=" text-black pt-2">10. Data retention</p>
        <p>
          We take steps to ensure that the Personal Data that you provide is retained for only as long as it is necessary for the purpose for which it was collected. After this period it will be deleted or in some cases anonymized unless a longer retention period is required or permitted by law.
        </p>

        <p className=" text-black pt-2">11. Changes to this Privacy Notice</p>
        <p>
          We may periodically change this Privacy Notice to keep pace with new technologies, industry practices, and regulatory requirements, among other reasons. The new privacy notice will be displayed on our website and app.
        </p>

        <p className=" text-black pt-2">12. Contact us</p>
        <p>
          If you have any questions regarding this Privacy Notice and its implementation, here is how you can reach us: <span className=" text-black">Email Address: </span><a href="mailto:privacy@nothing.tech" className="underline font-bold hover:opacity-75">privacy@nothing.tech</a>.
        </p>
      </>
    ),
  },

  // ─────────────────────────────────────────────────────────────
  // 11. SHIPPING POLICY (100% EXACT OFFICIAL LIVE DATA)
  // ─────────────────────────────────────────────────────────────
  {
    id: "shipping-policy",
    sidebarLabel: "Shipping Policy",
    title: "SHIPPING POLICY",
    content: (
      <>
        <p className="font-bold text-black">Shipping Policy</p>
        <p>
          <span className="font-bold text-black">11.1 Dispatch.</span> Orders are usually shipped within two (2) business days of payment. Orders made during promotional periods and special events, may have longer shipping times, at the discretion of Nothing. In such cases, customers will be separately informed in advance.
        </p>
        <p>
          <span className="font-bold text-black">11.2</span> A list of sales regions that we deliver Products can be found in our regional store guidelines.
        </p>
        <p>
          <span className="font-bold text-black">11.3</span> We will deliver the Product(s) to the delivery address you specify in your order. We will not deliver the Product(s) to your delivery address unless there is someone present to accept and sign for them.
        </p>
        <p>
          <span className="font-bold text-black">11.4 Inspection.</span> All Products are inspected and sealed before delivery to avoid damage.
        </p>
        <p>
          <span className="font-bold text-black">11.5 Status Updates.</span> Nothing will keep you updated on your order status via email. Orders cannot be cancelled once they have reached &ldquo;Shipped&rdquo; status.
        </p>
        <p>
          <span className="font-bold text-black">11.6 Shipping Time Calculation.</span> Shipping is calculated based on shipping address and shipping method. The following options can be selected during checkout:
        </p>
        <div className="pl-4 space-y-1.5 text-black">
          <p>
            (A) <span className="font-bold">Standard Shipping</span> (two (2) business days processing time + three (3) business days – five (5) business days)
          </p>
          <p>
            (B) <span className="font-bold">Priority Shipping</span> (two (2) business days processing time + one (1) business day – three (3) business days)
          </p>
        </div>
        <p>
          <span className="font-bold text-black">11.7</span> Please note that all delivery dates are estimates only. Additional charges will be necessary for shipping addresses in remote locations. We are unable to ship to PO Box and Military addresses.
        </p>
        <p>
          <span className="font-bold text-black">11.8</span> We will contact you with an estimated delivery date or to agree a delivery date.
        </p>
        <p>
          <span className="font-bold text-black">11.9</span> We do not recommend that you use the address of any mail forwarding companies when ordering Products for delivery, as Nothing will not be able to track logistics once the Products arrive at the forwarding company.
        </p>
        <p>
          <span className="font-bold text-black">11.10</span> Please note that the shipping times noted above may not be available in the following circumstances:
        </p>
        <div className="pl-4 space-y-1.5 text-black">
          <p>(A) if you schedule delivery at a fixed time;</p>
          <p>
            (B) where you provide incomplete or incorrect address information or fail to provide us with information that is necessary to provide you with your Product(s). Please note that we may end the contract if you do not give us this information within a reasonable time of us asking for it, or if you give us incomplete or incorrect information. We will not be responsible for supplying the Product(s) late or not supplying any part of them if this is caused by you not giving us the information we need within a reasonable time of us asking for it;
          </p>
          <p>(C) you are not at home or available at the time of delivery;</p>
          <p>
            (D) where delays are caused by events that are outside our control (for example, extreme weather conditions, stock shortages, or a failure of our communication systems). In these cases, we will contact you as soon as possible to let you know and we will take steps to minimise the effect of the delay. Provided we do this, we will not be liable for delays caused by the event. You may contact us about ending your contract or receiving a refund for any Product(s) which you have not received if there is a substantial delay in you receiving your Product(s).
          </p>
        </div>
      </>
    ),
  },

  // ─────────────────────────────────────────────────────────────
  // 12. RETURN AND REPLACEMENT POLICY (100% EXACT OFFICIAL LIVE DATA)
  // ─────────────────────────────────────────────────────────────
  {
    id: "return-and-replacement-policy",
    sidebarLabel: "Return and Replacement Policy",
    title: "RETURN AND REPLACEMENT POLICY",
    content: (
      <>
        <p className=" text-black">Return and Replacement Policy for Defective Product(s)</p>
        <p>
          <span className="font-bold text-black">10.1</span> This section does not apply to returns under the Limited Warranty or where you have changed your mind. Further details on making a claim under the Limited Warranty can be found in sections 6 (Warranty Policy) and 7 (Limited Warranty Exclusions) and further details on returns and cancellations where you have changed your mind can be found in section 9.4.
        </p>
        <p>
          <span className="font-bold text-black">10.2</span> If you wish to return a Product or get a replacement Product due to the original Product not being fit for the given purpose, of satisfactory quality, or not as described, please contact us using the details set out in the Contact Support section of our website <a href="https://www.nothingcmf.pk/support-centre" className="underline font-bold hover:opacity-75">https://www.nothingcmf.pk</a> describing the problem with your Product and why you consider it to be defective, damaged, or materially different. A member of the Nothing customer service team will then contact you about next steps.
        </p>
        <p>
          <span className="font-bold text-black">10.3</span> If, after inspection, we consider that a refund is due, we will process such refund as soon as possible and, in any case, within fourteen (14) days of the day you gave us notice to cancel.
        </p>
        <p>
          <span className="font-bold text-black">10.4</span> Please note that we may choose not to accept returns in certain situations, including, without limitation, the following circumstances:
        </p>
        <div className="pl-4 space-y-1.5 text-black">
          <p>(a) defects or damages caused by misuse, neglect, physical damage, tampering, incorrect adjustment, normal wear and tear or incorrect installation after purchase; and/or</p>
          <p>(b) where you purchase a customised Product, unless there is a defect with the customised Product.</p>
        </div>
        <p>
          <span className="font-bold text-black">10.5</span> In all cases, we will inspect the Product(s) and verify any fault.
        </p>
        <p>
          <span className="font-bold text-black">10.6</span> To qualify for a replacement or refund, devices must be undamaged, be in an otherwise ‘as new’ condition and, if possible, with the original packaging. We reserve the right to refuse a refund if the Product returned is reasonably deemed to have been damaged.
        </p>
        <p>
          <span className="font-bold text-black">10.7</span> If you contact us within thirty (30) days of delivery about a defective Product, you will have the option to select a repair, a replacement or a refund. If a fault is found after thirty (30) days from delivery of the Product(s), you should contact us by using the details set out in the Contact Support section of our website <a href="https://www.nothingcmf.pk/support-centre" className="underline font-bold hover:opacity-75">https://www.nothingcmf.pk</a> and we will either repair or replace the Product.
        </p>
        <p>
          <span className="font-bold text-black">10.8</span> This Returns and Replacements Policy does not affect your statutory rights under applicable law.
        </p>
      </>
    ),
  },

  // ─────────────────────────────────────────────────────────────
  // 13. PAY WITH KLARNA (100% EXACT OFFICIAL LIVE DATA)
  // ─────────────────────────────────────────────────────────────
  {
    id: "pay-with-klarna",
    sidebarLabel: "Pay with Klarna",
    title: "PAY WITH KLARNA",
    content: (
      <>
        <h3 className="text-[19px] sm:text-[21px] font-bold text-black">What is Klarna?</h3>
        <p>
          Klarna is a global payment service that allows you to split your payment into manageable chunks. With Klarna, you can purchase Nothing products right away and pay for them over time.
        </p>
        <p>
          <span className="font-bold">About Klarna:</span>{" "}
          <a href="https://www.klarna.com/uk/smoooth/" target="_blank" rel="noopener noreferrer" className="underline font-bold hover:opacity-75">
            https://www.klarna.com/uk/smoooth/
          </a>
        </p>

        <h3 className="text-[19px] sm:text-[21px] font-bold text-black pt-2">How does Klarna work?</h3>
        <p>Here&apos;s how you can Pay with Klarna:</p>
        <ul className="list-disc pl-5 space-y-1 text-black">
          <li>
            <span className="font-bold">Choose Klarna at Checkout:</span> Browse our range of innovative products, add your chosen item to the cart, and head over to the checkout. Choose Klarna as your payment method.
          </li>
          <li>
            <span className="font-bold">Flexible Payments:</span> Instead of paying the whole amount upfront, split your payment into smaller, more manageable chunks. Klarna allows you to pay in 3 or 4 equal installments, depending on your purchase amount in Europe and the United States.
          </li>
          <li>
            <span className="font-bold">Enjoy Now, Pay Later:</span> Confirm your purchase, receive your product, and start enjoying it right away. The payment will be automatically taken from your chosen payment method on the dates agreed upon.
          </li>
        </ul>

        <h3 className="text-[19px] sm:text-[21px] font-bold text-black pt-2">How Can I Contact Klarna Customer Service?</h3>
        <p>
          You can contact Klarna customer service{" "}
          <a href="https://www.klarna.com/uk/customer-service/" target="_blank" rel="noopener noreferrer" className="underline font-bold hover:opacity-75">
            here
          </a>.
        </p>

        <h3 className="text-[19px] sm:text-[21px] font-bold text-black pt-2">Klarna&apos;s Privacy Policy</h3>
        <p>
          The collection and use of this information is subject to the privacy policy located here:{" "}
          <a href="https://cdn.klarna.com/1.0/shared/content/legal/terms/0/en_gb/privacy" target="_blank" rel="noopener noreferrer" className="underline font-bold hover:opacity-75">
            Klarna&apos;s privacy policy
          </a>
        </p>
      </>
    ),
  },

  // ─────────────────────────────────────────────────────────────
  // 14. PRODUCT DATA INFORMATION (100% EXACT OFFICIAL LIVE DATA)
  // ─────────────────────────────────────────────────────────────
  {
    id: "product-data-information",
    sidebarLabel: "Product Data Information",
    title: "PRODUCT DATA INFORMATION",
    content: (
      <>
        <h3 className="text-[19px]  font-semibold text-black">
          Product data information for smartphones, earbuds, watches and the Nothing X app
        </h3>
        <p>
          <span className="font-bold text-black">Valid from:</span> September 12, 2025
        </p>
        <p>
          Pursuant to Article 3(2) of the EU Data Act (Regulation (EU) 2023/2854), this notice provides information about the product data that our connected products (Nothing smartphones, Nothing earbuds, CMF by Nothing smartphones, CMF by Nothing earbuds, CMF by Nothing watches) and the related service (Nothing X app) may generate, and how Nothing Technology Limited (&ldquo;Nothing&rdquo;) may use such data. It also explains how users can exercise Data Act rights to access and retrieve product data.
        </p>

        <h3 className="text-[19px]  font-semibold text-black">Scope &amp; definitions</h3>
        <div className="space-y-1 text-black">
          <p>
            <span className="font-bold">Connected products.</span> Nothing smartphones; Nothing earbuds; CMF by Nothing smartphones; CMF by Nothing earbuds; CMF by Nothing watches.
          </p>
          <p>
            <span className="font-bold">Related service.</span> The Nothing X app (used for pairing, settings and viewing device information).
          </p>
          <p>
            <span className="font-bold">Equipment Event Tracking data.</span> Device and connection events generated by device hardware and software (e.g., pairing status, connection events, battery state, error logs, etc.).
          </p>
        </div>

        <h1 className="text-[16px] leading-[32px] font-normal uppercase text-black font-ntype82-bold pt-4">1) Nothing and CMF by Nothing smartphones</h1>
        <p className="font-bold text-black">Data types.</p>
        <ul className="list-disc pl-5 space-y-1 text-black">
          <li>Equipment Event Tracking data.</li>
          <li>User personal data used by device features (e.g., email, GPS location, step count, screen usage time, etc.).</li>
          <li>Nothing account data (e.g., profile picture, nickname, including when logging in with a Google account, etc.).</li>
          <li>Health related data (e.g. heart rate, sleep information, etc.).</li>
          <li>Images users share via Shared widgets.</li>
          <li>Data associated with logging into Essential Space using a Nothing account and binding with IMEI (encrypted).</li>
          <li>Log data actively captured when users submit feedback.</li>
        </ul>
        <div className="space-y-1 pt-1 text-black">
          <p><span className="font-bold">Data format.</span> db, JSON, XML, Parquet.</p>
          <p><span className="font-bold">Estimated volume.</span> ~10 MB (varies by features used and settings).</p>
          <p><span className="font-bold">Real-time generation.</span> Yes—some telemetry and events may be generated continuously while the device is in use.</p>
          <p><span className="font-bold">Storage capability &amp; location.</span> Hybrid (on-device and Nothing&apos;s cloud backend).</p>
          <p className="font-bold pt-1">Retention.</p>
          <p>On-device: user personal data may be deleted by performing a factory reset.</p>
          <p>Cloud: Shared widgets images are automatically deleted after 15 days.</p>
          <p>Upon receiving a user&apos;s account deletion request (see &ldquo;Erasure&rdquo; below), associated Nothing account data is deleted on a monthly processing cycle.</p>
          <p className="font-bold pt-1">Erasure.</p>
          <p><span className="font-bold">Local:</span> perform a factory reset.</p>
          <p><span className="font-bold">Account/cloud:</span> request deletion by emailing privacy@nothing.tech. Deletions are carried out in accordance with our privacy policy.</p>
        </div>

        <h3 className="text-[16px] leading-[32px] font-normal uppercase text-black font-ntype82-bold pt-4">2) Nothing earbuds</h3>
        <div className="space-y-1 text-black">
          <p><span className="font-bold">Data types.</span> Equipment Event Tracking data. Bluetooth address, battery information, and connection status of the paired device.</p>
          <p><span className="font-bold">Data format.</span> hex.</p>
          <p><span className="font-bold">Estimated volume.</span> ~32 KB.</p>
          <p><span className="font-bold">Real-time generation.</span> No—generated only while in use.</p>
          <p><span className="font-bold">Storage capability &amp; location.</span> Hybrid (on-device and cloud).</p>
          <p className="font-bold pt-1">Retention.</p>
          <p><span className="font-bold">On-device:</span> data is deleted after restoring to factory settings, or is uploaded to Nothing X each time the earbuds connect to the app (after which on-device copies may be cleared per normal operation).</p>
          <p className="font-bold pt-1">Erasure.</p>
          <p><span className="font-bold">Local:</span> restore earbuds to factory settings (which clears local data).</p>
          <p><span className="font-bold">Cloud:</span> request deletion by emailing privacy@nothing.tech.</p>
        </div>

        <h3 className="text-[16px] leading-[32px] font-normal uppercase text-black font-ntype82-bold pt-4">3) CMF by Nothing earbuds</h3>
        <div className="space-y-1 text-black">
          <p><span className="font-bold">Data types.</span> Equipment Event Tracking data. Bluetooth address, battery information, and connection status of the paired device.</p>
          <p><span className="font-bold">Data format.</span> hex.</p>
          <p><span className="font-bold">Estimated volume.</span> ~32 KB.</p>
          <p><span className="font-bold">Real-time generation.</span> No—generated only while in use.</p>
          <p><span className="font-bold">Storage capability &amp; location.</span> Hybrid (on-device and cloud).</p>
          <p className="font-bold pt-1">Erasure.</p>
          <p><span className="font-bold">Local:</span> restore to factory settings.</p>
          <p><span className="font-bold">Cloud:</span> request deletion by emailing privacy@nothing.tech.</p>
        </div>

        <h3 className="text-[16px] leading-[32px] font-normal uppercase text-black font-ntype82-bold pt-4">4) CMF by Nothing watches</h3>
        <div className="space-y-1 text-black">
          <p><span className="font-bold">Data types.</span> Fitness and wellness metrics (e.g., calories, steps/stand hours, exercise duration, sleep, heart rate, blood oxygen, stress, VO₂ max, vitality score, exercise load).</p>
          <p><span className="font-bold">Data format.</span> JSON.</p>
          <p><span className="font-bold">Estimated volume.</span> About 10–30 (typical range; varies by model, sampling rate and feature usage).</p>
          <p><span className="font-bold">Real-time generation.</span> Yes.</p>
          <p><span className="font-bold">Storage capability &amp; location.</span> Hybrid (on-device and cloud).</p>
          <p className="font-bold pt-1">Retention.</p>
          <p><span className="font-bold">Cloud:</span> default retention 2 years.</p>
          <p><span className="font-bold">On-device:</span> deleted after clearing cache.</p>
          <p className="font-bold pt-1">Erasure.</p>
          <p><span className="font-bold">Local:</span> clear cache/reset watch.</p>
          <p><span className="font-bold">Cloud/account:</span> use the Nothing account deletion routes where applicable.</p>
        </div>

        <h3 className="text-[16px] leading-[32px] font-normal uppercase text-black font-ntype82-bold pt-4">5) Nothing X (related service)</h3>
        <div className="space-y-1 text-black">
          <p><span className="font-bold">Data types.</span> Equipment pairing records and Equipment Event Tracking data.</p>
          <p><span className="font-bold">Data format.</span> db, JSON, XML.</p>
          <p><span className="font-bold">Estimated volume.</span> About 0.5 MB per week (typical user).</p>
          <p><span className="font-bold">Real-time generation.</span> Yes—event tracking can be generated in real time.</p>
          <p><span className="font-bold">Storage capability &amp; location.</span> Hybrid (app data on device and Nothing cloud).</p>
          <p className="font-bold pt-1">Retention.</p>
          <p><span className="font-bold">Cloud:</span> default retention 2 years.</p>
          <p><span className="font-bold">On-device:</span> deleted after clearing app data.</p>
          <p className="font-bold pt-1">Erasure.</p>
          <p><span className="font-bold">Local:</span> restore to factory settings.</p>
          <p><span className="font-bold">Cloud:</span> request deletion by emailing privacy@nothing.tech.</p>
        </div>

        <h3 className="text-[16px] leading-[32px] font-normal uppercase text-black font-ntype82-bold pt-4">How Nothing may use product data</h3>
        <p>
          We use product/related service data for device functionality, updates, diagnostics, security, quality improvement, and to provide requested features and support in line with:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-black">
          <li><span className="font-bold">Nothing Privacy Policy</span> (<a href="https://www.nothingcmf.pk/pages/privacy-policy" className="underline font-bold hover:opacity-75">privacy-policy</a>), and</li>
          <li><span className="font-bold">Nothing X Privacy Notice</span> and <span className="font-bold">Nothing X Terms of Service</span> (<a href="https://www.nothingcmf.pk/pages/nothing-x-privacy-notice" className="underline font-bold hover:opacity-75">nothing-x-privacy-notice</a>; <a href="https://www.nothingcmf.pk/pages/nothing-x-terms-of-service" className="underline font-bold hover:opacity-75">nothing-x-terms-of-service</a>).</li>
        </ul>
        <p className="pt-1">
          <span className="font-bold">How to make a data access or retrieval request.</span> Email <a href="mailto:privacy@nothing.tech" className="underline font-bold hover:opacity-75">privacy@nothing.tech</a> with (i) proof of device ownership and account control; (ii) the product(s) and time period concerned; (iii) IMEI, SN, MAC, email and other information required.
        </p>

        <h3 className="text-[16px] leading-[32px] font-normal uppercase text-black font-ntype82-bold pt-4">User access &amp; retrieval summary</h3>
        <div className="space-y-1 text-black">
          <p><span className="font-bold">Access:</span></p>
          <p><span className="font-bold">Nothing and CMF by Nothing smartphones:</span> Request via privacy@nothing.tech</p>
          <p><span className="font-bold">Nothing and CMF by Nothing earbuds:</span> pairing/battery/connection information in Nothing X.</p>
          <p><span className="font-bold">CMF watches:</span> pairing/battery/connection information viewable in Nothing X.</p>
          <p><span className="font-bold">Nothing X app:</span> pairing information within the app.</p>
          <p className="font-bold pt-1">Retrieval:</p>
          <p>Request via privacy@nothing.tech</p>
          <p className="pt-1 text-black">This notice may be updated to reflect changes in products, services, or law.</p>
          <p><span className="font-bold">Last updated:</span> October 10, 2025.</p>
        </div>
      </>
    ),
  },
];
