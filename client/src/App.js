import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Loading Spinner */}
      <div className="loading" id="loadingSpinner">
        <div className="spinner"></div>
      </div>

      {/* Navigation */}
      <nav className="glass-nav">
        <div className="nav-container">
          <div className="logo">
            <i className="fas fa-heartbeat"></i> CareConnect
          </div>
          <div className="nav-links">
            <a href="#" className="active">Home</a>
            <a href="#services">Services</a>
            <a href="#how-it-works">How it works</a>
            <a href="#testimonials">Testimonials</a>
            <button className="btn btn-primary" id="loginBtn">Login</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Quality Home Nursing Care at Your Fingertips</h1>
          <p>Book certified nurses in 3 simple steps for all your healthcare needs</p>

          {/* Search Card */}
          <div className="search-card">
            <div className="search-group">
              <div className="input-group">
                <i className="fas fa-map-marker-alt"></i>
                <input type="text" id="locationInput" placeholder="Enter your location" />
              </div>
              <div className="input-group">
                <i className="fas fa-stethoscope"></i>
                <select id="specializationSelect">
                  <option value="">Select Specialization</option>
                  <option value="General Care">General Care</option>
                  <option value="Elder Care">Elder Care</option>
                  <option value="Post-Surgical">Post-Surgical</option>
                  <option value="Pediatric">Pediatric Care</option>
                  <option value="Maternity">Maternity Care</option>
                </select>
              </div>
              <button className="btn btn-primary" id="searchBtn">
                <i className="fas fa-search"></i> Find Care
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="services">
        <div className="container">
          <div className="features-header">
            <h2>Why Choose CareConnect?</h2>
            <p>We provide comprehensive home healthcare solutions with verified professionals</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-user-md"></i>
              </div>
              <h3>Verified Professionals</h3>
              <p>All our nurses are certified, background-checked, and reviewed by patients for quality assurance.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-clock"></i>
              </div>
              <h3>24/7 Availability</h3>
              <p>Get care whenever you need it with our round-the-clock service and quick response times.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <h3>Real-time Tracking</h3>
              <p>Track your nurse's arrival time and receive updates throughout the care session.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-col">
            <h3>CareConnect</h3>
            <p>Connecting patients with qualified healthcare professionals for personalized home care services.</p>
          </div>
          <div className="footer-col">
            <h3>Quick Links</h3>
            <div className="footer-links">
              <a href="#">Home</a>
              <a href="#services">Services</a>
              <a href="#how-it-works">How it Works</a>
              <a href="#testimonials">Testimonials</a>
            </div>
          </div>
          <div className="footer-col">
            <h3>Services</h3>
            <div className="footer-links">
              <a href="#">General Care</a>
              <a href="#">Elder Care</a>
              <a href="#">Post-Surgical Care</a>
              <a href="#">Pediatric Care</a>
              <a href="#">Maternity Care</a>
            </div>
          </div>
          <div className="footer-col">
            <h3>Contact Us</h3>
            <div className="footer-links">
              <a href="tel:+919876543210"><i className="fas fa-phone"></i> +91 9876543210</a>
              <a href="mailto:info@careconnect.com"><i className="fas fa-envelope"></i> info@careconnect.com</a>
              <a href="#"><i className="fas fa-map-marker-alt"></i> Bengaluru, India</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 CareConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
