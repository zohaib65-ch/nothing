"use client";

import * as React from "react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { ProductService } from "@/services/productService";
import { Product } from "@/types";
import { Loader } from "@/components/ui/loader";
import { getProductDisplayPrice } from "@/lib/utils";

const storeBenefits = [
  {
    title: "7 Days Return Policy",
    desc: "If there is a valid product issue, quick return and replacement support is available.",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M9 14 4 9l5-5" /> <path d="M4 9h10a6 6 0 1 1 0 12h-3" />
      </svg>
    ),
  },
  {
    title: "Free Delivery",
    desc: "Selected orders in major Pakistani cities can qualify for delivery support with clear confirmation before dispatch.",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 7h11v9H3z" /> <path d="M14 10h4l3 3v3h-7" />
        <path d="M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" /> <path d="M18 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      </svg>
    ),
  },
  {
    title: "Cash on Delivery",
    desc: "Cash on delivery keeps checkout simple, familiar, and easier to trust for customers across Pakistan.",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 7h16v10H4z" /> <path d="M8 12h.01" /> <path d="M16 12h.01" />
        <path d="M12 15a3 3 0 0 0 0-6 3 3 0 0 0 0 6Z" />
      </svg>
    ),
  },
  {
    title: "24/7 Support",
    desc: "Support is available for order updates, product guidance, and after-sales help.",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 12a8 8 0 0 1 16 0" />
        <path d="M4 12v4a2 2 0 0 0 2 2h1v-7H6a2 2 0 0 0-2 2Z" />
        <path d="M20 12v4a2 2 0 0 1-2 2h-1v-7h1a2 2 0 0 1 2 2Z" />
        <path d="M15 20h-3" />
      </svg>
    ),
  },
  {
    title: "100% Original Products",
    desc: "Listed products are presented with authentic sourcing and careful verification.",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m12 3 7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" />
        <path d="m8.5 12 2.2 2.2 4.8-5" />
      </svg>
    ),
  },
];

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
    q: "What is Nothing Pakistan?",
    a: "Nothing Pakistan is an online storefront operated by NOTHING OFFICIAL (SMC-PRIVATE) LIMITED, an SECP registered Pakistani company with CUIN 0337422. It focuses on Nothing phones, CMF accessories, chargers, protectors, earbuds, and shopping support for customers in Pakistan.",
  },
  {
    category: "general",
    q: "Is Nothing Pakistan a registered company?",
    a: "Yes. Nothing Pakistan is operated by NOTHING OFFICIAL (SMC-PRIVATE) LIMITED, an SECP registered Pakistani company with CUIN 0337422. Customers can view the Company Verification page and SECP certificate before buying.",
  },
  {
    category: "general",
    q: "What is the legal company name?",
    a: "The official registered company name behind the Nothing Pakistan storefront is NOTHING OFFICIAL (SMC-PRIVATE) LIMITED. The company details are published for transparency on the Company Verification page.",
  },
  {
    category: "general",
    q: "How can I verify the company?",
    a: "You can verify the company by checking the legal name, CUIN 0337422, incorporation date, and certificate PDF linked from the Company Verification page and footer.",
  },
  {
    category: "general",
    q: "Are prices on Nothing Pakistan shown in PKR?",
    a: "Yes, product prices on Nothing Pakistan are displayed in Pakistani Rupees so customers can review local pricing before placing an order.",
  },
  {
    category: "general",
    q: "Which cities does Nothing Pakistan serve?",
    a: "Nothing Pakistan serves customers across Pakistan through online ordering, including Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, and other major cities.",
  },
  {
    category: "products",
    q: "What products can I buy from Nothing Pakistan?",
    a: "You can browse Nothing and CMF chargers, cables, protectors, earbuds, and phone-related accessories through the live product catalog.",
  },
  {
    category: "products",
    q: "Does Nothing Pakistan sell CMF accessories too?",
    a: "Yes, Nothing Pakistan lists CMF audio and charging products alongside other compatible accessories for Pakistan shoppers.",
  },
  {
    category: "products",
    q: "Does Nothing Pakistan list earbuds and audio products?",
    a: "Yes, audio listings such as Nothing and CMF earbuds are available so users can compare options from one page.",
  },
  {
    category: "products",
    q: "Does Nothing Pakistan offer screen protection options?",
    a: "Yes, the store includes UV protectors, jelly sheets, and standard protectors for supported phones.",
  },
  {
    category: "orders",
    q: "How do I place an order on Nothing Pakistan?",
    a: "Open any product page or the order route, confirm the item you want, and submit your contact and delivery details through the checkout form.",
  },
  {
    category: "orders",
    q: "Does Nothing Pakistan offer cash on delivery?",
    a: "Yes, cash on delivery is available as a convenient payment option for customers who prefer paying at the time of delivery.",
  },
  {
    category: "orders",
    q: "How long does delivery usually take in Pakistan?",
    a: "Delivery timelines can vary by city and order confirmation timing, but customers should review the support and shipping guidance for the latest expectation.",
  },
  {
    category: "orders",
    q: "Does Nothing Pakistan have a return policy?",
    a: "Yes, the website highlights a 7 days return policy and also links to detailed return and refund information for customers.",
  },
  {
    category: "support",
    q: "How can I contact Nothing Pakistan support?",
    a: "You can contact support through the website support pages, WhatsApp contact route, and the available contact information shared across the store.",
  },
  {
    category: "support",
    q: "Does Nothing Pakistan have WhatsApp support?",
    a: "Yes, WhatsApp support is available so customers can quickly ask about products, order status, and compatibility before purchase.",
  },
  {
    category: "support",
    q: "Does Nothing Pakistan offer 24/7 support?",
    a: "The homepage highlights 24/7 support to reassure shoppers that help is available when they need order or product guidance.",
  },
  {
    category: "support",
    q: "What is the fastest way to reach the store team?",
    a: "For quick assistance, the WhatsApp contact route is one of the easiest ways to connect with the store team about shopping questions.",
  },
];

