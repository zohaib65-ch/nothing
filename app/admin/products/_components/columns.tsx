"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/types";
import { formatPrice, getValidImageUrl } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Star, Edit2, Trash2 } from "lucide-react";

export const getColumns = (
  handleToggleFeatured: (prod: Product) => void,
  handleToggleStatus: (prod: Product) => void,
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
      return (
        <div>
          <div className="font-bold text-neutral-900">{prod.name}</div>
          <div className="text-[10px] text-neutral-500">{prod.tagline}</div>
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
      return <span className="font-bold text-neutral-900">{formatPrice(prod.salePrice || prod.price)}</span>;
    },
  },
  {
    accessorKey: "isFeatured",
    header: "FEATURED",
    cell: ({ row }) => {
      const prod = row.original;
      return (
        <button
          onClick={() => handleToggleFeatured(prod)}
          className={`p-1.5 rounded transition-colors cursor-pointer ${prod.isFeatured ? "text-[#D71921] bg-[#D71921]/10" : "text-neutral-400 hover:text-neutral-900"}`}
          title="Toggle Featured Status"
        >
          <Star className="h-4 w-4 fill-current" />
        </button>
      );
    },
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      const prod = row.original;
      return (
        <button onClick={() => handleToggleStatus(prod)} className="cursor-pointer">
          {prod.status === "published" ? <Badge variant="red">PUBLISHED</Badge> : <Badge variant="outline">DRAFT</Badge>}
        </button>
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
