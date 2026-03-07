import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUpForm from './SignUpForm';

const mockOnSubmit = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  mockOnSubmit.mockResolvedValue(undefined);
});

describe('SignUpForm', () => {
  it('renders without crashing', () => {
    render(<SignUpForm onSubmit={mockOnSubmit} />);
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
  });

  it('updates email and password fields', () => {
    render(<SignUpForm onSubmit={mockOnSubmit} />);
    fireEvent.change(screen.getByPlaceholderText('Enter email'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter username'), { target: { value: 'test_user' } });
    fireEvent.change(screen.getByPlaceholderText('Enter password'), { target: { value: 'admin1' } });
    expect(screen.getByPlaceholderText('Enter email')).toHaveValue('test@test.com');
    expect(screen.getByPlaceholderText('Enter username')).toHaveValue('test_user');
    expect(screen.getByPlaceholderText('Enter password')).toHaveValue('admin1');
  });

  it('calls onSubmit with email and password when submitted', async () => {
    render(<SignUpForm onSubmit={mockOnSubmit} />);
    fireEvent.change(screen.getByPlaceholderText('Enter email'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter username'), { target: { value: 'test_user' } });
    fireEvent.change(screen.getByPlaceholderText('Enter password'), { target: { value: 'admin1' } });
    fireEvent.click(screen.getByText('Sign Up'));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith('test@test.com', 'admin1', 'test_user');
    });
  });
});
