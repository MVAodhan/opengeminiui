import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createClient } from "@supabase/supabase-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SB_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
// Create a single supabase client for interacting with your database
export const supabase = createClient(SB_URL, SB_KEY);
