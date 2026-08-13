# NOTHING (INTL) - Premium E-Commerce Platform

Welcome to the **NOTHING (INTL)** Pakistan storefront codebase. This repository hosts a premium, responsive e-commerce experience designed specifically for discovering and purchasing Nothing & CMF smartphones, audio devices, chargers, and custom modular accessories in Pakistan.

This document serves as the primary **Developer Onboarding & Architecture Guide**.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16.2 (App Router)](https://nextjs.org/)
- **Core Library**: [React 19](https://react.dev/)
- **Programming Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) (for client-side store)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **UI Components**: Tailwind-integrated primitives (inspired by Shadcn UI)
- **Data Table**: `@tanstack/react-table` (for Admin dashboard listings)

---

## 📂 Codebase Directory Structure

```text
nothing/
├── app/                        # App Router Pages & Layouts
│   ├── (storefront)/           # Consumer-Facing E-Commerce Pages (Dark Theme)
│   │   ├── about-us/           # SECP incorporation & company legal info
│   │   ├── cart/               # Checkout basket list
│   │   ├── categories/         # Products categorized dynamically
│   │   ├── collections/        # Filtered collections (phones, audio, etc.)
│   │   ├── company-verification/# SECP incorporation certificate page
│   │   ├── order/              # Checkout flow & receipt upload
│   │   ├── products/           # Full catalog listings & search filter
│   │   ├── shop-all/           # Complete catalog listing
│   │   ├── support-centre/     # FAQ and Troubleshooting OTA guides
│   │   ├── layout.tsx          # Storefront Layout (hydrates Zustand, Lenis)
│   │   └── page.tsx            # Premium Homepage with Bento features
│   ├── admin/                  # Administrative Control Panel (Light Theme)
│   │   ├── categories/         # Category CRUD & upload forms
│   │   ├── login/              # Secure Admin login
│   │   ├── orders/             # Order fulfillment registry & billing PDF
│   │   ├── products/           # Product CRUD & stock management
│   │   ├── settings/           # Admin security & password change
│   │   └── page.tsx            # Interactive KPI analytics dashboard
│   ├── api/                    # Serverless API routes
│   │   ├── auth/               # Admin session authentication APIs
│   │   ├── categories/         # Category database CRUD endpoints
│   │   ├── media/              # Media upload management (Cloudinary helper)
│   │   ├── orders/             # Order creation, details, receipt upload
│   │   └── products/           # Product listings & detail query APIs
│   ├── layout.tsx              # Root HTML & body font hydration
│   ├── robots.ts               # Dynamic crawlers configuration
│   └── sitemap.ts              # Dynamic sitemap index compiler
├── components/                 # Reusable UI & Feature components
│   ├── features/               # Domain-specific components (cart, products)
│   ├── layout/                 # Page layouts (Navbar, Footer, Admin Panels)
│   ├── seo/                    # Schema.org structured markup injection
│   │   └── json-ld.tsx         # JSON-LD schemas (Product, WebSite, Organization, FAQ, Breadcrumbs)
│   └── ui/                     # Accessible presentation primitives
├── hooks/                      # Custom React hooks (useOrders, etc.)
├── lib/                        # Infrastructure helpers
│   ├── config.ts               # Project-wide environment parameters
│   ├── mongodb.ts              # Mongoose DB connection engine
│   └── utils.ts                # Price formatters, color set selectors
├── models/                     # Mongoose Schema Definitions (Database models)
│   ├── Category.ts             # Categories collection schema
│   ├── Order.ts                # Transaction invoices schema
│   ├── Product.ts              # Catalog entries & variant parameters schema
│   └── User.ts                 # Admin credential accounts schema
├── providers/                  # Application Context wrappers
│   └── lenis-provider.tsx      # Smooth scroll initialization wrapper
├── services/                   # Frontend-to-Backend HTTP service engine
│   └── productService.ts       # Endpoint adapters for catalog fetches
├── store/                      # Zustand frontend global stores
│   ├── useCartStore.ts         # Add to cart, modify quantity state
│   ├── useProductStore.ts      # Hydrated in-memory search and query
│   └── useSpecsStore.ts        # Overlay specifications viewer state
└── types/                      # strict TypeScript declarations
```

---

## 🎨 Theme Isolation (Storefront vs Admin Dashboard)

To prevent visual conflicts, the codebase is strictly segregated into two isolated visual namespaces:

1. **Storefront (Dark Theme)**:
   - Root `/app/layout.tsx` injects `<html className="dark">`.
   - Consumer pages render on a sleek black background (`#050505`) with red highlights (`#D71921`) and white typography (`#F5F5F7`).

2. **Admin Dashboard (Light Theme)**:
   - Nested `/app/admin/layout.tsx` executes a clean CSS isolation on mount:
     ```typescript
     React.useEffect(() => {
       const html = document.documentElement;
       html.classList.remove("dark"); // Strips dark classes
       return () => {
         html.classList.add("dark"); // Restores dark mode for storefront
       };
     }, []);
     ```
   - Renders a clean light background (`bg-[#f4f4f6]` or `bg-dot-plus-grid`) using adaptive dark typography (`text-neutral-900`).

---

## 🔍 SEO & Pre-Rendering (SSR/SSG) Architecture

We use a high-performance **Server-Client Component Hybrid** pattern to maximize SEO indexability:

### 1. Server Component Wrapper Pattern
Since client pages use hooks (`useCartStore`, `useSpecsStore`), they are built as client components (`products-client.tsx`). However, client components cannot export metadata or handle build-time static HTML page generation.

Instead, the entrypoint `page.tsx` is kept as a **Server Component** which:
1. Queries the database dynamically during build-time or server-side.
2. Exports static or dynamic metadata (`generateMetadata`).
3. Generates static paths (`generateStaticParams`) for SSG.
4. Wraps the client-side module in a `<Suspense>` boundary (preventing `useSearchParams()` bailout) and passes database records as a serializable JSON prop.

*Files implementing this pattern*:
- `/products/[slug]/page.tsx`
- `/categories/[slug]/page.tsx`
- `/collections/[slug]/page.tsx`
- `/shop-all/page.tsx`
- `/products/page.tsx`
- `/support-centre/page.tsx`
- `/company-verification/page.tsx`

### 2. JSON-LD Structured Data
Located inside `components/seo/json-ld.tsx`, it injects valid Schema.org script tags depending on page intent:
- **`WebSite`**: Triggers Google Sitelinks Searchbox integration.
- **`Organization`**: Displays legal identity (`NOTHING OFFICIAL (SMC-PRIVATE) LIMITED`), contact options, and SECP data.
- **`Product`**: Exposes price, condition, currency, and availability attributes.
- **`FAQPage`**: Renders search engine rich results for troubleshooting OTA guides.
- **`BreadcrumbList`**: Triggers structured navigation breadcrumbs mapping.

### 3. Dynamic Crawler Configurations
- **`app/robots.ts`**: Automatically compiled search indexing policies. Explicitly permits catalog crawling while disallowing administrative panels (`/admin/*`) and private transactional endpoints (`/api/*`, `/order/*`, `/cart`).
- **`app/sitemap.ts`**: Dynamically compiles all dynamic product slugs and categories from MongoDB to feed search engine indices.

---

## 🛢️ Database Models & Structuring

1. **`Product`** (`models/Product.ts`):
   - Supports parent metadata (name, slug, tags, price).
   - Contains a list of `variants` representing storage (e.g. `12+256`) and color parameters (with hex code mapping).
   - Dedicated `seo` property holding meta-title, description, and keyword strings for Search Console targets.
2. **`Category`** (`models/Category.ts`):
   - Category slug, descriptive body, and hero image URLs.
3. **`Order`** (`models/Order.ts`):
   - Standardizes checkout logs, contact info, payment method (`COD` vs `bank_transfer`), and transaction state (`pending`, `processing`, `shipped`, `cancelled`, `completed`).
   - Supports receipt image uploads for manual Bank Transfer verifications.

---

## 🚀 Local Development Setup

### 1. Environment Variables
Create a `.env.local` or `.env` file in the root directory:
```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/nothing

# Admin JWT Secret key
JWT_SECRET=your_super_secret_jwt_key_here

# Support contact WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=+923361070111

# Cloudinary Integration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
```

### 2. Bootstrapping Database
To pre-populate the database with premium mock products, run the seeding script:
```bash
npm run seed
```

### 3. Start Development Server
```bash
npm run dev
```
Open `http://localhost:3000` to preview the storefront.

### 4. Build Production Bundle
To validate TypeScript compilations, route optimization, and pre-rendering:
```bash
npm run build
```
The static compiler will render SSG pages for all dynamic categories, collections, and products.