import React from 'react';
import { render, screen } from '@testing-library/react';
import SignUpForm from './SignUpForm';

vi.mock('./supabase')

describe('SignUpForm', () => {
    it('renders without crashing', () => {
        render(<SignUpForm />);
        expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
    });
});
