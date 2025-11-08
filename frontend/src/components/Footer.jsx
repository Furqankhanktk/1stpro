
import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-container">
          <div className="footer-section">
            <h3>Pakhtunkhwa Group of Schools</h3>
            <p>Excellence in education since 1995. Preparing students for success in a changing world.</p>
            <div className="social-links">
              <a href="#"><span>f</span></a>
              <a href="#"><span>t</span></a>
              <a href="#"><span>in</span></a>
              <a href="#"><span>ig</span></a>
            </div>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/academics">Academics</a></li>
              <li><a href="/news">News</a></li>
              <li><a href="/events">Events</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Resources</h3>
            <ul className="footer-links">
              <li><a href="#">Student Portal</a></li>
              <li><a href="#">Parent Portal</a></li>
              <li><a href="#">Faculty & Staff</a></li>
              <li><a href="#">Calendar</a></li>
              <li><a href="#">Library</a></li>
              <li><a href="/sitemap">Sitemap</a></li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} Pakhtunkhwa Group of Schools. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
