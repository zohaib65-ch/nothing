"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useProductStore } from "@/store/useProductStore";
import { slugify } from "@/lib/utils";
import { ChevronDown, Search } from "lucide-react";

export interface DbProductItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  image?: string;
  status?: string;
}

interface ProductGuideItem {
  id: string;
  name: string;
  category: "phones" | "audio" | "wearables" | "charger";
  image: string;
  slugFallback: string;
}

const OFFICIAL_NOTHING_PRODUCTS: ProductGuideItem[] = [
  // ─── Phones ──────────────────────────────────────────
  {
    id: "phone-4a-pro",
    name: "Nothing Phone (4a) Pro",
    category: "phones",
    image: "https://checkout.nothing.tech/cdn/shop/files/Phone_4a_Pro.jpg?v=1772767194",
    slugFallback: "nothing-phone-4a-pro",
  },
  {
    id: "phone-4a",
    name: "Nothing Phone (4a)",
    category: "phones",
    image: "https://checkout.nothing.tech/cdn/shop/files/Phone_4a.jpg?v=1772767193",
    slugFallback: "nothing-phone-4a",
  },
  {
    id: "phone-4b",
    name: "Nothing Phone (4b)",
    category: "phones",
    image: "https://checkout.nothing.tech/cdn/shop/files/phone_4b_product_guide.jpg?v=1782976467",
    slugFallback: "nothing-phone-4b",
  },
  {
    id: "phone-3",
    name: "Nothing Phone (3)",
    category: "phones",
    image: "https://checkout.nothing.tech/cdn/shop/files/phone-3.jpg?v=1752560157",
    slugFallback: "nothing-phone-3",
  },
  {
    id: "phone-3a-lite",
    name: "Nothing Phone (3a) Lite",
    category: "phones",
    image: "https://checkout.nothing.tech/cdn/shop/files/Product_Guide_Cover.jpg?v=1761705498",
    slugFallback: "nothing-phone-3a-lite",
  },
  {
    id: "phone-3a-pro",
    name: "Nothing Phone (3a) Pro",
    category: "phones",
    image: "https://checkout.nothing.tech/cdn/shop/files/Arc_Pro_-_Suport_Product_Guide_1080_x_1080_px.png?v=1741244526",
    slugFallback: "nothing-phone-3a-pro",
  },
  {
    id: "phone-3a",
    name: "Nothing Phone (3a)",
    category: "phones",
    image: "https://checkout.nothing.tech/cdn/shop/files/Arc_-_Suport_Product_Guide_1080_x_1080_px.png?v=1741244524",
    slugFallback: "nothing-phone-3a",
  },
  {
    id: "phone-2a-plus",
    name: "Nothing Phone (2a) Plus",
    category: "phones",
    image: "https://checkout.nothing.tech/cdn/shop/files/nothing-phone-2a-plus.png?v=1724741471",
    slugFallback: "nothing-phone-2a-plus",
  },
  {
    id: "phone-2a",
    name: "Nothing Phone (2a)",
    category: "phones",
    image: "https://checkout.nothing.tech/cdn/shop/files/phone2a_0708.jpg?v=1720522361",
    slugFallback: "nothing-phone-2a",
  },
  {
    id: "phone-2",
    name: "Nothing Phone (2)",
    category: "phones",
    image: "https://checkout.nothing.tech/cdn/shop/files/Phone2_0708.jpg?v=1720522374",
    slugFallback: "nothing-phone-2",
  },
  {
    id: "phone-1",
    name: "Nothing Phone (1)",
    category: "phones",
    image: "https://checkout.nothing.tech/cdn/shop/files/Phone1_0708.png?v=1720522381",
    slugFallback: "nothing-phone-1",
  },
  {
    id: "cmf-phone-2-pro",
    name: "CMF Phone 2 Pro",
    category: "phones",
    image: "https://checkout.nothing.tech/cdn/shop/files/Support_Guide_-_Bulbasaur.jpg?v=1745899666",
    slugFallback: "cmf-phone-2-pro",
  },
  {
    id: "cmf-phone-1",
    name: "CMF Phone 1",
    category: "phones",
    image: "https://checkout.nothing.tech/cdn/shop/files/2048x1352_Buy_Page_-_Black_Phone_-_1_copy_0708.png?v=1720522490",
    slugFallback: "cmf-phone-1",
  },

  // ─── Audio ───────────────────────────────────────────
  {
    id: "headphone-a",
    name: "Nothing Headphone (a)",
    category: "audio",
    image: "https://checkout.nothing.tech/cdn/shop/files/Headphone_a.jpg?v=1772767193",
    slugFallback: "nothing-headphone-a",
  },
  {
    id: "headphone-1",
    name: "Nothing Headphone (1)",
    category: "audio",
    image: "https://checkout.nothing.tech/cdn/shop/files/headphone-1.jpg?v=1752560155",
    slugFallback: "nothing-headphone-1",
  },
  {
    id: "ear-3a",
    name: "Nothing Ear (3a)",
    category: "audio",
    image: "https://checkout.nothing.tech/cdn/shop/files/ear_3a_product_guide.jpg?v=1782976449",
    slugFallback: "nothing-ear-3a",
  },
  {
    id: "ear-3",
    name: "Nothing Ear (3)",
    category: "audio",
    image: "https://checkout.nothing.tech/cdn/shop/files/ear_3.jpg?v=1758595503",
    slugFallback: "nothing-ear-3",
  },
  {
    id: "ear-open",
    name: "Nothing Ear (open)",
    category: "audio",
    image: "https://checkout.nothing.tech/cdn/shop/files/ear_open_8876ba0d-7f88-43a3-bb49-3bf9483afe4b.jpg?v=1758530404",
    slugFallback: "nothing-ear-open",
  },
  {
    id: "ear-a",
    name: "Nothing Ear (a)",
    category: "audio",
    image: "https://checkout.nothing.tech/cdn/shop/files/Eara_0708.jpg?v=1720522390",
    slugFallback: "nothing-ear-a",
  },
  {
    id: "ear",
    name: "Nothing Ear",
    category: "audio",
    image: "https://checkout.nothing.tech/cdn/shop/files/Ear_0708.jpg?v=1720522395",
    slugFallback: "nothing-ear",
  },
  {
    id: "ear-2",
    name: "Nothing Ear (2)",
    category: "audio",
    image: "https://checkout.nothing.tech/cdn/shop/files/Ear2_0708.jpg?v=1720522401",
    slugFallback: "nothing-ear-2",
  },
  {
    id: "ear-1",
    name: "Nothing Ear (1)",
    category: "audio",
    image: "https://checkout.nothing.tech/cdn/shop/files/Ear1_0708.png?v=1720522412",
    slugFallback: "nothing-ear-1",
  },
  {
    id: "ear-stick",
    name: "Nothing Ear (stick)",
    category: "audio",
    image: "https://checkout.nothing.tech/cdn/shop/files/Earstick_0708.png?v=1720522416",
    slugFallback: "nothing-ear-stick",
  },
  {
    id: "cmf-clip-pro",
    name: "CMF Clip Pro",
    category: "audio",
    image: "https://checkout.nothing.tech/cdn/shop/files/CMF_Clip_Pro.jpg?v=1785833931",
    slugFallback: "cmf-clip-pro",
  },
  {
    id: "cmf-buds-2-plus",
    name: "CMF Buds 2 Plus",
    category: "audio",
    image: "https://checkout.nothing.tech/cdn/shop/files/Support_Guide_-_Gilgar.jpg?v=1745899665",
    slugFallback: "cmf-buds-2-plus",
  },
  {
    id: "cmf-buds-2a",
    name: "CMF Buds 2a",
    category: "audio",
    image: "https://checkout.nothing.tech/cdn/shop/files/Support_Guide_-_hoothoot.jpg?v=1745899666",
    slugFallback: "cmf-buds-2a",
  },
  {
    id: "cmf-buds-2",
    name: "CMF Buds 2",
    category: "audio",
    image: "https://checkout.nothing.tech/cdn/shop/files/Support_Guide_-_Gira.jpg?v=1744883278",
    slugFallback: "cmf-buds-2",
  },
  {
    id: "cmf-headphone-pro",
    name: "CMF Headphone Pro",
    category: "audio",
    image: "https://checkout.nothing.tech/cdn/shop/files/headphone_pro.jpg?v=1758595508",
    slugFallback: "cmf-headphone-pro",
  },
  {
    id: "cmf-buds-pro-2",
    name: "CMF Buds Pro 2",
    category: "audio",
    image: "https://checkout.nothing.tech/cdn/shop/files/CMF-Buds-Pro-2_Dark-Grey_2_copy_0708.png?v=1720522440",
    slugFallback: "cmf-buds-pro-2",
  },
  {
    id: "cmf-buds-pro",
    name: "CMF Buds Pro",
    category: "audio",
    image: "https://checkout.nothing.tech/cdn/shop/files/CMF-Buds-Pro_Dark-Grey_2_copy_0708.png?v=1720522447",
    slugFallback: "cmf-buds-pro",
  },
  {
    id: "cmf-buds",
    name: "CMF Buds",
    category: "audio",
    image: "https://checkout.nothing.tech/cdn/shop/files/CMF-Buds_Dark-Grey_2_copy_0708.png?v=1720522461",
    slugFallback: "cmf-buds",
  },
  {
    id: "cmf-neckband-pro",
    name: "CMF Neckband Pro",
    category: "audio",
    image: "https://checkout.nothing.tech/cdn/shop/files/CMF-Neckband-Pro_Dark-Grey_4_copy_0708.png?v=1720522466",
    slugFallback: "cmf-neckband-pro",
  },

  // ─── Wearables ───────────────────────────────────────
  {
    id: "cmf-watch-3-pro",
    name: "CMF Watch 3 Pro",
    category: "wearables",
    image: "https://checkout.nothing.tech/cdn/shop/files/Group_1_690d7045-41f5-4da8-be9b-892fcc34a5a8.png?v=1753777096",
    slugFallback: "cmf-watch-3-pro",
  },
  {
    id: "cmf-watch-pro-2",
    name: "CMF Watch Pro 2",
    category: "wearables",
    image: "https://checkout.nothing.tech/cdn/shop/files/CMF-Watch-Pro-2_Dark-Grey_2_copy_0708.png?v=1720522472",
    slugFallback: "cmf-watch-pro-2",
  },
  {
    id: "cmf-watch-pro",
    name: "CMF Watch Pro",
    category: "wearables",
    image: "https://checkout.nothing.tech/cdn/shop/files/CMF-Watch-Pro_Dark-Grey_2_copy_0708.png?v=1720522481",
    slugFallback: "cmf-watch-pro",
  },

  // ─── Charger ─────────────────────────────────────────
  {
    id: "cmf-power-65w-gan",
    name: "CMF Power 65W GaN",
    category: "charger",
    image: "https://checkout.nothing.tech/cdn/shop/files/CMF_Power_65W_GaN_Dark_Grey_UK_1_copy_0708.png?v=1720522503",
    slugFallback: "cmf-power-65w-gan",
  },
];

