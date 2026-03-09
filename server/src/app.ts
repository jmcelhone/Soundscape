import express, { type Request, type Response } from 'express';
import { type QueryData, type QueryError, type EmailOtpType } from '@supabase/supabase-js';
import { createClient, authenticate } from './database.ts';
import cors from "cors";

// create express app
const app = express()

// middleware
const corsOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";
app.use(cors({
    origin: corsOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json())

app.post("/posts", async (req: Request, res: Response) => {
    // create supabase client
    const supabase = createClient(req, res);

    // auth user
    const userData = await authenticate(supabase);
    if (!userData) {
        return res.status(401).send("User authorization failed");
    }

    try {
        // Pull from JSON
        const { songTitle, artistName, latitude, longitude, comment } = req.body;

        // Validate required fields
        if (!songTitle || typeof songTitle !== "string") {
            return res.status(400).send("songTitle is required and must be a string");
        }

        // Latitude/longitude, placeholder
        if (typeof latitude !== "number" || typeof longitude !== "number") {
            return res.status(400).json({ error: "latitude and longitude must be numbers" });
        }

        // Build new post and insert into Supabase
        const newPost = {
            userid: userData.uid,
            time: new Date().toISOString(),
            songid: null,
            location: `(${latitude},${longitude})`,
            comment: {
                songTitle,
                artistName: artistName ?? "",
                text: comment ?? "",
            }
        };

        // Insert into Supabase
        const { data, error } = await supabase
            .from("posts")
            .insert([newPost])
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
// Returns the latest post for all users
app.get("/feed", async (req: Request, res: Response) => {
    // create supabase client
    const supabase = createClient(req, res);

    // auth user
    const userData = await authenticate(supabase);
    if (!userData) {
        return res.status(401).send("User authorization failed");
    }
    
    try {
        // Read userID from query string
        const userID = userData.uid ?? "";

        // Validation
        if (!userID) {
            return res.status(400).send("userID query parameter is required");
        }

        // Fetch posts where userid is in feedUserIDs by newest first
        const { data: posts, error: postsErr } = await supabase
            .from("posts")
            .select("postid, userid, time, location, comment")
            .order("time", { ascending: false })
            .limit(20);

        if (postsErr) {
            console.error(postsErr);
            return res.status(500).send("Posts query failed");
        }

        let usersInQuery: string[] = [];
        for (const post of posts) {
            if (!usersInQuery.includes(post.userid)) {
                usersInQuery.push(post.userid);
            }
        }

        const { data: usernames, error: usernamesErr } = await supabase
            .from("usernames")
            .select()
            .in("id", usersInQuery);

        if (usernamesErr) {
            console.error(usernamesErr);
            return res.status(500).send("Users query failed");
        }

        // Return posts to frontend
        return res.status(200).json({ posts: posts ?? [], users: usernames ?? [] });
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    }

});

app.get("/auth/confirm", async (req: Request, res: Response) => {
    const tokenHash = req.query.token_hash;
    const typeString = req.query.type;
    const next = req.query.next ?? "/";

    if (typeof tokenHash != "string" || typeof typeString != "string" || typeof next != "string") {
        return res.status(500).send("Error in processing query");
    }

    const type = typeString as EmailOtpType;

    console.log(tokenHash, type, next);

    if (tokenHash && type) {
        const supabase = createClient(req, res);

        const { data, error } =  await supabase.auth.verifyOtp({
            type,
            token_hash: tokenHash,
        });

        console.log(data, error);

        if (data && data.user && !error) {
            const newUserData = data.user.user_metadata;
            await supabase.from("usernames").insert({
                id: newUserData.sub,
                username: newUserData.display_name,
            });

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
