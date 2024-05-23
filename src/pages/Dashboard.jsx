import React, { useState, useContext } from "react";
import PopUpButtons from "../components/PopUpButtons";
import MediaForm from "../components/MediaForm";
import MediaItem from "../components/MediaItem";
import { AuthContext } from "@context";

const Dashboard = () => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openMediaForm, setOpenMediaForm] = useState(false);
  const [mediaType, setMediaType] = useState(null);
  const [allMedia, setAllMedia] = useState([]);

  return (
    <>
      <h2>{user ? `Hello, ${user.name}!` : "Hello!"}</h2>

      <div className="dashboard-container">
        <button onClick={() => setOpenPopUp(!openPopUp)}>+</button>
        {openPopUp && (
          <PopUpButtons
            setMediaType={setMediaType}
            setOpenMediaForm={setOpenMediaForm}
            setOpenPopUp={setOpenPopUp}
          />
        )}
        {openMediaForm && (
          <MediaForm
            mediaType={mediaType}
            setAllMedia={setAllMedia}
            setOpenPopUp={setOpenPopUp}
            setOpenMediaForm={setOpenMediaForm}
          />
        )}
        {allMedia.map((media) => {
          console.log(allMedia);
          return (
            <div key={media._id}>
              <MediaItem media={media} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Dashboard;
