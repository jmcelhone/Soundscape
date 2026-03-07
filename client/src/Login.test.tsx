import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import { createClient } from './supabase';

vi.mock('./supabase');
vi.mock('./Login.css', () => ({}));

const mockSignIn = vi.fn();
const mockSignUp = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  (createClient as any).mockReturnValue({
    auth: {
      signInWithPassword: mockSignIn,
      signUp: mockSignUp,
    },
  });
  mockSignIn.mockResolvedValue({ data: {}, error: null });
  mockSignUp.mockResolvedValue({ data: {}, error: null });
});

describe('Login', () => {
  it('renders sign in form by default', () => {
    render(<Login />);
    expect(screen.getByRole('heading', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('goes to sign up form', () => {
    render(<Login />);
    fireEvent.click(screen.getByText('Sign Up'));
    expect(screen.getByRole('heading', { name: 'Sign Up' })).toBeInTheDocument();
  });

  it('goes back to sign in form', () => {
    render(<Login />);
    fireEvent.click(screen.getByText('Sign Up'));
    fireEvent.click(screen.getByText('Sign In'));
    expect(screen.getByRole('heading', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('calls signInWithPassword on sign in submit', async () => {
    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText('Enter email'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({ email: 'test@test.com', password: 'password123'});
    });
  });

  it('shows error on invalid credentials', async () => {
    mockSignIn.mockResolvedValue({ data: null, error: { code: 'invalid_credentials', message: 'Invalid' } });
    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(screen.getByText('Invalid email or password. Please try again.')).toBeInTheDocument();
    });
  });

  it('shows generic error on other sign in error', async () => {
    mockSignIn.mockResolvedValue({ data: null, error: { code: 'other', message: 'Something went wrong' } });
    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });

  it('shows unexpected error if sign in throws', async () => {
    mockSignIn.mockRejectedValue(new Error('Network error'));
    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(screen.getByText('Unexpected error')).toBeInTheDocument();
    });
  });

  it('calls signUp on sign up submit', async () => {
    render(<Login />);
    fireEvent.click(screen.getByText('Sign Up'));
    fireEvent.change(screen.getByPlaceholderText('Enter email'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter username'), { target: { value: 'test_user' } });
    fireEvent.change(screen.getByPlaceholderText('Enter password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalled();
    });
  });

  it('shows error if account already exists', async () => {
    mockSignUp.mockResolvedValue({ data: null, error: { code: 'user_already_exists', message: '' } });
    render(<Login />);
    fireEvent.click(screen.getByText('Sign Up'));
    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(screen.getByText('An account with this email already exists. Please sign in instead.')).toBeInTheDocument();
    });
  });

  it('shows error for weak password', async () => {
    mockSignUp.mockResolvedValue({ data: null, error: { code: 'weak_password', message: '' } });
    render(<Login />);
    fireEvent.click(screen.getByText('Sign Up'));
    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(screen.getByText('Password is too weak. Please use a password of at least 6 characters.')).toBeInTheDocument();
    });
  });

  it('alerts and switches to sign in on successful sign up', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<Login />);
    fireEvent.click(screen.getByText('Sign Up'));
    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(expect.stringContaining('Please check your email'));
      expect(screen.getByRole('heading', { name: 'Sign In' })).toBeInTheDocument();
    });
    alertSpy.mockRestore();
  });

  it('shows unexpected error if sign up throws', async () => {
    mockSignUp.mockRejectedValue(new Error('Network error'));
    render(<Login />);
    fireEvent.click(screen.getByText('Sign Up'));
    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(screen.getByText('Unexpected error')).toBeInTheDocument();
    });
  });
});
