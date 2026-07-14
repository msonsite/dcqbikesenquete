import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { createSupabaseFetch } from "./fetch";

/** Server Supabase client met cookie-sessie (dashboard / auth) */
export async function createClient() {
  const cookieStore = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // setAll kan falen in Server Components; middleware vangt sessie-updates op
        }
      },
    },
    global: {
      fetch: createSupabaseFetch(key),
    },
  });
}
