import { createClient } from './supabase.ts';
import { useState } from 'react';

export default function SignUpForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        handleSignup(email, password);
    }

    const handleSignup = async (email: string, password: string) => {
        const supabase = createClient();
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                emailRedirectTo: "http://localhost:5173/"
            }
        });

        if (error) console.error(error);
    }

    return (
        <form>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
            />
            <button type="submit" onClick={handleSubmit}>
                Sign Up
            </button>
        </form>
    );
}
