import type { Metadata } from "next";
import { getPublishedProducts } from "@/lib/data/products";
export const dynamic = "force-dynamic";
import { getVariantCardsForListing } from "@/lib/utils";
import { HomeProductsSection } from "./home-products-section";
import { HomeReviewsCarousel } from "./home-reviews-carousel";
import { HomeFaqSection } from "./home-faq-section";

export const metadata: Metadata = {
  title: "Nothing & CMF Products in Pakistan | Nothing CMF Pakistan",
  description:
    "Shop Nothing and CMF phones, earbuds, chargers, cables, and accessories with live pricing, product details, and WhatsApp support through Nothing CMF Pakistan.",
  alternates: {
    canonical: "https://www.nothingcmf.pk",
  },
  openGraph: {
    title: "Nothing & CMF Products in Pakistan | Nothing CMF Pakistan",
    description:
      "Shop Nothing and CMF phones, earbuds, chargers, cables, and accessories with live pricing, product details, and WhatsApp support through Nothing CMF Pakistan.",
    url: "https://www.nothingcmf.pk",
    images: [
      {
        url: "/nothing_pakistan.avif",
        width: 1200,
        height: 630,
        alt: "Nothing CMF Pakistan — Shop Nothing & CMF Products",
      },
    ],
  },
};

/* ───── STATIC DATA ───── */

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

const verifiedReviews = [
  {
    name: "Hamza K.",
    city: "Lahore",
    product: "Nothing Phone (3a)",
    rating: 4.5,
    date: "Verified Buyer • 2 days ago",
    comment: "Official box, delivered in 24 hours. Glyph lighting looks amazing in real life.",
  },
  {
    name: "Zain Ul Abideen",
    city: "Karachi",
    product: "CMF Power 65W GaN",
    rating: 5,
    date: "Verified Buyer • 4 days ago",
    comment: "Charges Phone and MacBook together. Super fast 65W with zero heating. Best purchase!",
  },
  {
    name: "Syed Shahmeer",
    city: "Islamabad",
    product: "CMF Buds Pro 2",
    rating: 4,
    date: "Verified Buyer • 1 week ago",
    comment: "Smart Dial control is super smooth and convenient. Crisp sound with deep bass.",
  },
  {
    name: "Bilal Ahmed",
    city: "Rawalpindi",
    product: "Ear (a)",
    rating: 5,
    date: "Verified Buyer • 1 week ago",
    comment: "Best ANC in this budget. Yellow color is super stylish and turns heads everywhere.",
  },
  {
    name: "Usman Ali",
    city: "Faisalabad",
    product: "Nothing USB-C Cable",
    rating: 4.5,
    date: "Verified Buyer • 2 weeks ago",
    comment: "Solid transparent build quality. Fast charging works perfectly without any warm up.",
  },
  {
    name: "Ali Raza",
    city: "Multan",
    product: "Nothing Phone (3a) Pro",
    rating: 5,
    date: "Verified Buyer • 3 days ago",
    comment: "Pro camera upgrade is genuinely impressive. Fast delivery and packed beautifully.",
  },
  {
    name: "Sara Noor",
    city: "Lahore",
    product: "CMF Watch Pro 2",
    rating: 4.5,
    date: "Verified Buyer • 5 days ago",
    comment: "Battery lasts 5 days easily. Fitness tracking accurate and display is crisp.",
  },
  {
    name: "Fahad Mirza",
    city: "Karachi",
    product: "Nothing Ear (open)",
    rating: 5,
    date: "Verified Buyer • 1 week ago",
    comment: "Open-ear design is comfortable all day. Sound quality is clear without blocking world.",
  },
  {
    name: "Hassan Tariq",
    city: "Islamabad",
    product: "CMF Buds Pro 2",
    rating: 4,
    date: "Verified Buyer • 10 days ago",
    comment: "Great value buds. ANC blocks traffic noise well and bass is punchy for the price.",
  },
  {
    name: "Maryam Sheikh",
    city: "Peshawar",
    product: "Nothing Phone (3a)",
    rating: 5,
    date: "Verified Buyer • 2 weeks ago",
    comment: "Phone exceeded expectations. Glyph alerts are practical and the camera is brilliant.",
  },
];

/* ───── SERVER COMPONENT ───── */

export default async function HomePage() {
  // Fetch products server-side — no client-side loading spinner needed
  const products = await getPublishedProducts();

  // Compute listing card data on the server
  const rawGems =
    products.filter((p) => p.isFeatured).length > 0
      ? [...products.filter((p) => p.isFeatured)].sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime())
      : products.slice(0, 6);
  const selectedGems = getVariantCardsForListing(rawGems);
  const phoneModels = getVariantCardsForListing(products.filter((p) => p.category === "phones"));

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white text-[#111]">
      <section className="relative flex h-screen min-h-[640px] max-h-[100svh] items-end overflow-hidden">
        <img
          alt="Nothing Phone 3 hero background"
          src="https://nothingshop.b-cdn.net/banner/nothing_pakistan.avif"
          fetchPriority="high"
          loading="eager"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="relative z-10 flex h-full w-full items-end justify-center px-4 pb-7 pt-24 sm:px-6 sm:pb-9 sm:pt-28 md:px-8 lg:pb-8">
          <div className="mx-auto flex w-full max-w-screen-2xl items-end justify-center">
            <div className="max-w-2xl text-center rounded-2xl bg-white/80 backdrop-blur-md border border-white/60 p-5 sm:p-7 shadow-lg text-black">
              <h1 className="dot-heading text-[1.18rem] leading-[1.05] tracking-[0.1em] text-black sm:text-[1.6rem] lg:text-[1.85rem]">
                Nothing & CMF Products in Pakistan
              </h1>
              <p className="mt-3 max-w-xl mx-auto font-ntype82 text-[0.82rem] leading-relaxed text-black/80 sm:text-[0.92rem] lg:text-[0.88rem]">
                Shop Nothing and CMF phones, earbuds, chargers, cables, and accessories with live pricing, product details, and WhatsApp support
                through Nothing CMF Pakistan.
              </p>
            </div>
          </div>
        </div>
      </section>
      <HomeProductsSection selectedGems={selectedGems} phoneModels={phoneModels} />
      <HomeReviewsCarousel reviews={verifiedReviews} />
      <section className="border-b border-black/10 px-4 py-12 md:px-8 md:py-16">
        <div style={{ fontFamily: "'interMedium', 'interLight', 'Arial', sans-serif" }}>
          <div className="mx-auto max-w-screen-2xl">
            <div className="max-w-3xl">
              <p className="text-[10px] uppercase tracking-[0.3em] text-black/42"> Store Benefits </p>
              <h2 className="collection-product-name mt-3 text-3xl  leading-tight text-black sm:text-4xl">
                Why people order from Nothing CMF Pakistan{" "}
              </h2>
              <p className="mt-3 font-ntype82 text-sm leading-7 text-black/64 sm:text-[15px]">
                Clear pricing, fast replies, and simple help for choosing the right Nothing and CMF accessories in Pakistan.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-5">
              {storeBenefits.map((b, i) => (
                <article key={i} className="rounded-[8px] border font-ntype82 border-black/8 bg-white p-4 sm:p-5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center text-black/82">{b.icon}</div>
                    <h3 className="text-[13px] leading-snug text-black sm:text-[14px]">{b.title}</h3>
                  </div>
                  <p className="mt-3 text-[12px] leading-6 text-black/62 sm:text-[13px]">{b.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <HomeFaqSection />
    </div>
  );
}
