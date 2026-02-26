import React from 'react';
import './App.css';
import MakePost from "./MakePost.tsx";
import { useEffect, useState } from "react";
import SignUpForm from "./SignUpForm.tsx";
import LoginForm from "./LoginForm.tsx";
import LogoutButton from "./LogoutButton.tsx";
import MapView from './MapView.tsx';
<<<<<<< HEAD
import { AuthProvider, useAuth } from './AuthContext.tsx';
=======
import Login from './Login.tsx';
>>>>>>> 2d6b694 (login wrapper component and styling)

function AppContent() {
  const session = useAuth();
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
    fetch("https://localhost:8000/")
      .then((res) => res.text())
      .then((text) => setMessage(text));
  }, []);

  return (
    <div className="App">
      <header className="App-header"></header>
      <h1>Soundscape</h1>
      <h2>{message}</h2>
	  {session ? (
	  	<>
			<MapView latestPost={latestPost} feedRefresh={feedRefresh} />
			<MakePost onPostCreate={handleNewPost} />
			<LogoutButton />
		</>
	  ) : (
	  		<>
				<LoginForm />
				<SignUpForm />
			</>
		)}
    </div>
  );
}

function App() {
	return (
		<AuthProvider>
			<AppContent />
		</AuthProvider>
	);
}

export default App;
