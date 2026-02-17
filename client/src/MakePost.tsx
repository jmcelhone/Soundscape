import React, { useState, useEffect } from "react";
import './MakePost.css'

const closeModal = () => {
  const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
  if (modal) {
    modal.close();
  }
};

interface LocationCoords {
  latitude: number | null;
  longitude: number | null;
}

const MakePost = () => {

  const [userId, setUserId] = useState<string>("");
  const [songName, setSongName] = useState("");
  //to do - add geolocation
  // const [location, setLocation] = useState<LocationCoords>({
  //   latitude: null,
  //   longitude: null,
  // });
  const [location, setLocation] = useState("");
  const [comment, setComment] = useState("");


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
              <label className="section-label">Add your location</label>
              <textarea
                placeholder="Type here"
                className="form-input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div className="form-section">
              <label className="section-label">Add a comment</label>
              <textarea
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
                  const newResourceData = {
                    song: songName,
                    location: location,
                    comment: comment
                  };
                  //to-do send info to supabase
                  closeModal();
                  console.log("Successfully added resource with reference:");
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