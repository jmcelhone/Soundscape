import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MakePost from './MakePost';

const mockGeolocation = {
  getCurrentPosition: vi.fn((cb) =>
    cb({ coords: { latitude: 44.56, longitude: -123.27 } })
  ),
};
Object.defineProperty(global.navigator, 'geolocation', { value: mockGeolocation });

global.fetch = vi.fn();

const mockOnPostCreated = vi.fn();

const defaultProps = {
  onPostCreated: mockOnPostCreated,
  userIdStr: "test-user",
};

beforeEach(() => {
  vi.clearAllMocks();
  (global.fetch as any).mockResolvedValue({
    ok: true,
    json: async () => ({ postid: 1 }),
  });
});

describe('MakePost', () => {
  it('renders without crashing', () => {
    render(<MakePost {...defaultProps} />);
    expect(screen.getByText('Create a Music Moment')).toBeInTheDocument();
  });

  it('modal is hidden initially', () => {
    render(<MakePost {...defaultProps} />);
    expect(screen.queryByText('Creating Music Moment')).not.toBeInTheDocument();
  });

  it('opens modal when button is clicked', () => {
    render(<MakePost {...defaultProps} />);
    fireEvent.click(screen.getByText('Create a Music Moment'));
    expect(screen.getByText('Creating Music Moment')).toBeInTheDocument();
  });

  it('closes modal when Close is clicked', () => {
    render(<MakePost {...defaultProps} />);
    fireEvent.click(screen.getByText('Create a Music Moment'));
    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByText('Creating Music Moment')).not.toBeInTheDocument();
  });

  it('updates input fields correctly', () => {
    render(<MakePost {...defaultProps} />);
    fireEvent.click(screen.getByText('Create a Music Moment'));

    const inputs = screen.getAllByPlaceholderText('Type here');
    fireEvent.change(inputs[0], { target: { value: 'test song' } });
    fireEvent.change(inputs[1], { target: { value: 'test artist' } });
    fireEvent.change(inputs[2], { target: { value: 'epic!' } });

    expect(inputs[0]).toHaveValue('test song');
    expect(inputs[1]).toHaveValue('test artist');
    expect(inputs[2]).toHaveValue('epic!');
  });

  it('calls onPostCreated and fetch on successful submit', async () => {
    render(<MakePost {...defaultProps} />);
    fireEvent.click(screen.getByText('Create a Music Moment'));

    const inputs = screen.getAllByPlaceholderText('Type here');
    fireEvent.change(inputs[0], { target: { value: 'Song' } });
    fireEvent.change(inputs[1], { target: { value: 'Artist' } });
    fireEvent.change(inputs[2], { target: { value: 'Comment' } });

    fireEvent.click(screen.getByText('Add'));

    await waitFor(() => {
      expect(mockOnPostCreated).toHaveBeenCalledWith(
        expect.objectContaining({
          songName: 'Song',
          artistName: 'Artist',
          comment: 'Comment',
          position: [44.56, -123.27],
        })
      );
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/posts'),
        expect.objectContaining({ method: 'POST' })
      );
    });
  });

  it('closes modal and clears fields after submit', async () => {
    render(<MakePost {...defaultProps} />);
    fireEvent.click(screen.getByText('Create a Music Moment'));

    const inputs = screen.getAllByPlaceholderText('Type here');
    fireEvent.change(inputs[0], { target: { value: 'Song' } });
    fireEvent.click(screen.getByText('Add'));

    await waitFor(() => {
      expect(screen.queryByText('Creating Music Moment')).not.toBeInTheDocument();
    });
  });

  it('handles fetch failure', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: false,
      text: async () => 'Database insert failed',
    });

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<MakePost {...defaultProps} />);
    fireEvent.click(screen.getByText('Create a Music Moment'));
    fireEvent.click(screen.getByText('Add'));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to add post:',
        expect.any(Error)
      );
    });
    consoleSpy.mockRestore();
  });

  it('alerts and does not submit if location is unavailable', async () => {
    mockGeolocation.getCurrentPosition.mockImplementationOnce(() => {}); // never calls cb
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(<MakePost {...defaultProps} />);
    fireEvent.click(screen.getByText('Create a Music Moment'));
    fireEvent.click(screen.getByText('Add'));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'Please wait for location to load or enable location'
      );
      expect(mockOnPostCreated).not.toHaveBeenCalled();
    });
    alertSpy.mockRestore();
  });
});
