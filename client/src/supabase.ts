import { createBrowserClient } from '@supabase/ssr';

const supabaseURL = import.meta.env.VITE_PUBLIC_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;
const cookieHostURL = import.meta.env.VITE_COOKIE_HOST_URL!;
const isProd = import.meta.env.NODE_ENV;

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
            },
            cookieOptions: {
                domain: cookieHostURL,
                path: '/',
                sameSite: 'lax',
                secure: isProd === 'production',
                maxAge: 60 * 60 * 24 * 30, // 30 days
            },
        }
    );
}
