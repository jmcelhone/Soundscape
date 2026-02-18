import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MapView.css';

import L from 'leaflet';

function MapView() {
 return (
    <MapContainer center={[44.56699643037226, -123.2737945750708]} zoom={20} scrollWheelZoom={true}>
    <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[44.56699643037226, -123.2737945750708]}>
        <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
    </Marker>
    </MapContainer>
 )
}

export default MapView;