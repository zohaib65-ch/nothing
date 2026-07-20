export type ProductCategory = 'phones' | 'audio' | 'cmf' | 'accessories' | string;

export interface ProductVariant {
  id: string;
  name: string; // e.g. "12GB RAM + 256GB Storage"
  storage?: string; // e.g. "256GB"
  color: string; // e.g. "Dark Grey"
  colorHex: string; // e.g. "#1C1C1E"
  price: number;
  salePrice?: number;
  sku: string;
  inStock: boolean;
  image?: string;
}

export interface SpecificationItem {
  name: string;
  value: string;
}

export interface SpecificationGroup {
  category: string;
  items: SpecificationItem[];
}

export interface ProductFeature {
  id: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
  tagline?: string;
}

export interface ProductHighlight {
  title: string;
  value: string;
  subtitle: string;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface ProductSEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  shortDescription: string;
  price: number;
  salePrice?: number;
  category: ProductCategory;
  subcategory: string;
  images: string[];
  gallery: string[];
  videos?: string[];
  variants: ProductVariant[];
  storageOptions: string[];
  colors: { name: string; hex: string }[];
  specifications: SpecificationGroup[];
  features: ProductFeature[];
  highlights: ProductHighlight[];
  accessories?: string[]; // IDs of related accessory products
  relatedProducts?: string[]; // IDs of related products
  seo: ProductSEO;
  isFeatured: boolean;
  isNewArrival: boolean;
  sortOrder: number;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  description: string;
  heroImage: string;
  badge?: string;
}

export interface StoreSettings {
  storeName: string;
  logoUrl: string;
  whatsappNumber: string; // e.g. "+1234567890" or "1234567890"
  whatsappMessageTemplate: string;
  announcementBar: {
    enabled: boolean;
    text: string;
    link?: string;
    linkText?: string;
  };
  socialLinks: {
    instagram?: string;
    x?: string;
    youtube?: string;
    discord?: string;
  };
  homepageHero: {
    productId: string;
    title: string;
    subtitle: string;
    badge: string;
    videoUrl?: string;
    bgImageUrl: string;
  };
  seoDefaults: {
    metaTitle: string;
    metaDescription: string;
    ogImage: string;
  };
}

export interface CartItem {
  id: string;
  product: Product;
  selectedVariant: ProductVariant;
  quantity: number;
}

export interface AnalyticsOverview {
  totalProducts: number;
  totalCategories: number;
  totalOrders: number;
  totalVisitors: number;
  recentInquiries: {
    id: string;
    productName: string;
    variant: string;
    date: string;
    whatsappNumber: string;
  }[];
}
