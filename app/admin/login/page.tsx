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
    <div className="w-full max-w-md bg-white border border-neutral-200 p-8 space-y-8 relative z-10 shadow-xl rounded-2xl">
      <div className="text-center space-y-3">
        <div className="inline-flex p-3 rounded-full bg-[#D71921]/10 border border-[#D71921]/20">
          <Shield className="h-6 w-6 text-[#D71921]" />
        </div>
        <Heading badgeText="SECURE PORTAL" dotMatrix size="sm" className="text-neutral-900">
          ADMIN LOGIN
        </Heading>
        <p className="text-xs text-neutral-500 font-sans">Enter authorized credentials to access the Nothing store control center.</p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 font-lattera text-xs flex items-center space-x-2 rounded-lg">
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

      <div className="p-3 bg-neutral-50 border border-neutral-200 text-center font-lattera text-[10px] text-neutral-500 rounded-lg">
        DEFAULT CREDENTIALS: <span className="text-neutral-900 font-bold">admin</span> / <span className="text-neutral-900 font-bold">admin123</span>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-[100vh] flex items-center justify-center p-4 relative overflow-hidden text-neutral-900">
      <React.Suspense fallback={<div className="font-lattera text-xs text-neutral-500 animate-pulse">LOADING LOGIN PORTAL...</div>}>
        <LoginForm />
      </React.Suspense>
    </div>
  );
}
