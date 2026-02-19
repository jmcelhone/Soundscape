import express, { type Request, type Response } from 'express';
import { type QueryData, type QueryError } from '@supabase/supabase-js';
import { createClient, createBasicClient, authenticate } from './database.ts';
import cors from "cors";

// create express app
const app = express()

// middleware
app.use(cors());
app.use(express.json())

// create supabase database
const basicSupabase = createBasicClient();

app.get("/auth/test", async (req: Request, res: Response) => {
    const user = await authenticate(req, res);

    console.log(user);

    res.status(200);
});

app.get("/auth/confirm", async (req: Request, res: Response) => {
    const tokenHash = req.query.token_hash;
    const type = req.query.type;
    const next = req.query.next ?? "/";

    console.log(tokenHash, type, next);

    if (tokenHash && type) {
        const supabase = createClient(req, res);

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
