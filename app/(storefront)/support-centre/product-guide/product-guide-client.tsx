"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useProductStore } from "@/store/useProductStore";
import { getValidImageUrl } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface DbProductItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  image?: string;
  images?: string[];
  status?: string;
}

const CATEGORIES = [
  { key: "all", label: "ALL" },
  { key: "phones", label: "Phones" },
  { key: "audio", label: "Audio" },
  { key: "wearables", label: "Wearables" },
  { key: "charger", label: "Charger" },
] as const;

// Verified 200 HTTP high-resolution curated cover images mapped by exact product slug
const GUIDE_COVER_IMAGES: Record<string, string> = {
  // Phones
  "phone-4a-pro": "https://checkout.nothing.tech/cdn/shop/files/Phone_4a_Pro.jpg?v=1772767194",
  "phone-4a": "https://checkout.nothing.tech/cdn/shop/files/Phone_4a.jpg?v=1772767193",
  "phone-4b": "https://checkout.nothing.tech/cdn/shop/files/phone_4b_product_guide.jpg?v=1782976467",
  "phone-3": "https://checkout.nothing.tech/cdn/shop/files/phone-3.jpg?v=1752560157",
  "phone-3a-lite": "https://checkout.nothing.tech/cdn/shop/files/Product_Guide_Cover.jpg?v=1761705498",
  "phone-3a-pro": "https://checkout.nothing.tech/cdn/shop/files/Arc_Pro_-_Suport_Product_Guide_1080_x_1080_px.png?v=1741244526",
  "phone-3a": "https://checkout.nothing.tech/cdn/shop/files/Arc_-_Suport_Product_Guide_1080_x_1080_px.png?v=1741244524",
  "phone2a-plus": "https://checkout.nothing.tech/cdn/shop/files/nothing-phone-2a-plus.png?v=1724741471",
  "phone-2a-plus": "https://checkout.nothing.tech/cdn/shop/files/nothing-phone-2a-plus.png?v=1724741471",
  "phone-2a": "https://checkout.nothing.tech/cdn/shop/files/phone2a_0708.jpg?v=1720522361",
  "phone-2": "https://checkout.nothing.tech/cdn/shop/files/Phone2_0708.jpg?v=1720522374",
  "phone-1": "https://checkout.nothing.tech/cdn/shop/files/Phone1_0708.png?v=1720522381",
  "cmf-phone-2-pro": "https://checkout.nothing.tech/cdn/shop/files/Support_Guide_-_Bulbasaur.jpg?v=1745899666",
  "cmf-phone-1": "https://checkout.nothing.tech/cdn/shop/files/2048x1352_Buy_Page_-_Black_Phone_-_1_copy_0708.png?v=1720522490",

  // Audio (from Excel Sheet)
  "headphone-a": "https://checkout.nothing.tech/cdn/shop/files/Headphone_a.jpg?v=1772767193",
  "headphone-1": "https://checkout.nothing.tech/cdn/shop/files/headphone-1.jpg?v=1752560155",
  "ear-3a": "https://checkout.nothing.tech/cdn/shop/files/ear_3a_product_guide.jpg?v=1782976449",
  "ear-3": "https://checkout.nothing.tech/cdn/shop/files/ear_3.jpg?v=1758595503",
  "ear-open": "https://checkout.nothing.tech/cdn/shop/files/ear_open_8876ba0d-7f88-43a3-bb49-3bf9483afe4b.jpg?v=1758530404",
  "ear-a": "https://checkout.nothing.tech/cdn/shop/files/Eara_0708.jpg?v=1720522390",
  "ear": "https://checkout.nothing.tech/cdn/shop/files/Ear_0708.jpg?v=1720522395",
  "ear-2": "https://checkout.nothing.tech/cdn/shop/files/Ear2_0708.jpg?v=1720522401",
  "ear-1": "https://checkout.nothing.tech/cdn/shop/files/Ear1_0708.png?v=1720522412",
  "ear-stick": "https://checkout.nothing.tech/cdn/shop/files/Earstick_0708.png?v=1720522416",
  "cmf-clip-pro": "https://checkout.nothing.tech/cdn/shop/files/CMF_Clip_Pro.jpg?v=1785833931",
  "cmf-buds-2-plus": "https://checkout.nothing.tech/cdn/shop/files/Support_Guide_-_Gilgar.jpg?v=1745899665",
  "cmf-buds-2a": "https://checkout.nothing.tech/cdn/shop/files/Support_Guide_-_hoothoot.jpg?v=1745899666",
  "cmf-buds-2": "https://checkout.nothing.tech/cdn/shop/files/Support_Guide_-_Gira.jpg?v=1744883278",
  "cmf-headphone-pro": "https://checkout.nothing.tech/cdn/shop/files/headphone_pro.jpg?v=1758595508",
  "cmf-buds-pro-2": "https://checkout.nothing.tech/cdn/shop/files/CMF-Buds-Pro-2_Dark-Grey_2_copy_0708.png?v=1720522440",
  "cmf-buds-pro": "https://checkout.nothing.tech/cdn/shop/files/CMF-Buds-Pro_Dark-Grey_2_copy_0708.png?v=1720522447",
  "cmf-buds": "https://checkout.nothing.tech/cdn/shop/files/CMF-Buds_Dark-Grey_2_copy_0708.png?v=1720522461",
  "cmf-neckband-pro": "https://checkout.nothing.tech/cdn/shop/files/CMF-Neckband-Pro_Dark-Grey_4_copy_0708.png?v=1720522466",

  // Wearables (from Excel Sheet)
  "cmf-watch-3-pro": "https://checkout.nothing.tech/cdn/shop/files/Group_1_690d7045-41f5-4da8-be9b-892fcc34a5a8.png?v=1753777096",
  "cmf-watch-pro-2": "https://checkout.nothing.tech/cdn/shop/files/CMF-Watch-Pro-2_Dark-Grey_2_copy_0708.png?v=1720522472",
  "cmf-watch-pro": "https://checkout.nothing.tech/cdn/shop/files/CMF-Watch-Pro_Dark-Grey_2_copy_0708.png?v=1720522481",

  // Chargers
  "power-45w": "https://checkout.nothing.tech/cdn/shop/files/CMF_Power_65W_GaN_Dark_Grey_UK_1_copy_0708.png?v=1720522503",
};

