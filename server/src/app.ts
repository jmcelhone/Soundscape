import express, { type Request, type Response } from 'express';
import { createClient, type QueryData, type QueryError } from '@supabase/supabase-js';
import { createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr';
import { type Database } from './supabase.ts';
import cors from "cors";


// create express app
const app = express()

// middleware
app.use(cors({
  origin: "https://localhost:8000",
  credentials: true
}));
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

app.post("/posts", async (req: Request, res: Response) => {
  try {
    // Pull from JSON
    const { userID, songTitle, artistName, latitude, longitude, comment } = req.body;

    // Validate required fields
    if (!songTitle || typeof songTitle !== "string") {
      return res.status(400).send("songTitle is required and must be a string");
    }

    // Latitude/longitude, placeholder
    if (typeof latitude !== "number" || typeof longitude !== "number") {
      return res.status(400).json({ error: "latitude and longitude must be numbers" })
    }

    // Build new post and insert into Supabase
    const newPost = {
      userid: userID ?? "00000000-0000-0000-0000-000000000000", // temp until auth
      time: new Date().toISOString(),
      songid: null,
      location: `(${latitude},${longitude})`,
      comment: {
        songTitle,
        artistName: artistName ?? "",
        text: comment ?? ""
      }
    };

    // Insert into Supabase
    const { data, error } = await supabase
      .from("posts")
      .insert(newPost)
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).send("Database insert failed");
    }

    // Return the created row to the frontend
    return res.status(201).json(data);
  } catch (err) {
    console.error("POST /posts error:", err);
    return res.status(500).send("Server error");
  }
});

// GET feed of posts
// Returns the latest post for each friend
app.get("/feed", async (req: Request, res: Response) => {
    try {
        // Read userID from query string
        const userID = String(req.query.userID ?? "");

        // Validation
        if (!userID) {
            return res.status(400).send("userID query parameter is required");
        }

        // friends table columns: useris1, userid2
        const { data: friendsRows, error: friendErr } = await supabase
            .from("friends")
            .select("userid1, userid2")
            .or(`userid1.eq.${userID},userid2.eq.${userID}`);
        
        if (friendErr) {
            console.error(friendErr);
            return res.status(500).send("Friends query failed");
        }

        // Friends rows gets converted into a list of friend IDs.
        const friendsIDs = (friendsRows ?? []).map((row) =>
            row.userid1 === userID ? row.userid2 : row.userid1
        );

        // Return empty feed if no friends
        if (friendsIDs.length === 0) {
            return res.status(200).json([]);
        }

        // Fetch posts where userid is in friendIDs by newest first
        const { data: posts, error: postsErr } = await supabase
        .from("posts")
        .select("postid, userid, time, location, comment")
        .in("userid", friendsIDs)
        .order("time", { ascending: false })
        .limit(20); // optional limit for now

        if (postsErr) {
            console.error(postsErr);
            return res.status(500).send("Posts query failed");
        }

        // Return posts to frontend
        return res.status(200).json(posts ?? []);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    }

});

app.use((req: Request, res: Response) => {
    res.status(404).send("Error: 404");
});

export default app;
