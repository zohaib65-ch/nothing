import type { Metadata } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import { ProductModel } from "@/models/Product";
import { ProductGuideClient } from "./product-guide-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Product Guide | Nothing Official Pakistan",
  description:
    "Explore Nothing & CMF product guides, user manuals, tips and tricks for Nothing Phone, Ear, Headphone, and CMF devices.",
  alternates: {
    canonical: "https://www.nothingcmf.pk/support-centre/product-guide",
  },
  openGraph: {
    title: "Product Guide | Nothing Official Pakistan",
    description:
      "Explore Nothing & CMF product guides, user manuals, tips and tricks for Nothing Phone, Ear, Headphone, and CMF devices.",
    url: "https://www.nothingcmf.pk/support-centre/product-guide",
    images: [
      {
        url: "/nothing_pakistan.avif",
        width: 1200,
        height: 630,
        alt: "Nothing Pakistan Product Guide",
      },
    ],
  },
};

export default async function ProductGuidePage() {
  let dbProducts: any[] = [];
  try {
    await connectToDatabase();
    const docs = await ProductModel.find()
      .select("name slug category images variants status")
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();
    dbProducts = docs.map((doc: any) => ({
      id: doc._id?.toString() || doc.id,
      name: doc.name,
      slug: doc.slug,
      category: doc.category,
      image: doc.images?.[0] || doc.variants?.[0]?.image || "",
      status: doc.status,
    }));
  } catch {
    dbProducts = [];
  }

  return <ProductGuideClient dbProducts={dbProducts} />;
}