const EXACT_PHONE_ORDER = [
  "phone-4a-pro",
  "phone-4a",
  "phone-4b",
  "phone-3",
  "phone-3a-lite",
  "phone-3a-pro",
  "phone-3a",
  "phone2a-plus",
  "phone-2a-plus",
  "phone-2a",
  "phone-2",
  "phone-1",
  "cmf-phone-2-pro",
  "cmf-phone-1",
];

const EXACT_AUDIO_ORDER = [
  "headphone-a",
  "headphone-1",
  "ear-3a",
  "ear-3",
  "ear-open",
  "ear-a",
  "ear",
  "ear-2",
  "ear-1",
  "ear-stick",
  "cmf-clip-pro",
  "cmf-buds-2-plus",
  "cmf-buds-2a",
  "cmf-buds-2",
  "cmf-headphone-pro",
  "cmf-buds-pro-2",
  "cmf-buds-pro",
  "cmf-buds",
  "cmf-neckband-pro",
];

const EXACT_WEARABLES_ORDER = [
  "cmf-watch-3-pro",
  "cmf-watch-pro-2",
  "cmf-watch-pro",
];

interface ProductGuideClientProps {
  dbProducts?: DbProductItem[];
}

function formatDisplayName(name: string, cat: string, slug?: string): string {
  const trimmed = (name || "").trim();
  const s = (slug || "").toLowerCase();
  if (cat === "phones") {
    if (trimmed.startsWith("Phone (") || trimmed.startsWith("Phone(")) {
      return `Nothing ${trimmed}`;
    }
    return trimmed;
  }
  if (cat === "audio") {
    if (
      (trimmed.startsWith("Ear") || trimmed.startsWith("Headphone")) &&
      !trimmed.startsWith("Nothing") &&
      !trimmed.startsWith("CMF")
    ) {
      return `Nothing ${trimmed}`;
    }
  }
  if (cat === "charger" || s === "power-45w") {
    return "Power (45W)";
  }
  return trimmed;
}

