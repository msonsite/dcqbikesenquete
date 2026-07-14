/** Base path voor deploy onder msonsite.be/dcqbikesenquete */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Voeg basePath toe aan interne routes */
export function withBasePath(path: string): string {
  if (!basePath) return path;
  return `${basePath}${path}`;
}
