import { createBrowserClient } from '@supabase/ssr';

const supabaseURL = import.meta.env.VITE_PUBLIC_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

export function createClient() {
    return createBrowserClient(
        supabaseURL,
        supabaseKey,
        {
            auth: {
                flowType: 'pkce',
                autoRefreshToken: true,
                persistSession: true,
                detectSessionInUrl: true,
            }
        }
    );
}
