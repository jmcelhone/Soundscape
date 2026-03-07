import React from 'react';
import './style/App.css';
import MakePost from "./MakePost.tsx";
import { useEffect, useState } from "react";
import SignUpForm from "./SignUpForm.tsx";
import LoginForm from "./LoginForm.tsx";
import LogoutButton from "./LogoutButton.tsx";
import MapView from './MapView.tsx';
import { AuthProvider, useAuth } from './AuthContext.tsx';
import Login from './Login.tsx';

function AppContent() {
  const session = useAuth();
  const userId = session?.user.id;
  const [message, setMessage] = useState("");
  const [latestPost, setLatestPost] = useState<{
    songName: string;
    artistName: string;
    comment: string;
    position: [number, number];
    timestamp: number;
  } | null>(null);
  const [feedRefresh, setFeedRefresh] = useState(0);

  const handleNewPost = (post) => {
    setLatestPost(post);
    setFeedRefresh((x) => x + 1); // tells MapView to re-fetch /api/feed
  };

  useEffect(() => {
    fetch(window.location.origin + "/api")
      .then((res) => res.text())
      .then((text) => setMessage(text));
  }, []);

  return (
    <div className="App">
      <header className="App-header"></header>
{session ? (
  <>
    <h1>Soundscape</h1>
    <MapView latestPost={latestPost} feedRefresh={feedRefresh} />
    <MakePost onPostCreated={handleNewPost} />
    <LogoutButton />
  </>
) : (
  <div className="landing-page">
    <div className="landing-bg">
      <div className="landing-content">
        <h1>Soundscape</h1>
        <p>
          Soundscape is a music-sharing social platform that creates a map-based
          feed of music sharing personal moments. This enables users to discover
          music through friend's real world experiences.
        </p>
        <Login />
      </div>
    </div>
  </div>
)}

function App() {
	return (
		<AuthProvider>
			<AppContent />
		</AuthProvider>
	);
}

export default App;
