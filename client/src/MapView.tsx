import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png?url";
import markerIcon from "leaflet/dist/images/marker-icon.png?url";
import markerShadow from "leaflet/dist/images/marker-shadow.png?url";
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './style/MapView.css';

const defaultZoom = 20;
const defaultCoords: [number, number] = [44.56699643037226, -123.2737945750708];

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/461/461238.png',
  iconRetinaUrl: 'https://cdn-icons-png.flaticon.com/512/461/461238.png',
  shadowUrl: markerShadow, // Keep the shadow if you like it, or set to null to remove
  iconSize: [35, 35],
  iconAnchor: [17, 35],
});

interface PostProp {
  latestPost: {
    feedRefresh: number;
    songName: string;
    artistName: string;
    comment: string;
    position: [number, number];
    timestamp: number;
  } | null;
    feedRefresh: number;
}

type FeedPost = {
  postid: number;
  userid: string;
  time: string;
  location: string; // e.g. "(44.565,-123.276)"
  comment: {
    songTitle?: string;
    artistName?: string;
    text?: string;
  } | null;
};

function MapUpdater({ position }: { position: [number, number] | null }) {
    const map = useMap();

    useEffect(() => {
        if (position) {
            map.panTo(position);
        }
    }, [position, map]);
    return null;
}

function parseLocationPoint(point: string): [number, number] | null {
  // point looks like "(44.565,-123.276)"
  if (!point || typeof point !== "string") return null;

  const cleaned = point.replace("(", "").replace(")", "");
  const parts = cleaned.split(",");
  if (parts.length !== 2) return null;

  const lat = Number(parts[0]);
  const lng = Number(parts[1]);

  if (Number.isNaN(lat) || Number.isNaN(lng)) return null;
  return [lat, lng];
}

function MapView({ latestPost, feedRefresh }: PostProp) {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>([]);

  // Grab user's current location (for centering map)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setPosition([pos.coords.latitude, pos.coords.longitude]);
    });
  }, []);

  // Fetch feed from backend once when component loads
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch(location.origin + "/api/feed", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text);
        }

        const data: FeedPost[] = await res.json();
        setFeedPosts(data);

        setFeedPosts(data);
      } catch (err) {
        console.error("Failed to fetch feed:", err);
      }
    };

    fetchFeed();
  }, [feedRefresh]); // re-fetch feed whenever feedRefresh changes

 return (
    <div>
        <MapContainer center={defaultCoords} zoom={defaultZoom} scrollWheelZoom={true}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater position={position} />

        {/* Show posts from feed */}
        {feedPosts.map((post) => {
          const coords = parseLocationPoint(post.location);
          if (!coords) return null;

          return (
            <Marker key={post.postid} position={coords}>
              <Popup>
                <b>{post.comment?.songTitle ?? "Unknown Song"}</b>
                <br />
                {post.comment?.artistName ?? ""}
                <br />
                {post.comment?.text ?? ""}
              </Popup>
            </Marker>
          );
        })}

        {/* Optional: also show the latestPost you just created */}
        {latestPost?.position && (
          <Marker position={latestPost.position}>
            <Popup>
              <b>{latestPost.songName}</b> - {latestPost.artistName}
              <br />
              {latestPost.comment}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default MapView;
