import { createClient } from './supabase.ts';
import { useState } from 'react';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSignIn(email, password);
    }

    const handleSignIn = async (email: string, password: string) => {
        const supabase = createClient();
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) console.error(error, data);
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
                Sign In
            </button>
        </form>
    );
}
