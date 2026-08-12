"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shield, Lock, AlertCircle } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(1, "Username/Email is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginInputs = z.infer<typeof loginSchema>;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromUrl = searchParams.get("from") || "/admin";

  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginInputs) => {
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
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
    <div className="w-full max-w-[420px] bg-white/90 backdrop-blur-xl border border-neutral-200/80 p-8 space-y-8 relative z-10 shadow-[0_24px_60px_rgba(17,17,17,0.1)] rounded-xl">
      <div className="text-center space-y-4">
        <div className="inline-flex p-3 rounded-full bg-black/5 border border-black/10">
          <Shield className="h-6 w-6 text-black opacity-80" />
        </div>
        <Heading dotMatrix size="sm" className="text-neutral-900 tracking-tight">
          ADMIN ACCESS
        </Heading>
      </div>
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 font-lattera text-xs flex items-center space-x-2 rounded-lg animate-in fade-in slide-in-from-top-1 duration-200">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 font-lattera text-xs">
        <Input label="USERNAME / EMAIL" type="text" placeholder="Enter username" {...register("username")} error={errors.username?.message} />

        <Input label="PASSWORD" type="password" placeholder="••••••••" {...register("password")} error={errors.password?.message} />

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full justify-center py-6 text-sm font-semibold rounded-lg"
            isLoading={isLoading}
            leftIcon={<Lock className="h-4 w-4" />}
          >
            VERIFY IDENTITY
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden text-neutral-900 bg-[#f4f4f6]">
      <React.Suspense fallback={<div className="font-lattera text-xs text-neutral-500 animate-pulse">LOADING LOGIN PORTAL...</div>}>
        <LoginForm />
      </React.Suspense>
    </div>
  );
}
