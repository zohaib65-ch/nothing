"use client";

import Image from "next/image";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/types";
import { formatPrice, getValidImageUrl, getProductDisplayPrice } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Star, Edit2, Trash2 } from "lucide-react";

export const getColumns = (
  handleToggleFeatured: (prod: Product) => void,
  handleToggleStatus: (prod: Product) => void,
  handleToggleStock: (prod: Product) => void,
  handleEdit: (prod: Product) => void,
  handlePromptDelete: (prod: Product) => void,
): ColumnDef<Product>[] => [
  {
    accessorKey: "images",
    header: "IMAGE",
    cell: ({ row }) => {
      const prod = row.original;
      const imageUrl = getValidImageUrl(prod.images?.[0]);
      return (
        <div className="relative h-12 w-12 bg-white border border-neutral-200 rounded">
          <Image src={imageUrl} alt={prod.name} fill sizes="48px" className="object-contain p-1" />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "PRODUCT NAME",
    cell: ({ row }) => {
      const prod = row.original;
      const hasComingSoon = Boolean(
        (prod.variants || []).some((v) => v.isComingSoon || (v.storagePrices && Object.values(v.storagePrices).some((sp: any) => sp.isComingSoon))),
      );

      return (
        <div className="space-y-1 py-1 min-w-[70px]">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs sm:text-sm sm:font-bold font-medium text-neutral-900 leading-snug">{prod.name}</span>
            {hasComingSoon && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#D71921]/10 text-[#D71921] border border-[#D71921]/20">
                COMING SOON
              </span>
            )}
          </div>
          {prod.tagline && <div className="text-[9px] sm:text-[11px] text-neutral-500 leading-normal font-sans">{prod.tagline}</div>}
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "CATEGORY",
    cell: ({ row }) => <span className="uppercase text-neutral-600">{row.original.category}</span>,
  },
  {
    accessorKey: "price",
    header: "PRICE",
    cell: ({ row }) => {
      const prod = row.original;
      const displayPrice = getProductDisplayPrice(prod);
      const isComingSoon = Boolean(
        (prod.variants || []).some((v) => v.isComingSoon || (v.storagePrices && Object.values(v.storagePrices).some((sp: any) => sp.isComingSoon))),
      );

      if (isComingSoon || displayPrice === 0) {
        return <span className="font-mono text-xs text-[#D71921] font-bold uppercase">COMING SOON</span>;
      }

      return <span className="font-bold text-neutral-900">{formatPrice(displayPrice)}</span>;
    },
  },
  {
    accessorKey: "isFeatured",
    header: "FEATURED",
    cell: ({ row }) => {
      const prod = row.original;
      return (
        <div className="flex items-center gap-2 font-mono text-[11px] font-bold">
          <Switch checked={Boolean(prod.isFeatured)} onCheckedChange={() => handleToggleFeatured(prod)} />
          <span className={prod.isFeatured ? "text-amber-600 tracking-wider" : "text-neutral-400 font-normal tracking-wider"}>
            {prod.isFeatured ? "YES" : "NO"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "inStock",
    header: "STOCK",
    cell: ({ row }) => {
      const prod = row.original;
      const isInStock = prod.inStock !== false; // Default true if undefined
      return (
        <div className="flex items-center gap-2 font-mono text-[11px] font-bold">
          <Switch checked={isInStock} onCheckedChange={() => handleToggleStock(prod)} />
          <span
            className={
              isInStock ? "text-emerald-600 tracking-wider text-[10px] font-semibold" : "text-red-500 tracking-wider text-[10px] font-semibold"
            }
          >
            {isInStock ? "IN STOCK" : "OUT OF STOCK"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      const prod = row.original;
      const isPublished = prod.status === "published";
      return (
        <div className="flex items-center gap-2 font-mono text-[11px] font-bold">
          <Switch checked={isPublished} onCheckedChange={() => handleToggleStatus(prod)} />
          <span className={isPublished ? "text-emerald-600 tracking-wider" : "text-neutral-400 font-normal tracking-wider"}>
            {isPublished ? "ACTIVE" : "HIDDEN"}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">ACTIONS</div>,
    cell: ({ row }) => {
      const prod = row.original;
      return (
        <div className="text-right flex space-x-1 sm:space-x-2">
          <Link
            href={`/admin/products/${prod.id}/edit`}
            className="p-2 bg-neutral-50 text-neutral-600 hover:text-neutral-955 border border-neutral-200 hover:border-neutral-400 transition-colors rounded cursor-pointer"
            title="Edit Product"
          >
            <Edit2 className="h-3.5 w-3.5" />
          </Link>
          <button
            onClick={() => handlePromptDelete(prod)}
            className="p-2 bg-red-50/50 text-red-500 hover:text-red-700 border border-red-100 hover:border-red-300 transition-colors rounded cursor-pointer"
            title="Delete Product"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      );
    },
  },
];
