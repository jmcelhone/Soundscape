import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MapView.css';

const defaultZoom = 20;
const defaultCoords: [number, number] = [44.56699643037226, -123.2737945750708];


function MapUpdater({ position }: { position: [number, number] | null }) {
    const map = useMap();

    useEffect(() => {
        if (position) {
            map.panTo(position);
        }
    }, [position, map]);
    return null;
}

function MapView() {
    const [position, setPosition] = useState<[number, number] | null>(null);

    useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
    });
    }, []);
 return (
    <MapContainer center={defaultCoords} zoom={defaultZoom} scrollWheelZoom={true}>
    <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <MapUpdater position={position} />
    </MapContainer>
 )
}

export default MapView;