function getAccurateCategory(
  name: string,
  category?: string,
  slug?: string
): "phones" | "audio" | "wearables" | "charger" | null {
  const n = (name || "").toLowerCase();
  const c = (category || "").toLowerCase();
  const s = (slug || "").toLowerCase();

  // 1. Exclude accessories, apparel, cases, protectors, cables, straps, etc.
  if (
    n.includes("protector") ||
    n.includes("screen") ||
    n.includes("case") ||
    n.includes("cover") ||
    n.includes("glass") ||
    n.includes("film") ||
    n.includes("strap") ||
    n.includes("lanyard") ||
    n.includes("cable") ||
    n.includes("t-shirt") ||
    n.includes("hoodie") ||
    n.includes("apparel") ||
    n.includes("tote") ||
    n.includes("labcoat") ||
    n.includes("tracksuit") ||
    n.includes("cap") ||
    n.includes("cushion") ||
    n.includes("lenses") ||
    n.includes("wallet") ||
    s.includes("case") ||
    s.includes("cover") ||
    s.includes("protector") ||
    s.includes("wallet") ||
    s.includes("lenses") ||
    s.includes("cable") ||
    s.includes("cushion") ||
    s.includes("strap") ||
    c.includes("protector") ||
    c.includes("case") ||
    c.includes("apparel") ||
    c.includes("accessories") ||
    c.includes("other")
  ) {
    return null;
  }

  // 2. Charger: ONLY Power (45W) is shown
  if (
    s === "power-45w" ||
    n === "power (45w)" ||
    n === "power 45w" ||
    n.includes("power (45w)") ||
    n.includes("power 45w")
  ) {
    return "charger";
  }

  if (
    n.includes("power") ||
    n.includes("charger") ||
    n.includes("gan") ||
    n.includes("adapter") ||
    c.includes("charger")
  ) {
    return null;
  }

  // 3. Wearables (Watches)
  if (
    EXACT_WEARABLES_ORDER.includes(s) ||
    n.includes("watch") ||
    c.includes("watch") ||
    c.includes("wearable")
  ) {
    return "wearables";
  }

  // 4. Audio (Earbuds, Headphones, Buds, Neckbands)
  if (
    EXACT_AUDIO_ORDER.includes(s) ||
    n.includes("ear") ||
    n.includes("headphone") ||
    n.includes("bud") ||
    n.includes("neckband") ||
    c.includes("audio")
  ) {
    return "audio";
  }

  // 5. Phones (Only official phones)
  if (
    EXACT_PHONE_ORDER.includes(s) ||
    s.startsWith("phone") ||
    s.startsWith("cmf-phone") ||
    n.includes("phone")
  ) {
    return "phones";
  }

  return null;
}

const CATEGORY_ORDER: Record<string, number> = {
  phones: 1,
  audio: 2,
  wearables: 3,
  charger: 4,
};

