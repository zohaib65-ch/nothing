"use client";

import * as React from "react";

/* ───── FAQ DATA ───── */

const faqCategories = [
  {
    id: "general",
    label: "General",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {" "}
        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" /> <path d="M12 8v4" /> <path d="M12 16h.01" />{" "}
      </svg>
    ),
  },
  {
    id: "products",
    label: "Products",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {" "}
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />{" "}
      </svg>
    ),
  },
  {
    id: "orders",
    label: "Orders & Delivery",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {" "}
        <path d="M3 7h11v9H3z" /> <path d="M14 10h4l3 3v3h-7" /> <path d="M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />{" "}
        <path d="M18 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />{" "}
      </svg>
    ),
  },
  {
    id: "support",
    label: "Support",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {" "}
        <path d="M4 12a8 8 0 0 1 16 0" /> <path d="M4 12v4a2 2 0 0 0 2 2h1v-7H6a2 2 0 0 0-2 2Z" />{" "}
        <path d="M20 12v4a2 2 0 0 1-2 2h-1v-7h1a2 2 0 0 1 2 2Z" />{" "}
      </svg>
    ),
  },
];

const allFaqs = [
  {
    category: "general",
    q: "What is Nothing CMF Pakistan?",
    a: "Nothing CMF Pakistan is an online storefront operated by NOTHING OFFICIAL (SMC-PRIVATE) LIMITED, an SECP registered Pakistani company with CUIN 0337422. It focuses on Nothing phones, CMF accessories, chargers, protectors, earbuds, and shopping support for customers in Pakistan.",
  },
  {
    category: "general",
    q: "Is Nothing CMF Pakistan a registered company?",
    a: "Yes. Nothing CMF Pakistan is operated by NOTHING OFFICIAL (SMC-PRIVATE) LIMITED, an SECP registered Pakistani company with CUIN 0337422. Customers can view the Company Verification page and SECP certificate before buying.",
  },
  {
    category: "general",
    q: "What is the legal company name?",
    a: "The official registered company name behind the Nothing CMF Pakistan storefront is NOTHING OFFICIAL (SMC-PRIVATE) LIMITED. The company details are published for transparency on the Company Verification page.",
  },
  {
    category: "general",
    q: "How can I verify the company?",
    a: "You can verify the company by checking the legal name, CUIN 0337422, incorporation date, and certificate PDF linked from the Company Verification page and footer.",
  },
  {
    category: "general",
    q: "Who brought Nothing to Pakistan?",
    a: "Nothing was brought to Pakistan by Software Suite as its official distributor, establishing sales, distribution, and local support for Nothing phones and CMF accessories.",
  },
  {
    category: "general",
    q: "Is Software Suite the distributor of Nothing in Pakistan?",
    a: "Yes, Software Suite is the distributor behind Nothing in Pakistan, operating Nothing CMF Pakistan and NOTHING OFFICIAL (SMC-PRIVATE) LIMITED for authentic distribution and customer support.",
  },
  {
    category: "general",
    q: "Are prices on Nothing CMF Pakistan shown in PKR?",
    a: "Yes, product prices on Nothing CMF Pakistan are displayed in Pakistani Rupees so customers can review local pricing before placing an order.",
  },
  {
    category: "general",
    q: "Which cities does Nothing CMF Pakistan serve?",
    a: "Nothing CMF Pakistan serves customers across Pakistan through online ordering, including Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, and other major cities.",
  },
  {
    category: "products",
    q: "What products can I buy from Nothing CMF Pakistan?",
    a: "You can browse Nothing and CMF chargers, cables, protectors, earbuds, and phone-related accessories through the live product catalog.",
  },
  {
    category: "products",
    q: "Does Nothing CMF Pakistan sell CMF accessories too?",
    a: "Yes, Nothing CMF Pakistan lists CMF audio and charging products alongside other compatible accessories for Pakistan shoppers.",
  },
  {
    category: "products",
    q: "Does Nothing CMF Pakistan list earbuds and audio products?",
    a: "Yes, audio listings such as Nothing and CMF earbuds are available so users can compare options from one page.",
  },
  {
    category: "products",
    q: "Does Nothing CMF Pakistan offer screen protection options?",
    a: "Yes, the store includes UV protectors, jelly sheets, and standard protectors for supported phones.",
  },
  {
    category: "orders",
    q: "How do I place an order on Nothing CMF Pakistan?",
    a: "Open any product page or the order route, confirm the item you want, and submit your contact and delivery details through the checkout form.",
  },
  {
    category: "orders",
    q: "Does Nothing CMF Pakistan offer cash on delivery?",
    a: "Yes, cash on delivery is available as a convenient payment option for customers who prefer paying at the time of delivery.",
  },
  {
    category: "orders",
    q: "How long does delivery usually take in Pakistan?",
    a: "Delivery timelines can vary by city and order confirmation timing, but customers should review the support and shipping guidance for the latest expectation.",
  },
  {
    category: "orders",
    q: "Does Nothing CMF Pakistan have a return policy?",
    a: "Yes, the website highlights a 7 days return policy and also links to detailed return and refund information for customers.",
  },
  {
    category: "support",
    q: "How can I contact Nothing CMF Pakistan support?",
    a: "You can contact support through the website support pages, WhatsApp contact route, and the available contact information shared across the store.",
  },
  {
    category: "support",
    q: "Does Nothing CMF Pakistan have WhatsApp support?",
    a: "Yes, WhatsApp support is available so customers can quickly ask about products, order status, and compatibility before purchase.",
  },
  {
    category: "support",
    q: "Does Nothing CMF Pakistan offer 24/7 support?",
    a: "The homepage highlights 24/7 support to reassure shoppers that help is available when they need order or product guidance.",
  },
  {
    category: "support",
    q: "What is the fastest way to reach the store team?",
    a: "For quick assistance, the WhatsApp contact route is one of the easiest ways to connect with the store team about shopping questions.",
  },
];

