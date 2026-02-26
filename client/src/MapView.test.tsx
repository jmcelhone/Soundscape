import React, {act} from 'react';
import { render, screen } from '@testing-library/react';
import MapView from './MapView';

vi.mock('react-leaflet')

describe('MapView', () => {
    it('renders without crashing', async () => {
        await act(async () => {
            render(<MapView latestPost={null} />);
        });
    });
});
