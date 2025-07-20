import React from "react";
import { useAuth } from "../contexts/AuthContext";
import "../styles/style.css";

const UserProfile = () => {
  const { user } = useAuth();

  if (!user) return <p>Loading user info...</p>;

  return (
    <div className="main">
      <div className="overlay" />
      <div className="content">
        <nav className="navbar">
          <h1 style={{ color: "black", fontSize: "32px" }}>User Profile</h1>
        </nav>

        <div className="profile-box">
          <h2>Hello, {user.name}!</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Member Since:</strong> {user.createdAt ? new Date(user.createdAt).toDateString() : "N/A"}</p>
          <p><strong>User ID:</strong> {user._id || user.id}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
