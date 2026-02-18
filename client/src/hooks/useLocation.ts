import { useState, useEffect } from 'react';
import { useGeolocation } from "@uidotdev/usehooks"; // Your existing hook

interface LocationCoords {
  latitude: number | null;
  longitude: number | null;
}

export const useLocation = () => {
  const coords = useGeolocation();
  const [location, setLocation] = useState<LocationCoords>({
    latitude: null,
    longitude: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<GeolocationPositionError | null >(null);

  useEffect(() => {
    if (coords.loading) {
      setIsLoading(true);
    } else if (coords.error) {
      setError(coords.error);
      setIsLoading(false);
    } else if (coords.latitude && coords.longitude) {
      setLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      setIsLoading(false);
      setError(null);
    }
  }, [coords]);

  return {
    location,
    isLoading,
    error
  };
};