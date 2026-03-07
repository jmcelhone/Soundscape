import { createClient as createBClient } from '@supabase/supabase-js';
import { createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr';
import { type Database } from './supabase.ts';
import { type Request, type Response } from 'express';

export function createClient(req: Request, res: Response) {
    const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

    return createServerClient(
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
                domain: process.env.COOKIE_HOST_URL!,
                path: '/',
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 30, // 30 days
            },
            cookies: {
                getAll() {
                    return parseCookieHeader(req.headers.cookie ?? '');
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        res.append('Set-Cookie', serializeCookieHeader(name, value, options))
                    );
                },
            },
        }
    );
}

export async function authenticate(supabase): 
    Promise<
        {
            uid: string,
            email: string | undefined,
            email_verified: boolean,
        } | null
    > {

    const { data, error } = await supabase.auth.getClaims();
    
    if (!data || error) {
        return new Promise((resolve) => { resolve(null); });
    }

    if (data.claims.aud == 'authenticated') {
        const metadata = data.claims.user_metadata;
        if (!metadata) return new Promise((resolve) => { resolve(null); });
        return new Promise((resolve) => {
            resolve({
                uid: data.claims.sub,
                email: data.claims.email,
                email_verified: metadata.email_verified
            });
        });
    }

    return new Promise((resolve) => { resolve(null); });
}
