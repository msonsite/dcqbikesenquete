/**
 * Publishable keys (sb_publishable_...) zijn geen JWTs.
 * Supabase verwacht dan enkel de apikey-header, niet Authorization: Bearer.
 */
export function isPublishableKey(key: string): boolean {
  return key.startsWith("sb_publishable_");
}

/** Fetch wrapper voor Supabase publishable keys zonder user-sessie */
export function createSupabaseFetch(supabaseKey: string): typeof fetch {
  return async (input, init) => {
    const headers = new Headers(init?.headers);
    headers.set("apikey", supabaseKey);

    const authHeader = headers.get("Authorization");
    const isAnonymousPublishable =
      isPublishableKey(supabaseKey) &&
      authHeader === `Bearer ${supabaseKey}`;

    if (isAnonymousPublishable) {
      headers.delete("Authorization");
    }

    return fetch(input, { ...init, headers });
  };
}
