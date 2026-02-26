import '@testing-library/jest-dom'

global.navigator.geolocation = {
    getCurrentPosition: vi.fn((success) =>
        success({ coords: { latitude: 44.56, longitude: -123.27 } })
    ),
    watchPosition: vi.fn(),
    clearWatch: vi.fn(),
};

global.fetch = vi.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
        text: () => Promise.resolve(''),
    } as Response)
);
