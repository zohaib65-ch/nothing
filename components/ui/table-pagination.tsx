"use client";

import React from "react";
import { Table as TanStackTable } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TablePaginationProps<TData> {
  table: TanStackTable<TData>;
  totalItems?: number;
}

export function TablePagination<TData>({
  table,
  totalItems,
}: TablePaginationProps<TData>) {
  const { pageIndex } = table.getState().pagination;
  const { pageSize } = table.getState().pagination;
  const realPageCount = Math.max(table.getPageCount(), 1);
  const count = totalItems ?? table.getCoreRowModel().rows.length;

  const startIndex = count === 0 ? 0 : pageIndex * pageSize;
  const endIndex = Math.min(startIndex + pageSize, count);

  // Generate dynamic page numbers
  const getPageNumbers = () => {
    if (realPageCount <= 5) {
      return Array.from({ length: realPageCount }, (_, i) => i);
    }
    if (pageIndex < 3) {
      return [0, 1, 2, "...", realPageCount - 1];
    } else if (pageIndex >= realPageCount - 3) {
      return [
        0,
        "...",
        realPageCount - 3,
        realPageCount - 2,
        realPageCount - 1,
      ];
    }
    return [
      0,
      "...",
      pageIndex - 1,
      pageIndex,
      pageIndex + 1,
      "...",
      realPageCount - 1,
    ];
  };

  const pages = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full bg-transparent font-mono text-xs text-neutral-500 py-2 px-1 select-none">
      {/* Left Info Text */}
      <div className="flex items-center gap-1 font-bold">
        <span>SHOWING</span>
        <span className="text-neutral-900 font-black">
          {count === 0 ? 0 : startIndex + 1}-{endIndex}
        </span>
        <span>OF {count} RECORDS</span>
      </div>

      {/* Right Navigation Controls */}
      <div className="flex items-center gap-4">
        {/* Left Button with Left Arrow */}
        <button
          type="button"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          className="flex items-center justify-center size-8 rounded-full border border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-50 hover:border-neutral-300 transition-all cursor-pointer disabled:opacity-40 disabled:hover:bg-white disabled:hover:border-neutral-200 shadow-sm active:scale-95 duration-150"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Page Numbers List */}
        <div className="flex items-center gap-2">
          {pages.map((item, idx) => {
            if (item === "...") {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-1 text-neutral-400 select-none"
                >
                  ...
                </span>
              );
            }
            const pIdx = item as number;
            const isCurrent = pageIndex === pIdx;
            const pageNum = pIdx + 1;
            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => table.setPageIndex(pIdx)}
                className={cn(
                  "flex items-center justify-center size-8 rounded-lg font-bold transition-all cursor-pointer",
                  isCurrent
                    ? "bg-[#D71921] text-white shadow-sm shadow-[#D71921]/15"
                    : "bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300"
                )}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Right Button with Right Arrow */}
        <button
          type="button"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          className="flex items-center justify-center size-8 rounded-full border border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-50 hover:border-neutral-300 transition-all cursor-pointer disabled:opacity-40 disabled:hover:bg-white disabled:hover:border-neutral-200 shadow-sm active:scale-95 duration-150"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
