import { env } from "@/env";

/**
 * @param {{ src: string, width: number, quality?: number }} params
 * @returns {string}
 */
export default function supabaseLoader({ src, width, quality }) {
  return `https://${env.NEXT_PUBLIC_SUPABASE_PROJECT_ID}.supabase.co/storage/v1/render/image/public/media/${src}?width=${width}&quality=${quality || 75}`;
}
