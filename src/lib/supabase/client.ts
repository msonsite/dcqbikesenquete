import { createBrowserClient } from "@supabase/ssr";
import { createSupabaseFetch } from "./fetch";

/** Browser Supabase client voor kiosk-inserts */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createBrowserClient(url, key, {
    global: {
      fetch: createSupabaseFetch(key),
    },
  });
}
