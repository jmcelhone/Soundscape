import React from 'react';
import { render, screen } from '@testing-library/react';
import MakePost from './MakePost';

describe('MakePost', () => {
    it('renders without crashing', () => {
        render(<MakePost onPostCreated={vi.fn()} />);
        expect(screen.getByText('Create a Music Moment')).toBeInTheDocument();
    });
});
