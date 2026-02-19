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

  const openModal = () => {
    const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const closeModal = () => {
    const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
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
      console.log("passed to parent")

    } else {
      alert("Please wait for location to load or enable location")
    }

    //insert into supabase

    //close modal with successful transfer of prop
    closeModal();
    setSongName("");
    setArtistName("");
    setComment("");
  };

  return (
    <>
      <div className="post-container">
        <button className="post-button" onClick={openModal}>
          Create a Music Moment
        </button>
      </div>

      <dialog id="my_modal_1" className="modal">
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
            <button className="btn" onClick={closeModal}>
              Close
            </button>
            <button
              className="btn"
              onClick= {handleSubmit}
              disabled={!position || !songName || !artistName}
            >
              Add
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default MakePost;