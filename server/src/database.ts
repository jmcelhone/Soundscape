import { createClient as createBClient } from '@supabase/supabase-js';
import { createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr';
import { type Database } from './supabase.ts';
import { type Request, type Response } from 'express';

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

export function createClient(req: Request, res: Response) {
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
            cookies: {
                getAll() {
                    return parseCookieHeader(req.headers.cookie ?? '');
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        res.appendHeader('Set-Cookie', serializeCookieHeader(name, value, options))
                    );
                },
            },
        }
    );
}

export async function authenticate(req: Request, res: Response): 
    Promise<
        {
            uid: string,
            email: string | undefined,
            email_verified: boolean,
        } | null
    > {

    const supabase = createClient(req, res);

    const { data, error } = await supabase.auth.getClaims();
    
    if (!data || error) {
        console.error(error);
        return new Promise((resolve) => { resolve(null); });
    }

    if (data.claims.aud == 'authenticated') {
        const metadata = data.claims.user_metadata;
        if (!metadata) return new Promise((resolve) => { resolve(null); });
        return new Promise((resolve) => {
            resolve({
                uid: metadata.sub,
                email: metadata.email,
                email_verified: metadata.email_verified
            });
        });
    }

    return new Promise((resolve) => { resolve(null); });
}

export function createBasicClient() {
    return createBClient<Database>(
        supabaseURL,
        supabaseKey
    );
}
