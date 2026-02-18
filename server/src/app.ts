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
    res.status(200).send("Hello World from Express");
});

app.post("/posts", async (req: Request, res: Response) => {

    try {
        const { userID, songTitle, artistName, latitude, longitude, comment } = req.body;

        if (!userID || !songTitle || latitude === undefined || longitude === undefined) {
            return res.status(400).json({ error: "Missing required fields" });
    }

    const { data, error } = await supabase
        .from('posts')
        .insert({
            user_id: userID,
            song_title: songTitle,
            artist_name: artistName,
            latitude: latitude,
            longitude: longitude,
            comment: comment
        })
        .select('*')
        .single();

        if (error) {
            console.error(error);
            return res.status(500).json({ error: "Database insert failed" });
        }

        res.ststus(201).json(data);
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

app.use((req: Request, res: Response) => {
    res.status(404).send("Error: 404");
});

export default app;
