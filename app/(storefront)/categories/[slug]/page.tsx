import * as React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import { CategoryModel } from "@/models/Category";
import { ProductModel } from "@/models/Product";
import CategoryClient from "./category-client";
import { JsonLd } from "@/components/seo/json-ld";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getCategoryData(slug: string) {
  await connectToDatabase();
  const categoryDoc = await CategoryModel.findOne({ slug }).lean();
  if (!categoryDoc) return null;

  const productDocs = await ProductModel.find({ category: slug, status: "published" })
    .sort({ sortOrder: 1, createdAt: -1 })
    .lean();

  const category = JSON.parse(JSON.stringify(categoryDoc));
  const products = JSON.parse(JSON.stringify(productDocs));

  return { category, products };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  await connectToDatabase();
  const category = await CategoryModel.findOne({ slug }).lean();

  if (!category) {
    return {
      title: "Category Not Found | Nothing Pakistan",
    };
  }

  const title = `${category.name} | Nothing Pakistan`;
  const description =
    category.description || `Browse original Nothing and CMF ${category.name} products in Pakistan.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.nothingcmf.pk/categories/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.nothingcmf.pk/categories/${slug}`,
      images: [
        {
          url: category.heroImage || "/nothing_pakistan.avif",
          alt: category.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [category.heroImage || "/nothing_pakistan.avif"],
    },
  };
}

export async function generateStaticParams() {
  try {
    await connectToDatabase();
    const categories = await CategoryModel.find().select("slug").lean();
    return categories.map((cat: any) => ({
      slug: cat.slug,
    }));
  } catch (error) {
    console.error("Failed to generate static params for categories:", error);
    return [];
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getCategoryData(slug);

  if (!data) {
    notFound();
  }

  const breadcrumbData = {
    items: [
      { name: "Home", url: "https://www.nothingcmf.pk" },
      { name: "Categories", url: "https://www.nothingcmf.pk/products" },
      { name: data.category.name, url: `https://www.nothingcmf.pk/categories/${slug}` },
    ],
  };

  return (
    <>
      <JsonLd type="breadcrumb" data={breadcrumbData} />
      <CategoryClient category={data.category} initialProducts={data.products} />
    </>
  );
}
