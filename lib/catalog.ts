import { Product as StoreProduct, ProductVariant } from "@/types";

export interface CatalogProduct {
  id: string;
  name: string;
  category: "phones" | "chargers" | "audio" | "protectors";
  price: number;
  originalPrice?: number;
  warranty?: string;
  image: string;
  description: string;
}

export type Product = CatalogProduct;

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  // Phones
  {
    id: "nothing-4a-pro",
    name: "Phone (4a) Pro",
    category: "phones",
    price: 149999,
    originalPrice: 159999,
    warranty: "2-Year Warranty",
    image: "https://cdn.nothingshop.pk/mobiles/nothing-4a-pro-silver.webp",
    description: "Nothing Phone (4a) Pro featuring titanium construction, Dimensity processor, and dual 50MP Glyph optics.",
  },
  {
    id: "phone-4a",
    name: "Phone (4a)",
    category: "phones",
    price: 124999,
    originalPrice: 134999,
    warranty: "2-Year Warranty",
    image: "https://cdn.nothingshop.pk/mobiles/phone-4a-blue.webp",
    description: "Nothing Phone (4a) in vibrant deep blue, flexible 120Hz AMOLED and Glyph Interface.",
  },
  {
    id: "phone-3",
    name: "Phone (3)",
    category: "phones",
    price: 189999,
    warranty: "1-Year Warranty",
    image: "https://cdn.nothingshop.pk/mobiles/phone-3-black.webp",
    description: "Flagship Nothing Phone (3) with Snapdragon 8s Gen 3, ceramic finish, and full Glyph matrix.",
  },
  {
    id: "phone-3a",
    name: "Phone (3a)",
    category: "phones",
    price: 99999,
    originalPrice: 109999,
    warranty: "1-Year Warranty",
    image: "https://cdn.nothingshop.pk/mobiles/phone-3a-white.webp",
    description: "Iconic Nothing Phone (3a) in classic transparent white.",
  },
  {
    id: "phone-3a-pro",
    name: "Phone (3a) Pro",
    category: "phones",
    price: 114999,
    warranty: "1-Year Warranty",
    image: "https://cdn.nothingshop.pk/mobiles/phone-3a-pro-grey.webp",
    description: "Enhanced Phone (3a) Pro with studio camera sensors and extended battery life.",
  },
  {
    id: "phone-3a-lite",
    name: "Phone (3a) Lite",
    category: "phones",
    price: 84999,
    warranty: "1-Year Warranty",
    image: "https://cdn.nothingshop.pk/mobiles/phone-3a-lite-white.webp",
    description: "Essential Nothing experience packed into Phone (3a) Lite.",
  },
  {
    id: "phone-3a-community-edition",
    name: "Phone (3a) Community Edition",
    category: "phones",
    price: 109999,
    warranty: "1-Year Warranty",
    image: "https://cdn.nothingshop.pk/mobiles/phone-3a-community-edition-green.webp",
    description: "Glow-in-the-dark Nothing Phone (3a) Community Edition created in collaboration with the Nothing community.",
  },
  {
    id: "cmf-phone-2-pro",
    name: "CMF Phone 2 Pro",
    category: "phones",
    price: 64999,
    originalPrice: 69999,
    warranty: "1-Year Warranty",
    image: "https://cdn.nothingshop.pk/mobiles/cmf-phone-2-pro-orange.webp",
    description: "CMF Phone 2 Pro with modular backplate and dial controller.",
  },

  // Chargers
  {
    id: "cmf-power-65w-gan",
    name: "CMF Power 65W GaN",
    category: "chargers",
    price: 6499,
    image: "https://cdn.nothingshop.pk/products/nothing-65w-charger-orange.png",
    description: "Fast 65W GaN charger with 3 ports (2 USB-C + 1 USB-A) for laptop and phone charging.",
  },
  {
    id: "nothing-power-45w",
    name: "Nothing Power 45W",
    category: "chargers",
    price: 4499,
    originalPrice: 5174,
    image: "https://cdn.nothingshop.pk/products/nothing-power-45w/nothing-power-45w-01.webp",
    description: "Official Nothing 45W super-fast USB-C charger for Nothing phones and laptops.",
  },
  {
    id: "nothing-usb-c-cable",
    name: "Nothing USB-C to USB-C Cable",
    category: "chargers",
    price: 1999,
    originalPrice: 2299,
    image: "https://cdn.nothingshop.pk/products/nothing-usb-c-to-usb-c-cable/nothing-usb-c-to-usb-c-cable-01.webp",
    description: "Transparent strain relief 1m braided fast charging 100W USB-C cable.",
  },

  // Audio
  {
    id: "cmf-buds-pro",
    name: "CMF Buds Pro",
    category: "audio",
    price: 12999,
    originalPrice: 14949,
    image: "https://res.cloudinary.com/dbdsmy4em/image/upload/v1775702876/nothing-pakistan/products/cmf-buds-pro/cmf-buds-pro-orange.webp",
    description: "45dB hybrid active noise cancellation with 39hr playback in bold orange.",
  },
  {
    id: "cmf-buds-pro-2",
    name: "CMF Buds Pro 2",
    category: "audio",
    price: 15999,
    originalPrice: 18399,
    warranty: "6-Month Warranty",
    image: "https://cdn.nothingshop.pk/products/cmf-buds-pro-2-light-black-pakistan.webp",
    description: "Custom Smart Dial case control with Hi-Res spatial audio ANC.",
  },
  {
    id: "ear-a",
    name: "Ear (a)",
    category: "audio",
    price: 25499,
    originalPrice: 39324,
    warranty: "6-Month Warranty",
    image: "https://cdn.nothingshop.pk/products/ear-a/ear-a-01.webp",
    description: "Vibrant custom sound, smart active noise cancellation, and vivid acoustics.",
  },

  // Protectors
  {
    id: "phone-3a-protector",
    name: "Nothing Phone (3a) Screen Protector",
    category: "protectors",
    price: 1499,
    originalPrice: 1799,
    image: "https://cdn.nothingshop.pk/products/nothing-usb-c-to-usb-c-cable/nothing-usb-c-to-usb-c-cable-01.webp",
    description: "9H tempered glass screen protector tailored for Phone (3a).",
  },
  {
    id: "phone-4a-protector",
    name: "Nothing Phone (4a) Glass Protector",
    category: "protectors",
    price: 1699,
    image: "https://cdn.nothingshop.pk/products/nothing-power-45w/nothing-power-45w-01.webp",
    description: "Oleophobic smudge-resistant tempered glass for Phone (4a).",
  },
];

export function createCartProductAndVariant(item: CatalogProduct): { product: StoreProduct; variant: ProductVariant } {
  const variant: ProductVariant = {
    id: `${item.id}-default`,
    name: item.name,
    color: "Standard",
    colorHex: "#000000",
    price: item.price,
    salePrice: item.price,
    sku: item.id,
    inStock: true,
    image: item.image,
  };

  const product: StoreProduct = {
    id: item.id,
    name: item.name,
    slug: item.id,
    tagline: item.description,
    description: item.description,
    shortDescription: item.description,
    price: item.price,
    salePrice: item.price,
    category: item.category,
    subcategory: item.category,
    images: [item.image],
    gallery: [item.image],
    variants: [variant],
    storageOptions: [],
    colors: [{ name: "Standard", hex: "#000000" }],
    specifications: [],
    features: [],
    highlights: [],
    seo: { metaTitle: item.name, metaDescription: item.description, keywords: [] },
    isFeatured: true,
    isNewArrival: true,
    sortOrder: 1,
    status: "published",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return { product, variant };
}
