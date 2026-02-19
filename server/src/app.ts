import express, { type Request, type Response } from 'express';
import { createClient, type QueryData, type QueryError } from '@supabase/supabase-js';
import { createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr';
import { type Database } from './supabase.ts';
import cors from "cors";


// create express app
const app = express()

// middleware
app.use(cors());
app.use(express.json())

// create supabase database
const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;
const supabase = createClient<Database>(
    supabaseURL,
    supabaseKey
);

app.get("/auth/confirm", async (req: Request, res: Response) => {
    const tokenHash = req.query.token_hash;
    const type = req.query.type;
    const next = req.query.next ?? "/";

    console.log(tokenHash, type, next);

    if (tokenHash && type) {
        const supabase = createServerClient(
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

        const { data, error } =  await supabase.auth.verifyOtp({
            type,
            token_hash: tokenHash,
        });

        console.log(data, error);

        if (!error) {
            res.redirect(303, next);
            return;
        }
    }

    res.redirect(303, `/auth/error`);
});

app.get("/auth/error", (req: Request, res: Response) => {
    res.status(401).send("Error authenticating user");
});

app.get('/', (req: Request, res: Response) => {
    res.status(200).send("Hello World from Express");
});

app.use((req: Request, res: Response) => {
    res.status(404).send("Error: 404");
});

export default app;
