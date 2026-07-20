"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shield, Key, CheckCircle, AlertCircle } from "lucide-react";

export default function AdminSettingsPage() {
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New password and confirm password do not match." });
      return;
    }

    if (newPassword.length < 6) {
      setMessage({ type: "error", text: "New password must be at least 6 characters long." });
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to change password");
      }

      setMessage({ type: "success", text: "Password changed successfully! Next login will require your new password." });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to update password." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" space-y-6 font-lattera text-xs text-white">
      {/* Header */}
      <div className="border-b border-[#26262A] pb-6 space-y-2">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-[#D71921]/10 rounded border border-[#D71921]/30">
            <Shield className="h-5 w-5 text-[#D71921]" />
          </div>
          <div>
            <h2 className="font-ndot text-lg font-normal uppercase tracking-wider text-white">
              ADMIN SECURITY SETTINGS
            </h2>
            <p className="text-xs text-neutral-400 font-sans">
              Update admin security credentials for your Nothing control panel.
            </p>
          </div>
        </div>
      </div>

      {/* Alert Notification */}
      {message && (
        <div
          className={`p-4 border font-lattera text-xs flex items-center space-x-3 rounded-lg ${
            message.type === "success"
              ? "bg-green-950/40 border-green-800 text-green-400"
              : "bg-red-950/40 border-red-800 text-red-400"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle className="h-5 w-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Change Password Form Only */}
      <div className="bg-[#0F0F10] border border-[#26262A] p-6 sm:p-8 space-y-6 rounded-xl shadow-2xl">
        <div className="flex items-center space-x-2 text-neutral-300 font-bold border-b border-[#26262A] pb-4">
          <Key className="h-4 w-4 text-[#D71921]" />
          <span className="uppercase tracking-wider">CHANGE ADMIN PASSWORD</span>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <Input
            label="CURRENT PASSWORD"
            type="password"
            placeholder="••••••••"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />

          <Input
            label="NEW PASSWORD"
            type="password"
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <Input
            label="CONFIRM NEW PASSWORD"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <div className="pt-4 flex justify-end">
            <Button
              type="submit"
              variant="red"
              size="lg"
              fullWidth
              isLoading={isLoading}
              leftIcon={<Key className="h-4 w-4" />}
            >
              UPDATE PASSWORD
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
