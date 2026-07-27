"use client";

import * as React from "react";
import { AlertTriangle, Trash2 } from "lucide-react";
import { Product } from "@/types";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface DeleteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  isDeleting: boolean;
  onConfirmDelete: () => Promise<void>;
}

export function DeleteProductModal({
  isOpen,
  onClose,
  product,
  isDeleting,
  onConfirmDelete,
}: DeleteProductModalProps) {
  if (!product) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="CONFIRM PRODUCT DELETION"
      maxWidth="md"
    >
      <div className="space-y-4 font-mono text-xs text-neutral-900">
        <div className="flex items-center space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0" />
          <div>
            <p className="font-bold uppercase text-red-800">PERMANENT DELETE</p>
            <p className="text-[11px] text-neutral-600 font-sans">
              Are you sure you want to delete product{" "}
              <span className="text-neutral-900 font-bold font-mono font-lg">"{product.name}"</span>? This will permanently remove it from MongoDB.
            </p>
          </div>
        </div>

        <div className="pt-4 flex justify-end space-x-3 border-t border-neutral-200">
          <Button
            variant="outline"
            type="button"
            onClick={onClose}
          >
            CANCEL
          </Button>
          <Button
            variant="red"
            type="button"
            isLoading={isDeleting}
            onClick={onConfirmDelete}
            leftIcon={<Trash2 className="h-4 w-4" />}
          >
            DELETE PRODUCT
          </Button>
        </div>
      </div>
    </Modal>
  );
}