export function ProductGuideClient({ dbProducts = [] }: ProductGuideClientProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const { products: storeProducts } = useProductStore();

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Consolidate DB products and store products
  const displayItems = React.useMemo(() => {
    const map = new Map<string, { id: string; name: string; slug: string; category: "phones" | "audio" | "wearables" | "charger"; image: string; fallbackImage?: string }>();

    // 1. Process server-passed DB products
    dbProducts.forEach((p) => {
      if (!p.slug) return;
      const cleanSlug = p.slug.trim().toLowerCase();
      const cat = getAccurateCategory(p.name, p.category, p.slug);
      if (!cat) return;
      const displayName = formatDisplayName(p.name, cat, p.slug);
      const dbImage = p.image || p.images?.[0] || "";
      const primaryImage = GUIDE_COVER_IMAGES[cleanSlug] || dbImage || "";
      map.set(cleanSlug, {
        id: p.id || cleanSlug,
        name: displayName,
        slug: p.slug,
        category: cat,
        image: getValidImageUrl(primaryImage),
        fallbackImage: getValidImageUrl(dbImage),
      });
    });

    // 2. Process any client-side Zustand store products if not already in map
    storeProducts.forEach((p) => {
      if (!p.slug) return;
      const cleanSlug = p.slug.trim().toLowerCase();
      if (!map.has(cleanSlug)) {
        const cat = getAccurateCategory(p.name, p.category, p.slug);
        if (!cat) return;
        const displayName = formatDisplayName(p.name, cat, p.slug);
        const storeImage = p.images?.[0] || p.variants?.[0]?.image || "";
        const primaryImage = GUIDE_COVER_IMAGES[cleanSlug] || storeImage || "";
        map.set(cleanSlug, {
          id: p.id || cleanSlug,
          name: displayName,
          slug: p.slug,
          category: cat,
          image: getValidImageUrl(primaryImage),
          fallbackImage: getValidImageUrl(storeImage),
        });
      }
    });

    // Sort items: Phones on top sorted by EXACT_PHONE_ORDER, then Audio sorted by EXACT_AUDIO_ORDER, Wearables, Charger
    return Array.from(map.values()).sort((a, b) => {
      const orderA = CATEGORY_ORDER[a.category] || 99;
      const orderB = CATEGORY_ORDER[b.category] || 99;
      if (orderA !== orderB) return orderA - orderB;

      // If both are phones, sort by the exact phone sequence
      if (a.category === "phones" && b.category === "phones") {
        const idxA = EXACT_PHONE_ORDER.indexOf(a.slug.toLowerCase());
        const idxB = EXACT_PHONE_ORDER.indexOf(b.slug.toLowerCase());
        const posA = idxA === -1 ? 999 : idxA;
        const posB = idxB === -1 ? 999 : idxB;
        return posA - posB;
      }

      // If both are audio, sort by the exact audio sequence from Excel
      if (a.category === "audio" && b.category === "audio") {
        const idxA = EXACT_AUDIO_ORDER.indexOf(a.slug.toLowerCase());
        const idxB = EXACT_AUDIO_ORDER.indexOf(b.slug.toLowerCase());
        const posA = idxA === -1 ? 999 : idxA;
        const posB = idxB === -1 ? 999 : idxB;
        return posA - posB;
      }

      // If both are wearables, sort by the exact wearables sequence from Excel
      if (a.category === "wearables" && b.category === "wearables") {
        const idxA = EXACT_WEARABLES_ORDER.indexOf(a.slug.toLowerCase());
        const idxB = EXACT_WEARABLES_ORDER.indexOf(b.slug.toLowerCase());
        const posA = idxA === -1 ? 999 : idxA;
        const posB = idxB === -1 ? 999 : idxB;
        return posA - posB;
      }

      return 0;
    });
  }, [dbProducts, storeProducts]);

  const filteredItems = React.useMemo(() => {
    return displayItems.filter((item) => {
      const matchCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchSearch = searchQuery.trim()
        ? item.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        item.slug.toLowerCase().includes(searchQuery.toLowerCase().trim())
        : true;
      return matchCategory && matchSearch;
    });
  }, [displayItems, selectedCategory, searchQuery]);

  const selectedCategoryLabel =
    CATEGORIES.find((c) => c.key === selectedCategory)?.label || "ALL";

  return (
    <div data-hide-dots="true" className="min-h-screen text-[#111] pt-20 bg-[#f4f4f2]">
      {/* ─── Page Title Header ───────────────────────────────── */}
      <div className="mx-auto max-w-[1140px] px-5 sm:px-8 md:px-10 pt-10 sm:pt-14 pb-8">
        <p className="italic text-black/60 text-sm sm:text-base font-serif mb-3">
          NOTHING (R) Support Centre
        </p>
        <h1 className="font-ntype82-bold text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.05] tracking-[-0.02em] text-black">
          Product Guide
        </h1>

        {/* Dotted border separator */}
        <div className="mt-6 sm:mt-8 pb-4 border-b border-dotted border-black">
          <p className="text-base sm:text-lg text-black">
            Tips &amp; tricks, quick-start manuals and more.
          </p>
        </div>

        {/* ─── Category Filter Selector ──────────────────────── */}
        <div className="mt-8 relative" ref={dropdownRef}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Custom Dropdown Selector */}
            <div className="relative w-full max-w-[220px]">
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="w-full rounded-full border border-black bg-transparent flex items-center justify-between px-5 text-left font-ntype text-sm sm:text-base text-black transition-colors hover:bg-black/5 cursor-pointer"
              >
                <span className="font-medium  tracking-wider">
                  {selectedCategoryLabel}
                </span>
                <ChevronDown
                  className={`size-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-full border border-black rounded-lg bg-[#f4f4f2] shadow-xl z-50 overflow-hidden">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.key}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setSelectedCategory(cat.key);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-5 py-3 text-left text-sm font-ntype flex items-center transition-colors border-b border-black/10 last:border-b-0 cursor-pointer ${selectedCategory === cat.key
                        ? "bg-black text-white"
                        : "text-black hover:bg-black/10"
                        }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Product Cards Grid ──────────────────────────────── */}
      <div className="mx-auto max-w-[1140px] px-5 sm:px-8 md:px-10 pb-24 sm:pb-32">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white/50 rounded-lg border border-black/10">
            <p className="font-ntype text-lg text-black/60">
              No products found matching &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 inline-block text-sm underline text-[#04326f] hover:opacity-75 cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <ProductGuideCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductGuideCard({
  item,
}: {
  item: { id: string; name: string; slug: string; image: string; fallbackImage?: string };
}) {
  const [imgSrc, setImgSrc] = React.useState(item.image);
  const href = `/products/${item.slug}`;

  React.useEffect(() => {
    setImgSrc(item.image);
  }, [item.image]);

  return (
    <div className="group flex flex-col">
      {/* Image Card Box */}
      <Link
        href={href}
        className="relative aspect-square w-full rounded-md overflow-hidden bg-[#ECECEC] flex items-center justify-center transition-all duration-300 group-hover:shadow-md"
      >
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={item.name}
            fill
            onError={() => {
              if (item.fallbackImage && imgSrc !== item.fallbackImage) {
                setImgSrc(item.fallbackImage);
              }
            }}
            className="object-cover p-0 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
          />
        ) : (
          <div className="text-xs text-neutral-400 font-mono">NO IMAGE</div>
        )}
      </Link>

      {/* Product Title & Link */}
      <div className="mt-4 flex flex-col items-start">
        <Link
          href={href}
          className="font-ntype text-lg sm:text-xl font-normal text-black hover:text-black/80 transition-colors leading-tight"
        >
          {item.name}
        </Link>

        <Link
          href={href}
          className="mt-2 text-sm sm:text-base font-normal underline underline-offset-4 hover:opacity-75 transition-opacity"
          style={{ color: "#04326f" }}
        >
          ( Read More )
        </Link>
      </div>
    </div>
  );
}
