import { createClient } from "@supabase/supabase-js";

const NEXT_PUBLIC_SUPABASE_URL: any = process.env.NEXT_PUBLIC_SUPABASE_URL;
const NEXT_PUBLIC_SUPABASE_KEY: any = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const SUPABASE_KEY: any = process.env.SUPABASE_KEY;

export const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_KEY);
