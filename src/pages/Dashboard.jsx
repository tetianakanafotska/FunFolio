import React, { useState, useContext, useEffect } from "react";
import PopUpButtons from "../components/PopUpButtons";
import MediaForm from "../components/MediaForm";
import MediaItem from "../components/MediaItem";
import { AuthContext } from "@context";
import axios from "axios";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [boardId, setBoardId] = useState(null);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openMediaForm, setOpenMediaForm] = useState(false);
  const [mediaType, setMediaType] = useState(null);
  const [allMedia, setAllMedia] = useState([]);

  const getCurrentLocalDateFormatted = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  useEffect(() => {
    const currentDate = getCurrentLocalDateFormatted();
    console.log("THE DATE", currentDate);
    if (user) {
      const userId = user._id;
      axios
        .get(
          `http://localhost:5005/users/${userId}/boards?start=${currentDate}`
        )
        .then((res) => {
          if (res.data.length !== 0) {
            setAllMedia(res.data[0].boardContent);
            setBoardId(res.data[0]._id);
          } else {
            setAllMedia([]);
            setBoardId(null);
          }
        });
    }
  }, [user]);

  useEffect(() => {
    console.log("this is board id:", boardId);
    if (boardId === null && allMedia.length > 0 && user) {
      axios
        .post(`http://localhost:5005/boards`, {
          userId: user._id,
          boardContent: allMedia,
        })
        .then((res) => {
          console.log(res);
          setBoardId(res.data._id);
        });
    } else if (boardId && user) {
      axios
        .patch(`http://localhost:5005/boards/${boardId}`, allMedia)
        .then((res) => {
          console.log(res);
        });
    }
  }, [allMedia, boardId, user]);

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
        {allMedia.length > 0 ? (
          allMedia.map((media, index) => (
            <div key={index}>
              <MediaItem media={media} />
            </div>
          ))
        ) : (
          <p>Create content for today</p>
        )}
      </div>
    </>
  );
};

export default Dashboard;