const CATEGORIES = [
  { key: "all", label: "ALL" },
  { key: "phones", label: "Phones" },
  { key: "audio", label: "Audio" },
  { key: "wearables", label: "Wearables" },
  { key: "charger", label: "Charger" },
  { key: "others", label: "Others" },
] as const;

interface ProductGuideClientProps {
  dbProducts?: DbProductItem[];
}

function normalizeKey(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[()_-]/g, "");
}

function getAccurateCategory(
  name: string,
  category?: string
): "phones" | "audio" | "wearables" | "charger" | "others" {
  const n = (name || "").toLowerCase();
  const c = (category || "").toLowerCase();

  // 1. Others / Accessories (Screen Protectors, Cases, Covers, Glass, Straps, Apparel)
  if (
    n.includes("protector") ||
    n.includes("screen") ||
    n.includes("case") ||
    n.includes("cover") ||
    n.includes("glass") ||
    n.includes("film") ||
    n.includes("strap") ||
    n.includes("lanyard") ||
    n.includes("t-shirt") ||
    n.includes("hoodie") ||
    n.includes("apparel") ||
    c.includes("protector") ||
    c.includes("case") ||
    c.includes("apparel") ||
    c.includes("accessories") ||
    c.includes("other")
  ) {
    return "others";
  }

  // 2. Wearables (Watches)
  if (n.includes("watch") || c.includes("watch") || c.includes("wearable")) {
    return "wearables";
  }

  // 3. Audio (Earbuds, Headphones, Buds, Neckbands, Clips)
  if (
    n.includes("ear") ||
    n.includes("headphone") ||
    n.includes("bud") ||
    n.includes("neckband") ||
    n.includes("clip") ||
    c.includes("audio")
  ) {
    return "audio";
  }

  // 4. Charger (Only Chargers, GaN, Power bricks, Charging cables)
  if (
    n.includes("power") ||
    n.includes("charger") ||
    n.includes("gan") ||
    n.includes("adapter") ||
    c.includes("charger")
  ) {
    return "charger";
  }

  // 5. Default: Phones
  return "phones";
}

