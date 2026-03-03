import { createClient } from './supabase.ts';
import { useState } from 'react';

interface SignUpProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  isLoading?: boolean;
}
export default function SignUpForm({ onSubmit, isLoading = false }: SignUpProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
	const [error, setError] = useState('');

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        await onSubmit(email, password);
    };


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
            <button className='login-button' type="submit" onClick={handleSubmit}>
                Sign Up
            </button>
        </form>
    );
}
