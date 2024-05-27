import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";

function MediaItem({ asset, handleDeleteAsset, handleEditAsset }) {
  const [isEditing, setIsEditing] = useState(false);
  const [assetContent, setAssetContent] = useState(asset.content);

  const handleSaveEdit = () => {
    handleEditAsset(asset._id, assetContent);
    setIsEditing(false);
  };

  const renderContent = () => {
    switch (asset.type) {
      case "text":
        return isEditing ? (
          <input
            type="text"
            value={assetContent}
            onChange={(e) => setAssetContent(e.target.value)}
          />
        ) : (
          <p>{assetContent}</p>
        );
      case "image":
        return isEditing ? (
          <input
            type="text"
            value={assetContent}
            onChange={(e) => setAssetContent(e.target.value)}
          />
        ) : (
          <img src={assetContent} alt="Uploaded content" />
        );
      case "youtubeURL":
        return isEditing ? (
          <>
            <input
              type="text"
              value={assetContent}
              onChange={(e) => setAssetContent(e.target.value)}
            />

            <ReactPlayer url={assetContent} controls />
          </>
        ) : (
          <ReactPlayer url={assetContent} controls />
        );
      case "camImage":
        return isEditing ? (
          <input
            type="text"
            value={asset.content}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          <img src={asset.content} alt="Uploaded content" />
        );
      default:
        return null;
    }
  };

  const renderButtons = () => {
    return isEditing ? (
      <div className="edit-mode-buttons">
        <button onClick={handleSaveEdit}>Save</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
        <button onClick={() => handleDeleteAsset(asset._id)}>Delete</button>
      </div>
    ) : (
      <button onClick={() => setIsEditing(true)}>Edit</button>
    );
  };

  return (
    <div>
      {renderContent()}
      {renderButtons()}
    </div>
  );
}

export default MediaItem;
