"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const isLoginPage = pathname.endsWith("/login");

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      // router.replace() van next/navigation voegt de basePath zelf toe,
      // dus hier bewust GEEN withBasePath gebruiken (anders dubbele basePath -> 404).
      if (!user && !isLoginPage) {
        router.replace("/dashboard/login");
      } else if (user && isLoginPage) {
        router.replace("/dashboard");
      }
      setChecking(false);
    });
  }, [pathname, isLoginPage, router]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dcq-gray">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return children;
}
