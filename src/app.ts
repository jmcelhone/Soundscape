import express, { type Request, type Response } from 'express';
import { createClient, type QueryData, type QueryError } from '@supabase/supabase-js';
import { createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr';
import { type Database } from './supabase.ts';

// create express app
const app = express()

// middleware
app.use(express.json())

// create supabase database
const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;
const supabase = createClient<Database>(
    supabaseURL,
    supabaseKey
);

// routing
app.get("/auth/spotify/login", async (req: Request, res: Response) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'spotify',
        options: {
            redirectTo: 'https://localhost:8000/auth/callback'
        }
    });

    if (error) {
        console.error(error);
        res.status(500).send("Error: server error on gathering auth redirect.");
    } else {
        res.redirect(303, data.url);
    }
});

app.get("/auth/callback", async (req: Request, res: Response) => {
    const code = req.query.code;
    const next = req.query.next ?? "/";

    // TODO *****************************
    // Integrate persist login with OAuth
    // **********************************
    
    // Debug ************************************
    console.log("Code:", code, "\n Next:", next);
    // ******************************************
    
    if (code) {
        const supabase = createServerClient(
            supabaseURL,
            supabaseKey,
            {
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
        await supabase.auth.exchangeCodeForSession(code);
    }
    res.redirect(303, `/${next.slice(1)}`);
});

app.get('/', (req: Request, res: Response) => {
    res.status(200).send("Hello World");
});

app.use((req: Request, res: Response) => {
    res.status(404).send("Error: 404");
});

export default app;
