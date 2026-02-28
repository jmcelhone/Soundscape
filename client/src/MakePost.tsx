import React, { useState, useEffect } from "react";
import './MakePost.css'

interface PostProp {
  onPostCreated: (post: {
    songName: string;
    artistName: string;
    comment: string;
    position: [number, number];
    timestamp: number;
  }) => void;
}
const MakePost = ({ onPostCreated }: PostProp) => {
  //waiting for user auth to get userId
  //const [userId, setUserId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [comment, setComment] = useState("");
  const [position, setPosition] = useState<[number, number] | null >(null);

  //grab user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
            setPosition([pos.coords.latitude, pos.coords.longitude]);
        });
    }, []);


const submitPost = async () => {
  if (!position) throw new Error("Location not ready");

  const payload = {
    songTitle: songName,
    artistName: artistName,
    latitude: position[0],
    longitude: position[1],
    comment: comment,
  };

  const res = await fetch(window.location.origin + "/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // sends auth cookies
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return await res.json();
};

  //creates a newPost prop, lifts state to App.tsx
  const handleSubmit = async () => {
    if (position != null) {
      const newPost = {
        songName,
        artistName,
        comment,
        position: position,
        timestamp: Date.now()
      };

      onPostCreated(newPost);

    } else {
      alert("Please wait for location to load or enable location");
      return;
    }

    //insert into supabase
    try {
      const created = await submitPost();
      console.log("Created post:", created);
    } catch (error) {
      console.error("Failed to add post:", error);
    }

    //close modal with successful transfer of prop
	setIsOpen(false);
    setSongName("");
    setArtistName("");
    setComment("");
  };

  return (
    <>
      <div className="post-container">
        <button className="post-button" onClick={() => setIsOpen(true)}>
          Create a Music Moment
        </button>
      </div>

        {isOpen && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3>Creating Music Moment</h3>
            <form>
              <div className="form-section">
                <label className="section-label">Song Name</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="form-input"
                  value={songName}
                  onChange={(e) => setSongName(e.target.value)}
                  required
                />
              </div>
              <div className="form-section">
                <label className="section-label">Artist Name</label>
                <input
                  placeholder="Type here"
                  className="form-input"
                  value={artistName}
                  onChange={(e) => setArtistName(e.target.value)}
                  required
                />
              </div>
              <div className="form-section">
                <label className="section-label">Add a comment</label>
                <input
                  placeholder="Type here"
                  className="form-input"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
              </div>
            </form>
            <div className="modal-actions">
              <button className="btn" onClick={() => setIsOpen(false)}>
                Close
              </button>
              <button className="btn" onClick={handleSubmit}>
                Add
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};


export default MakePost;
