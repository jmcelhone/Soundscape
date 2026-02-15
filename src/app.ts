import express, { type Request, type Response } from 'express';
import { createClient, type QueryData, type QueryError } from '@supabase/supabase-js';
import { type Database } from './supabase.ts';

// create express app
const app = express()
app.use(express.json())

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

// create supabase database
const supabase = createClient<Database>(
    supabaseURL,
    supabaseKey
);

// routing
app.get('/', (req: Request, res: Response) => {
    res.status(200).send("Hello World");
});

/* Example for making a query
const usersQuery = supabase
    .from("users")
    .select("*");
type AllUsers = QueryData<typeof usersQuery>;
const { data, error } = await usersQuery;
if (error) throw error;
const users: AllUsers = data;

console.log(users);
*/

export default app;
