import React, { act } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import MapView from './MapView';

vi.mock('react-leaflet');
vi.mock('leaflet', () => ({
  default: {
    Icon: {
      Default: {
        prototype: {},
        mergeOptions: vi.fn(),
      },
    },
  },
}));

const mockGeolocation = {
  getCurrentPosition: vi.fn((cb) =>
    cb({ coords: { latitude: 44.56, longitude: -123.27 } })
  ),
};
Object.defineProperty(global.navigator, 'geolocation', { value: mockGeolocation });

global.fetch = vi.fn();

const mockFeedPosts = {
    posts: [
        {
            postid: 1,
            userid: 'user-1',
            time: '2026-01-01',
            location: '(44.565,-123.276)',
            comment: { songTitle: 'Test Song', artistName: 'Test Artist', text: 'Epic' },
        },
        {
            postid: 2,
            userid: 'user-2',
            time: '2026-01-02',
            location: '(44.566,-123.277)',
            comment: null,
        },
    ],
    users: []
};

beforeEach(() => {
  vi.clearAllMocks();
  (global.fetch as any).mockResolvedValue({
    ok: true,
    json: async () => mockFeedPosts,
  });
});

describe('MapView', () => {
  it('renders without crashing', async () => {
    await act(async () => {
      render(<MapView latestPost={null} feedRefresh={0} />);
    });
  });

  it('fetches feed', async () => {
    await act(async () => {
      render(<MapView latestPost={null} feedRefresh={0} />);
    });
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/feed'),
        expect.objectContaining({ method: 'GET' })
      );
    });
  });

  it('re-fetches feed when feedRefresh changes', async () => {
    const { rerender } = render(<MapView latestPost={null} feedRefresh={0} />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    await act(async () => {
      rerender(<MapView latestPost={null} feedRefresh={1} />);
    });
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
  });

  it('handles fetch failure', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: false,
      text: async () => 'Feed fetch failed',
    });
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await act(async () => {
      render(<MapView latestPost={null} feedRefresh={0} />);
    });

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch feed:', expect.any(Error));
    });
    consoleSpy.mockRestore();
  });

  it('renders post markers', async () => {
    await act(async () => {
      render(<MapView latestPost={null} feedRefresh={0} />);
    });
    await waitFor(() => {
      expect(screen.getByText('Test Song')).toBeInTheDocument();
	  expect(screen.getByText((content) => content.includes('Test Artist'))).toBeInTheDocument();
	  expect(screen.getByText((content) => content.includes('Epic'))).toBeInTheDocument();
    });
  });

  it('renders Unknown Song for posts without a comment', async () => {
    await act(async () => {
      render(<MapView latestPost={null} feedRefresh={0} />);
    });
    await waitFor(() => {
      expect(screen.getByText('Unknown Song')).toBeInTheDocument();
    });
  });

  it('renders latestPost marker when provided', async () => {
    const latestPost = {
      songName: 'New Song',
      artistName: 'New Artist',
      comment: 'Amazing',
      position: [44.56, -123.27] as [number, number],
      timestamp: Date.now(),
      feedRefresh: 0,
    };

    await act(async () => {
      render(<MapView latestPost={latestPost} feedRefresh={0} />);
    });

    await waitFor(() => {
      expect(screen.getByText(/New Song/)).toBeInTheDocument();
      expect(screen.getByText(/New Artist/)).toBeInTheDocument();
    });
  });

  it('skips render of marker for invalid location', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => {
          return {
              posts: [
                  { postid: 3, userid: 'u', time: '', location: 'invalid', comment: null },
              ],
              users: []
          }
      },
    });

    await act(async () => {
      render(<MapView latestPost={null} feedRefresh={0} />);
    });

    await waitFor(() => {
      expect(screen.queryByText('Unknown Song')).not.toBeInTheDocument();
    });
  });
});
