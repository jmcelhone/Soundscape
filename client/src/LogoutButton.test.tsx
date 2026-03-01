import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LogoutButton from './LogoutButton';
import { createClient } from './supabase';

vi.mock('./supabase');

describe('LogoutButton', () => {
  it('renders without crashing', () => {
    render(<LogoutButton />);
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('does not show error message upfront', () => {
    render(<LogoutButton />);
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
  });

  it('calls signOut when clicked', async () => {
    const mockSignOut = vi.fn(() => ({ error: null }));
    (createClient as any).mockReturnValue({ auth: { signOut: mockSignOut } });

    render(<LogoutButton />);
    fireEvent.click(screen.getByText('Logout'));

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalled();
    });
  });

  it('redirects on logout', async () => {
    const mockSignOut = vi.fn(() => ({ error: null }));
    (createClient as any).mockReturnValue({ auth: { signOut: mockSignOut } });

    const originalLocation = window.location.href;
    render(<LogoutButton />);
    fireEvent.click(screen.getByText('Logout'));

    await waitFor(() => {
      expect(window.location.href).toBe(window.location.origin + "/");
    });
  });

  it('displays error message if signOut fails', async () => {
    const mockSignOut = vi.fn(() => ({ error: { message: 'Sign out failed' } }));
    (createClient as any).mockReturnValue({ auth: { signOut: mockSignOut } });

    render(<LogoutButton />);
    fireEvent.click(screen.getByText('Logout'));

    await waitFor(() => {
      expect(screen.getByText('Sign out failed')).toBeInTheDocument();
    });
  });
});
