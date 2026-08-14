import * as React from "react";
import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import { ProductModel } from "@/models/Product";
import ProductDetailClient from "./product-detail-client";
import { JsonLd } from "@/components/seo/json-ld";
import { Loader } from "@/components/ui/loader";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string) {
  await connectToDatabase();
  const doc = await ProductModel.findOne({ slug, status: "published" }).lean();
  if (!doc) return null;
  const { _id, ...rest } = doc;
  return { id: _id?.toString?.() ?? _id, ...rest } as any;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const rawProduct = await getProduct(slug);

  if (!rawProduct) {
    return {
      title: "Product Not Found | Nothing Pakistan",
    };
  }

  const product = JSON.parse(JSON.stringify(rawProduct));
  const title = product.seo?.metaTitle || `${product.name} | Nothing Pakistan`;
  const description =
    product.seo?.metaDescription ||
    product.description ||
    `Buy ${product.name} in Pakistan. High quality, transparent engineering, official warranty, fast delivery.`;

  return {
    title,
    description,
    keywords: product.seo?.keywords || [product.name, "Nothing Pakistan"],
    alternates: {
      canonical: `https://www.nothingcmf.pk/products/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.nothingcmf.pk/products/${slug}`,
      type: "website",
      images: product.images?.map((img: string) => ({
        url: img,
        alt: product.name,
      })) || [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: product.images || [],
    },
  };
}

export async function generateStaticParams() {
  try {
    await connectToDatabase();
    const products = await ProductModel.find({ status: "published" }).select("slug").lean();
    return products.map((prod: any) => ({
      slug: prod.slug,
    }));
  } catch {
    return [];
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const rawProduct = await getProduct(slug);

  if (!rawProduct) {
    notFound();
  }

  const product = JSON.parse(JSON.stringify(rawProduct));

  const offersData = {
    name: product.name,
    description: product.description || product.tagline,
    images: product.images,
    sku: product.variants?.[0]?.sku || product.id,
    url: `https://www.nothingcmf.pk/products/${product.slug}`,
    price: product.variants?.[0]?.price || product.price,
    inStock: product.inStock !== false && product.variants?.some((v: any) => v.inStock !== false),
  };

  return (
    <>
      <JsonLd type="product" data={offersData} />
      <Suspense
        fallback={
          <div className="min-h-screen bg-white text-slate-900 flex items-center justify-center py-24">
            <Loader />
          </div>
        }
      >
        <ProductDetailClient initialProduct={product} />
      </Suspense>
    </>
  );
}

