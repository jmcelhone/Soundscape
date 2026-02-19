import React, { useState, useEffect } from "react";
import './MakePost.css'
import { useGeolocation } from "@uidotdev/usehooks";


const MakePost = () => {

  //const [userId, setUserId] = useState<string>("");
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [comment, setComment] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null >(null);

  const coords = useGeolocation();

  
  // const handleSubmit = (e: React.SubmitEvent) => {
  //   e.preventDefault();
  //   if (coords.loading || coords.error != null) {
  //     alert("Please wait for location data to load and check permissions");
  //     return;
  //   }
  
  //   //console.log("UserID:", userId);
  //   console.log("Location:", coords.latitude, coords.longitude);
  //   console.log("Song:", songName);
  // };

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
              onClick={async () => {

                try {
                  // const newResourceData = {
                  //   song: songName,
                  //   location: location,
                  //   comment: comment
                  
                  if (coords.loading || coords.error != null) {
                    alert("Please wait for location data to load and check permissions");
                    return;
                  } else {
                    //console.log("UserID:", userId);
                    setLongitude(coords.longitude)
                    setLatitude(coords.latitude)
                    console.log("Location:", coords.latitude, coords.longitude);
                    console.log("Song:", songName);
                    console.log("Artist:", artistName);
                    closeModal();
                    console.log("Successfully added resource with reference:");

                  }
              
                } catch (error) {
                  closeModal();
                  console.error("Failed to add resource:", error);
                }
              }}
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