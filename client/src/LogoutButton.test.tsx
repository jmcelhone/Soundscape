import React from 'react';
import { render, screen } from '@testing-library/react';
import LogoutButton from './LogoutButton';

vi.mock('./supabase')

describe('LogoutButton', () => {
    it('renders without crashing', () => {
        render(<LogoutButton />);
        expect(screen.getByText('Logout')).toBeInTheDocument();
    });
});
