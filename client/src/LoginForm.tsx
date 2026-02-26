import { createClient } from './supabase.ts';
import { useState } from 'react';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
	const [error, setError] = useState('');

    const handleSubmit = (e: ReactFormEvent) => {
        e.preventDefault();
        handleSignIn(email, password);
    }

    const handleSignIn = async (email: string, password: string) => {
        const supabase = createClient();
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) setError(error.message);
		else setError('');
    }

    return (
        <form>
            <div>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                />
            </div>
            <div>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                />
            </div>
            <button type="submit" onClick={handleSubmit}>
                Sign In
            </button>
        </form>
    );
}
