import React, { useState } from "react";
import API from "../api";
import "../styles/upload.css";
import { useAuth } from "../contexts/AuthContext";

import Stepper, { Step } from "../blocks/Components/Stepper/Stepper.jsx"; // update path if needed

const UploadVideo = () => {
  const { user } = useAuth();
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUpload = async () => {
    if (!video || !thumbnail || !title) {
      return alert("All fields are required.");
    }

    const formData = new FormData();
    formData.append("videoFile", video);
    formData.append("thumbnail", thumbnail);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const res = await API.post("/videos/upload", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percent);
        },
      });

      setUploadedVideo(res.data.data);
      alert("Video uploaded successfully!");
      setUploadProgress(0);
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed.");
      setUploadProgress(0);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Your Video</h2>

      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="progress-bar-wrapper">
          <div className="progress-bar" style={{ width: `${uploadProgress}%` }}>
            {uploadProgress}%
          </div>
        </div>
      )}

      <Stepper
        initialStep={1}
        onFinalStepCompleted={handleUpload}
        nextButtonText="Next"
        backButtonText="Previous"
      >
        {/* Step 1: Select video */}
        <Step>
          <label>Upload Video File</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            required
          />
          {video && (
            <video
              src={URL.createObjectURL(video)}
              controls
              className="preview-video"
            />
          )}
        </Step>

        {/* Step 2: Title & Description */}
        <Step>
          <label>Video Title</label>
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Description</label>
          <textarea
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </Step>

        {/* Step 3: Thumbnail + Profile */}
        <Step>
          <label>Upload Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
            required
          />
          {thumbnail && (
            <img
              src={URL.createObjectURL(thumbnail)}
              alt="thumbnail"
              className="thumbnail-preview"
            />
          )}
          {user && (
            <div className="user-info">
              <img src={user.avatar} alt="avatar" className="avatar" />
              <p>@{user.username}</p>
              <p>Most viewed: {user?.topVideo?.title} ({user?.topVideo?.views} views)</p>
            </div>
          )}
        </Step>

        {/* Step 4: Confirm & Upload */}
        <Step>
          <h3>Review & Submit</h3>
          <p><strong>Title:</strong> {title}</p>
          <p><strong>Description:</strong> {description}</p>
          {thumbnail && (
            <img
              src={URL.createObjectURL(thumbnail)}
              alt="thumbnail"
              className="thumbnail-preview"
            />
          )}
          {video && (
            <video
              src={URL.createObjectURL(video)}
              controls
              className="preview-video"
            />
          )}
          <p>Click “Complete” to upload your video.</p>
        </Step>
      </Stepper>

      {/* Preview uploaded result */}
      {uploadedVideo && (
        <div className="preview-section">
          <h3>Uploaded Video Preview</h3>
          <video
            src={uploadedVideo.videoFile.url}
            controls
            className="preview-video"
          />
          <p><strong>Title:</strong> {uploadedVideo.title}</p>
          <p><strong>Description:</strong> {uploadedVideo.description}</p>
        </div>
      )}
    </div>
  );
};

export default UploadVideo;
