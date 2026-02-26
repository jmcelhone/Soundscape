export const MapContainer = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
export const TileLayer = () => null;
export const Marker = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
export const Popup = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
export const useMap = () => ({ panTo: vi.fn() });
export const MapUpdater = () => null;
