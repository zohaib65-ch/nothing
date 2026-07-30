export type ProductCategory = "phones" | "audio" | "cmf" | "accessories" | string;

export interface ProductVariant {
  id: string;
  name: string; // e.g. "12GB RAM + 256GB Storage"
  storage?: string; // e.g. "256GB"
  capacity?: string; // e.g. "8 + 128" or "12 + 256"
  ram?: string; // e.g. "8GB" or "8"
  color: string; // e.g. "Dark Grey"
  colorHex: string; // e.g. "#1C1C1E"
  price: number;
  salePrice?: number;
  storagePrices?: Record<string, { price?: number; salePrice?: number }>;
  sku: string;
  inStock?: boolean;
  image?: string;
  specifications?: SpecificationGroup[];
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

export interface CustomSectionItem {
  title: string;
  description: string;
  image?: string;
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
  tagline?: string;
  description?: string;
  shortDescription?: string;
  price: number;
  salePrice?: number;
  originalPrice?: number;
  category: ProductCategory;
  subcategory?: string;
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
  inStock?: boolean;
  sortOrder: number;
  warranty?: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
  heroLeftSections?: CustomSectionItem[];
  heroRightSections?: CustomSectionItem[];
  bentoSections?: CustomSectionItem[];
  threeColumnSections?: CustomSectionItem[];
  fourColumnSections?: CustomSectionItem[];
  fiveColumnSections?: CustomSectionItem[];
}

export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  description: string;
  heroImage: string;
  badge?: string;
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

export interface OrderItem {
  productId: string;
  productName: string;
  variantId: string;
  variantName: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  id?: string;
  customId?: string;
  fullName: string;
  address: string;
  city: string;
  district: string;
  postalCode?: string;
  phoneNumber: string;
  phone2?: string;
  paymentMethod: "bank_transfer" | "cod";
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  tax: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "cancelled" | "completed";
  receiptImage?: string;
  createdAt?: string;
  updatedAt?: string;
}
