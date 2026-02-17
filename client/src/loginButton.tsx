import { createClient } from './supabase.ts';

export default function loginButton() {
    const handleLogin = async () => {
        const supabase = createClient();
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "spotify",
            options: {
                redirectTo: "https://localhost:8000/auth/callback"
            }
        });

        if (error) console.error(error);
    }

    return <button onClick={handleLogin}>Sign in with Spotify</button>;
}
