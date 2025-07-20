//  HomePage.jsx updated to use AuthContext and improve login persistence
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/style.css";
import { useParams } from "react-router-dom";


const HomePage = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { username } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
const [searchResults, setSearchResults] = useState([]);


  const handleSearch = async () => {
  if (!searchQuery.trim()) return;
  try {
    const res = await fetch(`/api/v1/videos/search?q=${encodeURIComponent(searchQuery)}`);
    if (!res.ok) {
      // Try to parse response, but fallback to generic error
      let errMsg = `Server error: ${res.status}`;
      try {
        const errObj = await res.json();
        errMsg = errObj?.error || errMsg;
      } catch {}
      setSearchResults([]);
      alert("Search failed: " + errMsg);
      return;
    }
    const data = await res.json();
    setSearchResults(data);
  } catch (err) {
    setSearchResults([]);
    alert("Could not process search: " + err.message);
    console.error("Search error:", err);
  }
};


 const handleMenuClick = (path) => {
    setMenuOpen(false);
    if (path === "logout") {
      logout();
      navigate("/login");
      
    } else {
      console.log("User inside HomePage:", user); 
      navigate(path);
    }
  };

  return (
    <div className="main">
      {/* Dark overlay */}
      <div className="overlay" />

      {/* Content on top of overlay */}
      <div className="content">
        <nav className="navbar">
          <h1 style={{ color: "black", fontSize: "32px" }}>SportsX</h1>
          <div className="dropdown-wrapper">
            <button className="btn btn-red-sm" onClick={() => setMenuOpen(!menuOpen)}>⋮</button>
            {menuOpen && (
              <div className="dropdown-expanded">
                <div onClick={() => handleMenuClick("/update-account")}>Update Account</div>
                <div onClick={() => handleMenuClick("/update-password")}>Change Password</div>
                <div onClick={() => handleMenuClick("/channel-info")}>Channel Info</div>
                <div onClick={() => handleMenuClick("/upload")}>Upload Video</div>
                <div onClick={() => handleMenuClick(`/c/${user?.username}`)}>AccountPage</div>


                <div onClick={() => handleMenuClick("logout")}>Logout</div>
              </div>
            )}
          </div>
        </nav>

        <div className="hero">
          <h1>Welcome, {user?.name || "Player"}!</h1>
          <p>Upload your highlights, share your journey, or catch pro moments live.</p>
          <p>Click the menu (⋮) above to get started.</p>
         
         
         <div className="hero-buttons">
  <input
    type="text"
    placeholder="Search content or players..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
  <button className="btn btn-red" onClick={handleSearch}>Explore &gt;</button>
</div>
{searchResults.length > 0 && (
  <div className="search-results">
    <h2>Search Results:</h2>
    {searchResults.map((video) => (
      <div key={video._id} className="video-card">
        <h3>{video.title}</h3>
        <p>{video.description}</p>
        <p><strong>By:</strong> {video.uploaderName}</p>
        <video src={video.videoUrl} controls width="320" height="180" />
      </div>
    ))}
  </div>
)}


        </div>
      </div>

      {/* Sections */}
      <section className="first">
        <div className="text-block">
          <span className="title">Know more about your fav sports and player</span>
          <span className="desc">
            Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.
          </span>
        </div>
        <div className="media-block">
          <video src="/videos/kohli.mp4" autoPlay loop muted controls height="350px" />
        </div>
      </section>

      <div className="separation"></div>

      <section className="first second">
        <div className="secImg">
          <img src="thirdimg.jpg" alt="" height="350px" />
        </div>
        <div>
          <span>Upload your videos playing sports ,fav player clips</span>
          <span>Save your favourites easily and always have something to watch.</span>
        </div>
      </section>

      <div className="separation"></div>

      <section className="first third">
        <div>
          <span>Watch everywhere</span>
          <span>Stream unlimited matches on your phone, tablet, laptop, and TV.</span>
        </div>
        <div className="secImg">
          <video
            src="/videos/video2.mp4"
            autoPlay
            loop
            muted
            height="350px"
            width="400px"
          />
        </div>
      </section>

      <div className="separation"></div>

      <section className="first second">
        <div className="secImg">
          <img
            src="https://img.freepik.com/premium-photo/children-playing-outdoor-sports_1270664-25477.jpg"
            alt=""
            height="350"
          />
        </div>
        <div>
          <span>Create profiles for children</span>
          <span>Send children on grounds for playing sports that they like while seeing their fav player playing</span>
        </div>
      </section>

      <div className="separation"></div>

      {/* FAQ Section */}
      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faqbox"><span>What is SportsX?</span></div>
        <div className="faqbox"><span>What all I can do in SportsX?</span></div>
        <div className="faqbox"><span>What can I watch on sportsclips?</span></div>
        <div className="faqbox"><span>Where can I write?</span></div>
      </section>
    </div>
  );
};

export default HomePage;
