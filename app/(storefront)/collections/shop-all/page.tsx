import * as React from "react";
import type { Metadata } from "next";
import ShopAllPage, { metadata as shopAllMetadata } from "../../shop-all/page";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  ...shopAllMetadata,
  alternates: {
    canonical: "https://www.nothingcmf.pk/collections/shop-all",
  },
};

export default function ShopAllCollectionPage() {
  return <ShopAllPage />;
}
