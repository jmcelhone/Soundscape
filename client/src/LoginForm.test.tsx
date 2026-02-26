import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import LoginForm from './LoginForm';

vi.mock('../supabase')

describe('LoginForm', () => {
    it('renders without crashing', () => {
        render(<LoginForm />);
        expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
    });
});
