import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";


const Login = ({}) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
     email: "",
     password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Step 1: Login
    const res = await API.post("/users/login", form, { withCredentials: true });
    console.log(" Login Response:", res);
    console.log(" Cookies after login (visible):", document.cookie);

    // Step 2: WAIT for /me
    const meRes = await API.get("/users/me", { withCredentials: true });
    console.log(" User from /me:", meRes.data);

    // Optional: store in localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(meRes.data));

    // Success
    alert("Login successful!");
    navigate("/home");
  } catch (err) {
    console.error(" Login or /me failed:", err);
    alert(err.response?.data?.message || "Login failed.");
  }
};


  return (
    <>
    
    <div className="login-main">
      <div className="black-box"></div>

      <nav className="navbar">
        <h1 className="brand">SportsX</h1>
      </nav>

      <div className="hero-div">
        <span className="hero-items big">Tweet It. Talk It. Live It. This Is Your Home for Sports.</span>
        <span className="hero-items medium">Real sports. Real people. Real community</span>
        <span className="hero-items small">Your Sports Journey Starts Here!! Enter your email</span>

        <form className="input-button" onSubmit={handleSubmit}>
          <input
            className="ib-item inp"
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="ib-item inp"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button className="ib-item but" type="submit">Login &gt;</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;