const verifiedReviews = [
  {
    name: "Hamza K.",
    city: "Lahore",
    product: "Nothing Phone (3a)",
    rating: 5,
    date: "Verified Buyer • 2 days ago",
    comment: "Original product with official box. Delivered within 24 hours in Lahore! Glyph lighting looks amazing in real life.",
  },
  {
    name: "Zain Ul Abideen",
    city: "Karachi",
    product: "CMF Power 65W GaN",
    rating: 5,
    date: "Verified Buyer • 4 days ago",
    comment: "Charges my Nothing Phone and MacBook simultaneously. Super fast 65W output with zero heating. Best purchase!",
  },
  {
    name: "Syed Shahmeer",
    city: "Islamabad",
    product: "CMF Buds Pro 2",
    rating: 5,
    date: "Verified Buyer • 1 week ago",
    comment: "The Smart Dial case control is super smooth and convenient. Crisp sound with deep bass.",
  },
  {
    name: "Bilal Ahmed",
    city: "Rawalpindi",
    product: "Ear (a)",
    rating: 5,
    date: "Verified Buyer • 1 week ago",
    comment: "Best Active Noise Cancellation in this budget. Yellow color looks super stylish and unique.",
  },
  {
    name: "Usman Ali",
    city: "Faisalabad",
    product: "Nothing USB-C Cable",
    rating: 5,
    date: "Verified Buyer • 2 weeks ago",
    comment: "Solid transparent strain relief build quality. Fast charging supported without warm up.",
  },
];

