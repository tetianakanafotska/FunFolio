import React, { useEffect, useState } from "react";
import PopUpButtons from "../components/PopUpButtons";
import MediaForm from "../components/MediaForm";
import MediaItem from "../components/MediaItem";
import axios from "axios";

const Dashboard = () => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openMediaForm, setOpenMediaForm] = useState(false);
  const [mediaType, setMediaType] = useState(null);
  const [allMedia, setAllMedia] = useState([]);

  return (
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
          allMedia={allMedia}
        />
      )}
      {allMedia.map((media) => {
        return (
          <div key={media._id}>
            <MediaItem media={media} />
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
