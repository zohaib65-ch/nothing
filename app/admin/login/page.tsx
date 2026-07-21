"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shield, Lock, AlertCircle } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromUrl = searchParams.get("from") || "/admin";

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push(fromUrl);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-[#0F0F10] border border-[#26262A] p-8 space-y-8 relative z-10 shadow-2xl">
      <div className="text-center space-y-3">
        <div className="inline-flex p-3 rounded-full bg-[#D71921]/10 border border-[#D71921]/20">
          <Shield className="h-6 w-6 text-[#D71921]" />
        </div>
        <Heading badgeText="SECURE PORTAL" dotMatrix size="sm">
          ADMIN LOGIN
        </Heading>
        <p className="text-xs text-neutral-400 font-sans">Enter authorized credentials to access the Nothing store control center.</p>
      </div>

      {error && (
        <div className="p-3 bg-red-950/40 border border-red-800 text-red-400 font-lattera text-xs flex items-center space-x-2">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 font-lattera text-xs">
        <Input label="USERNAME / EMAIL" type="text" placeholder="admin" value={username} onChange={(e) => setUsername(e.target.value)} required />

        <Input label="PASSWORD" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <div className="pt-2">
          <Button type="submit" variant="red" size="lg" fullWidth isLoading={isLoading} leftIcon={<Lock className="h-4 w-4" />}>
            AUTHENTICATE & ACCESS
          </Button>
        </div>
      </form>

      <div className="p-3 bg-[#141416] border border-[#26262A] text-center font-lattera text-[10px] text-neutral-500">
        DEFAULT CREDENTIALS: <span className="text-white font-bold">admin</span> / <span className="text-white font-bold">admin123</span>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
      <React.Suspense fallback={<div className="font-lattera text-xs text-neutral-400 animate-pulse">LOADING LOGIN PORTAL...</div>}>
        <LoginForm />
      </React.Suspense>
    </div>
  );
}
