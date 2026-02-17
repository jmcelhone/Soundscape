import React from 'react';
import './App.css';
import MakePost from "./MakePost.tsx";
import LoginButton from "./loginButton.tsx";
import LogoutButton from "./logoutButton.tsx";
import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
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
      <MakePost />
      <LoginButton />
      <LogoutButton />
    </div>
  );
}

export default App;
