import * as React from "react";
import type { Metadata } from "next";
import CollectionSlugPage, { generateMetadata as getSlugMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  return getSlugMetadata({ params: Promise.resolve({ slug: "phones" }) });
}

export default function PhonesCollectionPage() {
  return <CollectionSlugPage params={Promise.resolve({ slug: "phones" })} />;
}
