"use client";

import * as React from "react";
import { Upload, HelpCircle, ArrowRight, FileText, CheckCircle2, Image as ImageIcon, Trash2, ShieldAlert } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TransactionProofModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  onComplete: () => void;
}

export function TransactionProofModal({ isOpen, onClose, orderId, onComplete }: TransactionProofModalProps) {
  const [receiptImage, setReceiptImage] = React.useState<string>("");
  const [isUploading, setIsUploading] = React.useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [dragActive, setDragActive] = React.useState<boolean>(false);
  const [fileName, setFileName] = React.useState<string>("");

  // Upload file using the server upload API
  const handleUploadFile = async (file: File) => {
    try {
      setIsUploading(true);
      setFileName(file.name);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setReceiptImage(data.url);
      } else {
        alert("Failed to process receipt image. Please try again.");
        setFileName("");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong while uploading receipt.");
      setFileName("");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUploadFile(file);
    }
  };

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleUploadFile(file);
    }
  };

  // Clear file
  const handleClearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setReceiptImage("");
    setFileName("");
  };

  // Submit proof API action
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!receiptImage) return;

    try {
      setIsSubmitting(true);
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          receiptImage,
        }),
      });
      if (res.ok) {
        onComplete();
      } else {
        // Fallback to complete anyway so checkout flow isn't blocked
        onComplete();
      }
    } catch (error) {
      console.error("Failed to submit transaction proof:", error);
      onComplete();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white border-slate-200 text-slate-900 rounded-[28px] p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] no-scrollbar font-ntype">
        <DialogHeader className="text-center space-y-2 pb-4 border-b border-slate-100">
          <div className="mx-auto bg-slate-50 border border-slate-200/60 rounded-2xl p-3 inline-flex items-center justify-center mb-1">
            <ImageIcon className="h-6 w-6 text-slate-700" />
          </div>
          <DialogTitle className=" text-lg font-bold text-slate-900 justify-center tracking-tight">SUBMIT PAYMENT PROOF</DialogTitle>
          <DialogDescription className="text-xs text-slate-500 font-ntype leading-relaxed max-w-sm mx-auto">
            Thank you! Your order has been registered. Please upload a screenshot of your bank transfer receipt below to activate express shipment.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          {/* Drag & Drop File Upload */}
          <div className="space-y-2">
            {receiptImage ? (
              <div className="border border-slate-200/80 bg-slate-50/50 rounded-[20px] p-5 flex flex-col items-center space-y-4">
                {/* Thumbnail Image View (Vertical portrait aspect ratio) */}
                <div className="relative h-44 w-32 overflow-hidden rounded-xl border border-slate-200/80 shadow-md bg-white p-1">
                  <img src={receiptImage} alt="Receipt preview" className="h-full w-full object-contain rounded-lg" />
                </div>
                {/* File Details card info */}
                <div className="w-full flex items-center justify-between bg-white border border-slate-200/60 rounded-xl p-2.5 shadow-sm">
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div className="bg-emerald-50 text-emerald-600 rounded-lg p-2 shrink-0">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="text-left min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate max-w-[170px]">{fileName}</p>
                      <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="h-3 w-3 stroke-[2.5]" /> File Selected
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleClearFile}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0"
                    title="Remove file"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-[20px] transition-all duration-200 flex flex-col items-center justify-center p-8 min-h-[160px] cursor-pointer ${
                  dragActive ? "border-black bg-slate-50/80" : isUploading ? "border-neutral-300 bg-slate-50/20 cursor-wait" : "border-slate-200 hover:border-slate-300 bg-slate-50/40"
                }`}
                onClick={() => {
                  if (!isUploading) document.getElementById("file-upload-popup")?.click();
                }}
              >
                <input type="file" id="file-upload-popup" accept="image/*" onChange={handleFileChange} className="hidden" disabled={isUploading} />
                <div className="flex flex-col items-center text-slate-500 space-y-3">
                  {isUploading ? (
                    <div className="flex flex-col items-center space-y-2">
                      <div className="h-5 w-5 border-2 border-slate-300 border-t-slate-800 animate-spin rounded-full" />
                      <p className="text-xs text-slate-600 font-bold">Uploading file to media catalog...</p>
                    </div>
                  ) : (
                    <>
                      <div className="bg-white border border-slate-200/80 rounded-full p-2.5 shadow-sm text-slate-600">
                        <Upload className="h-5 w-5 stroke-[2]" />
                      </div>
                      <div className="text-center space-y-1">
                        <p className="text-xs font-bold text-slate-800">Drag receipt snapshot here</p>
                        <p className="text-[10px] text-slate-400 font-normal">or click to browse files</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              onClick={onComplete}
              className="font-lattera text-[10px] font-semibold py-3 uppercase tracking-wider h-11 border-slate-200 hover:border-black rounded-[16px] transition flex-1 text-slate-600 hover:text-black cursor-pointer bg-white"
            >
              Skip / Submit Later
            </Button>
            <Button
              type="submit"
              disabled={isUploading || isSubmitting || !receiptImage}
              className="bg-black hover:bg-slate-900 text-white py-3  font-lattera text-[10px] font-bold uppercase tracking-wider h-11 rounded-[16px] transition flex-1 cursor-pointer disabled:opacity-40 disabled:pointer-events-none shadow-lg shadow-black/5"
            >
              {isSubmitting ? "Sending..." : "Submit Proof"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
