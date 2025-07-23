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
    <div className="homepage">
      <header className="hero-section">
        <div className="overlay" />
        <nav className="navbar">
          <h1 className="brand">SportsX</h1>
          <div className="dropdown-wrapper">
            <button className="btn btn-red-sm" onClick={() => setMenuOpen(!menuOpen)}>⋮</button>
            {menuOpen && (
              <div className="dropdown-expanded">
                <div onClick={() => handleMenuClick("/update-account")}>Update Account</div>
                <div onClick={() => handleMenuClick("/update-password")}>Change Password</div>
                <div onClick={() => handleMenuClick("/channel-info")}>Channel Info</div>
                <div onClick={() => handleMenuClick("/upload")}>Upload Video</div>
                <div onClick={() => handleMenuClick(`/c/${user?.username}`)}>Account Page</div>
                <div onClick={() => handleMenuClick("logout")}>Logout</div>
              </div>
            )}
          </div>
        </nav>
        <div className="hero-text" data-aos="fade-up">
          <h1>Welcome, {user?.name || 'Player'}!</h1>
          <p>Upload highlights, share your journey, or watch your idols play live.</p>
          <div className="hero-buttons">
            <input
              type="text"
              placeholder="Search content or players..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-red" onClick={handleSearch}>Explore &gt;</button>
          </div>
        </div>
      </header>

      {searchResults.length > 0 && (
        <div className="search-results" data-aos="fade-up">
          <h2>Search Results:</h2>
          {searchResults.map((video) => (
            <div key={video._id} className="video-card">
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              <p><strong>By:</strong> {video.uploaderName}</p>
              <video src={video.videoUrl} controls width="320px" height="50px" />
            </div>
          ))}
        </div>
      )}

      <section className="section" data-aos="fade-right">
        <div className="text-block">
          <h2>Know Your Players</h2>
          <p>Explore highlights of legendary moments in your favorite sports.</p>
        </div>
        <div className="media-block">
          <video src="/videos/kohli.mp4" autoPlay loop muted controls />
        </div>
      </section>

      <section className="section reverse" data-aos="fade-left">
        <div className="media-block">
          <img src="/images/thirdimg.jpg" alt="Upload Section" />
        </div>
        <div className="text-block">
          <h2>Upload Your Clips</h2>
          <p>Save and showcase your sports moments for others to see.</p>
        </div>
      </section>

      <section className="section" data-aos="fade-up">
        <div className="text-block">
          <h2>Watch Anywhere</h2>
          <p>Stream matches from your phone, tablet, laptop, or TV seamlessly.</p>
        </div>
        <div className="media-block">
          <video src="/videos/video2.mp4" autoPlay loop muted controls />
        </div>
      </section>

      <section className="section reverse" data-aos="zoom-in">
        <div className="media-block">
          <img src="https://img.freepik.com/premium-photo/children-playing-outdoor-sports_1270664-25477.jpg" alt="Kids Playing" />
        </div>
        <div className="text-block">
          <h2>Inspire Young Athletes</h2>
          <p>Create profiles and let kids follow their favorite players.</p>
        </div>
      </section>

      <section className="faq" data-aos="fade-up">
        <h2>Frequently Asked Questions</h2>
        <div className="faqbox"><span>What is SportsX?</span></div>
        <div className="faqbox"><span>How do I upload videos?</span></div>
        <div className="faqbox"><span>Can I follow my favorite players?</span></div>
        <div className="faqbox"><span>Is it free to use?</span></div>
      </section>
    </div>
  );
};

export default HomePage;

