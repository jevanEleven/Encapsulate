import { SupabaseClient, createClient } from "@supabase/supabase-js";

export function getSupabaseClient(): SupabaseClient {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl) {
        throw new Error("`NEXT_PUBLIC_SUPABASE_URL` undefined.");
    }

    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseKey) {
        throw new Error("`NEXT_PUBLIC_SUPABASE_ANON_KEY` undefined.");
    }

    let supabaseClient = createClient(supabaseUrl, supabaseKey);
    return supabaseClient;
}

export default getSupabaseClient;
