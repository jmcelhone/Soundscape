import { createClient } from './supabase.ts';
import { useState } from 'react';

export default function LogoutButton() {
    const [error, setError] = useState('');

    const logout = async () => {
        const supabase = createClient();
        const { error } = await supabase.auth.signOut();
        if (error) setError(error.message);
        else window.location.href = window.location.origin;
    }

    return (
        <div>
            {error && <p>{error}</p>}
            <button onClick={logout}>Logout</button>
        </div>
    );
}
