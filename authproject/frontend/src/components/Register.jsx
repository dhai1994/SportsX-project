import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../api"
import "../styles/register.css"


import Beams from "../blocks/Backgrounds/Beams/Beams.jsx"

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  })

  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (e.target.name === "avatar") {
      setAvatar(file);
    } else if (e.target.name === "coverImage") {
      setCoverImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", form.fullname)
    formData.append("username", form.username)
    formData.append("email", form.email)
    formData.append("password", form.password)
    if (avatar) formData.append("avatar", avatar)
    if (coverImage) formData.append("CoverImage", coverImage)

    try {
      const res = await API.post("/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      alert("Registration successful! Please log in.")
      navigate("/login")
    } catch (err) {
      console.error("Registration error:", err)
      alert(err.response?.data?.message || "Error during registration.")
    }
  }

  return (
    <>
    <div className="beams-wrapper">
  <Beams
    beamWidth={2}
    beamHeight={15}
    beamNumber={12}
    lightColor="#ffffff"
    speed={2}
    noiseIntensity={1.75}
    scale={0.2}
    rotation={0}
  />
</div>

    <div className="register-main">
      {/* Beams background */}
      

      {/* Faded overlay box (optional) */}
      <div className="black-box"></div>

      {/* Navbar */}
      <nav>
        <h1 style={{ color: "RED", fontSize: "32px" }}>SportsX</h1>
        <div className="flex-for-select">
          <select name="lang" id="langi">
            <option value="en">English</option>
            <option value="hi">Hindi</option>
          </select>
          <button onClick={() => navigate("/login")}>Sign In</button>
        </div>
      </nav>

      {/* Form & Content */}
      <div className="hero-div">
        <span className="hero-items big">Create your account</span>
        <span className="hero-items medium">
          Share your passion with a world of fans and players
        </span>
        <span className="hero-items small">
          Please fill in the details to register
        </span>

        <form
          className="input-button"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <input
            className="inp"
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={form.fullname}
            onChange={handleChange}
            required
          />
          <input
            className="inp"
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="inp"
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            className="inp"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <label htmlFor="avatarUpload" className="upload-label">
            Upload Avatar
          </label>
          <input
            className="inp"
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleFileChange}
            required
          />

          <label htmlFor="coverImageUpload" className="upload-label">
            Upload Cover Image
          </label>
          <input
            className="inp"
            type="file"
            name="coverImage"
            accept="image/*"
            onChange={handleFileChange}
            required
          />

          <button className="but" type="submit">
            Register &gt;
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Register;