export function ProductGuideClient({ dbProducts = [] }: ProductGuideClientProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const { products: storeProducts } = useProductStore();

  // Combine DB products with fallback store products
  const allAvailableDbProducts = React.useMemo(() => {
    const map = new Map<string, DbProductItem>();
    dbProducts.forEach((p) => {
      if (p.slug) map.set(p.slug, p);
    });
    storeProducts.forEach((p) => {
      if (p.slug && !map.has(p.slug)) {
        map.set(p.slug, {
          id: p.id || p.slug,
          name: p.name,
          slug: p.slug,
          category: p.category,
          image: p.images?.[0] || p.variants?.[0]?.image || "",
          status: p.status,
        });
      }
    });
    return Array.from(map.values());
  }, [dbProducts, storeProducts]);

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

  // Helper to match a product item with actual database product slug
  const getProductHref = React.useCallback(
    (item: { name: string; slug: string; slugFallback: string }) => {
      const itemKey = normalizeKey(item.name);
      const fallbackKey = normalizeKey(item.slugFallback);

      // 1. Direct slug match
      const directMatch = allAvailableDbProducts.find(
        (p) =>
          p.slug.toLowerCase() === item.slug.toLowerCase() ||
          p.slug.toLowerCase() === item.slugFallback.toLowerCase() ||
          p.slug.toLowerCase() === slugify(item.name).toLowerCase()
      );
      if (directMatch) return `/products/${directMatch.slug}`;

      // 2. Normalized name match (matching strictly within same category/type)
      const nameMatch = allAvailableDbProducts.find((p) => {
        const pKey = normalizeKey(p.name);
        return pKey === itemKey || pKey === fallbackKey;
      });
      if (nameMatch) return `/products/${nameMatch.slug}`;

      // 3. Fallback to slugified name or fallback slug
      return `/products/${item.slug || item.slugFallback || slugify(item.name)}`;
    },
    [allAvailableDbProducts]
  );

  // Build the complete display product list, giving priority to DB products where applicable
  const displayItems = React.useMemo(() => {
    // Start with official list
    const list = OFFICIAL_NOTHING_PRODUCTS.map((item) => {
      const itemKey = normalizeKey(item.name);
      const matchedDb = allAvailableDbProducts.find((p) => {
        const pKey = normalizeKey(p.name);
        const pSlugKey = normalizeKey(p.slug);
        return (
          pKey === itemKey ||
          pSlugKey === normalizeKey(item.slugFallback) ||
          pSlugKey === itemKey
        );
      });

      const accurateCat = getAccurateCategory(matchedDb ? matchedDb.name : item.name, item.category);

      return {
        id: matchedDb ? matchedDb.id : item.id,
        name: matchedDb ? matchedDb.name : item.name,
        category: accurateCat,
        image: item.image || (matchedDb?.image ? matchedDb.image : ""),
        slug: matchedDb ? matchedDb.slug : item.slugFallback,
        slugFallback: item.slugFallback,
      };
    });

    // Also include any extra DB products not present in the static list
    allAvailableDbProducts.forEach((dbP) => {
      const dbKey = normalizeKey(dbP.name);
      const alreadyPresent = list.some(
        (it) => normalizeKey(it.name) === dbKey || it.slug === dbP.slug
      );
      if (!alreadyPresent) {
        const cat = getAccurateCategory(dbP.name, dbP.category);
        list.push({
          id: dbP.id,
          name: dbP.name,
          category: cat,
          image: dbP.image || "https://checkout.nothing.tech/cdn/shop/files/phone-3.jpg?v=1752560157",
          slug: dbP.slug,
          slugFallback: dbP.slug,
        });
      }
    });

    return list;
  }, [allAvailableDbProducts]);

  const filteredItems = React.useMemo(() => {
    return displayItems.filter((item) => {
      const matchCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchSearch = searchQuery.trim()
        ? item.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
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
                <span className="font-medium uppercase tracking-wider">
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
              className="mt-4 inline-block text-sm underline text-[#04326f] hover:opacity-75"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => {
              const href = getProductHref(item);
              return (
                <div key={item.id} className="group flex flex-col">
                  {/* Image Card Box */}
                  <Link
                    href={href}
                    className="relative aspect-square w-full rounded-md overflow-hidden bg-[#ECECEC] flex items-center justify-center transition-all duration-300 group-hover:shadow-md"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover p-0 transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized
                    />
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
            })}
          </div>
        )}
      </div>
    </div>
  );
}
