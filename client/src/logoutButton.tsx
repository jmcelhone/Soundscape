import { createClient } from './supabase.ts';

export default function logoutButton() {
    const logout = async () => {
        const supabase = createClient();
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error(error);
        } else {
            window.location.href = window.location.origin;
        }
    }

    return <button onClick={logout}>Logout</button>;
}
