import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { AppBreadcrumb, BreadcrumbItemType } from "./app-breadcrumb";

export interface AdminPageHeaderProps {
  breadcrumbs: BreadcrumbItemType[];
  title: React.ReactNode;
  backLink?: string;
  backLabel?: string;
}

export function AdminPageHeader({ breadcrumbs, title, backLink = "/admin", backLabel = "BACK TO LIST" }: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
      <div className="space-y-1.5">
        <AppBreadcrumb items={breadcrumbs} />
        <h1 className="font-mono text-xl font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">{title}</h1>
      </div>

      {backLink && (
        <Link href={backLink}>
          <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="h-4 w-4" />}>
            {backLabel}
          </Button>
        </Link>
      )}
    </div>
  );
}
