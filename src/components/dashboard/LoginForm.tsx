"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { withBasePath } from "@/lib/paths";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Ongeldige inloggegevens. Probeer opnieuw.");
      setLoading(false);
      return;
    }

    window.location.href = withBasePath("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-dcq-gray px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md space-y-6 rounded-2xl border border-dcq-gray-border bg-white p-8 shadow-sm"
      >
        <div className="text-center">
          <Image
            src={withBasePath("/images/dcqbikeslogotransparent.png")}
            alt="DCQ Bikes"
            width={200}
            height={60}
            className="mx-auto mb-4 h-12 w-auto object-contain"
          />
          <h1 className="font-heading text-2xl font-bold text-dcq-black">Dashboard login</h1>
        </div>

        {error && <ErrorMessage message={error} />}

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-dcq-gray-border px-4 py-3 text-base focus:border-dcq-red focus:outline-none focus:ring-2 focus:ring-dcq-red/20"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
              Wachtwoord
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-dcq-gray-border px-4 py-3 text-base focus:border-dcq-red focus:outline-none focus:ring-2 focus:ring-dcq-red/20"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full min-h-[48px] items-center justify-center rounded-xl bg-dcq-red text-lg font-semibold text-white transition-colors hover:bg-dcq-red-dark disabled:opacity-50"
        >
          {loading ? <LoadingSpinner size="sm" className="border-white border-t-transparent" /> : "Inloggen"}
        </button>
      </form>
    </div>
  );
}
