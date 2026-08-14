import * as React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import { ProductModel } from "@/models/Product";
import CollectionClient from "./collection-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

const titleMap: Record<string, string> = {
  phones: "Nothing & CMF Phones",
  chargers: "Power & Fast Chargers",
  audio: "Audio & Wireless Earbuds",
  protectors: "Screen & Glass Protectors",
  "shop-all": "Shop All Catalog",
  apparel: "Nothing Apparel",
  watches: "CMF Watch & Smartwatches",
  accessories: "Nothing & CMF Accessories",
};

const descMap: Record<string, string> = {
  phones: "Buy official Nothing Phone (1), Phone (2), Phone (2a), and CMF Phone 1 in Pakistan. Official brand warranty, transparent design, best prices.",
  chargers: "Original Nothing Power (45W) and CMF Power fast charging adapters. Shop high-speed chargers for your Nothing smartphones.",
  audio: "Shop Nothing Ear, Ear (a), CMF Buds, and Buds Pro wireless bluetooth earbuds in Pakistan. Clean sound, active noise cancellation.",
  protectors: "Buy premium tempered glass screen protectors and official cases for Nothing smartphones. Precise fit, high protection.",
  "shop-all": "Browse the entire Nothing Pakistan catalog. Phones, audio devices, chargers, and premium compatible accessories.",
  apparel: "Shop Nothing official apparel, premium minimalist t-shirts, caps, and limited edition designer clothing.",
  watches: "Shop CMF Watch Pro and Nothing smartwatches in Pakistan. Stylish design, fitness tracking, and long battery life.",
  accessories: "Shop official Nothing & CMF accessories in Pakistan. Cases, cables, magnetic chargers, and more premium add-ons.",
};

async function getCollectionProducts(slug: string) {
  await connectToDatabase();
  const query = slug === "shop-all" ? {} : { category: slug };
  const docs = await ProductModel.find({ ...query, status: "published" })
    .sort({ sortOrder: 1, createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(docs));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = titleMap[slug] || `Collection: ${slug.toUpperCase()}`;
  const description = descMap[slug] || `Browse Nothing Pakistan products in the ${slug} collection.`;

  return {
    title: `${title} | Nothing Pakistan`,
    description,
    alternates: {
      canonical: `https://www.nothingcmf.pk/collections/${slug}`,
    },
    openGraph: {
      title: `${title} | Nothing Pakistan`,
      description,
      url: `https://www.nothingcmf.pk/collections/${slug}`,
      images: [
        {
          url: "/nothing_pakistan.avif",
          width: 1200,
          height: 630,
          alt: `${title} - Nothing Pakistan`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Nothing Pakistan`,
      description,
      images: ["/nothing_pakistan.avif"],
    },
  };
}

export async function generateStaticParams() {
  return [
    { slug: "phones" },
    { slug: "chargers" },
    { slug: "audio" },
    { slug: "protectors" },
    { slug: "shop-all" },
    { slug: "apparel" },
    { slug: "watches" },
    { slug: "accessories" },
  ];
}

export default async function CollectionSlugPage({ params }: PageProps) {
  const { slug } = await params;

  if (!titleMap[slug]) {
    notFound();
  }

  const products = await getCollectionProducts(slug);

  return <CollectionClient slug={slug} initialProducts={products} />;
}
