export const createClient = vi.fn(() => ({
    auth: {
        signInWithPassword: vi.fn(() => ({ data: {}, error: null })),
        signUp: vi.fn(() => ({ data: {}, error: null })),
        signOut: vi.fn(() => ({ error: null })),
        getSession: vi.fn(() => ({ data: { session: null }, error: null })),
    }
}));
