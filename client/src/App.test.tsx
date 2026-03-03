import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

vi.mock('./supabase');
vi.mock('react-leaflet');
vi.mock('leaflet');
vi.mock('./MapView.css', () => ({}));
vi.mock('./MakePost.css', () => ({}));
vi.mock('./Login.css', () => ({}));

// Mock AuthContext so we can control session state
vi.mock('./AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useAuth: vi.fn(),
}));

import { useAuth } from './AuthContext';

global.fetch = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  (global.fetch as any).mockResolvedValue({
    ok: true,
    text: async () => 'Hello from server',
    json: async () => [],
  });
});

describe('App', () => {
  it('renders without crashing', async () => {
    (useAuth as any).mockReturnValue(null);
    render(<App />);
    expect(screen.getByText('Soundscape')).toBeInTheDocument();
  });

  it('shows Login without session', async () => {
    (useAuth as any).mockReturnValue(null);
    render(<App />);
    await waitFor(() => {
		expect(screen.getByRole('heading', { name: 'Sign In' })).toBeInTheDocument();
    });
  });

  it('shows MapView, MakePost, LogoutButton with session', async () => {
    (useAuth as any).mockReturnValue({ user: { id: 'user' } });
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Create a Music Moment')).toBeInTheDocument();
      expect(screen.getByText('Logout')).toBeInTheDocument();
    });
  });

  it('fetches and show server message', async () => {
    (useAuth as any).mockReturnValue(null);
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Hello from server')).toBeInTheDocument();
    });
  });
});
