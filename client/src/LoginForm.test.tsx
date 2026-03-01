import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';

const mockOnSubmit = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  mockOnSubmit.mockResolvedValue(undefined);
});

describe('LoginForm', () => {
  it('renders without crashing', () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
  });

  it('updates email and password', () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);
    fireEvent.change(screen.getByPlaceholderText('Enter email'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter password'), { target: { value: 'password123' } });
    expect(screen.getByPlaceholderText('Enter email')).toHaveValue('test@test.com');
    expect(screen.getByPlaceholderText('Enter password')).toHaveValue('password123');
  });

  it('calls onSubmit with email and password', async () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);
    fireEvent.change(screen.getByPlaceholderText('Enter email'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter password'), { target: { value: 'admin1' } });
    fireEvent.click(screen.getByText('Sign In'));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith('test@test.com', 'admin1');
    });
  });
});
