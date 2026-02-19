import React from 'react';
import './App.css';
import MakePost from "./MakePost.tsx";
import { useEffect, useState } from "react";
import SignUpForm from "./SignUpForm.tsx";
import LoginForm from "./LoginForm.tsx";
import LogoutButton from "./LogoutButton.tsx";
import MapView from './MapView.tsx';

function App() {
  const [message, setMessage] = useState("");
  const [latestPost, setLatestPost] = useState<{
    songName: string;
    artistName: string;
    comment: string;
    position: [number, number];
    timestamp: number;
  } | null>(null);

  const handleNewPost = (post) => {
    setLatestPost(post);
  };
  useEffect(() => {
    fetch("https://localhost:8000/")
      .then((res) => res.text())
      .then((text) => setMessage(text));
  }, []);
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <h1>Hello World!</h1>
      <h2>{message}</h2>
      <MapView latestPost={latestPost} />
      <MakePost onPostCreated={handleNewPost}/>
      <SignUpForm />
      <LoginForm />
      <LogoutButton />
    </div>
  );
}

export default App;
