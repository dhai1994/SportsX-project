import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


const ProtectedLayout = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return <p style={{ color: "white" }}>Loading...</p>;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, marginRight: "300px" }}>{children}</div>
    
    </div>
  );
};

export default ProtectedLayout;
