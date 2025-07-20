import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import API from "../api";
import "../styles/AccountPage.css";
import { useParams } from "react-router-dom";


const AccountPage = () => {
  const { user } = useAuth(); // from AuthContext
  const [profileData, setProfileData] = useState(null);
  const { username } = useParams();

 

console.log("User from AuthContext:", user);
console.log("Username from URL:", username);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/me", { withCredentials: true });
        setProfileData(res.data);
        console.log("USER IN ACCOUNT PAGE:", user);

      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, []);

  if (!profileData) return <div>Loading profile...</div>;

  const { name, avatar, videos = [], subscribers = 0 } = profileData;

  return (
    <div className="account-container">
      <div className="account-sidebar">
        <div className="sidebar-top">
          <div className="profile-pic">
            <img src={avatar || "/default-avatar.png"} alt="Avatar" />
          </div>
         <h3>{user?.fullname || "User"}</h3>
<p className="username">@{user?.username || "not-found"}</p>
  


          <button className="update-btn">Update Info</button>
        </div>
        <div className="sidebar-links">
          <div>My profile</div>
          <div>Uploaded</div>
          <div>Favorites</div>
          <div>Upload video</div>
        </div>
        <div className="sidebar-bottom">
          <div>Settings</div>
          <div>Log out</div>
        </div>
      </div>

      <div className="account-content">
        <div className="account-stats">
          <div><strong>{videos.length}</strong> Videos</div>
          <div><strong>{subscribers}</strong> Subscribers</div>
        </div>

        <div className="account-tabs">
          <div className="tab active">My Videos</div>
          <div className="tab">Favorites</div>
          <div className="tab">Watch Later</div>
        </div>

        <div className="video-category-list">
          {videos.slice(0, 6).map((video, idx) => (
            <div className="video-category" key={video._id}>
              <h4>{video.title}</h4>
              <p>{video.likes} likes</p>
            </div>
          ))}
        </div>

        <div className="upgrade-box">
          <button className="upgrade-btn">Upgrade Plan</button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