/* ───── COMPONENT ───── */
export default function HomePage() {
  const { addItem } = useCartStore();
  const [products, setProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [activeFaqCategory, setActiveFaqCategory] = React.useState("general");
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(null);
  const reviewsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setIsLoading(true);
    ProductService.fetchProductsFromApi("status=published")
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const rawGems = products.filter((p) => p.isFeatured).length > 0 ? products.filter((p) => p.isFeatured) : products.slice(0, 6);
  const selectedGems = getVariantCardsForListing(rawGems);
  const phoneModels = getVariantCardsForListing(products.filter((p) => p.category === "phones"));

  const filteredFaqs = allFaqs.filter((f) => f.category === activeFaqCategory);

  const scrollReviews = (dir: "left" | "right") => {
    reviewsRef.current?.scrollBy({ left: dir === "left" ? -350 : 350, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white text-[#111]">
      <div aria-hidden="true" className="site-dot-overlay" />

      {/* ═══════ 1 · HERO ═══════ */}
      <section className="relative flex h-screen min-h-[640px] max-h-[100svh] items-end overflow-hidden border-b border-black/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Nothing Phone 3 hero background"
          src="https://nothingshop.b-cdn.net/banner/nothing_pakistan.avif"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="relative z-10 flex h-full w-full px-4 pb-7 pt-24 sm:px-6 sm:pb-9 sm:pt-28 md:px-8 lg:pb-6 lg:pt-32">
          <div className="mx-auto flex h-full max-w-screen-2xl items-end">
            <div className="max-w-3xl text-black lg:max-w-2xl">
              <h1 className="dot-heading text-[1.18rem] leading-[0.98] tracking-[0.1em] text-black sm:text-[1.7rem] lg:text-[1.9rem]">
                Nothing & CMF Products in Pakistan
              </h1>
              <p className="mt-3 max-w-xl text-center font-sans text-[0.82rem] leading-6 text-black sm:mt-3 sm:max-w-xl sm:text-[0.95rem] sm:leading-6 lg:max-w-xl lg:text-[0.88rem] lg:leading-5">
                Shop Nothing and CMF phones, earbuds, chargers, cables, and accessories with live pricing, product details, and WhatsApp support
                through Nothing Pakistan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ 2 · SELECTED GEMS ═══════ */}
      <section className="border-b border-black/10 px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-screen-2xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-black/42"> Best Product Sale </p>
              <h2 className="collection-product-name mt-3 text-4xl leading-none text-black sm:text-5xl"> Selected Gems </h2>
            </div>
            <div className="hidden items-center gap-2 lg:flex">
              <button
                type="button"
                aria-label="Show previous selected gems"
                className="inline-flex h-11 w-11 items-center justify-center border border-black/10 bg-white text-black shadow-[0_14px_30px_rgba(17,17,17,0.08)] transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  {" "}
                  <path d="m14 6-6 6 6 6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />{" "}
                </svg>
              </button>
              <button
                type="button"
                aria-label="Show next selected gems"
                className="inline-flex h-11 w-11 items-center justify-center border border-black/10 bg-white text-black shadow-[0_14px_30px_rgba(17,17,17,0.08)] transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  {" "}
                  <path d="m10 6 6 6-6 6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />{" "}
                </svg>
              </button>
            </div>
          </div>

          {isLoading ? (
            <Loader />
          ) : (
            <>
              {/* Mobile: 2-col grid */}
              <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-9 lg:hidden">
                {selectedGems.map((p) => {
                  const isOutOfStock = p.inStock === false;
                  const CardContent = (
                    <article className={`flex h-full flex-col ${isOutOfStock ? "opacity-60 cursor-not-allowed select-none" : ""}`}>
                      <div className="relative overflow-hidden aspect-[4/5] rounded-xl flex items-center justify-center">
                        {isOutOfStock && (
                          <div className="absolute inset-0 z-30 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
                            <span className="bg-red-600 text-white font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                              OUT OF STOCK
                            </span>
                          </div>
                        )}
                        <img
                          alt={`${p.name} original product price in Pakistan from Nothing Pakistan`}
                          loading="lazy"
                          className={`absolute inset-0 h-full w-full object-contain object-center transition-transform duration-500 ease-out ${
                            !isOutOfStock ? "group-hover:scale-[1.02]" : "grayscale-[30%]"
                          }`}
                          src={p.image}
                        />
                      </div>
                      <div className="mt-3 text-center">
                        <h3 className="font-sans text-[0.98rem] sm:text-[1.04rem] leading-[1.12] text-black font-normal tracking-normal">{p.name}</h3>
                        <div className="mt-1">
                          {isOutOfStock ? (
                            <p className="text-[11px] text-red-600 font-mono font-bold uppercase tracking-wider">OUT OF STOCK</p>
                          ) : (
                            <>
                              <p className="text-[11px] text-black/62 font-[system-ui] font-normal"> Rs {p.price.toLocaleString()} </p>
                              {p.salePrice && p.salePrice > 0 && (
                                <p className="mt-0.5 text-[10px] text-black/65 line-through decoration-black/65 font-[system-ui] font-normal">
                                  {p.salePrice.toLocaleString()}
                                </p>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </article>
                  );

                  if (isOutOfStock) {
                    return (
                      <div key={p.id} className="group block cursor-not-allowed">
                        {CardContent}
                      </div>
                    );
                  }

                  return (
                    <Link key={p.id} className="group block" href={p.href}>
                      {CardContent}
                    </Link>
                  );
                })}
              </div>

              {/* Desktop: 5-col grid */}
              <div className="mt-8 hidden grid-cols-5 gap-x-7 gap-y-14 lg:grid">
                {selectedGems.map((p) => {
                  const isOutOfStock = p.inStock === false;
                  const CardContent = (
                    <article className={`flex h-full flex-col ${isOutOfStock ? "opacity-60 cursor-not-allowed select-none" : ""}`}>
                      <div className="relative overflow-hidden aspect-[4/5] rounded-xl flex items-center justify-center">
                        {isOutOfStock && (
                          <div className="absolute inset-0 z-30 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
                            <span className="bg-red-600 text-white font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-md">
                              OUT OF STOCK
                            </span>
                          </div>
                        )}
                        <img
                          alt={`${p.name} original product price in Pakistan from Nothing Pakistan`}
                          loading="lazy"
                          className={`absolute inset-0 h-full w-full object-contain object-center transition-transform duration-500 ease-out ${
                            !isOutOfStock ? "group-hover:scale-[1.02]" : "grayscale-[30%]"
                          }`}
                          src={p.image}
                        />
                      </div>
                      <div className="mt-3 text-center">
                        <h3 className="font-sans text-[0.98rem] sm:text-[1.04rem] leading-[1.12] text-black font-normal tracking-normal">{p.name}</h3>
                        <div className="mt-1">
                          {isOutOfStock ? (
                            <p className="text-[11px] text-red-600 font-mono font-bold uppercase tracking-wider">OUT OF STOCK</p>
                          ) : (
                            <>
                              <p className="text-[11px] text-black/62 font-[system-ui] font-normal"> Rs {p.price.toLocaleString()} </p>
                              {p.salePrice && p.salePrice > 0 && (
                                <p className="mt-0.5 text-[10px] text-black/65 line-through decoration-black/65 font-[system-ui] font-normal">
                                  {p.salePrice.toLocaleString()}
                                </p>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </article>
                  );

                  if (isOutOfStock) {
                    return (
                      <div key={p.id} className="group block cursor-not-allowed">
                        {CardContent}
                      </div>
                    );
                  }

                  return (
                    <Link key={p.id} className="group block" href={p.href}>
                      {CardContent}
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ═══════ 3 · CHOOSE YOUR MODEL ═══════ */}
      <section className="border-b border-black/10 bg-white px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="dot-heading text-[10px] tracking-[0.3em] text-black/42"> Phones </p>
            <h2 className="collection-product-name mt-4 text-4xl leading-none text-black sm:text-5xl lg:text-6xl"> Choose Your Model </h2>
            <p className="mt-5 font-sans text-[15px] leading-7 text-black/68 sm:text-base">
              {" "}
              Pick your Nothing or CMF phone and browse accessories that fit right, look clean, and are ready to order across Pakistan.
            </p>
          </div>

          {isLoading ? (
            <Loader />
          ) : (
            <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-5 lg:gap-5">
              {phoneModels.map((phone) => {
                const isOutOfStock = phone.inStock === false;
                const CardContent = (
                  <div
                    className={`flex flex-col h-full items-center justify-between w-full ${isOutOfStock ? "opacity-60 cursor-not-allowed select-none" : ""}`}
                  >
                    <div className="w-full">
                      <div className="relative mx-auto h-[215px] w-full max-w-[190px] sm:h-[265px] sm:max-w-[230px] lg:h-[365px] lg:max-w-[275px] bg-black/[0.01] rounded-2xl flex items-center justify-center">
                        {isOutOfStock && (
                          <div className="absolute inset-0 z-30 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
                            <span className="bg-red-600 text-white font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-md">
                              OUT OF STOCK
                            </span>
                          </div>
                        )}
                        <img
                          alt={phone.name}
                          loading="lazy"
                          className={`absolute inset-0 h-full w-full scale-[1.08] object-contain object-center transition-transform duration-500 ease-out ${
                            !isOutOfStock ? "group-hover:scale-[1.12] lg:scale-[1.12] lg:group-hover:scale-[1.16]" : "grayscale-[30%]"
                          }`}
                          src={phone.image}
                        />
                      </div>
                    </div>
                    <div className="w-full text-center mt-4">
                      <p className="font-sans font-normal mx-auto min-h-[2.5rem] w-full text-center text-[0.92rem] leading-[1.25] text-black/78 sm:min-h-[2.8rem] sm:text-[1rem] lg:min-h-[3rem] lg:text-[1.08rem]">
                        {phone.name}
                      </p>
                      {isOutOfStock && <p className="text-[11px] text-red-600 font-mono font-bold uppercase tracking-wider -mt-2">OUT OF STOCK</p>}
                    </div>
                  </div>
                );

                if (isOutOfStock) {
                  return (
                    <div
                      key={phone.id}
                      className="group flex min-h-[270px] flex-col items-start justify-between rounded-[28px] bg-transparent p-1 sm:min-h-[330px] lg:min-h-[455px] lg:p-2 cursor-not-allowed"
                    >
                      {CardContent}
                    </div>
                  );
                }

                return (
                  <Link
                    key={phone.id}
                    className="group flex min-h-[270px] flex-col items-start justify-between rounded-[28px] bg-transparent p-1 transition duration-300 hover:-translate-y-1 sm:min-h-[330px] lg:min-h-[455px] lg:p-2"
                    aria-label={`Open ${phone.name}`}
                    href={phone.href}
                  >
                    {CardContent}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ═══════ 4 · WHAT VERIFIED BUYERS SAY ═══════ */}
      <section className="border-b border-black/10 px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-screen-2xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-black/42"> Reviews </p>
              <h2 className="collection-product-name mt-3 text-4xl leading-none text-black sm:text-5xl"> What Verified Buyers Say </h2>
            </div>
            <div className="hidden items-center gap-2 lg:flex">
              <button
                type="button"
                onClick={() => scrollReviews("left")}
                aria-label="Scroll left"
                className="inline-flex h-11 w-11 items-center justify-center border border-black/10 bg-white text-black shadow-[0_14px_30px_rgba(17,17,17,0.08)] transition hover:bg-black hover:text-white"
              >
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  {" "}
                  <path d="m14 6-6 6 6 6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />{" "}
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollReviews("right")}
                aria-label="Scroll right"
                className="inline-flex h-11 w-11 items-center justify-center border border-black/10 bg-white text-black shadow-[0_14px_30px_rgba(17,17,17,0.08)] transition hover:bg-black hover:text-white"
              >
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  {" "}
                  <path d="m10 6 6 6-6 6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />{" "}
                </svg>
              </button>
            </div>
          </div>

          <div
            ref={reviewsRef}
            className="mt-8 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {verifiedReviews.map((r, idx) => (
              <article
                key={idx}
                className="min-w-[300px] sm:min-w-[360px] max-w-[380px] shrink-0 snap-start rounded-[8px] border border-black/8 bg-white p-5 sm:p-6"
              >
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(r.rating)].map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      {" "}
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />{" "}
                    </svg>
                  ))}
                </div>
                <p className="mt-3 text-[13px] leading-6 text-black/78 sm:text-sm">& ldquo; {r.comment}& rdquo; </p>
                <div className="mt-5 flex items-center justify-between border-t border-black/8 pt-4">
                  <div>
                    <p className="text-[13px] text-black"> {r.name} </p>
                    <p className="mt-0.5 text-[10px] tracking-[0.08em] text-black/50">
                      {" "}
                      {r.city} • {r.product}{" "}
                    </p>
                  </div>
                  <span className="text-[9px] tracking-[0.08em] text-black/40"> {r.date} </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ 5 · WHY PEOPLE ORDER — inter-only-scope ═══════ */}
      <section className="border-b border-black/10 px-4 py-12 md:px-8 md:py-16">
        <div style={{ fontFamily: "'interMedium', 'interLight', 'Arial', sans-serif" }}>
          <div className="mx-auto max-w-screen-2xl">
            <div className="max-w-3xl">
              <p className="text-[10px] uppercase tracking-[0.3em] text-black/42"> Store Benefits </p>
              <h2 className="mt-3 text-3xl leading-tight text-black sm:text-4xl"> Why people order from Nothing Pakistan </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-black/64 sm:text-[15px]">
                {" "}
                Clear pricing, fast replies, and simple help for choosing the right Nothing and CMF accessories in Pakistan.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-5">
              {storeBenefits.map((b, i) => (
                <article key={i} className="rounded-[8px] border border-black/8 bg-white p-4 sm:p-5">
                  <div className="flex h-10 w-10 items-center justify-center text-black/82">{b.icon}</div>
                  <h3 className="mt-4 text-[15px] leading-6 text-black sm:text-base"> {b.title} </h3>
                  <p className="mt-2 text-[12px] leading-6 text-black/62 sm:text-[13px]"> {b.desc} </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ 6 · FAQS ═══════ */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-[10px] uppercase tracking-[0.3em] text-black/42"> Nothing Pakistan FAQs </p>
            <h2 className="collection-product-name mt-3 text-4xl leading-none text-black sm:text-5xl"> Frequently asked questions </h2>
            <p className="mt-4 font-sans text-[15px] leading-7 text-black/70">
              {" "}
              Quick answers about shopping Nothing accessories, CMF earbuds, chargers, protectors, orders, delivery, returns, and support in Pakistan.
            </p>
          </div>

          <div className="mt-8">
            {/* Category tab pills */}
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Nothing Pakistan FAQ categories">
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
    </div>
  );
}