/* ───── COMPONENT ───── */

export function HomeFaqSection() {
  const [activeFaqCategory, setActiveFaqCategory] = React.useState("general");
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(null);

  const filteredFaqs = allFaqs.filter((f) => f.category === activeFaqCategory);

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-[10px] uppercase tracking-[0.3em] text-black/42"> Nothing CMF Pakistan FAQs </p>
          <h2 className="collection-product-name mt-3 text-4xl leading-none text-black sm:text-5xl"> Frequently asked questions </h2>
          <p className="mt-4 font-ntype82 text-[15px] leading-7 text-black/70">
            Quick answers about shopping Nothing accessories, CMF earbuds, chargers, protectors, orders, delivery, returns, and support in Pakistan.
          </p>
        </div>

        <div className="mt-8">
          {/* Category tab pills */}
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Nothing CMF Pakistan FAQ categories">
            {faqCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeFaqCategory === cat.id}
                onClick={() => {
                  setActiveFaqCategory(cat.id);
                  setOpenFaqIndex(null);
                }}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.24em] transition-colors ${activeFaqCategory === cat.id ? "bg-black text-white" : "bg-black/[0.04] text-black/72 hover:bg-black/[0.08]"}`}
              >
                {cat.icon}
                <span> {cat.label} </span>
              </button>
            ))}
          </div>

          {/* FAQ accordion */}
          <div className="mt-6 space-y-2">
            {filteredFaqs.map((faq, idx) => (
              <details
                key={`${activeFaqCategory}-${idx}`}
                open={openFaqIndex === idx}
                className="group rounded-[8px] border border-black/8 bg-white [&[open]_.accordion-minus]:flex [&[open]_.accordion-plus]:hidden"
              >
                <summary
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
                  }}
                  className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-sm text-black select-none"
                >
                  <span>{faq.q} </span>
                  <span className="shrink-0 text-black/40">
                    <svg className="accordion-plus h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      {" "}
                      <path d="M12 5v14M5 12h14" />{" "}
                    </svg>
                    <svg className="accordion-minus hidden h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      {" "}
                      <path d="M5 12h14" />{" "}
                    </svg>
                  </span>
                </summary>
                {openFaqIndex === idx && <div className="px-5 pb-5 text-[13px] leading-7 text-black/68">{faq.a}</div>}
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
