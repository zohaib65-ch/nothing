"use client";

import * as React from "react";

interface VerificationClientProps {
  whatsappNumber: string;
  faqs: { question: string; answer: string }[];
}

export function VerificationClient({ whatsappNumber, faqs }: VerificationClientProps) {
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen text-[#111] font-ntype82">
      {/* ─── Hero Section ─────────────────────────────────── */}
      <section className="w-full pt-48 pb-10 px-6">
        <div className="mx-auto w-full max-w-[940px]">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.18em] leading-none text-black/46">Company Verification</p>
          <h1 className="font-ntype82 text-[clamp(2.2rem,4vw,3.2rem)] font-normal leading-[1.05] tracking-[-0.03em] text-black max-w-[660px]">
            Nothing CMF Pakistan is a registered Pakistani company.
          </h1>
          <p className="mt-6 font-ntype82 text-base leading-[1.55] text-black/60 max-w-[660px]">
            Nothing & CMF were brought to Pakistan by Software Suite as its official distributor, operated by NOTHING OFFICIAL (SMC-PRIVATE) LIMITED
            (www.nothingcmf.pk). The company is registered with the Securities and Exchange Commission of Pakistan under CUIN 0337422.
          </p>
        </div>
      </section>

      {/* ─── Page Content ─────────────────────────────────── */}
      <div className="mx-auto w-full max-w-[940px] px-6 md:px-6 py-10 lg:px-0">
        {/* Section 1: Registration Details */}
        <section className="mt-[78px] lg:mt-[104px] first:mt-0" aria-labelledby="company-registration-title">
          <h2 id="company-registration-title" className="font-ntype82 text-[30px] font-normal leading-none tracking-normal text-black">
            Registration Details
          </h2>
          <div className="mt-[42px] border-t border-dotted border-[#111]">
            <table className="w-full border-collapse font-ntype82 text-base leading-[1.45]">
              <tbody>
                <tr className="flex flex-col md:table-row w-full border-b border-dotted border-[#111]">
                  <th className="block md:table-cell text-left pt-5 pb-0 md:py-6 md:w-[34%] md:pr-6 font-normal text-black/50">Legal Company Name</th>
                  <td className="block md:table-cell pt-2 pb-5 md:py-6 text-black/78 break-all md:break-normal">
                    NOTHING OFFICIAL (SMC-PRIVATE) LIMITED
                  </td>
                </tr>
                <tr className="flex flex-col md:table-row w-full border-b border-dotted border-[#111]">
                  <th className="block md:table-cell text-left pt-5 pb-0 md:py-6 md:w-[34%] md:pr-6 font-normal text-black/50">CUIN</th>
                  <td className="block md:table-cell pt-2 pb-5 md:py-6 text-black/78 break-all md:break-normal">0337422</td>
                </tr>
                <tr className="flex flex-col md:table-row w-full border-b border-dotted border-[#111]">
                  <th className="block md:table-cell text-left pt-5 pb-0 md:py-6 md:w-[34%] md:pr-6 font-normal text-black/50">
                    Registered Authority
                  </th>
                  <td className="block md:table-cell pt-2 pb-5 md:py-6 text-black/78 break-all md:break-normal">
                    Securities and Exchange Commission of Pakistan
                  </td>
                </tr>
                <tr className="flex flex-col md:table-row w-full border-b border-dotted border-[#111]">
                  <th className="block md:table-cell text-left pt-5 pb-0 md:py-6 md:w-[34%] md:pr-6 font-normal text-black/50">Incorporation Date</th>
                  <td className="block md:table-cell pt-2 pb-5 md:py-6 text-black/78 break-all md:break-normal">16 May 2026</td>
                </tr>
                <tr className="flex flex-col md:table-row w-full border-b border-dotted border-[#111]">
                  <th className="block md:table-cell text-left pt-5 pb-0 md:py-6 md:w-[34%] md:pr-6 font-normal text-black/50">Company Type</th>
                  <td className="block md:table-cell pt-2 pb-5 md:py-6 text-black/78 break-all md:break-normal">SMC-Private Limited</td>
                </tr>
                <tr className="flex flex-col md:table-row w-full border-b border-dotted border-[#111]">
                  <th className="block md:table-cell text-left pt-5 pb-0 md:py-6 md:w-[34%] md:pr-6 font-normal text-black/50">Country</th>
                  <td className="block md:table-cell pt-2 pb-5 md:py-6 text-black/78 break-all md:break-normal">Pakistan</td>
                </tr>
                <tr className="flex flex-col md:table-row w-full border-b border-dotted border-[#111]">
                  <th className="block md:table-cell text-left pt-5 pb-0 md:py-6 md:w-[34%] md:pr-6 font-normal text-black/50">Website</th>
                  <td className="block md:table-cell pt-2 pb-5 md:py-6 text-black/78 break-all md:break-normal">
                    <a href="https://www.nothingcmf.pk/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      https://www.nothingcmf.pk/
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: Certificate of Incorporation */}
        <section className="mt-[78px] lg:mt-[104px]" aria-labelledby="company-certificate-title">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-7 lg:gap-[60px] items-start">
            <div>
              <h2 id="company-certificate-title" className="font-ntype82 text-[30px] font-normal leading-none tracking-normal text-black">
                Certificate of Incorporation
              </h2>
              <p className="mt-6 max-w-[660px] font-ntype82 text-base leading-[1.55] text-black/70">
                The certificate is available below for customers who want to confirm the company registration. You can view it in the preview or open
                the PDF in a new tab.
              </p>
            </div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://cdn.nothingshop.pk/nothing-official-pakistan-secp-certificate.pdf"
              className="inline-flex min-h-[56px] w-full max-w-[320px] items-center justify-center border border-[#111] rounded-full text-[#111] font-mono text-[13px] tracking-[0.12em] leading-[1.15] text-center uppercase transition-all duration-200 hover:bg-[#111] hover:text-white"
            >
              View SECP Certificate
            </a>
          </div>
          <div className="mt-[42px] overflow-hidden border border-dotted border-[#111] bg-white">
            <iframe
              title="SECP certificate for NOTHING OFFICIAL SMC Private Limited"
              src="https://cdn.nothingshop.pk/nothing-official-pakistan-secp-certificate.pdf"
              loading="lazy"
              className="block w-full h-[420px] md:h-[520px] border-0 bg-white"
            />
          </div>
        </section>

        {/* Section 3: What this means for customers */}
        <section className="mt-[78px] lg:mt-[104px]" aria-labelledby="company-meaning-title">
          <h2 id="company-meaning-title" className="font-ntype82 text-[30px] font-normal leading-none tracking-normal text-black">
            What this means for customers
          </h2>
          <div className="mt-[42px] space-y-6 max-w-[660px] font-ntype82 text-base leading-[1.55] text-black/70">
            <p>
              When you shop from Nothing CMF Pakistan (www.nothingcmf.pk), you are dealing with a named Pakistani company, not an anonymous page. The
              registered company name, CUIN, contact details, and certificate are published openly for transparency.
            </p>
            <p>
              Company registration verifies the Pakistani business identity. Product availability, pricing, delivery, returns, and support are still
              handled through the product pages, checkout, WhatsApp, and policy pages.
            </p>
          </div>
        </section>

        {/* Section 4: Registered Company Card */}
        <section className="mt-[78px] lg:mt-[104px] bg-[#111] text-white p-6 md:p-[34px]" aria-label="Registered company contact details">
          <p className="font-mono text-xs uppercase tracking-[0.18em] leading-none text-white/56">Registered Company</p>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-9 gap-y-6 mt-[30px]">
            <div className="flex flex-col">
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/46">Name</dt>
              <dd className="mt-2 font-ntype82 text-base leading-[1.45] text-white/86">NOTHING OFFICIAL (SMC-PRIVATE) LIMITED</dd>
            </div>
            <div className="flex flex-col">
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/46">CUIN</dt>
              <dd className="mt-2 font-ntype82 text-base leading-[1.45] text-white/86">0337422</dd>
            </div>
            <div className="flex flex-col">
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/46">Website</dt>
              <dd className="mt-2 font-ntype82 text-base leading-[1.45] text-white/86">
                <a href="https://www.nothingcmf.pk/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  https://www.nothingcmf.pk/
                </a>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/46">WhatsApp Support</dt>
              <dd className="mt-2 font-ntype82 text-base leading-[1.45] text-white/86">
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/\+/g, "").replace(/\s/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {whatsappNumber}
                </a>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/46">Email</dt>
              <dd className="mt-2 font-ntype82 text-base leading-[1.45] text-white/86">
                <a href="mailto:Contact@nothingofficial.pk" className="hover:underline">
                  Contact@nothingofficial.pk
                </a>
              </dd>
            </div>
          </dl>
        </section>

        {/* Section 5: Popular Questions (FAQs) */}
        <section className="mt-[90px] lg:mt-[132px]" id="company-verification-faqs" aria-labelledby="company-faq-title">
          <h2 id="company-faq-title" className="font-ntype82 text-[clamp(1.35rem,2vw,1.85rem)] font-normal leading-none tracking-normal text-black">
            Popular Questions
          </h2>
          <div className="mt-6">
            <div
              className="h-3 w-full"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(17,17,17,0.9) 1.15px, transparent 1.35px)",
                backgroundPosition: "left center",
                backgroundRepeat: "repeat-x",
                backgroundSize: "7px 4px",
              }}
            />
            {faqs.map((faq, i) => (
              <article key={i} className="py-4 md:py-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-6">
                  <h3 className="max-w-[900px] font-ntype82 text-[clamp(0.82rem,1.05vw,1rem)] font-normal leading-[1.35] text-black">
                    {faq.question}
                  </h3>
                  <button
                    type="button"
                    onClick={() => toggleFaq(i)}
                    className="shrink-0 text-left font-ntype82 text-[clamp(0.78rem,1vw,0.95rem)] font-normal leading-none text-[#35548b] transition-opacity hover:opacity-70"
                    aria-expanded={expandedIndex === i}
                  >
                    ( {expandedIndex === i ? "Read Less" : "Read More"} )
                  </button>
                </div>
                {expandedIndex === i && <p className="mt-4 max-w-[900px] font-ntype82 text-sm leading-7 text-black/68">{faq.answer}</p>}
                <div
                  className="mt-4 h-3 w-full md:mt-5"
                  style={{
                    backgroundImage: "radial-gradient(circle, rgba(17,17,17,0.9) 1.15px, transparent 1.35px)",
                    backgroundPosition: "left center",
                    backgroundRepeat: "repeat-x",
                    backgroundSize: "7px 4px",
                  }}
                />
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
